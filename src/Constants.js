export const POINTER_TYPE_MOUSE = Symbol('POINTER_TYPE_MOUSE');
export const POINTER_TYPE_HOVER = Symbol('POINTER_TYPE_HOVER');
export const POINTER_TYPE_TOUCH = Symbol('POINTER_TYPE_TOUCH');

export const POINTER_STATUS_NEW        = Symbol('POINTER_STATUS_NEW');
export const POINTER_STATUS_EXTENDING  = Symbol('POINTER_STATUS_EXTENDING');
export const POINTER_STATUS_MOVING     = Symbol('POINTER_STATUS_MOVING');
export const POINTER_STATUS_INSPECTING = Symbol('POINTER_STATUS_INSPECTING');
export const POINTER_STATUS_STOPPING   = Symbol('POINTER_STATUS_STOPPING');

export const EVENT_POINTER_DOWN    = 'pointerDown';
export const EVENT_POINTER_DRAG    = 'pointerDrag';
export const EVENT_POINTER_UP      = 'pointerUp';
export const EVENT_POINTER_STOP    = 'pointerStop';
export const EVENT_POINTER_INSPECT = 'pointerInspect';
export const EVENT_POINTER_SEEK    = 'pointerSeek';

export const DIRECTION_LEFT  = Symbol('DIRECTION_LEFT');
export const DIRECTION_RIGHT = Symbol('DIRECTION_RIGHT');
export const DIRECTION_UP    = Symbol('DIRECTION_UP');
export const DIRECTION_DOWN  = Symbol('DIRECTION_DOWN');

export const AXIS_X    = 'X';
export const AXIS_Y    = 'Y';
export const AXIS_BOTH = 'BOTH';

export default {
    POINTER_TYPE_MOUSE,
    POINTER_TYPE_HOVER,
    POINTER_TYPE_TOUCH,

    POINTER_STATUS_NEW,
    POINTER_STATUS_EXTENDING,
    POINTER_STATUS_MOVING,
    POINTER_STATUS_INSPECTING,
    POINTER_STATUS_STOPPING,

    DIRECTION_LEFT,
    DIRECTION_RIGHT,
    DIRECTION_UP,
    DIRECTION_DOWN
};