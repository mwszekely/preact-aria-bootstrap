import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { Heading } from "preact-aria-widgets";
import { useMergedProps } from "preact-prop-helpers";
import { SlideFade } from "preact-transition";
import { Button } from "../button/index.js";
import { memoForwardRef } from "../utility/forward-element-ref.js";
export const StructureDialogPortalRoot = /* @__PURE__ */ memoForwardRef(function StructureDialogPortalRoot({ children, ...props }, ref) { return (_jsx("div", { ...props, ref: ref, children: children })); });
export const StructureDialogBackdrop = /* @__PURE__ */ memoForwardRef(function StructureDialogBackdrop({ open, modal, ...props }, ref) {
    return (_jsx("div", { ...useMergedProps({ class: clsx("dialog-backdrop", open && "visible", modal && "dialog-backdrop-blur"), role: "presentation" }, { ...props, ref }) }));
});
export const StructureDialogModalTitle = /* @__PURE__ */ memoForwardRef(function StructureDialogModalTitle({ children, ...props }, ref) {
    return (_jsx("div", { ...useMergedProps({ class: "modal-title" }, { ...props, ref }), children: children }));
});
export const StructureDialogModalCloseButton = /* @__PURE__ */ memoForwardRef(function StructureDialogModalCloseButton({ onClose, ...props }, ref) {
    return (_jsx(Button, { onPress: (_pressed, e) => onClose(e, "escape"), ...useMergedProps({ class: "btn-close", "aria-label": "Close" }, { ...props, ref }) }));
});
export const StructureDialogModalBody = /* @__PURE__ */ memoForwardRef(function StructureDialogModalBody({ children, ...props }, ref) {
    return (_jsx("div", { ...useMergedProps({ class: "modal-body" }, { ...props, ref }), children: children }));
});
export const StructureDialogModalFooter = /* @__PURE__ */ memoForwardRef(function StructureDialogModalFooter({ children, ...props }, ref) {
    return (children == null ? null : _jsx("div", { ...useMergedProps({ class: "modal-footer" }, { ...props, ref }), children: children }));
});
export const StructureDialogModalDialog = /* @__PURE__ */ memoForwardRef(function StructureDialogModalDialog({ open, children, header, ...props }, ref) {
    return (_jsx(SlideFade, { animateOnMount: true, delayMountUntilShown: true, show: open, slideTargetBlock: 0.125 * (open ? 1 : -1), children: _jsx("div", { ...useMergedProps({ class: "modal-dialog" }, { ...props, ref }), children: children }) }));
});
export const StructureDialogModalContent = /* @__PURE__ */ memoForwardRef(function StructureDialogModalContent({ childrenHeading, childrenBody, childrenFooter, headerPosition, ...props }, ref) {
    return (_jsxs("span", { ...useMergedProps({ class: "modal-content" }, { ...props, ref }), children: [headerPosition == "start" ? _jsx(Heading, { className: "modal-header", heading: childrenHeading, children: childrenBody }) : childrenBody, childrenFooter] }));
});
export const StructureDialogModal = /* @__PURE__ */ memoForwardRef(function StructureDialogModal({ open, variantSize, fullscreen, children, ...props }, ref) {
    const otherProps = {
        tabIndex: -1,
        className: clsx("modal modal-dialog-scrollable overflow-hidden", open ? "d-block" : "d-hidden", variantSize && `modal-${variantSize}`, fullscreen && (fullscreen === true ? "modal-fullscreen" : `modal-fullscreen-${fullscreen}`))
    };
    return (_jsx("div", { ...useMergedProps(otherProps, { ...props, ref }), children: children }));
});
//# sourceMappingURL=structure.js.map