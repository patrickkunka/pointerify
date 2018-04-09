import PointerifyFacade from '../PointerifyFacade';
import IConfig from '../../Config/Interfaces/IConfig';
import Axis from '../../Shared/Constants/Axis';
import EventType from '../../Shared/Constants/EventType';

interface IPointerifyFactory {
    (root: HTMLElement, config: IConfig): PointerifyFacade;
    EventType: EventType;
    Axis: Axis;
}

export default IPointerifyFactory;