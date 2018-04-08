import * as Easing from './Constants/Easing';

class Physics {
    public inertia: boolean = true;
    public friction: number = 0.02;
    public easing: Easing.EASE_OUT_CUBIC;

    constructor() {
        Object.seal(this);
    }
}

export default Physics;