import {
    POINTER_TYPE_MOUSE,
    POINTER_TYPE_TOUCH,
    POINTER_TYPE_VIRTUAL
} from './Constants';

class StatePointer {
    constructor() {
        this.id                      = -1;
        this.deltaX                  = -1;
        this.deltaY                  = -1;
        this.deltaDistance           = -1;
        this.deltaMultiplierX        = -1;
        this.deltaMultiplierY        = -1;
        this.deltaMultiplierDistance = -1;
        this.multiplierX             = -1;
        this.multiplierY             = -1;
        this.velocityX               = -1;
        this.velocityY               = -1;
        this.velocityPinch           = -1;
        this.directionX              = null;
        this.directionY              = null;
        this.directionPinch          = null;
        this.status                  = null;
        this.type                    = null;

        Object.seal(this);
    }

    get isMousePointer() {
        return this.type === POINTER_TYPE_MOUSE;
    }

    get isTouchPointer() {
        return this.type === POINTER_TYPE_TOUCH;
    }

    get isVirtualPointer() {
        return this.type === POINTER_TYPE_VIRTUAL;
    }
}

export default StatePointer;