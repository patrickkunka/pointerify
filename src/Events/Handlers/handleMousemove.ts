import Pointerify    from '../../Pointerify/Pointerify';
import EventType     from '../../Shared/Constants/EventType';
import closestParent from '../../Shared/Util/closestParent';

function handleMousemove(pointerify: Pointerify, e: MouseEvent): void {
    const {mouse} = pointerify;
    const {target}: any = e;
    const isWithinRoot = Boolean(closestParent(target, pointerify.refs.root, true));

    if (mouse && !mouse.isStopping) {
        pointerify.movePointer(mouse, e, e);
    } else if (!mouse && isWithinRoot) {
        pointerify.emitStatic(e, EventType.POINTER_INSPECT);
    }
}

export default handleMousemove;