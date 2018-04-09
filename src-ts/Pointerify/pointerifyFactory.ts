import IConfig            from '../Config/Interfaces/IConfig';
import {AxisStore}        from '../Shared/Constants/Axis';
import {EventTypeStore}   from '../Shared/Constants/EventType';
import IPointerifyFactory from './Interfaces/IPointerifyFactory';
import PointerifyFacade   from './PointerifyFacade';

function pointerifyFactory(root: HTMLElement, config: IConfig = {}): PointerifyFacade {
    return new PointerifyFacade(root, config);
}

(pointerifyFactory as IPointerifyFactory).Axis = AxisStore;
(pointerifyFactory as IPointerifyFactory).EventType = EventTypeStore;

export default pointerifyFactory as IPointerifyFactory;