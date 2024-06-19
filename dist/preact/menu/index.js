import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { Menu as AriaMenu, MenuItem as AriaMenuItem, ProgressWithHandler, useDefaultRenderPortal } from "preact-aria-widgets";
import { EventDetail, memo, returnUndefined, useCallback, useMergedProps, useRef, useStableCallback, useState, useTimeout } from "preact-prop-helpers";
import { Fade, ZoomFade } from "preact-transition";
import { usePopper } from "../popper/index.js";
import { forwardElementRef, memoForwardRef } from "../utility/forward-element-ref.js";
import { KeyboardAssistIcon } from "../utility/keyboard-assist.js";
import { useClonedElement } from "../utility/use-cloned-element.js";
import { usePortalId } from "../utility/use-portal-id.js";
import { useAutoAsyncHandler } from "../context.js";
export const Menu = memo(forwardElementRef(function Menu({ anchor, forceOpen, children, selectedIndex, align, keyboardControlsDescription, onSelectedIndexChange, ...props }, ref) {
    const [openFromAnchor, setOpenFromAnchor, getOpenFromAnchor] = useState(forceOpen ?? false);
    const onOpen = useCallback(() => { setOpenFromAnchor(true); }, []);
    const onClose = useCallback(() => { setOpenFromAnchor(false); }, []);
    const onAnchorPress = useStableCallback(() => {
        if (getOpenFromAnchor())
            onClose();
        else
            onOpen();
    });
    // IMPORTANT: The popper must open on a delay, earlier than the menu itself.
    // This is because the menu focuses itself when it opens, and that position may be WRONG while popper is still positioning itself.
    // For performance reasons poppers also don't position themselves until they open, so it could be, at, like, the top of the screen or something.
    // If we focus the popper while it's at the wrong position, the screen will fly off to some random position (probably the top of the page).
    //
    // TODO: Popper positioning is async, so we should probably have a return from that that lets us know when we can open the menu.
    // It might not be 10ms every time.
    const popperOpen = (forceOpen ?? openFromAnchor);
    const [menuOpen, setMenuOpen] = useState(false);
    useTimeout({
        timeout: 10,
        callback: () => setMenuOpen(popperOpen),
        triggerIndex: popperOpen
    });
    return (_jsx(AriaMenu, { onOpen: onOpen, onDismiss: onClose, active: menuOpen, openDirection: "down", orientation: "vertical", singleSelectionMode: "activation", singleSelectionAriaPropName: "aria-selected", singleSelectedIndex: selectedIndex, onSingleSelectedIndexChange: useStableCallback(e => onSelectedIndexChange?.(e[EventDetail].selectedIndex)), render: (info) => {
            const portalId = usePortalId("menu");
            const { propsArrow, propsPopup, propsSource, propsData } = usePopper({
                popperParameters: {
                    open: popperOpen,
                    placement: `bottom-${align || "start"}`,
                    alignMode: "element",
                    absolutePositioning: false
                }
            });
            return (_jsxs(_Fragment, { children: [useClonedElement(anchor, useMergedProps({
                        onPress: onAnchorPress,
                        class: popperOpen ? "active" : ""
                    }, props, info.propsTrigger, propsSource), ref), useDefaultRenderPortal({
                        portalId,
                        children: (_jsxs(StructureMenuPopper, { ...propsPopup, children: [_jsx(StructureMenuArrow, { ...propsArrow }), _jsxs(StructureMenuRoot, { ...info.propsSurface, popperOpen: popperOpen, typeaheadStatus: info.typeaheadNavigationReturn.typeaheadStatus, keyboardControlsDescription: keyboardControlsDescription ?? "Move to a menu item:", children: [_jsx(StructureMenuFocusSentinel, { ...info.propsSentinel }), _jsx(StructureMenuList, { ...info.propsTarget, children: children }), _jsx(StructureMenuFocusSentinel, { ...info.propsSentinel })] })] }))
                    })] }));
        } }));
}));
export const StructureMenuPopper = memoForwardRef(function StructureMenuPopper({ children, ...props }, ref) {
    return (_jsx("div", { ...useMergedProps({ className: "popper-menu" }, { ...props, ref }), children: children }));
});
export const StructureMenuRoot = memoForwardRef(function StructureMenuRoot({ popperOpen, typeaheadStatus, children, keyboardControlsDescription, ...props }, ref) {
    return (_jsx(ZoomFade, { show: popperOpen, delayMountUntilShown: true, exitVisibility: "removed", zoomOriginInline: 0, zoomOriginBlock: 0, zoomMinInline: 0.85, zoomMinBlock: 0.85, children: _jsx(KeyboardAssistIcon, { leftRight: false, upDown: true, homeEnd: true, pageKeys: true, typeaheadStatus: typeaheadStatus, activateSpace: typeaheadStatus == 'none', activateEnter: true, description: keyboardControlsDescription, children: _jsx("div", { ...useMergedProps({ className: clsx("dropdown-menu shadow show") }, { ...props, ref }), children: children }) }) }));
});
export const StructureMenuList = memoForwardRef(function StructureMenuList({ children, ...props }, ref) {
    return (_jsx("div", { ...useMergedProps({ className: "dropdown-menu-list" }, { ...props, ref }), children: children }));
});
export const StructureMenuArrow = memoForwardRef(function StructureMenuArrow(props, ref) {
    return (_jsx("div", { ...props, ref: ref }));
});
export const StructureMenuFocusSentinel = memoForwardRef(function StructureMenuFocusSentinel(props, ref) {
    return (_jsx("div", { ...props, ref: ref }));
});
export const MenuItem = memo(forwardElementRef(function MenuItem({ index, getSortValue, disabled, loadingLabel, onPress, children, ...props }, ref) {
    const imperativeHandle = useRef(null);
    return (_jsx(ProgressWithHandler, { asyncHandler: useAutoAsyncHandler((_unused, e) => {
            console.assert(!!imperativeHandle.current);
            return onPress?.(imperativeHandle.current.menuItemReturn.closeMenu, e);
        }), ariaLabel: loadingLabel || "The operation is in progress", capture: returnUndefined, tagProgressIndicator: "div", render: progressInfo => {
            const showSpinner = (progressInfo.asyncHandlerReturn.pending || progressInfo.asyncHandlerReturn.debouncingAsync || progressInfo.asyncHandlerReturn.debouncingSync);
            return (_jsx(AriaMenuItem, { imperativeHandle: imperativeHandle, index: index, singleSelectionDisabled: disabled || showSpinner, onPress: progressInfo.asyncHandlerReturn.syncHandler, render: menuInfo => {
                    return (_jsxs(StructureMenuItem, { ...useMergedProps(menuInfo.props, { ...props, ref }), showSpinner: showSpinner, disabled: (!!disabled), pressing: menuInfo.pressReturn.pressing, children: [children, _jsx(StructureMenuItemSpinner, { showSpinner: showSpinner, ...progressInfo.propsProgressIndicator })] }));
                    /*const spinnerJsx = (<Fade show={showSpinner} exitVisibility="removed"><div {...progressInfo.propsProgressIndicator} className={clsx("spinner-border", "spinner-border-sm")} /></Fade>)
    
                    return (
                        <div {...useMergedProps(menuInfo.props, { ref, className: clsx("dropdown-item dropdown-item-with-icon-end", showSpinner && "pending", disabled && "disabled", menuInfo.pressReturn.pressing && "active") }, props)}>
                            {children}
                            <div className="dropdown-item-icon dropdown-item-icon-end">{spinnerJsx}</div>
                        </div>
                    )*/
                } }));
        } }));
}));
const StructureMenuItem = memoForwardRef(function StructureMenuItem({ children, showSpinner, disabled, pressing, ...props }, ref) {
    return (_jsx("div", { ...useMergedProps({ className: clsx("dropdown-item dropdown-item-with-icon-end", showSpinner && "pending", disabled && "disabled", pressing && "active") }, { ...props, ref }), children: children }));
});
const StructureMenuItemSpinner = memoForwardRef(function StructureMenuItemSpinner({ showSpinner, ...props }, ref) {
    return (_jsx("div", { className: "dropdown-item-icon dropdown-item-icon-end", children: _jsx(Fade, { show: showSpinner, exitVisibility: "removed", children: _jsx("div", { ...useMergedProps({ class: clsx("spinner-border", "spinner-border-sm") }, { ...props, ref }) }) }) }));
});
//# sourceMappingURL=index.js.map