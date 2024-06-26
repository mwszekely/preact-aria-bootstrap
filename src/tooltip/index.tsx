import { clsx } from "clsx";
import { Tooltip as AriaTooltip, TooltipStatus, useDefaultRenderPortal } from "preact-aria-widgets";
import { ComponentChildren, Ref, VNode, cloneElement, useCallback, useEffect, useMergedProps, useState } from "preact-prop-helpers";
import { SlideFade } from "preact-transition";
import { UsePopperProps, usePopper } from "../popper/index.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { GlobalAttributes } from "../utility/types.js";
import { usePortalId } from "../utility/use-portal-id.js";

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

    //align?: "start" | "center";
}

// TODO: This should be on `globalThis` in case this library is imported multiple times.
const otherTooltipCloses = new Set<() => void>();

/**
 * General TODO for tooltip: It should be possible for the hover element and the target element to be different.
 * 
 * E.G. a checkbox is TINY and can be hard to hover over, but we can't add ::after pseudo elements to increase its size because it's replaced.
 */
export const Tooltip = forwardElementRef(function Tooltip({ forward, getElement, forceOpen, children, tooltip, placement, maxWidth, hoverDelay, containsTabbable, absolutePositioning, semanticType, alignMode, ...props }: TooltipProps, ref?: Ref<any>) {

    if (forward == null && typeof children == "object" && (children as VNode).props) {
        forward = true;
    }

    maxWidth ??= "33vw";

    let [status, setStatus] = useState<TooltipStatus>(null);

    useEffect(() => {
        if (forceOpen)
            setStatus("focus");
    }, [forceOpen])

    const myClose = useCallback(() => { setStatus(null); }, []);
    useEffect(() => {
    }, [])

    return (
        <AriaTooltip<HTMLSpanElement, HTMLDivElement> onStatus={setStatus} hoverDelay={hoverDelay} tooltipSemanticType={semanticType || (forward ? "label" : "description")} render={tooltipInfo => {
            //const mouseTrackingPaused = (status == "focus")
            if (forceOpen)
                status = "focus";

            // Any time the tooltip is shown, make sure all other open tooltips close themselves.
            // ... (times like this I *really* appreciate JS is single-threaded)
            useEffect(() => {
                if (status != null) {
                    otherTooltipCloses.forEach(close => close())
                    otherTooltipCloses.add(myClose);
                    return () => otherTooltipCloses.delete(myClose);
                }
            }, [status != null])

            const portalId = usePortalId("tooltip");
            const isFocusOverride = (status == "focus");
            const { propsArrow, propsPopup, propsSource, propsData, popperReturn: { usedAlignment, usedSide, hidden } } = usePopper<HTMLSpanElement, HTMLDivElement, HTMLDivElement>({
                popperParameters: {
                    open: status != null,
                    getElement,
                    absolutePositioning: absolutePositioning || false,
                    placement: placement ?? "top",
                    alignMode: isFocusOverride ? "element" : alignMode ?? (`mouse`)
                }
            });

            const slideTargetScale = (1 / 9);
            const transitionDuration = 200;

            const zoomOriginBlock = (usedSide == "top" || usedSide == "bottom") ? 1 : 0.5;
            const zoomOriginInline = (usedSide == "left" || usedSide == "right") ? 1 : 0.5;

            const slideTargetBlock = (usedSide == "top" ? slideTargetScale : usedSide == "bottom" ? -slideTargetScale : 0);
            const slideTargetInline = (usedSide == "right" ? slideTargetScale : usedSide == "left" ? -slideTargetScale : 0);

            // IMPORTANT:
            // The tooltip must remain non-hidden to assistive technologies even when closed.
            // Don't set hidden or inert or anything like that when is's closed!
            const tooltipContent =
                <div {...useMergedProps(propsPopup, {})}>
                    <SlideFade exitVisibility="visible" exclusivityKey="tooltip" duration={transitionDuration} show={hidden ? false : (tooltip == null ? false : (status != null))} slideTargetBlock={slideTargetBlock} slideTargetInline={slideTargetInline} /*zoomMin={0.8} zoomOriginBlock={zoomOriginBlock} zoomOriginInline={zoomOriginInline}*/ /*zoomOriginInline={(alignMode == "element" ? 0.5 : 0)}*/>
                        <div {...useMergedProps<any>(propsData, { style: maxWidth ? { "--bs-tooltip-max-width": maxWidth } : {}, className: clsx("bs-tooltip-auto tooltip", absolutePositioning && "portal-tooltip-child") }, tooltipInfo.propsPopup)}>
                            <div {...useMergedProps(propsArrow, { className: "tooltip-arrow" })} />
                            <div className="tooltip-inner">
                                {tooltip}
                            </div>
                        </div>
                    </SlideFade>
                </div>
            let contentIfRelative = useDefaultRenderPortal({ children: tooltipContent, portalId });
            const portalJsx = absolutePositioning ? tooltipContent : contentIfRelative;
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
