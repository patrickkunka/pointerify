import _Pointerify from './Pointerify';

const Facade = class Pointerify {
    constructor() {
        const _ = new _Pointerify(...arguments);

        this.destroy = _.destroy.bind(_);
        this.refresh = _.refresh.bind(_);

        Object.seal(this);
    }
};

export default Facade;