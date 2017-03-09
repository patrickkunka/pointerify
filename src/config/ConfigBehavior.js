import Util from '../Util';

import {
    AXIS_BOTH,
    AXIS_NONE,
    AXIS_Y,
    AXIS_X
} from '../constants';

class ConfigBehavior {
    constructor() {
        Object.defineProperties(this, Util.strictProps({
            pressDuration: [Number, 0],
            allowAxis: ['enum', [AXIS_BOTH, AXIS_X, AXIS_Y]],
            clampAxis: ['enum', [AXIS_NONE, AXIS_BOTH, AXIS_X, AXIS_Y]]
        }));

        Object.seal(this);
    }

    get allowX() {
        return this.allowAxis === AXIS_X || this.allowAxis === AXIS_BOTH;
    }

    get allowY() {
        return this.allowAxis === AXIS_Y || this.allowAxis === AXIS_BOTH;
    }

    get clampX() {
        return this.clampAxis === AXIS_X || this.clampAxis === AXIS_BOTH;
    }

    get clampY() {
        return this.clampAxis === AXIS_Y || this.clampAxis === AXIS_BOTH;
    }
}

export default ConfigBehavior;