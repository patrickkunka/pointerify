class StateInspect {
    constructor() {
        this.multiplierX = -1;
        this.multiplierY = -1;

        Object.seal(this);
    }
}

export default StateInspect;