interface IEventBinding {
    type: string;
    target?: HTMLElement|Window|Document;
    debounce?: number;
    handler?: EventListener;
    passive?: boolean;
}

export default IEventBinding;