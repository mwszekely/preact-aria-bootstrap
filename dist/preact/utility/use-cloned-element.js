import { jsx as _jsx } from "preact/jsx-runtime";
import { createElement, useMergedProps } from "preact-prop-helpers";
function childrenIsVnode(children) {
    if (children && children.type && children.props)
        return true;
    return false;
}
export function useClonedElement(children, props, ref, Tag = 'span') {
    const T = Tag;
    const c = (childrenIsVnode(children) ? children : _jsx(T, { children: children }));
    return createElement(c.type, useMergedProps(c.props, { ref: c.ref }, props, { ref }));
}
//# sourceMappingURL=use-cloned-element.js.map