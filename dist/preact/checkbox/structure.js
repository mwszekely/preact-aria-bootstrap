import { jsx as _jsx } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { useMergedProps } from "preact-prop-helpers";
import { memoForwardRef } from "../utility/forward-element-ref.js";
export const StructureCheckboxInput = memoForwardRef(function StructureCheckboxInput({ ...props }, ref) {
    return (_jsx("input", { ...useMergedProps({ class: clsx("form-check-input") }, { ...props, ref }) }));
});
export const StructureCheckboxLabel = memoForwardRef(function StructureCheckboxLabel({ children, ...props }, ref) {
    return (_jsx("label", { ...useMergedProps({ class: "form-check-label" }, { ...props, ref }), children: children }));
});
//# sourceMappingURL=structure.js.map