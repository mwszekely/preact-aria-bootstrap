import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import { Dialog as AriaDialog, useDefaultRenderPortal } from "preact-aria-widgets";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { useClonedElement } from "../utility/use-cloned-element.js";
import { usePortalId } from "../utility/use-portal-id.js";
import { StructureOffcanvasBackdrop, StructureOffcanvasModal, StructureOffcanvasModalBody, StructureOffcanvasModalCloseButton, StructureOffcanvasModalHeader, StructureOffcanvasModalTitle, StructureOffcanvasPortalRoot } from "./structure.js";
export const Offcanvas = memo(forwardElementRef(function Offcanvas({ open, header, headerPosition, onClose, anchor, children, propsPortal, ...props }, ref) {
    headerPosition ??= "start";
    if (headerPosition == "hidden") {
        console.assert(typeof header == "string", `An offcanvas whose label is hidden must provide the label to use as a string to the header`);
    }
    return (_jsx(AriaDialog, { ariaLabel: headerPosition == "hidden" ? header : null, active: open, onDismiss: onClose, focusPopup: (e, f) => f()?.focus?.(), dismissBackdropActive: true, dismissEscapeActive: true, render: info => {
            return (_jsxs(_Fragment, { children: [useClonedElement(anchor, useMergedProps(info.propsSource, props), ref), useDefaultRenderPortal({
                        portalId: usePortalId("offcanvas"),
                        children: (_jsxs(StructureOffcanvasPortalRoot, { ...useMergedProps(info.propsFocusContainer, propsPortal || {}), children: [_jsxs(StructureOffcanvasModal, { open: open, ...info.propsDialog, children: [_jsxs(StructureOffcanvasModalHeader, { children: [_jsx(StructureOffcanvasModalTitle, { ...info.propsTitle, children: header }), _jsx(StructureOffcanvasModalCloseButton, { onClose: onClose })] }), _jsx(StructureOffcanvasModalBody, { children: children })] }), _jsx(StructureOffcanvasBackdrop, { open: open })] }))
                    })] }));
        } }));
}));
//# sourceMappingURL=index.js.map