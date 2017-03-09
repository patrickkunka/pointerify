import Util from '../Util';

class ConfigPhysics {
    constructor() {
        Object.defineProperties(this, Util.strictProps({
            inertia: [Boolean, true],
            friction: [Number, 0.02], // eslint-disable-line no-magic-numbers
            easing: [Function, (t) => (--t) * t * t +1]
        }));

        Object.seal(this);
    }
}

export default ConfigPhysics;