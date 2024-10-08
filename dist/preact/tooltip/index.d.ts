import { ComponentChildren, Ref } from "preact-prop-helpers";
import { UsePopperProps } from "../popper/index.js";
import { GlobalAttributes } from "../utility/types.js";
export interface TooltipProps extends GlobalAttributes<HTMLSpanElement, "children"> {
    maxWidth?: string;
    /**
     * If true, instead of creating a <span> element, this Tooltip will forward
     * the necessary props to the immediate child of this element (which must be exactly ONE VNode).
     *
     * By default, this is `true` if a VNode is passed, and `false` if a string (etc.) is passed.
     */
    forward?: boolean;
    /**
     * Controls which ARIA property this tooltip applies to, since it isn't well specified.
     *
     * In general, using `description` for text and `label` for widgets seems to work best.
     *
     * By default, this is based off of `forward`, being `description` if `forward` is `true`.
     */
    semanticType?: "label" | "description";
    /**
     * The content of the tooltip
     */
    tooltip: ComponentChildren;
    /**
     * The trigger that causes the tooltip to show.
     */
    children?: ComponentChildren;
    /**
     * If true, `position: absolute` is used instead of `position: fixed`.
     */
    absolutePositioning?: boolean;
    /**
     * Only used when `forward` is `false`.
     *
     * In order to activate a tooltip, it must be focusable.  If the target of
     * this focus is already something within the given children, then this should
     * be `true`. If not, then pass `false` so that `tabIndex` is properly applied.
     */
    containsTabbable?: boolean;
    hoverDelay?: number;
    /**
     * Optional. If you want the tooltip to appear anchored to an element
     * that's *not* the thing that opens the tooltip, you can do that with this.
     */
    getElement?: (e: HTMLElement) => HTMLElement;
    /**
     * By default, this is `top`. Feel free to override.
     */
    placement?: UsePopperProps<HTMLDivElement>["popperParameters"]["placement"];
    alignMode?: UsePopperProps<HTMLDivElement>["popperParameters"]["alignMode"];
    forceOpen?: boolean;
}
/**
 * General TODO for tooltip: It should be possible for the hover element and the target element to be different.
 *
 * E.G. a checkbox is TINY and can be hard to hover over, but we can't add ::after pseudo elements to increase its size because it's replaced.
 */
export declare const Tooltip: ({ forward, getElement, forceOpen, children, tooltip, placement, maxWidth, hoverDelay, containsTabbable, absolutePositioning, semanticType, alignMode, ...props }: TooltipProps, ref?: Ref<any>) => import("preact").h.JSX.Element;
//# sourceMappingURL=index.d.ts.map