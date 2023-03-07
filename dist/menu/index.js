import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { defaultRenderPortal, Menu as AriaMenu, MenuItem as AriaMenuItem, ProgressWithHandler } from "preact-aria-widgets";
import { returnUndefined, returnZero, useMergedProps, useStableCallback, useState, useTimeout } from "preact-prop-helpers";
import { ZoomFade } from "preact-transition";
import { memo } from "preact/compat";
import { useCallback, useImperativeHandle, useRef } from "preact/hooks";
import { usePopper } from "../popper/index.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { KeyboardAssistIcon } from "../utility/keyboard-assist.js";
import { useClonedElement } from "../utility/use-cloned-element.js";
import { usePortalId } from "../utility/use-portal-id.js";
export const Menu = memo(forwardElementRef(function Menu({ anchor, forceOpen, children, selectedIndex, align, onSelectedIndexChange, imperativeHandle, ...props }, ref) {
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
    return (_jsx(AriaMenu, { onOpen: onOpen, onClose: onClose, open: menuOpen, openDirection: "down", orientation: "vertical", selectedIndex: selectedIndex, onSelectedIndexChange: onSelectedIndexChange, render: (info) => {
            useImperativeHandle(imperativeHandle, () => info);
            const portalId = usePortalId("menu");
            const { propsArrow, propsPopup, propsSource, propsData } = usePopper({
                popperParameters: {
                    open: popperOpen,
                    placement: `bottom-${align || "start"}`,
                    alignMode: "element"
                }
            });
            return (_jsxs(_Fragment, { children: [useClonedElement(anchor, useMergedProps({
                        onPress: onAnchorPress,
                        class: popperOpen ? "active" : ""
                    }, props, info.propsTrigger, propsSource), ref), defaultRenderPortal({
                        portalId,
                        children: (_jsxs("div", { ...useMergedProps(propsPopup, { className: "popper-menu" }), children: [_jsx("div", { ...propsArrow }), _jsx(ZoomFade, { show: popperOpen, delayMountUntilShown: true, exitVisibility: "removed", zoomOriginInline: 0, zoomOriginBlock: 0, zoomMinInline: 0.85, zoomMinBlock: 0.85, children: _jsx(KeyboardAssistIcon, { leftRight: false, upDown: true, homeEnd: true, pageKeys: true, typeahead: true, typeaheadActive: info.typeaheadNavigationReturn.typeaheadStatus != "none", children: _jsxs("div", { ...useMergedProps(info.propsSurface, { className: clsx("dropdown-menu shadow show") }), children: [_jsx("div", { ...info.propsSentinel }), _jsx("div", { ...useMergedProps(info.propsTarget, { className: "dropdown-menu-list" }), children: children }), _jsx("div", { ...info.propsSentinel })] }) }) })] }))
                    })] }));
        } }));
}));
export const MenuItem = memo(forwardElementRef(function MenuItem({ index, getSortValue, disabled, loadingLabel, onPress: onPressWithoutClose, children, ...props }, ref) {
    /*const onClose = useStableCallback<typeof onPressWithoutClose>((e) => {
        const ret = onPressWithoutClose?.(e);
        if (ret && (typeof ret == "object") && (ret instanceof Promise)) {

        }
    })*/
    const imperativeHandle = useRef(null);
    return (_jsx(ProgressWithHandler, { asyncHandler: () => {
            console.assert(!!imperativeHandle.current);
            return onPressWithoutClose?.(imperativeHandle.current.menuItemReturn.closeMenu);
        }, ariaLabel: loadingLabel || "The operation is in progress", capture: returnUndefined, tagIndicator: "div", render: progressInfo => {
            const showSpinner = (progressInfo.asyncHandlerReturn.pending || progressInfo.asyncHandlerReturn.debouncingAsync || progressInfo.asyncHandlerReturn.debouncingSync);
            return (_jsx(AriaMenuItem, { ref: imperativeHandle, index: index, selectionMode: "activation", getSortValue: getSortValue ?? returnZero, disabled: disabled || showSpinner, onPress: progressInfo.asyncHandlerReturn.syncHandler, render: menuInfo => {
                    const spinnerJsx = (_jsx("div", { ...progressInfo.propsIndicator, class: clsx("spinner-border", "spinner-border-sm") }));
                    return (_jsxs("div", { ...useMergedProps(menuInfo.props, { ref, className: clsx("dropdown-item dropdown-item-with-icon-end", showSpinner && "pending", disabled && "disabled", menuInfo.pressReturn.pressing && "active") }, props), children: [children, _jsx("div", { class: "dropdown-item-icon dropdown-item-icon-end", children: spinnerJsx })] }));
                }, ariaPropName: "aria-selected" }));
        } }));
}));
//# sourceMappingURL=index.js.map