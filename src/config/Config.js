import ConfigBehavior   from './ConfigBehavior';
import ConfigPhysics    from './ConfigPhysics';
import ConfigSelectors  from './ConfigSelectors';

class Config {
    constructor() {
        this.behavior  = new ConfigBehavior();
        this.physics   = new ConfigPhysics();
        this.selectors = new ConfigSelectors();

        Object.freeze(this);
    }
}

export default Config;