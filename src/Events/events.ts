import IEventBinding from './Interfaces/IEventBinding';

const events: Array<IEventBinding|string> = [
    'mousedown',
    'touchstart',
    'click',
    'mousemove',
    {
        target: window,
        type: 'mousemove'
    },
    {
        target: window,
        type: 'touchmove'
    },
    {
        target: window,
        type: 'mouseup'
    },
    {
        target: window,
        type: 'touchend'
    },
    {
        target: window,
        type: 'resize',
        debounce: 100,
        passive: true
    }
];

export default events;