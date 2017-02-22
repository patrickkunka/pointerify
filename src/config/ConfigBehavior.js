import {AXIS_BOTH} from '../Constants';

class ConfigBehavior {
    constructor() {
        this.pressDuration  = 0;
        this.allowAxis      = AXIS_BOTH;

        Object.seal(this);
    }
}

export default ConfigBehavior;