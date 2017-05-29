import {
    AXIS_X,
    AXIS_Y,
    POINTER_TYPE_MOUSE,
    POINTER_TYPE_TOUCH,
    POINTER_TYPE_VIRTUAL,
    POINTER_STATUS_EXTENDING,
    POINTER_STATUS_MOVING,
    POINTER_STATUS_STOPPING,
    DIRECTION_RIGHT,
    DIRECTION_DOWN,
    EVENT_POINTER_INSPECT,
    EVENT_POINTER_TAP
} from './Constants';

import Dom          from './Dom';
import EventBinding from './EventBinding';
import Pointer      from './Pointer';
import Util         from './Util';
import Config       from './config/Config';
import events       from './events.json';
import StateStatic  from './StateStatic';

class Dragster {
    /**
     * @constructor
     * @param {HTMLElement} root
     * @param {object}      config
     */

    constructor(root, config) {
        this.mouse      = null;
        this.wheel      = null;
        this.virtual    = null;
        this.touches    = {};
        this.bindings   = [];
        this.rootRect   = null;
        this.dom        = new Dom();
        this.config     = new Config();
        this.isClicking = false;

        Object.seal(this);

        this.init(root, config);
    }

    get totalTouches() {
        return Object.keys(this.touches).length;
    }

    /* Private Methods
    ---------------------------------------------------------------------- */

    /**
     * @private
     * @param  {HTMLElement} root
     * @param  {object}      config
     * @return {void}
     */

    init(root, config) {
        if (!(root instanceof HTMLElement)) {
            throw new TypeError('[Dragster] Invalid root element');
        }

        this.dom.root = root;

        this.configure(config);

        this.setRootGeometry();

        this.bindEvents(events);
    }

    /**
     * @private
     * @param   {object} config
     * @return  {void}
     */

    configure(config) {
        let behavior = null;

        if ((behavior = config.behavior)) {
            // Uppercase enum values if present

            let allowAxis = '';
            let clampAxis = '';

            if ((allowAxis = behavior.allowAxis)) behavior.allowAxis = allowAxis.toUpperCase();
            if ((clampAxis = behavior.clampAxis)) behavior.clampAxis = clampAxis.toUpperCase();
        }

        Util.extend(this.config, config, true, Dragster.handleMergeError.bind(this));

        this.config.physics.friction = Util.clamp(this.config.physics.friction, 0, 1);
    }

    /**
     * @private
     * @param   {Array.<object>} eventsRaw
     * @return  {Array.<EventBinding>}
     */

    bindEvents(eventsRaw) {
        return eventsRaw.map(eventRaw => this.bindEvent(eventRaw));
    }

    /**
     * @private
     * @param   {object} eventRaw
     * @return  {EventBinding}
     */

    bindEvent(eventRaw) {
        const binding    = Util.extend(new EventBinding(), eventRaw);
        const eventTypes = [];

        let fn = null;
        let el = null;

        if (typeof (fn = this[binding.bind]) !== 'function') {
            throw new Error(`No method found with name "${binding.bind}"`);
        }

        if (binding.throttle > 0) {
            binding.fn = Util.throttle(fn.bind(this), binding.throttle);
        } else if (binding.debounce > 0) {
            binding.fn = Util.debounce(fn.bind(this), binding.debounce);
        } else {
            binding.fn = fn.bind(this);
        }

        if (binding.el && !((el = this.dom[binding.el]) instanceof HTMLElement)) {
            throw new Error(`No element reference with name "${binding.el}"`);
        } else if (!binding.el) {
            el = window;
        }

        if (Array.isArray(binding.on)) {
            eventTypes.push(...binding.on);
        } else {
            eventTypes.push(binding.on);
        }

        binding.ref = el;

        eventTypes.forEach(type => binding.ref.addEventListener(type, binding.fn, {
            passive: binding.passive
        }));

        return binding;
    }

    /**
     * @private
     * @param   {Array.<EventBinding>} eventBindings
     * @return  {void}
     */

    unbindEvents(eventBindings) {
        while (eventBindings.length) {
            const binding    = eventBindings.pop();
            const eventTypes = [];

            if (Array.isArray(binding.on)) {
                eventTypes.push(...binding.on);
            } else {
                eventTypes.push(binding.on);
            }

            eventTypes.forEach(type => binding.ref.removeEventListener(type, binding.fn));
        }
    }

    /**
     * @param  {MouseEvent} e
     * @return {void}
     */

    handleClick(e) {
        if (this.isClicking) return;

        e.preventDefault();
        e.stopPropagation();
    }

    /**
     * @private
     * @param   {MouseEvent} e
     * @return  {void}
     */

    handleMouseDown(e) {
        const target = e.target;
        const handleSelector = this.config.selectors.handle;

        let didCancel = false;

        if (e.button !== 0) return;

        if (this.mouse) {
            this.cancelPointer(this.mouse);

            didCancel = true;
        }

        if (handleSelector && !Util.closestParent(target, handleSelector, true)) return;

        this.setRootGeometry();

        this.mouse = this.createPointer(e, POINTER_TYPE_MOUSE, didCancel);

        e.preventDefault();
    }

    /**
     * @param  {MouseEvent} e
     * @return {void}
     */

    handleRootMouseMove(e) {
        if (this.mouse) return;

        this.emitStatic(e, EVENT_POINTER_INSPECT);
    }

    /**
     * @private
     * @param   {MouseEvent} e
     * @return  {void}
     */

    handleWindowMouseMove(e) {
        if (!this.mouse) return;

        if (this.mouse.isStopping) return;

        this.movePointer(this.mouse, e, e);
    }

    /**
     * @private
     * @param   {MouseEvent} e
     * @return  {void}
     */

    handleMouseUp(e) {
        if (!this.mouse) return;

        this.releasePointer(this.mouse, e);

        e.preventDefault();
    }

    /**
     * @private
     * @param   {TouchEvent} e
     * @return  {void}
     */

    handleTouchStart(e) {
        const target = e.target;
        const handleSelector = this.config.selectors.handle;

        let touchIds = null;

        for (let i = 0, touch; (touch = e.changedTouches[i]); i++) {
            const newId = touch.identifier;

            let didCancel = false;

            for (let activeId in this.touches) {
                // If any active touches in this dragster are stopping (i.e.
                // already released but moving through inertia), cancel them.

                let activePointer = null;

                if ((activePointer = this.touches[activeId]).isStopping) {
                    this.cancelPointer(activePointer);

                    didCancel = true;
                }
            }

            if (handleSelector && !Util.closestParent(target, handleSelector, true)) break;

            this.setRootGeometry();

            if (this.totalTouches < 2) {
                this.touches[newId] = this.createPointer(touch, POINTER_TYPE_TOUCH, didCancel);
            }
        }

        if (!this.config.behavior.pinch) return;

        touchIds = Object.keys(this.touches);

        if (touchIds.length > 1 && !this.virtual) {
            // Multiple touches exist, create a "virtual" pointer at the
            // midpoint

            this.virtual = this.createVirtualPointer(this.touches[touchIds[0]], this.touches[touchIds[1]]);
        }
    }

    /**
     * @private
     * @param {TouchEvent} e
     */

    handleTouchMove(e) {
        if (this.totalTouches < 1) return;

        for (let i = 0, touch; (touch = e.changedTouches[i]); i++) {
            const id = touch.identifier;

            let pointer = null;

            if (!((pointer = this.touches[id]) instanceof Pointer) || pointer.isStopping) break;

            this.movePointer(pointer, touch, e);
        }
    }

    /**
     * @private
     * @param   {TouchEvent} e
     * @return  {void}
     */

    handleTouchEnd(e) {
        if (this.totalTouches < 1) return;

        for (let i = 0, touch; (touch = e.changedTouches[i]); i++) {
            const id = touch.identifier;

            let pointer = null;

            if (!((pointer = this.touches[id]) instanceof Pointer)) break;

            this.releasePointer(pointer, touch, e);

            e.preventDefault();
        }
    }

    /**
     * @private
     * @return  {void}
     */

    handleResize() {
        this.setRootGeometry();
    }

    /**
     * @public
     * @return {void}
     */

    refresh() {
        this.setRootGeometry();
    }

    /**
     * @private
     * @return  {void}
     */

    setRootGeometry() {
        this.rootRect = this.dom.root.getBoundingClientRect();
    }

    /**
     * @private
     * @param   {(TouchEvent|MouseEvent)}   e
     * @param   {Symbol}                    type
     * @param   {boolean}                   isExtending
     * @return  {Pointer}
     */

    createPointer({clientX, clientY, identifier}, type, isExtending) {
        const pointer = new Pointer();

        if (isExtending) {
            pointer.status = POINTER_STATUS_EXTENDING;
        }

        if (identifier) {
            pointer.id = identifier;
        }

        pointer.type     = type;
        pointer.dragster = this;

        pointer.startX = pointer.currentX = clientX;
        pointer.startY = pointer.currentY = clientY;

        pointer.rootWidth   = this.rootRect.width;
        pointer.rootHeight  = this.rootRect.height;
        pointer.rootOffsetX = clientX - this.rootRect.left;
        pointer.rootOffsetY = clientY - this.rootRect.top;

        pointer.down();

        return pointer;
    }

    /**
     * @private
     * @param  {Pointer} yinPointer
     * @param  {Pointer} yangPointer
     * @return {Pointer}
     */

    createVirtualPointer(yinPointer, yangPointer) {
        const pointer = new Pointer();

        const startX = (yinPointer.startX + yangPointer.startX) / 2;
        const startY = (yinPointer.startY + yangPointer.startY) / 2;

        const hypotenuse = Util.hypotenuse(
            {x: yinPointer.startX, y: yinPointer.startY},
            {x: yangPointer.startX, y: yangPointer.startY}
        );

        pointer.type = POINTER_TYPE_VIRTUAL;
        pointer.dragster = this;

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

    /**
     * @private
     * @param   {Pointer}
     * @param   {(Touch|MouseEvent|null)}        e
     * @param   {(TouchEvent|MouseEvent|null)}   originalEvent
     * @return  {void}
     */

    movePointer(pointer, e=null, originalEvent=null) {
        const allowAxis = this.config.behavior.allowAxis;

        if (pointer.isVirtualPointer) {
            const hypotenuse = Util.hypotenuse(
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
            const vector = Math.abs(pointer.deltaX / pointer.deltaY);

            if (allowAxis === AXIS_X && vector < 1 || allowAxis === AXIS_Y && vector >= 1) {
                this.deletePointer(pointer);

                return;
            }
        }

        if (allowAxis === AXIS_X) {
            pointer.currentY = pointer.startY;
        } if (allowAxis === AXIS_Y) {
            pointer.currentX = pointer.startX;
        }

        if (pointer.isVirtualPointer && e === null) {
            pointer.status = POINTER_STATUS_STOPPING;
        } else {
            pointer.status = POINTER_STATUS_MOVING;
        }

        pointer.move();

        if (!pointer.isVirtualPointer) {
            originalEvent.preventDefault();
        }

        if (pointer.isTouchPointer && this.virtual !== null) {
            this.movePointer(this.virtual, e, originalEvent);
        }
    }

    /**
     * @private
     * @param  {Pointer} pointer
     * @return {void}
     */

    pinchPointer(pointer) {
        pointer.pinch();
    }

    /**
     * @private
     * @param   {Pointer}
     * @param   {(TouchEvent|MouseEvent)} e
     * @return  {void}
     */

    releasePointer(pointer, e) {
        pointer.up();

        if (pointer.isNew) {
            this.click(e);
        }

        if (!pointer.isMoving) {
            this.deletePointer(pointer);

            return;
        }

        if (this.config.physics.inertia) {
            this.stopPointer(pointer);

            return;
        }

        this.deletePointer(pointer);
    }

    /**
     * @private
     * @param   {Pointer}
     * @return  {void}
     */


    stopPointer(pointer) {
        const initialVelocityX = pointer.velocityX;
        const initialVelocityY = pointer.velocityY;
        const directionX = pointer.directionX;
        const directionY = pointer.directionY;

        const render = () => {
            const progress = this.config.physics.friction * count;
            const eased    = this.config.physics.easing(progress);

            let newVelocityX = initialVelocityX - (initialVelocityX * eased);
            let newVelocityY = initialVelocityY - (initialVelocityY * eased);

            newVelocityX = directionX === DIRECTION_RIGHT ? Math.max(0, newVelocityX) : Math.min(0, newVelocityX);
            newVelocityY = directionY === DIRECTION_DOWN ? Math.max(0, newVelocityY) : Math.min(0, newVelocityY);

            if (newVelocityX === 0 && newVelocityY === 0) {
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

        let count  = 1;
        let lastX  = pointer.currentX;
        let lastY  = pointer.currentY;

        pointer.status = POINTER_STATUS_STOPPING;

        pointer.rafIdInertia = requestAnimationFrame(render);
    }

    /**
     * @private
     * @param  {Pointer}
     * @return {void}
     */

    cancelPointer(pointer) {
        cancelAnimationFrame(pointer.rafIdInertia);

        this.deletePointer(pointer);
    }

    /**
     * @private
     * @param  {Pointer}
     * @return {void}
     */

    deletePointer(pointer) {
        switch (pointer.type) {
            case POINTER_TYPE_MOUSE:
                this.mouse = null;

                break;
            case POINTER_TYPE_TOUCH:
                delete this.touches[pointer.id];

                break;
            case POINTER_TYPE_VIRTUAL:
                this.virtual = null;

                break;
        }

        if (this.totalTouches < 2 && this.virtual) {
            this.deletePointer(this.virtual);
        }

        if (!pointer.isPristine) {
            pointer.stop();
        }
    }

    /**
     * @private
     * @param  {MouseEvent}  e
     * @param  {string}      type
     * @return {void}
     */

    emitStatic({clientX, clientY}, type) {
        const state = new StateStatic();

        const event = new CustomEvent(type, {
            detail: state,
            bubbles: true
        });

        const rootOffsetX = clientX - this.rootRect.left;
        const rootOffsetY = clientY - this.rootRect.top;

        state.multiplierX = Math.max(0, Math.min(1, rootOffsetX / this.rootRect.width));
        state.multiplierY = Math.max(0, Math.min(1, rootOffsetY / this.rootRect.height));

        this.emitEvent(event);
    }

    /**
     * @private
     * @param  {CustomEvent} e
     * @return {void}
     */

    emitEvent(e) {
        this.dom.root.dispatchEvent(e);
    }

    /**
     * @private
     * @param   {(TouchEvent|MouseEvent)} e
     * @return  {void}
     */

    click(e) {
        let target = e.target;

        this.isClicking = true;

        this.emitStatic(e, EVENT_POINTER_TAP);

        while (typeof target.click !== 'function') {
            target = target.parentElement;
        }

        target.click();

        this.isClicking = false;
    }

    /* Static Methods
    ---------------------------------------------------------------------- */

    /**
     * @private
     * @static
     * @param {Error}   err
     * @param {object}  target
     */

    static handleMergeError(err, target) {
        const re = /property "?(\w*)"?[,:] object/i;

        let matches = null;

        if (!(err instanceof TypeError) || !(matches = re.exec(err.message))) throw err;

        const keys = Reflect.ownKeys(target);
        const offender = matches[1].toLowerCase();

        const bestMatch = keys.reduce((bestMatch, key) => {
            let charIndex = 0;

            while (
                charIndex < offender.length &&
                offender.charAt(charIndex) === key.charAt(charIndex).toLowerCase()
            ) charIndex++;

            return charIndex > bestMatch.length ? key : bestMatch;
        }, '');

        const suggestion = bestMatch ? `. Did you mean "${bestMatch}"?` : '';

        throw new TypeError(`[Dragster] Invalid configuration option "${matches[1]}"${suggestion}`);
    }

    /* Public Methods
    ---------------------------------------------------------------------- */

    /**
     * @public
     * @public
     * @return {void}
     */

    destroy() {
        this.unbindEvents(this.bindings);
    }
}

export default Dragster;