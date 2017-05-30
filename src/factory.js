import Facade       from './Facade';
import Constants    from './Constants';

function pointerify(root, config={}) {
    return new Facade(root, config);
}

pointerify.Constants = Constants;

// deprecated

pointerify.constants = Constants;

module.exports = pointerify;