import Pointer       from '../Pointer/Pointer';
import Pointerify    from '../Pointerify/Pointerify';
import EventType     from '../Shared/Constants/EventType';
import PointerType   from '../Shared/Constants/PointerType';
import closestParent from '../Shared/Util/closestParent';
import bindEvent     from './bindEvent';
import EventBinding  from './EventBinding';
import IEventBinding from './Interfaces/IEventBinding';

class EventManager {
    private pointerify: Pointerify     = null;
    private bindings:   EventBinding[] = [];

    constructor(pointerify: Pointerify) {
        this.pointerify = pointerify;
    }

    public get root() {
        return this.pointerify.refs.root;
    }

    public bindEvents(events: Array<string|IEventBinding>): void {
        this.bindings = events.map(bindEvent.bind(null, this, this.root));
    }

    public unbindEvents(): void {
        this.bindings.forEach(binding => binding.unbind());
    }

    protected handleClick(e: MouseEvent): void {
        if (this.pointerify.isClicking) return;

        e.preventDefault();
        e.stopPropagation();
    }

    protected handleMousedown(e: MouseEvent): void {
        const target = e.target as HTMLElement;
        const handleSelector = this.pointerify.config.selectors.handle;

        let didCancel = false;

        if (e.button !== 0) return;

        if (this.pointerify.mouse) {
            this.pointerify.cancelPointer(this.pointerify.mouse);

            didCancel = true;
        }

        if (handleSelector && !closestParent(target, handleSelector, true)) return;

        this.pointerify.setRootGeometry();

        this.pointerify.mouse = this.pointerify.createPointer(e, PointerType.MOUSE, didCancel);

        e.preventDefault();
    }

    protected handleMousemove(e: MouseEvent): void {
        const {mouse} = this.pointerify;

        if (e.target === window && mouse && !mouse.isStopping) {
            this.pointerify.movePointer(mouse, e, e);
        } else if (e.target !== window && !mouse) {
            this.pointerify.emitStatic(e, EventType.POINTER_INSPECT);
        }
    }

    protected handleMouseup(e: MouseEvent) {
        if (!this.pointerify.mouse) return;

        this.pointerify.releasePointer(this.pointerify.mouse, e);

        e.preventDefault();
    }

    protected handleTouchstart(e: TouchEvent) {
        const target = e.target as HTMLElement;
        const {handle: handleSelector} = this.pointerify.config.selectors;

        let touchIds = null;

        for (let i = 0, touch; (touch = e.changedTouches[i]); i++) {
            const newId = touch.identifier;

            let didCancel = false;

            for (const activeId in this.pointerify.touches) {
                // If any active touches in this instance are stopping (i.e.
                // already released but moving via inertia), cancel them.

                let activePointer = null;

                if ((activePointer = this.pointerify.touches[activeId]).isStopping) {
                    this.pointerify.cancelPointer(activePointer);

                    didCancel = true;
                }
            }

            if (handleSelector && !closestParent(target, handleSelector, true)) break;

            this.pointerify.setRootGeometry();

            if (this.pointerify.totalTouches < 2 && !this.pointerify.touches[newId]) {
                this.pointerify.touches[newId] = this.pointerify.createPointer(touch, PointerType.TOUCH, didCancel);
            }
        }

        if (!this.pointerify.config.behavior.pinch) return;

        touchIds = Object.keys(this.pointerify.touches);

        if (touchIds.length > 1 && !this.pointerify.virtual) {
            // Multiple touches exist, create a "virtual" pointer at the
            // midpoint

            e.preventDefault();

            this.pointerify.virtual = this.pointerify.createVirtualPointer(
                this.pointerify.touches[touchIds[0]],
                this.pointerify.touches[touchIds[1]]
            );
        }
    }

    protected handleTouchmove(e: TouchEvent): void {
        if (this.pointerify.totalTouches < 1) return;

        for (let i = 0, touch; (touch = e.changedTouches[i]); i++) {
            const id = touch.identifier;

            let pointer = null;

            if (!((pointer = this.pointerify.touches[id]) instanceof Pointer) || pointer.isStopping) break;

            this.pointerify.movePointer(pointer, touch, e);
        }
    }

    protected handleTouchend(e: TouchEvent): void {
        if (this.pointerify.totalTouches < 1) return;

        for (let i = 0, touch; (touch = e.changedTouches[i]); i++) {
            const id = touch.identifier;

            let pointer = null;

            if (!((pointer = this.pointerify.touches[id]) instanceof Pointer)) break;

            this.pointerify.releasePointer(pointer, touch);

            e.preventDefault();
        }
    }

    protected handleResize(): void {
        this.pointerify.setRootGeometry();
    }
}

export default EventManager;