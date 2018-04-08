import Behavior  from './Behavior';
import Physics   from './Physics';
import Selectors from './Selectors';

class Config {
    public behavior  = new Behavior();
    public physics   = new Physics();
    public selectors = new Selectors();

    constructor() {
        Object.freeze(this);
    }
}

export default Config;