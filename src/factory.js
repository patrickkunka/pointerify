import Dragster     from './Dragster';
import Constants    from './Constants';

function dragster(root, config={}) {
    return new Dragster(root, config);
}

dragster.CONSTANTS = Constants;

// deprecated

dragster.constants = Constants;

module.exports = dragster;