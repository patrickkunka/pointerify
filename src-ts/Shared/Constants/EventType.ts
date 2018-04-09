enum EventType {
    POINTER_DOWN            = 'pointerDown',
    POINTER_DRAG            = 'pointerDrag',
    POINTER_UP              = 'pointerUp',
    POINTER_STOP            = 'pointerStop',
    POINTER_INSPECT         = 'pointerInspect',
    POINTER_TAP             = 'pointerTap',
    POINTER_DOUBLE_TAP      = 'pointerDoubleTap',
    VIRTUAL_POINTER_CREATE  = 'virtualPointerCreate',
    VIRTUAL_POINTER_MOVE    = 'virtualPointerMove',
    VIRTUAL_POINTER_PINCH   = 'virtualPointerPinch',
    VIRTUAL_POINTER_DESTROY = 'virtualPointerDestroy'
}

const EventTypeStore = {
    POINTER_DOWN: EventType.POINTER_DOWN,
    POINTER_DRAG: EventType.POINTER_DRAG,
    POINTER_UP: EventType.POINTER_UP,
    POINTER_STOP: EventType.POINTER_STOP,
    POINTER_INSPECT: EventType.POINTER_INSPECT,
    POINTER_TAP: EventType.POINTER_TAP,
    POINTER_DOUBLE_TAP: EventType.POINTER_DOUBLE_TAP,
    VIRTUAL_POINTER_CREATE: EventType.VIRTUAL_POINTER_CREATE,
    VIRTUAL_POINTER_MOVE: EventType.VIRTUAL_POINTER_MOVE,
    VIRTUAL_POINTER_PINCH: EventType.VIRTUAL_POINTER_PINCH,
    VIRTUAL_POINTER_DESTROY: EventType.VIRTUAL_POINTER_DESTROY
};

export {
    EventTypeStore,
    EventType as default
};