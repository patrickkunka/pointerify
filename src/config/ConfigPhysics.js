class ConfigPhysics {
    constructor() {
        this.inertia  = true;
        this.friction = 0.05;
        this.easing   = (t) => (--t) * t * t +1;

        Object.seal(this);
    }
}

export default ConfigPhysics;