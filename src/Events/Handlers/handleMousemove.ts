import Pointerify from '../../Pointerify/Pointerify';
import EventType  from '../../Shared/Constants/EventType';

const handleMousemove = (pointerify: Pointerify, e: MouseEvent): void => {
    const {mouse} = pointerify;

    if (e.target !== window && mouse && !mouse.isStopping) {
        pointerify.movePointer(mouse, e, e);
    } else if (e.target === window && !mouse) {
        pointerify.emitStatic(e, EventType.POINTER_INSPECT);
    }
};

export default handleMousemove;