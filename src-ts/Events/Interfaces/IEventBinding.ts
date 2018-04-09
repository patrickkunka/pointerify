import IEventHandler from './IEventHandler';

interface IEventBinding {
    type: string;
    target?: HTMLElement|Window|Document;
    debounce?: number;
    handler?: IEventHandler;
    passive?: boolean;
}

export default IEventBinding;