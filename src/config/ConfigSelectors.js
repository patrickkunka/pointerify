import Util from '../Util';

class ConfigSelectors {
    constructor() {
        Object.defineProperties(this, Util.strictProps({
            handle: [String, '']
        }));

        Object.seal(this);
    }
}

export default ConfigSelectors;