import IConfig            from '../Config/Interfaces/IConfig';
import PointerifyFacade   from './PointerifyFacade';

function pointerifyFactory(root: HTMLElement, config: IConfig = {}): PointerifyFacade {
    if (!(root instanceof HTMLElement)) {
        throw new TypeError('[Pointerify] Invalid element provided');
    }

    return new PointerifyFacade(root, config);
}

export default pointerifyFactory;