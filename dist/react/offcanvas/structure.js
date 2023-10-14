import { jsx as _jsx } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { useMergedProps } from "preact-prop-helpers";
import { Fade, Slide } from "preact-transition";
import { Button } from "../button/index.js";
import { memoForwardRef } from "../utility/forward-element-ref.js";
export const StructureOffcanvasPortalRoot = memoForwardRef(function StructureOffcanvasPortalRoot({ children, ...props }, ref) { return (_jsx("div", { ...props, ref: ref, children: children })); });
export const StructureOffcanvasBackdrop = memoForwardRef(function StructureOffcanvasBackdrop({ open, ...props }, ref) {
    return (_jsx(Fade, { show: open, fadeMax: 0.25, duration: 350, children: _jsx("div", { ...useMergedProps({ class: "offcanvas-backdrop" }, { ...props, ref }) }) }));
});
export const StructureOffcanvasModalTitle = memoForwardRef(function StructureOffcanvasModalTitle({ children, ...props }, ref) {
    return (_jsx("div", { ...useMergedProps({ class: "offcanvas-title" }, { ...props, ref }), children: children }));
});
export const StructureOffcanvasModalCloseButton = memoForwardRef(function StructureOffcanvasModalCloseButton({ onClose, ...props }, ref) {
    return (_jsx(Button, { onPress: (_pressed, e) => onClose(e, "escape"), ...useMergedProps({ class: "btn-close", "aria-label": "Close" }, { ...props, ref }) }));
});
export const StructureOffcanvasModalBody = memoForwardRef(function StructureOffcanvasModalBody({ children, ...props }, ref) {
    return (_jsx("div", { ...useMergedProps({ class: "offcanvas-body" }, { ...props, ref }), children: children }));
});
export const StructureOffcanvasModalHeader = memoForwardRef(function StructureOffcanvasModalHeader({ children, ...props }, ref) {
    return (_jsx("div", { ...useMergedProps({ class: "offcanvas-header" }, { ...props, ref }), children: children }));
});
export const StructureOffcanvasModal = memoForwardRef(function StructureOffcanvasModal({ open, children, ...props }, ref) {
    const otherProps = {
        tabIndex: -1,
        className: clsx("offcanvas")
    };
    return (_jsx(Slide, { show: open, slideTargetInline: -1, duration: 350, children: _jsx("div", { ...useMergedProps(otherProps, { ...props, ref }), children: children }) }));
});
//# sourceMappingURL=structure.js.map