class Util {
    /**
     * Merges properties from a source object into a target object,
     * optionally using a recursive deep extend.
     *
     * @param   {object}    target
     * @param   {object}    source
     * @param   {boolean}   [deep=false]
     * @param   {function}  [errorHandler=null]
     * @return  {object}
     */

    static extend(target, source, deep=false, errorHandler=null) {
        let sourceKeys = [];

        if (!target || typeof target !== 'object') {
            throw new TypeError('[Util#extend] Target must be a valid object');
        }

        if (Array.isArray(source)) {
            for (let i = 0; i < source.length; i++) {
                sourceKeys.push(i);
            }
        } else if (source) {
            sourceKeys = Object.keys(source);
        }

        for (let i = 0; i < sourceKeys.length; i++) {
            let key = sourceKeys[i];
            let descriptor = Object.getOwnPropertyDescriptor(source, key);

            // Skip virtual properties

            if (typeof descriptor.get === 'function') continue;

            if (!deep || typeof source[key] !== 'object') {
                // All non-object primitives, or all properties if
                // shallow extend

                try {
                    target[key] = source[key];
                } catch (err) {
                    if (typeof errorHandler !== 'function') throw err;

                    errorHandler(err, target);
                }
            } else if (Array.isArray(source[key])) {
                // Arrays

                if (!target[key]) {
                    target[key] = [];
                }

                Util.extend(target[key], source[key], deep, errorHandler);
            } else {
                // Objects

                if (!target[key]) {
                    target[key] = {};
                }

                Util.extend(target[key], source[key], deep, errorHandler);
            }
        }

        return target;
    }

    /**
     * Returns the closest parent of a given element matching the
     * provided selector, optionally including the element itself.
     *
     * @param   {HTMLElement}       el
     * @param   {string}            selector
     * @param   {boolean}           [includeSelf]
     * @return  {HTMLElement|null}
     */

    static closestParent(el, selector, includeSelf) {
        let parent = el.parentNode;

        if (includeSelf && el.matches(selector)) {
            return el;
        }

        while (parent && parent !== document.body) {
            if (parent.matches && parent.matches(selector)) {
                return parent;
            } else if (parent.parentNode) {
                parent = parent.parentNode;
            } else {
                return null;
            }
        }

        return null;
    }
}

export default Util;