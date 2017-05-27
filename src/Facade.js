import _Dragster from './Dragster';

const Facade = class Dragster {
    constructor() {
        const _ = new _Dragster(...arguments);

        this.destroy = _.destroy.bind(_);
        this.refresh = _.refresh.bind(_);

        Object.seal(this);
    }
};

export default Facade;