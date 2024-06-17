import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { ParentDepthContext, useDefault, useDefaultRenderPortal, useMenuSurface } from "preact-aria-widgets";
import { useCallback, useContext, useImperativeHandle, useMergedProps, useRandomId, useStableCallback, useState, useTimeout } from "preact-prop-helpers";
import { ZoomFade } from "preact-transition";
import { Button } from "../button/index.js";
import { usePopper } from "../popper/index.js";
import { usePortalId } from "../utility/use-portal-id.js";
export function Popover({ children, label, align, buttonVariantDropdown, buttonVariantFill, buttonVariantSize, buttonVariantTheme, disabled, forceOpen, imperativeHandle, header, onSelectedIndexChange, selectedIndex, ...props }, ref) {
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
    useImperativeHandle(imperativeHandle, () => info);
    const portalId = usePortalId("menu");
    const { propsArrow, propsPopup, propsSource, propsData } = usePopper({
        popperParameters: {
            open: popperOpen,
            placement: `bottom-${align || "start"}`,
            alignMode: "element"
        }
    });
    const defaultParentDepth = useContext(ParentDepthContext);
    let myDepth = (defaultParentDepth) + 1;
    const { propsSource: randomIdProps, randomIdReturn: { id: surfaceId } } = useRandomId({ randomIdParameters: { prefix: "popover-surface-", otherReferencerProp: "aria-controls" } });
    const info = useMenuSurface({
        activeElementParameters: {
            getDocument: useDefault("getDocument", undefined),
            onActiveElementChange: null,
            onLastActiveElementChange: null,
            onWindowFocusedChange: null
        },
        modalParameters: { active: menuOpen },
        dismissParameters: { onDismiss: onClose },
        escapeDismissParameters: { parentDepth: defaultParentDepth },
        focusTrapParameters: { focusPopup: useStableCallback((e, f) => f()?.focus()) },
        menuSurfaceParameters: { role: "dialog", surfaceId },
    });
    return (_jsxs(_Fragment, { children: [_jsx(Button, { variantDropdown: buttonVariantDropdown, variantFill: buttonVariantFill, variantSize: buttonVariantSize, variantTheme: buttonVariantTheme, onPress: onAnchorPress, disabled: disabled, ...useMergedProps({ class: popperOpen ? "active" : "", ref }, props, info.propsTrigger, propsSource), children: label }), useDefaultRenderPortal({
                portalId,
                children: (_jsx(ParentDepthContext.Provider, { value: myDepth, children: _jsxs("div", { ...useMergedProps(propsPopup, { className: "popper-popover" }), children: [_jsx("div", { ...propsArrow }), _jsx(ZoomFade, { show: popperOpen, delayMountUntilShown: true, exitVisibility: "removed", zoomOriginInline: 0, zoomOriginBlock: 0, zoomMinInline: 0.85, zoomMinBlock: 0.85, children: _jsxs("div", { ...useMergedProps(info.propsSurface, { className: clsx("popover bs-popover-auto fade show") }), children: [_jsx("div", { ...info.propsSentinel }), header && _jsx("h3", { className: "popover-header", children: header }), _jsx("div", { ...useMergedProps(info.propsTarget, { className: "dpopover-body" }), children: children }), _jsx("div", { ...info.propsSentinel })] }) })] }) }))
            })] }));
}
//# sourceMappingURL=index.js.map