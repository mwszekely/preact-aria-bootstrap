import { forwardRef, memo } from "preact/compat";
export function forwardElementRef(t) {
    return forwardRef(t);
}
export function memoForwardRef(fn) {
    return memo(forwardRef(fn));
}
//# sourceMappingURL=forward-element-ref.js.map