import { jsx as _jsx } from "preact/jsx-runtime";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { Icon } from "./icon-base.js";
/**
 * Generic way to represent any icon that's based on a font using some specific class to choose which icon to display.
 *
 *
 */
export const FontIcon = memo(forwardElementRef(function FontIcon(props, ref) {
    return (_jsx(Icon, { ...props, ref: ref, children: _jsx("i", { class: "font-icon" }) }));
}));
//# sourceMappingURL=font-icon.js.map