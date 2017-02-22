import Dragster from './Dragster';

function dragster(root, config={}) {
    return new Dragster(root, config);
}

module.exports = dragster;