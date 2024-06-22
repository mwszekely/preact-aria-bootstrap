import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import { Dialog as AriaDialog, useDefaultRenderPortal } from "preact-aria-widgets";
import { memo, useMergedProps } from "preact-prop-helpers";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { useClonedElement } from "../utility/use-cloned-element.js";
import { usePortalId } from "../utility/use-portal-id.js";
import { StructureOffcanvasBackdrop, StructureOffcanvasModal, StructureOffcanvasModalBody, StructureOffcanvasModalCloseButton, StructureOffcanvasModalHeader, StructureOffcanvasModalTitle, StructureOffcanvasPortalRoot } from "./structure.js";
export const Offcanvas = /* @__PURE__ */ memo(forwardElementRef(function Offcanvas({ open, header, headerPosition, onClose, anchor, children, propsPortal, ...props }, ref) {
    headerPosition ??= "start";
    if (headerPosition == "hidden") {
        console.assert(typeof header == "string", `<Offcanvas />: When labelPosition is 'hidden', the label must be a string (as opposed to arbitrary JSX)`);
    }
    return (_jsx(AriaDialog, { ariaLabel: headerPosition == "hidden" ? header : null, active: open, onDismiss: onClose, focusPopup: (e, f) => f()?.focus?.(), dismissBackdropActive: true, dismissEscapeActive: true, render: info => {
            return (_jsxs(_Fragment, { children: [useClonedElement(anchor, useMergedProps(info.propsSource, props), ref), useDefaultRenderPortal({
                        portalId: usePortalId("offcanvas"),
                        children: (_jsxs(StructureOffcanvasPortalRoot, { ...useMergedProps(info.propsFocusContainer, propsPortal || {}), children: [_jsxs(StructureOffcanvasModal, { open: open, ...info.propsDialog, children: [_jsxs(StructureOffcanvasModalHeader, { children: [_jsx(StructureOffcanvasModalTitle, { ...info.propsTitle, children: header }), _jsx(StructureOffcanvasModalCloseButton, { onClose: onClose })] }), _jsx(StructureOffcanvasModalBody, { children: children })] }), _jsx(StructureOffcanvasBackdrop, { open: open })] }))
                    })] }));
        } }));
}));
//# sourceMappingURL=index.js.map