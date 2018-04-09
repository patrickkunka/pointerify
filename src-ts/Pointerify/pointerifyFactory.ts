import PointerifyFacade from './PointerifyFacade';
import IConfig from '../Config/Interfaces/IConfig';
import Axis from '../Shared/Constants/Axis';
import EventType from '../Shared/Constants/EventType';
import IPointerifyFactory from './Interfaces/IPointerifyFactory';

function pointerifyFactory(root: HTMLElement, config: IConfig = {}): PointerifyFacade {
    return new PointerifyFacade(root, config);
}

(pointerifyFactory as IPointerifyFactory).Axis = Axis;
(pointerifyFactory as IPointerifyFactory).EventType = EventType;

export default pointerifyFactory;