export const POINTER_TYPE_MOUSE   = Symbol('POINTER_TYPE_MOUSE');
export const POINTER_TYPE_HOVER   = Symbol('POINTER_TYPE_HOVER');
export const POINTER_TYPE_TOUCH   = Symbol('POINTER_TYPE_TOUCH');
export const POINTER_TYPE_VIRTUAL = Symbol('POINTER_TYPE_VIRTUAL');

export const POINTER_STATUS_NEW        = Symbol('POINTER_STATUS_NEW');
export const POINTER_STATUS_EXTENDING  = Symbol('POINTER_STATUS_EXTENDING');
export const POINTER_STATUS_MOVING     = Symbol('POINTER_STATUS_MOVING');
export const POINTER_STATUS_INSPECTING = Symbol('POINTER_STATUS_INSPECTING');
export const POINTER_STATUS_STOPPING   = Symbol('POINTER_STATUS_STOPPING');
export const POINTER_STATUS_PINCHING   = Symbol('POINTER_STATUS_PINCHING');

export const EVENT_POINTER_DOWN          = 'dragsterpointerdown';
export const EVENT_POINTER_DRAG          = 'dragsterpointerdrag';
export const EVENT_POINTER_UP            = 'dragsterpointerup';
export const EVENT_POINTER_STOP          = 'dragsterpointerstop';
export const EVENT_POINTER_INSPECT       = 'dragsterpointerinspect';
export const EVENT_POINTER_TAP           = 'dragsterpointertap';
export const EVENT_VIRTUAL_POINTER_DOWN  = 'dragstervirtualpointerdown';
export const EVENT_VIRTUAL_POINTER_DRAG  = 'dragstervirtualpointerdrag';
export const EVENT_VIRTUAL_POINTER_PINCH = 'dragsterpointerpinch';
export const EVENT_VIRTUAL_POINTER_STOP  = 'dragstervirtualpointerstop';

export const DIRECTION_STATIC   = Symbol('DIRECTION_STATIC');
export const DIRECTION_LEFT     = Symbol('DIRECTION_LEFT');
export const DIRECTION_RIGHT    = Symbol('DIRECTION_RIGHT');
export const DIRECTION_UP       = Symbol('DIRECTION_UP');
export const DIRECTION_DOWN     = Symbol('DIRECTION_DOWN');
export const DIRECTION_CONVERGE = Symbol('DIRECTION_CONVERGE');
export const DIRECTION_DIVERGE  = Symbol('DIRECTION_DIVERGE');

export const AXIS_X    = 'X';
export const AXIS_Y    = 'Y';
export const AXIS_BOTH = 'BOTH';
export const AXIS_NONE = 'NONE';

export default {
    POINTER_TYPE_MOUSE,
    POINTER_TYPE_HOVER,
    POINTER_TYPE_TOUCH,
    POINTER_TYPE_VIRTUAL,

    POINTER_STATUS_NEW,
    POINTER_STATUS_EXTENDING,
    POINTER_STATUS_MOVING,
    POINTER_STATUS_PINCHING,
    POINTER_STATUS_INSPECTING,
    POINTER_STATUS_STOPPING,

    DIRECTION_STATIC,
    DIRECTION_LEFT,
    DIRECTION_RIGHT,
    DIRECTION_UP,
    DIRECTION_DOWN,
    DIRECTION_CONVERGE,
    DIRECTION_DIVERGE,

    EVENT_POINTER_DOWN,
    EVENT_POINTER_DRAG,
    EVENT_POINTER_UP,
    EVENT_POINTER_STOP,
    EVENT_POINTER_INSPECT,
    EVENT_POINTER_TAP,
    EVENT_VIRTUAL_POINTER_DOWN,
    EVENT_VIRTUAL_POINTER_DRAG,
    EVENT_VIRTUAL_POINTER_PINCH,
    EVENT_VIRTUAL_POINTER_STOP
};