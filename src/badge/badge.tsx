import { clsx } from "clsx";
import { Ref } from "preact";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { ButtonThemes } from "../context.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { GlobalAttributes } from "../utility/types.js";

export interface BadgeProps extends GlobalAttributes<HTMLSpanElement, "children"> {
    /** Pass `null` to explicitly disable any theme and provide one yourself via the CSS `background` property */
    variantTheme?: ButtonThemes | null;
    roundedPill?: boolean;
    className?: string;

    position?: "inline" | "top-start" | "top-end";
}

/**
 * **IMPORTANT**: Generally, badges should include extra hidden text for assistive technologies besides just whatever (e.g.) number is visually shown.
 * 
 * For example, if this badge represents the number of unread messages with a number, then `children` should probably be something like
 * 
 * `<Badge>{10 <span class="visually-hidden">unread messages</span>}</Badge>`
 */
export const Badge = memo(forwardElementRef(function Badge({ children, position, variantTheme, roundedPill, ...props }: BadgeProps, ref: Ref<HTMLSpanElement>) {
    position ??= "inline";

    return <span {...useMergedProps<HTMLSpanElement>({
        ref,
        className: clsx(
            "badge",
            roundedPill && "rounded-pill",
            variantTheme !== null && `text-bg-${variantTheme ?? "secondary"}`,
            position != "inline" && `position-absolute translate-middle top-0`,
            position == "top-end" && `start-100`,
            position == "top-start" && `start-0`,
        )
    }, props)}>{children}</span>
}));
