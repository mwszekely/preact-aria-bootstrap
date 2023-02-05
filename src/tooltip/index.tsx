import clsx from "clsx";
import { cloneElement, ComponentChildren, Ref, VNode } from "preact";
import { defaultRenderPortal, Tooltip as AriaTooltip, TooltipStatus } from "preact-aria-widgets";
import { useMergedProps, useState } from "preact-prop-helpers";
import { ZoomFade } from "preact-transition";
import { usePopper, UsePopperProps } from "../popper";
import { forwardElementRef } from "../utility/forward-element-ref";
import { GlobalAttributes } from "../utility/types";
import { usePortalId } from "../utility/use-portal-id";

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

export const Tooltip = forwardElementRef(function Tooltip({ forward, getElement, children, tooltip, maxWidth, containsTabbable, absolutePositioning, semanticType, alignMode, ...props }: TooltipProps, ref?: Ref<any>) {

    if (forward == null && typeof children == "object" && (children as VNode).props) {
        forward = true;
    }

    maxWidth ??= "33vw";

    const [status, setStatus] = useState<TooltipStatus>(null);

    return (
        <AriaTooltip<HTMLSpanElement, HTMLDivElement> onStatus={setStatus} tooltipSemanticType={semanticType || (forward ? "label" : "description")} render={tooltipInfo => {
            //const mouseTrackingPaused = (status == "focus")
            const portalId = usePortalId("tooltip");
            const isFocusOverride = (status == "focus");
            const { propsArrow, propsPopup, propsSource, propsData } = usePopper<HTMLSpanElement, HTMLDivElement, HTMLDivElement>({
                popperParameters: {
                    open: status != null,
                    getElement,
                    absolutePositioning,
                    placement: isFocusOverride? "top" : (alignMode == "element" ? "top" : "top-start"),
                    alignMode: isFocusOverride? "element" : alignMode ?? (`mouse`)
                }
            })

            // IMPORTANT:
            // The tooltip must remain non-hidden to assistive technologies even when closed.
            // Don't set hidden or inert or anything like that when is's closed!
            const tooltipContent =
                <div {...useMergedProps(propsPopup, {})}>
                    <ZoomFade exitVisibility="visible" show={tooltip == null ? false : (status != null)} zoomMin={0.8} zoomOriginBlock={1} /*zoomOriginInline={(alignMode == "element" ? 0.5 : 0)}*/>
                        <div {...useMergedProps<any>(propsData, { style: maxWidth? { "--bs-tooltip-max-width": maxWidth } : {}, className: clsx("bs-tooltip-auto tooltip", absolutePositioning && "portal-tooltip-child") }, tooltipInfo.propsPopup)}>
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
                        {(cloneElement(vnode, useMergedProps(propsData, vnode.props, tooltipInfo.propsTrigger, propsSource, props, { ref }, { ref: vnode.ref })))}
                        {portalJsx}
                    </>
                )
            }

            return (<>
                <span {...useMergedProps<any>({ ref }, propsData, tooltipInfo.propsTrigger, propsSource, props, { tabIndex: !containsTabbable ? 0 : undefined })}>
                    {children}
                    {portalJsx}
                </span>
            </>
            )
        }} />
    )
})
