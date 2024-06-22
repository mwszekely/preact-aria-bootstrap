import { jsx as _jsx } from "preact/jsx-runtime";
import { memo } from "preact-prop-helpers";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { Icon } from "./icon-base.js";
export const SvgIcon = /* @__PURE__ */ memo(forwardElementRef(function SvgIcon(props, ref) {
    return (_jsx(Icon, { ...props, ref: ref, children: _jsx("svg", { className: "svg-icon" }) }));
}));
//# sourceMappingURL=svg-icon.js.map