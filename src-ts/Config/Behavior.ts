import Axis from '../Shared/Constants/Axis';

class Behavior {
    public pressDuration: number = 0;
    public allowAxis: Axis = Axis.BOTH;
    public clampAxis: Axis = Axis.NONE;
    public pinch: boolean = true;

    constructor() {
        Object.seal(this);
    }

    get allowX() {
        return this.allowAxis === Axis.X || this.allowAxis === Axis.BOTH;
    }

    get allowY() {
        return this.allowAxis === Axis.Y || this.allowAxis === Axis.BOTH;
    }

    get clampX() {
        return this.clampAxis === Axis.X || this.clampAxis === Axis.BOTH;
    }

    get clampY() {
        return this.clampAxis === Axis.Y || this.clampAxis === Axis.BOTH;
    }
}

export default Behavior;