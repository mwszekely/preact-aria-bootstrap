import { jsx as _jsx } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref.js";
/**
 * **IMPORTANT**: Generally, badges should include extra hidden text for assistive technologies besides just whatever (e.g.) number is visually shown.
 *
 * For example, if this badge represents the number of unread messages with a number, then `children` should probably be something like
 *
 * `<Badge>{10 <span class="visually-hidden">unread messages</span>}</Badge>`
 */
export const Badge = memo(forwardElementRef(function Badge({ children, position, variantTheme, roundedPill, ...props }, ref) {
    position ??= "inline";
    return _jsx("span", { ...useMergedProps({
            ref,
            className: clsx("badge", roundedPill && "rounded-pill", `text-bg-${variantTheme ?? "secondary"}`, position != "inline" && `position-absolute translate-middle top-0`, position == "top-end" && `start-100`, position == "top-start" && `start-0`)
        }, props), children: children });
}));
//# sourceMappingURL=badge.js.map