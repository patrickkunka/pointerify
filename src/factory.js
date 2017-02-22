import Dragster     from './Dragster';
import constants    from './constants';

function dragster(root, config={}) {
    return new Dragster(root, config);
}

dragster.constants = constants;

module.exports = dragster;