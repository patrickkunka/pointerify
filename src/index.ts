import pointerifyFactory      from './Pointerify/pointerifyFactory';
import Axis                   from './Shared/Constants/Axis';
import Direction              from './Shared/Constants/Direction';
import EventType              from './Shared/Constants/EventType';
import PointerifyDynamicEvent from './Shared/Events/PointerifyDynamicEvent';
import PointerifyStaticEvent  from './Shared/Events/PointerifyStaticEvent';

const create = pointerifyFactory;

export {
    Axis,
    create,
    Direction,
    EventType,
    PointerifyDynamicEvent,
    PointerifyStaticEvent,
    pointerifyFactory as default
};