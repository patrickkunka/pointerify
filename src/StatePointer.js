class StatePointer {
    constructor() {
        this.deltaX      = -1;
        this.deltaY      = -1;
        this.multiplierX = -1;
        this.multiplierY = -1;
        this.velocityX   = -1;
        this.velocityY   = -1;
        this.directionX  = -1;
        this.directionY  = -1;
        this.state       = null;

        Object.seal(this);
    }
}

export default StatePointer;