import { cloneElement, ComponentChildren, h, Ref, VNode } from "preact"
import { usePopper, UsePopperProps } from "../popper"

import { defaultRenderPortal, Tooltip as AriaTooltip } from "preact-aria-widgets"
import { useMergedProps } from "preact-prop-helpers";
import { forwardElementRef, GlobalAttributes, usePortalId } from "../utility";
import clsx from "clsx";
import { ZoomFade } from "preact-transition";

export interface TooltipProps extends GlobalAttributes<HTMLSpanElement, "children"> {

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
    semanticType?: "label" | "description"

    /**
     * The content of the tooltip
     */
    tooltip: ComponentChildren;

    /**
     * The trigger that causes the tooltip to show.
     */
    children: ComponentChildren;

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

    /**
     * Optional. If you want the tooltip to appear anchored to an element
     * that's *not* the thing that opens the tooltip, you can do that with this.
     */
    getElement?: (e: HTMLElement) => HTMLElement;

    alignMode?: UsePopperProps["popperParameters"]["alignMode"];

    //align?: "start" | "center";
}

export const Tooltip = forwardElementRef(function Tooltip({ forward, getElement, children, tooltip, containsTabbable, absolutePositioning, semanticType, alignMode, ...props }: TooltipProps, ref?: Ref<any>) {

    if (forward == null && typeof children == "object" && (children as VNode).props) {
        forward = true;
    }

    return (
        <AriaTooltip<HTMLSpanElement, HTMLDivElement> tooltipSemanticType={semanticType || (forward ? "label" : "description")} render={info => {

            const portalId = usePortalId("tooltip");
            const { propsArrow, propsPopup, propsSource, propsData } = usePopper<HTMLSpanElement, HTMLDivElement, HTMLDivElement>({
                popperParameters: {
                    open: info.tooltipReturn.isOpen,
                    getElement,
                    absolutePositioning,
                    placement: (alignMode == "element"? "top" : "top-start"),
                    alignMode: alignMode ?? `mouse`
                }
            })

            // IMPORTANT:
            // The tooltip must remain non-hidden to assistive technologies even when closed.
            // Don't set hidden or inert or anything like that when is's closed!
            const tooltipContent =
                <div {...propsPopup}>
                    <ZoomFade exitVisibility="visible" show={info.tooltipReturn.isOpen || false} zoomMin={0.8} zoomOriginBlock={1} zoomOriginInline={(alignMode == "element"? 0.5 : 0)}>
                        <div {...useMergedProps<any>(propsData, { className: clsx("bs-tooltip-auto tooltip", absolutePositioning && "portal-tooltip-child") }, info.propsPopup)}>
                            <div {...useMergedProps(propsArrow, { className: "tooltip-arrow" })} />
                            <div class="tooltip-inner">
                                {tooltip}
                            </div>
                        </div>
                    </ZoomFade>
                </div>
            const portalJsx = absolutePositioning ? tooltipContent : defaultRenderPortal({ children: tooltipContent, portalId });
            if (forward) {
                const vnode = (children as VNode);
                console.assert(!!vnode.type);
                return (
                    <>
                        {(cloneElement(vnode, useMergedProps(propsData, vnode.props, info.propsTrigger, propsSource, props, { ref }, { ref: vnode.ref })))}
                        {portalJsx}
                    </>
                )
            }

            return (<>
                <span {...useMergedProps<any>({ ref }, propsData, info.propsTrigger, propsSource, props, { tabIndex: !containsTabbable ? 0 : undefined })}>
                    {children}
                    {portalJsx}
                </span>
            </>
            )
        }} />
    )
})
