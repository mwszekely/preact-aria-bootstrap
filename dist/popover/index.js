import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { defaultRenderPortal, ParentDepthContext, useDefault, useMenuSurface } from "preact-aria-widgets";
import { useMergedProps, useRandomId, useStableCallback, useState, useTimeout } from "preact-prop-helpers";
import { ZoomFade } from "preact-transition";
import { useCallback, useContext, useImperativeHandle } from "preact/hooks";
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
        dismissParameters: { closeOnBackdrop: true, closeOnEscape: true, closeOnLostFocus: true, onClose, open: menuOpen },
        escapeDismissParameters: { getWindow: useDefault("getWindow", undefined), parentDepth: defaultParentDepth },
        focusTrapParameters: { focusPopup: useStableCallback((e, f) => f()?.focus()) },
        menuSurfaceParameters: { role: "dialog", surfaceId },
    });
    const a = (_jsxs("div", { class: "popover bs-popover-auto fade show", role: "tooltip", id: "popover644101", style: "position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(961.45px, 1546.58px);", "data-popper-placement": "right", children: [_jsx("div", { class: "popover-arrow", style: "position: absolute; top: 0px; transform: translate(0px, 46.9px);" }), _jsx("h3", { class: "popover-header", children: "Popover title" }), _jsx("div", { class: "popover-body", children: "And here's some amazing content. It's very engaging. Right?" })] }));
    return (_jsxs(_Fragment, { children: [_jsx(Button, { variantDropdown: buttonVariantDropdown, variantFill: buttonVariantFill, variantSize: buttonVariantSize, variantTheme: buttonVariantTheme, onPress: onAnchorPress, disabled: disabled, ...useMergedProps({ class: popperOpen ? "active" : "", ref }, props, info.propsTrigger, propsSource), children: label }), defaultRenderPortal({
                portalId,
                children: (_jsx(ParentDepthContext.Provider, { value: myDepth, children: _jsxs("div", { ...useMergedProps(propsPopup, { className: "popper-popover" }), children: [_jsx("div", { ...propsArrow }), _jsx(ZoomFade, { show: popperOpen, delayMountUntilShown: true, exitVisibility: "removed", zoomOriginInline: 0, zoomOriginBlock: 0, zoomMinInline: 0.85, zoomMinBlock: 0.85, children: _jsxs("div", { ...useMergedProps(info.propsSurface, { className: clsx("popover bs-popover-auto fade show") }), children: [_jsx("div", { ...info.propsSentinel }), header && _jsx("h3", { class: "popover-header", children: header }), _jsx("div", { ...useMergedProps(info.propsTarget, { className: "dpopover-body" }), children: children }), _jsx("div", { ...info.propsSentinel })] }) })] }) }))
            })] }));
}
//# sourceMappingURL=index.js.map