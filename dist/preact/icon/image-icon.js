import { jsx as _jsx } from "preact/jsx-runtime";
import { memo } from "preact-prop-helpers";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { Icon } from "./icon-base.js";
export const ImageIcon = /* @__PURE__ */ memo(forwardElementRef(function ImageIcon(props, ref) {
    return (_jsx(Icon, { ...props, ref: ref, children: _jsx("img", { className: "image-icon" }) }));
}));
//# sourceMappingURL=image-icon.js.map