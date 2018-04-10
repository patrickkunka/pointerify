import debounce      from '../Shared/Util/debounce';
import pascalCase    from '../Shared/Util/pascalCase';
import EventBinding  from './EventBinding';
import IEventBinding from './Interfaces/IEventBinding';

function bindEvent(context: any, defaultTarget: HTMLElement, eventBindingRaw: (string|IEventBinding)): EventBinding {
    const eventBinding = new EventBinding(eventBindingRaw);

    if (!eventBinding.target) eventBinding.target = defaultTarget;

    const handlerName = `handle${pascalCase(eventBinding.type)}`;
    const handler = context[handlerName];

    if (typeof handler !== 'function') {
        throw new TypeError(
            `[Pointerify] No "${handlerName}" handler method found for event type "${eventBinding.type}"`
        );
    }

    const boundHandler = handler.bind(context);

    eventBinding.handler = (eventBinding.debounce <= 0) ?
        boundHandler : debounce(boundHandler, eventBinding.debounce, true);

    eventBinding.target.addEventListener(eventBinding.type, eventBinding.handler, {
        passive: eventBinding.passive
    });

    return eventBinding;
}

export default bindEvent;