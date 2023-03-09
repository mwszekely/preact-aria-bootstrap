import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { defaultRenderPortal, Dialog as AriaDialog } from "preact-aria-widgets";
import { useMergedProps } from "preact-prop-helpers";
import { Fade, Slide } from "preact-transition";
import { memo } from "preact/compat";
import { Button } from "../button/index.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { useClonedElement } from "../utility/use-cloned-element.js";
import { usePortalId } from "../utility/use-portal-id.js";
export const Offcanvas = memo(forwardElementRef(function Offcanvas({ open, header, headerPosition, onClose, anchor, children, ...props }, ref) {
    headerPosition ??= "start";
    if (headerPosition == "hidden") {
        console.assert(typeof header == "string", `An offcanvas whose label is hidden must provide the label to use as a string to the header`);
    }
    return (_jsx("div", { children: _jsx(AriaDialog, { ariaLabel: headerPosition == "hidden" ? header : null, open: open, onClose: onClose, focusPopup: (e, f) => f()?.focus?.(), closeOnBackdrop: true, closeOnEscape: true, render: info => {
                return (_jsxs(_Fragment, { children: [useClonedElement(anchor, useMergedProps(info.propsSource, props), ref), defaultRenderPortal({
                            portalId: usePortalId("offcanvas"),
                            children: (_jsxs("div", { ...info.propsFocusContainer, children: [_jsx(Slide, { show: open, slideTargetInline: -1, duration: 500, children: _jsxs("div", { ...useMergedProps(info.propsDialog, { class: clsx("offcanvas"), tabIndex: -1 }), children: [_jsxs("div", { ...useMergedProps({ class: "offcanvas-header" }), children: [_jsx("h5", { ...useMergedProps(info.propsTitle, { class: "offcanvas-title" }), children: header }), _jsx(Button, { class: "btn-close", "aria-label": "Close", onPress: () => onClose("escape") })] }), _jsx("div", { class: "offcanvas-body", children: children })] }) }), _jsx(Fade, { show: open, fadeMax: 0.25, duration: 1000, children: _jsx("div", { class: clsx("offcanvas-backdrop") }) })] }))
                        })] }));
            } }) }));
}));
//# sourceMappingURL=index.js.map