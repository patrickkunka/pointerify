interface IMouseOrTouchEvent {
    target: EventTarget;
    clientX?: number;
    clientY?: number;
    identifier?: number;
    preventDefault(): void;
}

export default IMouseOrTouchEvent;