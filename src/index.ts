import PointerifyFacade  from './Pointerify/PointerifyFacade';
import pointerifyFactory from './Pointerify/pointerifyFactory';
import Axis              from './Shared/Constants/Axis';
import Direction         from './Shared/Constants/Direction';
import EventType         from './Shared/Constants/EventType';
import * as Events       from './Shared/Events/';

const create = pointerifyFactory;

export {
    Axis,
    create,
    Direction,
    EventType,
    Events,
    PointerifyFacade as Pointerify,
    pointerifyFactory as default
};