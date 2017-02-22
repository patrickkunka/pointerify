import {
    POINTER_TYPE_MOUSE,
    POINTER_TYPE_HOVER,
    POINTER_STATE_EXTENDING,
    POINTER_STATE_MOVING,
    POINTER_STATE_INSPECTING,
    POINTER_STATE_STOPPING,
    DIRECTION_LEFT,
    DIRECTION_RIGHT,
    DIRECTION_DOWN,
    DIRECTION_UP
} from './constants';

import Dom          from './Dom';
import EventBinding from './EventBinding';
import Pointer      from './Pointer';
import Util         from './Util';
import Config       from './config/Config';
import events       from './events.json';

class Dragster {
    /**
     * @constructor
     * @param {HTMLElement} root
     * @param {object}      config
     */

    constructor(root, config) {
        this.inspector  = new Pointer();
        this.pointers   = [];
        this.bindings   = [];
        this.dom        = new Dom();
        this.config     = new Config();
        this.isClicking = false;

        Object.seal(this);

        this.init(root, config);
    }

    /* Private Methods
    ---------------------------------------------------------------------- */

    /**
     * @private
     * @param  {HTMLElement} root
     * @return {void}
     */

    init(root, config) {
        this.dom.root = root;

        this.configure(config);

        this.inspector.type  = POINTER_TYPE_HOVER;
        this.inspector.state = POINTER_STATE_INSPECTING;

        this.bindEvents(events);
    }

    /**
     * @private
     * @param   {object} config
     * @return  {void}
     */

    configure(config) {
        Util.extend(this.config, config, true, Dragster.handleConfigureError.bind(this));

        this.config.physics.friction = Math.max(0, Math.min(1, this.config.physics.friction));
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

        binding.fn = fn.bind(this);

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

        eventTypes.forEach(type => binding.ref.addEventListener(type, binding.fn));

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

        let pointer = null;
        let didCancel = false;

        if (e.button !== 0) return;

        if (this.pointers.length > 0) {
            pointer = this.pointers[0];

            this.cancelPointer(pointer);

            didCancel = true;
        }

        if (handleSelector && !Util.closestParent(target, handleSelector, true)) return;

        this.pointers.push(this.createPointer(e, POINTER_TYPE_MOUSE, didCancel));

        e.preventDefault();
    }

    /**
     * @private
     * @param   {MouseEvent} e
     * @return  {void}
     */

    handleMouseMove(e) {
        let pointer = null;

        // TODO: manage inspector

        if (this.pointers.length < 1) return;

        pointer = this.pointers[0];

        if (pointer.isStopping) return;

        this.movePointer(pointer, e);

        e.preventDefault();
    }

    /**
     * @private
     * @param   {MouseEvent} e
     * @return  {void}
     */

    handleMouseUp(e) {
        let pointer = null;

        if (this.pointers.length < 1) return;

        pointer = this.pointers[0];

        this.releasePointer(pointer, e);

        e.preventDefault();
    }

    /**
     * @private
     * @param   {TouchEvent} e
     * @return  {void}
     */

    handleTouchStart(e) {
        console.log('touch start', e);
    }


    /**
     * @private
     * @param {TouchEvent} e
     */

    handleTouchMove(e) {

    }

    /**
     * @private
     * @param   {TouchEvent} e
     * @return  {void}
     */

    handleTouchEnd(e) {

    }

    /**
     * @param   {(TouchEvent|MouseEvent)}   e
     * @param   {Symbol}                    type
     * @param   {boolean}                   isExtending
     * @return  {Pointer}
     */

    createPointer({clientX, clientY}, type, isExtending) {
        const pointer  = new Pointer();
        const rect     = this.dom.root.getBoundingClientRect();

        if (isExtending) {
            pointer.state = POINTER_STATE_EXTENDING;
        }

        pointer.type     = type;
        pointer.dragster = this;

        pointer.startX = pointer.currentX = clientX;
        pointer.startY = pointer.currentY = clientY;

        pointer.rootWidth   = rect.width;
        pointer.rootHeight  = rect.height;
        pointer.rootOffsetX = clientX - rect.left;
        pointer.rootOffsetY = clientY - rect.top;

        pointer.down();

        return pointer;
    }

    /**
     * @param   {Pointer}
     * @param   {(TouchEvent|MouseEvent)}   e
     * @return  {void}
     */

    movePointer(pointer, {clientX, clientY}) {
        pointer.state = POINTER_STATE_MOVING;

        pointer.currentX = clientX;
        pointer.currentY = clientY;

        pointer.move();
    }

    /**
     * @param   {Pointer}
     * @param   {(TouchEvent|MouseEvent)}   e
     * @return  {void}
     */

    releasePointer(pointer, e) {
        if (pointer.isNew) {
            this.click(e);
        }

        if (!pointer.isMoving) {
            this.deletePointer(pointer);

            return;
        }

        pointer.up();

        if (this.config.physics.inertia) {
            this.stopPointer(pointer);

            return;
        }

        this.deletePointer(pointer);
    }

    /**
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
            }

            lastX = pointer.currentX;
            lastY = pointer.currentY;

            pointer.rafIdInertia = requestAnimationFrame(render);
        };

        let count  = 1;
        let lastX  = pointer.currentX;
        let lastY  = pointer.currentY;

        pointer.state = POINTER_STATE_STOPPING;

        pointer.rafIdInertia = requestAnimationFrame(render);
    }

    /**
     * @param  {Pointer}
     * @return {void}
     */

    cancelPointer(pointer) {
        cancelAnimationFrame(pointer.rafIdInertia);

        this.deletePointer(pointer);
    }

    /**
     * @param  {Pointer}
     * @return {void}
     */

    deletePointer(pointer) {
        const pointerIndex = this.pointers.indexOf(pointer);

        this.pointers.splice(pointerIndex, 1);

        if (!pointer.isPristine) {
            pointer.stop();
        }
    }

    /**
     * @param  {CustomEvent} e
     * @return {void}
     */

    emitEvent(e) {
        this.dom.root.dispatchEvent(e);
    }

    /**
     * @param   {(TouchEvent|MouseEvent)} el
     * @return  {void}
     */

    click(e) {
        this.isClicking = true;

        e.target.click();

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

    static handleConfigureError(err, target) {
        const re = /property "?(\w*)"?[,:] object/i;

        let matches         = null;
        let illegalPropName = '';
        let bestMatch       = '';
        let suggestion      = '';

        if (!(err instanceof TypeError) || !(matches = re.exec(err.message))) throw err;

        illegalPropName = matches[1];

        for (let key in target) {
            let i = 0;

            while (i < illegalPropName.length && illegalPropName.charAt(i).toLowerCase() === key.charAt(i).toLowerCase()) {
                i++;
            }

            if (i > bestMatch.length) {
                bestMatch = key;
            }
        }

        if (bestMatch) {
            suggestion = `. Did you mean "${bestMatch}"?`;
        }

        throw new TypeError(`[Datepicker] Invalid configuration property "${illegalPropName}"${suggestion}`);
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