import IConfig           from '../../Config/Interfaces/IConfig';
import PointerifyFacade  from '../PointerifyFacade';
import IAxisStore        from './IAxisStore';
import IEventTypeStore   from './IEventTypeStore';

interface IPointerifyFactory {
    (root: HTMLElement, config: IConfig): PointerifyFacade;
    EventType: IEventTypeStore;
    Axis: IAxisStore;
}

export default IPointerifyFactory;