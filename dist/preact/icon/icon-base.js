import { cloneElement, memo, useMergedProps } from "preact-prop-helpers";
import { forwardElementRef } from "../utility/forward-element-ref.js";
export const Icon = memo(forwardElementRef(function Icon({ label, role, "aria-label": ariaLabel, children, ref: unused, ...props }, ref) {
    console.assert(ref == unused || unused == null);
    const iconProps = useMergedProps(props, {
        class: "icon",
        [children?.type === "img" ? "alt" : "aria-label"]: (ariaLabel || (label ?? undefined)),
        role: (role || (label ? "img" : "presentation")),
        ref,
    });
    const iconElement = cloneElement(children, useMergedProps(("props" in (children || {}) ? children.props : {}), iconProps));
    return iconElement;
}));
//# sourceMappingURL=icon-base.js.map