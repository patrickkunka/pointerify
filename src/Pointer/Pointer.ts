import Pointerify          from '../Pointerify/Pointerify';
import Axis                from '../Shared/Constants/Axis';
import Direction           from '../Shared/Constants/Direction';
import EventType           from '../Shared/Constants/EventType';
import PointerStatus       from '../Shared/Constants/PointerStatus';
import PointerType         from '../Shared/Constants/PointerType';
import clamp               from '../Shared/Util/clamp';
import randomHex           from '../Shared/Util/randomHex';
import PointerStateDynamic from './PointerStateDynamic';

class Pointer {
    public id:               string        = randomHex();
    public status:           PointerStatus = PointerStatus.NEW;
    public rafIdInertia:     number        = -1;
    public type:             PointerType   = null;
    public startX:           number        = -1;
    public startY:           number        = -1;
    public startDistance:    number        = -1;
    public currentX:         number        = -1;
    public currentY:         number        = -1;
    public currentDistance:  number        = -1;
    public rootWidth:        number        = -1;
    public rootHeight:       number        = -1;
    public rootOffsetX:      number        = -1;
    public rootOffsetY:      number        = -1;
    public yinPointer:       Pointer       = null;
    public yangPointer:      Pointer       = null;

    private velocitiesX:     number[]   = [];
    private velocitiesY:     number[]   = [];
    private velocitiesPinch: number[]   = [];
    private pointerify:      Pointerify = null;
    private isMonitoring:    boolean    = false;
    private rafIdVelocity:   number     = -1;

    constructor(pointerify: Pointerify) {
        this.pointerify = pointerify;
    }

    public get isMousePointer() {
        return this.type === PointerType.MOUSE;
    }

    public get isTouchPointer() {
        return this.type === PointerType.TOUCH;
    }

    public get isVirtualPointer() {
        return this.type === PointerType.VIRTUAL;
    }

    public get isNew() {
        return this.status === PointerStatus.NEW;
    }

    public get isInvalid() {
        return this.status === PointerStatus.INVALID;
    }

    public get isExtending() {
        return this.status === PointerStatus.EXTENDING;
    }

    public get isMoving() {
        return this.status === PointerStatus.MOVING;
    }

    public get isPinching() {
        return this.status === PointerStatus.PINCHING;
    }

    public get isStopping() {
        return this.status === PointerStatus.STOPPING;
    }

    public get velocityX() {
        return this.velocitiesX.length && this.pointerify.config.behavior.allowAxis !== Axis.Y ?
            this.velocitiesX.reduce((value, sum) => value + sum, 0) / this.velocitiesX.length : 0;
    }

    public get velocityY() {
        return this.velocitiesY.length && this.pointerify.config.behavior.allowAxis !== Axis.X ?
            this.velocitiesY.reduce((value, sum) => value + sum, 0) / this.velocitiesY.length : 0;
    }

    public get directionX() {
        if (this.velocityX < 0) {
            return Direction.LEFT;
        } else if (this.velocityX > 0) {
            return Direction.RIGHT;
        }

        return Direction.STATIC;
    }

    public get directionY() {
        if (this.velocityY < 0) {
            return Direction.UP;
        } else if (this.velocityY) {
            return Direction.DOWN;
        }

        return Direction.STATIC;
    }

    public down() {
        if (this.isVirtualPointer) {
            this.dispatchEvent(EventType.VIRTUAL_POINTER_CREATE);
        } else {
            this.dispatchEvent(EventType.POINTER_DOWN);
        }
    }

    public move() {
        if (!this.isMonitoring && !this.isStopping) this.startMonitorVelocity();

        if (this.isVirtualPointer) {
            this.dispatchEvent(EventType.VIRTUAL_POINTER_MOVE);
        } else {
            this.dispatchEvent(EventType.POINTER_DRAG);
        }
    }

    public pinch() {
        this.dispatchEvent(EventType.VIRTUAL_POINTER_PINCH);
    }

    public up() {
        this.stopMonitorVelocity();

        this.dispatchEvent(EventType.POINTER_UP);
    }

    public stop() {
        if (this.isVirtualPointer) {
            this.dispatchEvent(EventType.VIRTUAL_POINTER_DESTROY);
        } else {
            this.dispatchEvent(EventType.POINTER_STOP);
        }
    }

    private get deltaX() {
        return this.pointerify.config.behavior.allowAxis === Axis.Y ? 0 : this.currentX - this.startX;
    }

    private get deltaY() {
        return this.pointerify.config.behavior.allowAxis === Axis.X ? 0 : this.currentY - this.startY;
    }

    private get deltaDistance() {
        return this.currentDistance - this.startDistance;
    }

    private get deltaMultiplierX() {
        return this.deltaX / this.rootWidth;
    }

    private get deltaMultiplierY() {
        return this.deltaY / this.rootHeight;
    }

    private get deltaMultiplierDistance() {
        return this.deltaDistance / this.startDistance;
    }

    private get multiplierX() {
        return (this.rootOffsetX + this.deltaX) / this.rootWidth;
    }

    private get multiplierY() {
        return (this.rootOffsetY + this.deltaY) / this.rootHeight;
    }

    private get velocityPinch() {
        return this.velocitiesPinch.length ?
            this.velocitiesPinch.reduce((value, sum) => value + sum, 0) / this.velocitiesPinch.length : 0;
    }

    private get directionPinch() {
        if (this.velocityPinch < 0) {
            return Direction.CONVERGE;
        } else if (this.velocityPinch) {
            return Direction.DIVERGE;
        }

        return Direction.STATIC;
    }

    private startMonitorVelocity() {
        const SAMPLE_SIZE = 8;

        let lastX = this.currentX;
        let lastY = this.currentY;

        const monitor = () => {
            if (this.velocitiesX.length === SAMPLE_SIZE) this.velocitiesX.shift();
            if (this.velocitiesY.length === SAMPLE_SIZE) this.velocitiesY.shift();

            this.velocitiesX.push(this.currentX - lastX);
            this.velocitiesY.push(this.currentY - lastY);

            lastX = this.currentX;
            lastY = this.currentY;

            if (!this.isMonitoring) return;

            this.rafIdVelocity = requestAnimationFrame(monitor);
        };

        this.rafIdVelocity = requestAnimationFrame(monitor);

        this.isMonitoring = true;
    }

    private stopMonitorVelocity() {
        cancelAnimationFrame(this.rafIdVelocity);

        this.rafIdVelocity = -1;

        this.isMonitoring = false;
    }

    private dispatchEvent(eventType) {
        const event = new CustomEvent(eventType, {
            detail: this.getState(),
            bubbles: true
        });

        this.pointerify.emitEvent(event);
    }

    private getState() {
        const state = new PointerStateDynamic();
        const {clampX, clampY} = this.pointerify.config.behavior;

        state.id                      = `pointer-${this.id}`;
        state.deltaX                  = this.deltaX;
        state.deltaY                  = this.deltaY;
        state.deltaDistance           = this.deltaDistance;
        state.deltaMultiplierX        = this.deltaMultiplierX;
        state.deltaMultiplierY        = this.deltaMultiplierY;
        state.deltaMultiplierDistance = this.deltaMultiplierDistance;
        state.multiplierX             = clampX ? clamp(this.multiplierX, 0, 1) : this.multiplierX;
        state.multiplierY             = clampY ? clamp(this.multiplierY, 0, 1) : this.multiplierY;
        state.velocityX               = this.velocityX;
        state.velocityY               = this.velocityY;
        state.velocityPinch           = this.velocityPinch;
        state.directionX              = this.directionX;
        state.directionY              = this.directionY;
        state.directionPinch          = this.directionPinch;
        state.status                  = this.status;
        state.type                    = this.type;

        return Object.freeze(state);
    }
}

export default Pointer;