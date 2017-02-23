import {
    DIRECTION_LEFT,
    DIRECTION_RIGHT,
    DIRECTION_UP,
    DIRECTION_DOWN,
    POINTER_TYPE_MOUSE,
    POINTER_TYPE_TOUCH,
    POINTER_STATE_NEW,
    POINTER_STATE_EXTENDING,
    POINTER_STATE_MOVING,
    POINTER_STATE_STOPPING,
    EVENT_POINTER_DOWN,
    EVENT_POINTER_DRAG,
    EVENT_POINTER_UP,
    EVENT_POINTER_STOP,
    SIXTY_FPS
} from './constants';

import StatePointer from './StatePointer';

class Pointer {
    constructor() {
        this.id          = -1;
        this.startX      = -1;
        this.startY      = -1;
        this.currentX    = -1;
        this.currentY    = -1;
        this.rootWidth   = -1;
        this.rootHeight  = -1;
        this.rootOffsetX = -1;
        this.rootOffsetY = -1;
        this.velocitiesX = [];
        this.velocitiesY = [];
        this.type        = null;
        this.dragster    = null;
        this.state       = POINTER_STATE_NEW;
        this.intervalIdVelocity = -1;
        this.rafIdInertia       = -1;

        Object.seal(this);
    }

    get deltaX() {
        return this.currentX - this.startX;
    }

    get deltaY() {
        return this.currentY - this.startY;
    }

    get multiplierX() {
        return (this.rootOffsetX + this.deltaX) / this.rootWidth;
    }

    get multiplierY() {
        return (this.rootOffsetY + this.deltaY) / this.rootHeight;
    }

    get velocityX() {
        return this.velocitiesX.reduce((value, sum) => value + sum, 0) / this.velocitiesX.length;
    }

    get velocityY() {
        return this.velocitiesY.reduce((value, sum) => value + sum, 0) / this.velocitiesY.length;
    }

    get isMousePointer() {
        return this.target === POINTER_TYPE_MOUSE;
    }

    get isTouchPointer() {
        return this.target === POINTER_TYPE_TOUCH;
    }

    get isNew() {
        return this.state === POINTER_STATE_NEW;
    }

    get isExtending() {
        return this.state === POINTER_STATE_EXTENDING;
    }

    get isMoving() {
        return this.state === POINTER_STATE_MOVING;
    }

    get isStopping() {
        return this.state === POINTER_STATE_STOPPING;
    }

    get directionX() {
        return this.velocityX < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }

    get directionY() {
        return this.velocityY < 0 ? DIRECTION_UP : DIRECTION_DOWN;
    }

    down() {
        this.dispatchEvent(EVENT_POINTER_DOWN);

        console.log('down');
    }

    move() {
        this.startMonitorVelocity();

        this.dispatchEvent(EVENT_POINTER_DRAG);

        console.log('move');
    }

    up() {
        this.stopMonitorVelocity();

        this.dispatchEvent(EVENT_POINTER_UP);

        console.log('up');
    }

    stop() {
        this.stopMonitorVelocity();

        this.dispatchEvent(EVENT_POINTER_STOP);

        console.log('stop');
    }

    startMonitorVelocity() {
        const SAMPLE_SIZE = 4;

        let lastX = this.currentX;
        let lastY = this.currentY;

        if (this.intervalIdVelocity > -1) return;

        this.intervalIdVelocity = setInterval(() => {
            if (this.velocitiesX.length === SAMPLE_SIZE) this.velocitiesX.shift();
            if (this.velocitiesY.length === SAMPLE_SIZE) this.velocitiesY.shift();

            this.velocitiesX.push(this.currentX - lastX);
            this.velocitiesY.push(this.currentY - lastY);

            lastX = this.currentX;
            lastY = this.currentY;
        }, SIXTY_FPS);
    }

    stopMonitorVelocity() {
        clearInterval(this.intervalIdVelocity);

        this.intervalIdVelocity = -1;
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

        state.deltaX      = this.deltaX;
        state.deltaY      = this.deltaY;
        state.multiplierX = this.multiplierX;
        state.multiplierY = this.multiplierY;
        state.velocityX   = this.velocityX;
        state.velocityY   = this.velocityY;
        state.directionX  = this.directionX;
        state.directionY  = this.directionY;
        state.state       = this.state;

        return Object.freeze(state);
    }
}

export default Pointer;