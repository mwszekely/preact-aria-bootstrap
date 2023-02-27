import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { defaultRenderPortal, Dialog as AriaDialog, Heading } from "preact-aria-widgets";
import { useMergedProps } from "preact-prop-helpers";
import { SlideFade } from "preact-transition";
import { memo } from "preact/compat";
import { Button } from "../button/button-action.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { useClonedElement } from "../utility/use-cloned-element.js";
import { usePortalId } from "../utility/use-portal-id.js";
export const Dialog = memo(forwardElementRef(function Dialog({ open, fullscreen, variantSize, header, headerPosition, footer, onClose, anchor, modal, children, ...props }, ref) {
    variantSize ??= "xl";
    headerPosition ??= "start";
    if (headerPosition == "hidden") {
        console.assert(typeof header == "string", `A dialog whose label is hidden must provide the label to use as a string to the header`);
    }
    return (_jsx("div", { children: _jsx(AriaDialog, { ariaLabel: headerPosition == "hidden" ? header : null, open: open, onClose: onClose, focusPopup: (e, f) => f()?.focus?.(), closeOnBackdrop: modal ? false : true, closeOnEscape: modal ? false : true, render: info => {
                const headingJsx = (_jsxs(_Fragment, { children: [_jsx("span", { class: "modal-title", children: header }), _jsx(Button, { class: "btn-close", onPress: () => onClose("escape"), "aria-label": "Close" })] }));
                const bodyJsx = (_jsx("span", { class: "modal-body", children: children }));
                const footerJsx = (_jsx("span", { class: "modal-footer", children: footer }));
                return (_jsxs(_Fragment, { children: [useClonedElement(anchor, useMergedProps(info.propsSource, props), ref), defaultRenderPortal({
                            portalId: usePortalId("dialog"),
                            children: (_jsx("div", { ...info.propsFocusContainer, children: _jsxs("div", { ...useMergedProps(info.propsDialog, {
                                        tabIndex: -1,
                                        className: clsx("modal modal-dialog-scrollable overflow-hidden", open ? "d-block" : "d-hidden", variantSize && `modal-${variantSize}`, fullscreen && (fullscreen === true ? "modal-fullscreen" : `modal-fullscreen-${fullscreen}`))
                                    }), children: [_jsx("div", { class: clsx("dialog-backdrop", open && "visible", modal && "dialog-backdrop-blur"), role: "presentation" }), _jsx(SlideFade, { animateOnMount: true, delayMountUntilShown: true, show: open, slideTargetBlock: 0.125 * (open ? 1 : -1), children: _jsx("div", { class: "modal-dialog", children: _jsxs("span", { class: "modal-content", children: [headerPosition == "start" ? _jsx(Heading, { class: "modal-header", heading: headingJsx, children: bodyJsx }) : bodyJsx, footer && footerJsx] }) }) })] }) }))
                        })] }));
            } }) }));
}));
//# sourceMappingURL=index.js.map