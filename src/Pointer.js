import Util from './Util';

import {
    DIRECTION_STATIC,
    DIRECTION_LEFT,
    DIRECTION_RIGHT,
    DIRECTION_UP,
    DIRECTION_DOWN,
    POINTER_TYPE_MOUSE,
    POINTER_TYPE_TOUCH,
    POINTER_STATUS_NEW,
    POINTER_STATUS_EXTENDING,
    POINTER_STATUS_MOVING,
    POINTER_STATUS_STOPPING,
    EVENT_POINTER_DOWN,
    EVENT_POINTER_DRAG,
    EVENT_POINTER_UP,
    EVENT_POINTER_STOP
} from './constants';

import StatePointer from './StatePointer';

class Pointer {
    constructor() {
        this.id                 = -1;
        this.startX             = -1;
        this.startY             = -1;
        this.currentX           = -1;
        this.currentY           = -1;
        this.rootWidth          = -1;
        this.rootHeight         = -1;
        this.rootOffsetX        = -1;
        this.rootOffsetY        = -1;
        this.velocitiesX        = [];
        this.velocitiesY        = [];
        this.type               = null;
        this.dragster           = null;
        this.status             = POINTER_STATUS_NEW;
        this.isMonitoring       = false;

        this.rafIdVelocity      = -1;
        this.rafIdInertia       = -1;

        Object.seal(this);
    }

    get deltaX() {
        return this.currentX - this.startX;
    }

    get deltaY() {
        return this.currentY - this.startY;
    }

    get deltaMultiplierX() {
        return this.deltaX / this.rootWidth;
    }

    get deltaMultiplierY() {
        return this.deltaY / this.rootHeight;
    }

    get multiplierX() {
        return (this.rootOffsetX + this.deltaX) / this.rootWidth;
    }

    get multiplierY() {
        return (this.rootOffsetY + this.deltaY) / this.rootHeight;
    }

    get velocityX() {
        return this.velocitiesX.length ? this.velocitiesX.reduce((value, sum) => value + sum, 0) / this.velocitiesX.length : 0;
    }

    get velocityY() {
        return this.velocitiesY.length ? this.velocitiesY.reduce((value, sum) => value + sum, 0) / this.velocitiesY.length : 0;
    }

    get isMousePointer() {
        return this.target === POINTER_TYPE_MOUSE;
    }

    get isTouchPointer() {
        return this.target === POINTER_TYPE_TOUCH;
    }

    get isNew() {
        return this.status === POINTER_STATUS_NEW;
    }

    get isExtending() {
        return this.status === POINTER_STATUS_EXTENDING;
    }

    get isMoving() {
        return this.status === POINTER_STATUS_MOVING;
    }

    get isStopping() {
        return this.status === POINTER_STATUS_STOPPING;
    }

    get directionX() {
        if (this.velocityX < 0) {
            return DIRECTION_LEFT;
        } else if (this.velocityX > 0) {
            return DIRECTION_RIGHT;
        }

        return DIRECTION_STATIC;
    }

    get directionY() {
        if (this.velocitiesY < 0) {
            return DIRECTION_UP;
        } else if (this.velocitiesY) {
            return DIRECTION_DOWN;
        }

        return DIRECTION_STATIC;
    }

    down() {
        this.dispatchEvent(EVENT_POINTER_DOWN);
    }

    move() {
        if (!this.isMonitoring && !this.isStopping) this.startMonitorVelocity();

        this.dispatchEvent(EVENT_POINTER_DRAG);
    }

    up() {
        this.stopMonitorVelocity();

        this.dispatchEvent(EVENT_POINTER_UP);
    }

    stop() {
        this.dispatchEvent(EVENT_POINTER_STOP);
    }

    startMonitorVelocity() {
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

    stopMonitorVelocity() {
        cancelAnimationFrame(this.rafIdVelocity);

        this.rafIdVelocity = -1;

        this.isMonitoring = false;
    }

    dispatchEvent(eventType) {
        const event = new CustomEvent(eventType, {
            detail: this.getState(),
            bubbles: true
        });

        this.dragster.emitEvent(event);
    }

    getState() {
        const state = new StatePointer();

        state.deltaX           = this.deltaX;
        state.deltaY           = this.deltaY;
        state.deltaMultiplierX = this.deltaMultiplierX;
        state.deltaMultiplierY = this.deltaMultiplierY;
        state.multiplierX      = this.dragster.config.behavior.clampX ? Util.clamp(this.multiplierX, 0, 1) : this.multiplierX;
        state.multiplierY      = this.dragster.config.behavior.clampY ? Util.clamp(this.multiplierY, 0, 1) : this.multiplierY;
        state.velocityX        = this.velocityX;
        state.velocityY        = this.velocityY;
        state.directionX       = this.directionX;
        state.directionY       = this.directionY;
        state.status           = this.status;
        state.type             = this.type;

        return Object.freeze(state);
    }
}

export default Pointer;