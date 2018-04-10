import Behavior  from './Behavior';
import IConfig   from './Interfaces/IConfig';
import Physics   from './Physics';
import Selectors from './Selectors';

class Config implements IConfig {
    public behavior  = new Behavior();
    public physics   = new Physics();
    public selectors = new Selectors();

    constructor() {
        Object.freeze(this);
    }
}

export default Config;