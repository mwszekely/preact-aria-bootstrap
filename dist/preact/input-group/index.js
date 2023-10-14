import { jsx as _jsx } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { WithinInputGroup } from "./shared.js";
export const InputGroup = memo(forwardElementRef(function InputGroup({ wrap, size, children, ...props }, ref) {
    return (_jsx(WithinInputGroup.Provider, { value: true, children: _jsx("div", { ...useMergedProps({ class: clsx("input-group", !wrap && "flex-nowrap", size && `input-group-${size}`), ref, children }, props) }) }));
}));
export const InputGroupText = memo(forwardElementRef(function InputGroupText(props, ref) {
    return _jsx("div", { ...useMergedProps({ className: "input-group-text" }, props), ref: ref });
}));
//# sourceMappingURL=index.js.map