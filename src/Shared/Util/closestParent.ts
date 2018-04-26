/**
 * Returns the closest parent of a given element matching the
 * provided selector, optionally including the element itself.
 */

function isTarget(
    target: Element,
    selectorOrParent: string|Element
): boolean {
    if (typeof selectorOrParent === 'string') {
        return target.matches(selectorOrParent);
    }

    return target === selectorOrParent;
}

function closestParent(
    el: Element,
    selectorOrParent: string|Element,
    includeSelf: boolean = false
): Element {
    let parent = el.parentNode as HTMLElement;

    if (includeSelf && isTarget(el, selectorOrParent)) {
        return el;
    }

    while (parent && parent !== document.body) {
        if (parent.matches && isTarget(parent, selectorOrParent)) {
            return parent;
        } else if (parent.parentNode) {
            parent = parent.parentNode as HTMLElement;
        } else {
            return null;
        }
    }

    return null;
}

export default closestParent;