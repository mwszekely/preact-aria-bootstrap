import { jsx as _jsx } from "preact/jsx-runtime";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { Icon } from "./icon-base.js";
export const SvgIcon = memo(forwardElementRef(function SvgIcon(props, ref) {
    return (_jsx(Icon, { ...props, ref: ref, children: _jsx("svg", { class: "svg-icon" }) }));
}));
//# sourceMappingURL=svg-icon.js.map