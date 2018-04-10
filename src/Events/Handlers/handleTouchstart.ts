import Pointerify    from '../../Pointerify/Pointerify';
import PointerType   from '../../Shared/Constants/PointerType';
import closestParent from '../../Shared/Util/closestParent';

const handleTouchstart = (pointerify: Pointerify, e: TouchEvent): void => {
    const target = e.target as HTMLElement;
    const {handle: handleSelector} = pointerify.config.selectors;

    let touchIds = null;

    for (let i = 0, touch; (touch = e.changedTouches[i]); i++) {
        const newId = touch.identifier;

        let didCancel = false;

        for (const activeId in pointerify.touches) {
            // If any active touches in this instance are stopping (i.e.
            // already released but moving via inertia), cancel them.

            let activePointer = null;

            if ((activePointer = pointerify.touches[activeId]).isStopping) {
                pointerify.cancelPointer(activePointer);

                didCancel = true;
            }
        }

        if (handleSelector && !closestParent(target, handleSelector, true)) break;

        pointerify.setRootGeometry();

        if (pointerify.totalTouches < 2 && !pointerify.touches[newId]) {
            pointerify.touches[newId] = pointerify.createPointer(touch, PointerType.TOUCH, didCancel);
        }
    }

    if (!pointerify.config.behavior.pinch) return;

    touchIds = Object.keys(pointerify.touches);

    if (touchIds.length > 1 && !pointerify.virtual) {
        // Multiple touches exist, create a "virtual" pointer at the
        // midpoint

        e.preventDefault();

        pointerify.virtual = pointerify.createVirtualPointer(
            pointerify.touches[touchIds[0]],
            pointerify.touches[touchIds[1]]
        );
    }
};

export default handleTouchstart;