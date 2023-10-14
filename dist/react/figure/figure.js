import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { cloneElement } from "preact";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref.js";
export const Figure = memo(forwardElementRef(function Figure({ children, caption, align, ...props }, ref) {
    return (_jsxs("figure", { ...useMergedProps({ className: "figure", ref }, props), children: [cloneElement(children, useMergedProps({ className: "figure-img", ref: children.props.ref }, children.props)), _jsx("figcaption", { className: clsx("figure", align === "end" && "text-end", align == "center" && "text-center"), children: caption })] }));
}));
//# sourceMappingURL=figure.js.map