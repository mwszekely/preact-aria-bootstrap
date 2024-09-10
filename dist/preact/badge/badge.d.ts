import { Ref } from "preact-prop-helpers";
import { ButtonThemes } from "../context.js";
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
 * `<Badge>{10 <span className="visually-hidden">unread messages</span>}</Badge>`
 */
export declare const Badge: ({ children, position, variantTheme, roundedPill, ...props }: BadgeProps, ref: Ref<HTMLSpanElement>) => import("preact").h.JSX.Element;
//# sourceMappingURL=badge.d.ts.map