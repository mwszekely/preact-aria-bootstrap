import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "preact/jsx-runtime";
import { Dialog as AriaDialog, useDefaultRenderPortal } from "preact-aria-widgets";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { useClonedElement } from "../utility/use-cloned-element.js";
import { usePortalId } from "../utility/use-portal-id.js";
import { StructureDialogBackdrop, StructureDialogModal, StructureDialogModalBody, StructureDialogModalCloseButton, StructureDialogModalContent, StructureDialogModalDialog, StructureDialogModalFooter, StructureDialogModalTitle, StructureDialogPortalRoot } from "./structure.js";
export const Dialog = memo(forwardElementRef(function Dialog({ open, fullscreen, variantSize, header, headerPosition, footer, onClose, anchor, modal, children, propsPortal, ...props }, ref) {
    variantSize ??= "xl";
    headerPosition ??= "start";
    if (headerPosition == "hidden") {
        console.assert(typeof header == "string", `A dialog whose label is hidden must provide the label to use as a string to the header`);
    }
    return (_jsx(AriaDialog, { ariaLabel: headerPosition == "hidden" ? header : null, active: open, onDismiss: onClose, focusPopup: (e, f) => f()?.focus?.(), dismissBackdropActive: modal ? false : true, dismissEscapeActive: modal ? false : true, render: info => {
            const headingJsx = (_jsxs(_Fragment, { children: [_jsx(StructureDialogModalTitle, { children: header }), _jsx(StructureDialogModalCloseButton, { onClose: onClose })] }));
            const bodyJsx = _jsx(StructureDialogModalBody, { children: children });
            const footerJsx = (_jsx(StructureDialogModalFooter, { children: footer }));
            return (_jsxs(_Fragment, { children: [anchor && useClonedElement(anchor, useMergedProps(info.propsSource, props), ref), useDefaultRenderPortal({
                        portalId: usePortalId("dialog"),
                        children: (_jsx(StructureDialogPortalRoot, { ...useMergedProps(info.propsFocusContainer, propsPortal || {}), children: _jsxs(StructureDialogModal, { fullscreen: fullscreen, open: open, variantSize: variantSize, ...info.propsDialog, children: [_jsx(StructureDialogBackdrop, { open: open, modal: modal }), _jsx(StructureDialogModalDialog, { open: open, header: header, children: _jsx(StructureDialogModalContent, { childrenHeading: headingJsx, childrenBody: bodyJsx, childrenFooter: footerJsx, headerPosition: headerPosition }) })] }) }))
                    })] }));
        } }));
}));
//# sourceMappingURL=index.js.map