import * as Easing from './Constants/Easing';
import IPhysics    from './Interfaces/IPhysics';

class Physics implements IPhysics {
    public inertia:  boolean               = true;
    public friction: number                = 0.02;
    public easing:   (t: number) => number = Easing.EASE_OUT_CUBIC;

    constructor() {
        Object.seal(this);
    }
}

export default Physics;