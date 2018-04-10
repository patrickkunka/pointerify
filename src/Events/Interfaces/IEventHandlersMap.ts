import IEventHandler from './IEventHandler';

interface IEventHandlersMap {
    [handlerName: string]: IEventHandler;
}

export default IEventHandlersMap;