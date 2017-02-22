import {
    POINTER_TYPE_MOUSE,
    POINTER_TYPE_TOUCH,
    POINTER_STATE_PRISTINE,
    POINTER_STATE_MOVING,
    POINTER_STATE_STOPPING,
    POINTER_STATE_INSPECTING,
    EVENT_POINTER_DOWN,
    EVENT_POINTER_DRAG,
    EVENT_POINTER_UP,
    EVENT_POINTER_STOP,
    SIXTY_FPS
} from './Constants';

import State from './State';

class Pointer {
    constructor() {
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
        this.state       = POINTER_STATE_PRISTINE;
        this.intervalIdVelocity = -1;

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

    get isPristine() {
        return this.state === POINTER_STATE_PRISTINE;
    }

    get isMoving() {
        return this.state === POINTER_STATE_MOVING;
    }

    get isStopping() {
        return this.state === POINTER_STATE_STOPPING;
    }

    down() {
        this.dispatchEvent(EVENT_POINTER_DOWN);
    }

    move() {
        this.startMonitorVelocity();

        this.dispatchEvent(EVENT_POINTER_DRAG);
    }

    up() {
        this.stopMonitorVelocity();

        this.dispatchEvent(EVENT_POINTER_UP);
    }

    stop() {
        this.stopMonitorVelocity();

        this.dispatchEvent(EVENT_POINTER_STOP);
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
        const state = new State();

        state.deltaX      = this.deltaX;
        state.deltaY      = this.deltaY;
        state.multiplierX = this.multiplierX;
        state.multiplierY = this.multiplierY;

        return Object.freeze(state);
    }
}

export default Pointer;