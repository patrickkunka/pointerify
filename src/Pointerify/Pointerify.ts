import merge from 'helpful-merge';

import Config              from '../Config/Config';
import IConfig             from '../Config/Interfaces/IConfig';
import EventManager        from '../Events/EventManager';
import events              from '../Events/events';
import Pointer             from '../Pointer/Pointer';
import PointerStateStatic  from '../Pointer/PointerStateStatic';
import Axis                from '../Shared/Constants/Axis';
import Direction           from '../Shared/Constants/Direction';
import EventType           from '../Shared/Constants/EventType';
import PointerStatus       from '../Shared/Constants/PointerStatus';
import PointerType         from '../Shared/Constants/PointerType';
import calculateHypotenuse from '../Shared/Util/calculateHypotenuse';
import clamp               from '../Shared/Util/clamp';
import IMouseOrTouchEvent  from './Interfaces/IMouseOrTouchEvent';
import ITouchesMap         from './Interfaces/ITouchesMap';
import Refs                from './Refs';

class Pointerify {
    public mouse:            Pointer      = null;
    public virtual:          Pointer      = null;
    public touches:          ITouchesMap  = {};
    public rootRect:         ClientRect   = null;
    public refs:             Refs         = new Refs();
    public config:           Config       = new Config();
    public isClicking:       boolean      = false;
    public timerIdDoubleTap: number       = -1;

    private eventManager: EventManager = new EventManager(this);
    private hasTapped:    boolean      = false;

    private static DURATION_DOUBLE_TAP = 500;

    constructor(root: HTMLElement, config: IConfig) {
        Object.seal(this);

        this.init(root, config);
    }

    public get totalTouches() {
        return Object.keys(this.touches).length;
    }

    public configure(options: IConfig): void {
        let behavior = null;

        if ((behavior = options.behavior)) {
            // Uppercase enum values if present

            let allowAxis = '';
            let clampAxis = '';

            if ((allowAxis = behavior.allowAxis)) behavior.allowAxis = allowAxis.toUpperCase();
            if ((clampAxis = behavior.clampAxis)) behavior.clampAxis = clampAxis.toUpperCase();
        }

        merge(this.config, options, true);

        this.config.physics.friction = clamp(this.config.physics.friction, 0, 1);
    }

    public refresh(): void {
        this.setRootGeometry();
    }

    public destroy(): void {
        this.eventManager.unbindEvents();
    }

    public cancelPointer(pointer: Pointer): void {
        cancelAnimationFrame(pointer.rafIdInertia);

        this.deletePointer(pointer);
    }

    public setRootGeometry() {
        this.rootRect = this.refs.root.getBoundingClientRect();
    }

    public createPointer(e: IMouseOrTouchEvent, type: PointerType, isExtending: boolean = false): Pointer {
        const pointer = new Pointer(this);
        const {clientX, clientY, identifier} = e;

        if (isExtending) {
            pointer.status = PointerStatus.EXTENDING;
        }

        if (typeof identifier !== 'undefined') {
            pointer.id = identifier.toString();
        }

        pointer.type = type;

        pointer.startX = pointer.currentX = clientX;
        pointer.startY = pointer.currentY = clientY;

        pointer.rootWidth   = this.rootRect.width;
        pointer.rootHeight  = this.rootRect.height;
        pointer.rootOffsetX = clientX - this.rootRect.left;
        pointer.rootOffsetY = clientY - this.rootRect.top;

        pointer.down();

        return pointer;
    }

    public createVirtualPointer(yinPointer: Pointer, yangPointer: Pointer): Pointer {
        const pointer = new Pointer(this);

        const startX = (yinPointer.startX + yangPointer.startX) / 2;
        const startY = (yinPointer.startY + yangPointer.startY) / 2;

        const hypotenuse = calculateHypotenuse(
            {x: yinPointer.startX, y: yinPointer.startY},
            {x: yangPointer.startX, y: yangPointer.startY}
        );

        pointer.type = PointerType.VIRTUAL;

        pointer.yinPointer = yinPointer;
        pointer.yangPointer = yangPointer;

        pointer.startX = pointer.currentX = startX;
        pointer.startY = pointer.currentY = startY;
        pointer.startDistance = hypotenuse;

        pointer.rootWidth   = this.rootRect.width;
        pointer.rootHeight  = this.rootRect.height;
        pointer.rootOffsetX = startX - this.rootRect.left;
        pointer.rootOffsetY = startY - this.rootRect.top;

        pointer.down();

        return pointer;
    }

    public movePointer(pointer: Pointer, e: IMouseOrTouchEvent = null, originalEvent: IMouseOrTouchEvent = null): void {
        const allowAxis = this.config.behavior.allowAxis;

        if (pointer.isVirtualPointer) {
            const hypotenuse = calculateHypotenuse(
                {x: pointer.yinPointer.currentX, y: pointer.yinPointer.currentY},
                {x: pointer.yangPointer.currentX, y: pointer.yangPointer.currentY}
            );

            pointer.currentX = (pointer.yinPointer.currentX + pointer.yangPointer.currentX) / 2;
            pointer.currentY = (pointer.yinPointer.currentY + pointer.yangPointer.currentY) / 2;

            if (hypotenuse !== pointer.currentDistance) {
                // Hypotenuse has changed, user is pinching

                pointer.currentDistance = hypotenuse;

                this.pinchPointer(pointer);
            }
        } else {
            pointer.currentX = e.clientX;
            pointer.currentY = e.clientY;
        }

        if (!pointer.isMoving) {
            // NB: Do not use deltas here as may report `0`

            const vector = Math.abs((pointer.currentX - pointer.startX) / (pointer.currentY - pointer.startY));

            if (allowAxis === Axis.X && vector < 1 || allowAxis === Axis.Y && vector >= 1) {
                pointer.status = PointerStatus.INVALID;
            }
        }

        if (!pointer.isInvalid) {
            // Vector is within range, move pointer

            if (pointer.isVirtualPointer && e === null) {
                pointer.status = PointerStatus.STOPPING;
            } else {
                pointer.status = PointerStatus.MOVING;
            }

            pointer.move();

            if (!pointer.isVirtualPointer) {
                originalEvent.preventDefault();
            }
        }

        // Move virtual pointer, regardless of vector

        if (pointer.isTouchPointer && this.virtual !== null) {
            this.movePointer(this.virtual, e, originalEvent);
        }
    }

    public releasePointer(pointer: Pointer, e: IMouseOrTouchEvent): void {
        // NB: `pointerUp` fired before pointer is deleted
        // and is included in `totalTouches` at time of event. May
        // be counterintruitive, but is neccessary if `pointerStop`
        // must always fire after `pointerUp`.

        pointer.up();

        if (pointer.isNew && !pointer.isVirtualPointer) {
            if (this.hasTapped) {
                this.hasTapped = false;

                this.tap(e, true);
            } else {
                this.hasTapped = true;

                this.timerIdDoubleTap = window.setTimeout(
                    () => (this.hasTapped = false),
                    Pointerify.DURATION_DOUBLE_TAP
                );

                this.tap(e);
            }
        }

        if (!pointer.isMoving || !this.config.physics.inertia) {
            // Not moving, or inertia not enabled, delete immediately

            this.deletePointer(pointer);
        } else {
            // Moving + inertia enabled, allow natural stop then delete

            this.stopPointer(pointer);
        }
    }

    public emitStatic(e: IMouseOrTouchEvent, type: string): void {
        const state = new PointerStateStatic();

        const event = new CustomEvent(type, {
            detail: state,
            bubbles: true
        });

        const rootOffsetX = e.clientX - this.rootRect.left;
        const rootOffsetY = e.clientY - this.rootRect.top;

        state.multiplierX = clamp(rootOffsetX / this.rootRect.width);
        state.multiplierY = clamp(rootOffsetY / this.rootRect.height);

        this.emitEvent(event);
    }

    public emitEvent(e: CustomEvent): void {
        this.refs.root.dispatchEvent(e);
    }

    private init(root: HTMLElement, config: IConfig): void {
        this.refs.root = root;

        this.configure(config);

        this.setRootGeometry();

        this.eventManager.bindEvents(events);
    }

    private pinchPointer(pointer: Pointer): void {
        pointer.pinch();
    }

    private stopPointer(pointer: Pointer): void {
        const STOPPED_PXPF = 0.5;
        const initialVelocityX = pointer.velocityX;
        const initialVelocityY = pointer.velocityY;
        const directionX = pointer.directionX;
        const directionY = pointer.directionY;

        const render = () => {
            const progress = this.config.physics.friction * count;
            const eased    = this.config.physics.easing(progress);

            let newVelocityX = initialVelocityX - (initialVelocityX * eased);
            let newVelocityY = initialVelocityY - (initialVelocityY * eased);

            newVelocityX = directionX === Direction.RIGHT ? Math.max(0, newVelocityX) : Math.min(0, newVelocityX);
            newVelocityY = directionY === Direction.DOWN ? Math.max(0, newVelocityY) : Math.min(0, newVelocityY);

            if (Math.abs(newVelocityX) < STOPPED_PXPF && Math.abs(newVelocityY) < STOPPED_PXPF) {
                // Pointer is stationary

                this.deletePointer(pointer);

                return;
            }

            pointer.currentX = Math.round(pointer.currentX + newVelocityX);
            pointer.currentY = Math.round(pointer.currentY + newVelocityY);

            pointer.rootOffsetX += newVelocityX;
            pointer.rootOffsetY += newVelocityY;

            count++;

            if (pointer.currentX !== lastX || pointer.currentY !== lastY) {
                pointer.move();

                if (pointer.isTouchPointer && this.virtual !== null) {
                    this.movePointer(this.virtual);
                }
            }

            lastX = pointer.currentX;
            lastY = pointer.currentY;

            pointer.rafIdInertia = requestAnimationFrame(render);
        };

        let count = 1;
        let lastX = pointer.currentX;
        let lastY = pointer.currentY;

        pointer.status = PointerStatus.STOPPING;

        pointer.rafIdInertia = requestAnimationFrame(render);
    }

    private deletePointer(pointer: Pointer): void {
        pointer.stop();

        switch (pointer.type) {
            case PointerType.MOUSE:
                this.mouse = null;

                break;
            case PointerType.TOUCH:
                delete this.touches[pointer.id];

                break;
            case PointerType.VIRTUAL:
                this.virtual = null;

                break;
        }

        if (this.totalTouches < 2 && this.virtual) {
            this.deletePointer(this.virtual);
        }
    }

    private tap(e: IMouseOrTouchEvent, isDouble: boolean = false): void {
        let target = e.target as HTMLElement;

        this.isClicking = true;

        if (isDouble) {
            this.emitStatic(e, EventType.POINTER_DOUBLE_TAP);
        } else {
            this.emitStatic(e, EventType.POINTER_TAP);
        }

        while (typeof target.click !== 'function') {
            // Target is a text node

            target = target.parentElement;
        }

        target.click();

        this.isClicking = false;
    }
}

export default Pointerify;