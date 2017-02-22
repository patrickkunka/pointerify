class ConfigPhysics {
    constructor() {
        this.inertia  = true;
        this.friction = 0.05;
        this.easing   = null;

        Object.seal(this);
    }
}

export default ConfigPhysics;