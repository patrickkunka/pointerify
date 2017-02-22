class State {
    constructor() {
        this.deltaX      = -1;
        this.deltaY      = -1;
        this.multiplierX = -1;
        this.multiplierY = -1;

        Object.seal(this);
    }
}

export default State;