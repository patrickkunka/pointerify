import Axis      from '../Shared/Constants/Axis';
import IBehavior from './Interfaces/IBehavior';

class Behavior implements IBehavior {
    public pressDuration: number = 0;
    public allowAxis: Axis = Axis.BOTH;
    public clampAxis: Axis = Axis.NONE;
    public pinch: boolean = true;

    constructor() {
        Object.seal(this);
    }

    public get allowX(): boolean {
        return this.allowAxis === Axis.X || this.allowAxis === Axis.BOTH;
    }

    public get allowY(): boolean {
        return this.allowAxis === Axis.Y || this.allowAxis === Axis.BOTH;
    }

    public get clampX(): boolean {
        return this.clampAxis === Axis.X || this.clampAxis === Axis.BOTH;
    }

    public get clampY(): boolean {
        return this.clampAxis === Axis.Y || this.clampAxis === Axis.BOTH;
    }
}

export default Behavior;