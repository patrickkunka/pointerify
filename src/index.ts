import pointerifyFactory from './Pointerify/pointerifyFactory';
import Axis              from './Shared/Constants/Axis';
import Direction         from './Shared/Constants/Direction';
import EventType         from './Shared/Constants/EventType';

const create = pointerifyFactory;

export {
    Axis,
    create,
    Direction,
    EventType,
    pointerifyFactory as default
};