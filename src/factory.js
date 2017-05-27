import Facade       from './Facade';
import Constants    from './Constants';

function dragster(root, config={}) {
    return new Facade(root, config);
}

dragster.Constants = Constants;

// deprecated

dragster.constants = Constants;

module.exports = dragster;