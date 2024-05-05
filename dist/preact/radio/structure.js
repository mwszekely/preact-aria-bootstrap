import { jsx as _jsx } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { useMergedProps } from "preact-prop-helpers/preact";
import { memoForwardRef } from "../utility/forward-element-ref.js";
export const StructureRadioWrapper = memoForwardRef(function StructureRadioWrapper({ labelPosition, pending, inline, children, ...props }, ref) {
    return (_jsx("span", { ...useMergedProps({ ...props, ref }, {
            className: clsx("form-check", pending && "pending", inline && "form-check-inline", labelPosition == "before" && "form-check-reverse")
        }), children: children }));
});
//# sourceMappingURL=structure.js.map