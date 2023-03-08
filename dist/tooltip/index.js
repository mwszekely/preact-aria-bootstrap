import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { cloneElement } from "preact";
import { defaultRenderPortal, Tooltip as AriaTooltip } from "preact-aria-widgets";
import { useMergedProps, useState } from "preact-prop-helpers";
import { SlideFade } from "preact-transition";
import { useCallback, useEffect } from "preact/hooks";
import { usePopper } from "../popper/index.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { usePortalId } from "../utility/use-portal-id.js";
// TODO: This should be on `globalThis` in case this library is imported multiple times.
const otherTooltipCloses = new Set();
export const Tooltip = forwardElementRef(function Tooltip({ forward, getElement, forceOpen, children, tooltip, placement, maxWidth, containsTabbable, absolutePositioning, semanticType, alignMode, ...props }, ref) {
    if (forward == null && typeof children == "object" && children.props) {
        forward = true;
    }
    maxWidth ??= "33vw";
    let [status, setStatus] = useState(null);
    useEffect(() => {
        if (forceOpen)
            setStatus("focus");
    }, [forceOpen]);
    const myClose = useCallback(() => { setStatus(null); }, []);
    useEffect(() => {
    }, []);
    return (_jsx(AriaTooltip, { onStatus: setStatus, tooltipSemanticType: semanticType || (forward ? "label" : "description"), render: tooltipInfo => {
            //const mouseTrackingPaused = (status == "focus")
            if (forceOpen)
                status = "focus";
            // Any time the tooltip is shown, make sure all other open tooltips close themselves.
            // ... (times like this I *really* appreciate JS is single-threaded)
            useEffect(() => {
                if (status != null) {
                    otherTooltipCloses.forEach(close => close());
                    otherTooltipCloses.add(myClose);
                    return () => otherTooltipCloses.delete(myClose);
                }
            }, [status != null]);
            const portalId = usePortalId("tooltip");
            const isFocusOverride = (status == "focus");
            const { propsArrow, propsPopup, propsSource, propsData, popperReturn: { usedAlignment, usedSide, hidden } } = usePopper({
                popperParameters: {
                    open: status != null,
                    getElement,
                    absolutePositioning,
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
            const tooltipContent = _jsx("div", { ...useMergedProps(propsPopup, {}), children: _jsx(SlideFade, { exitVisibility: "visible", exclusivityKey: "tooltip", duration: transitionDuration, show: hidden ? false : (tooltip == null ? false : (status != null)), slideTargetBlock: slideTargetBlock, slideTargetInline: slideTargetInline, children: _jsxs("div", { ...useMergedProps(propsData, { style: maxWidth ? { "--bs-tooltip-max-width": maxWidth } : {}, className: clsx("bs-tooltip-auto tooltip", absolutePositioning && "portal-tooltip-child") }, tooltipInfo.propsPopup), children: [_jsx("div", { ...useMergedProps(propsArrow, { className: "tooltip-arrow" }) }), _jsx("div", { class: "tooltip-inner", children: tooltip })] }) }) });
            const portalJsx = absolutePositioning ? tooltipContent : defaultRenderPortal({ children: tooltipContent, portalId });
            if (forward) {
                const vnode = children;
                console.assert(!!vnode.type);
                return (_jsxs(_Fragment, { children: [(cloneElement(vnode, useMergedProps(propsData, vnode.props, tooltipInfo.propsTrigger, propsSource, props, { ref }, { ref: vnode.ref }))), portalJsx] }));
            }
            return (_jsx(_Fragment, { children: _jsxs("span", { ...useMergedProps({ ref }, propsData, tooltipInfo.propsTrigger, propsSource, props, { tabIndex: !containsTabbable ? 0 : undefined }), children: [children, portalJsx] }) }));
        } }));
});
//# sourceMappingURL=index.js.map