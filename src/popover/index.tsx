import clsx from "clsx";
import { usePopper } from "popper";
import { ComponentChildren, Ref } from "preact";
import { defaultRenderPortal } from "preact-aria-widgets";
import { ParentDepthContext, useDefault } from "preact-aria-widgets/component/util";
import { useMenuSurface, UseMenuSurfaceReturnType } from "preact-aria-widgets/use-menu-surface";
import { useStableCallback, useState, useTimeout, useMergedProps, useRandomId } from "preact-prop-helpers";
import { ZoomFade } from "preact-transition";
import { useCallback, useContext, useImperativeHandle } from "preact/hooks";
import { usePortalId } from "../utility/use-portal-id";
import { Button, ButtonProps } from "../button"
export interface PopoverProps {
    forceOpen?: boolean | null | undefined;
    label: ComponentChildren;
    disabled?: boolean;
    children: ComponentChildren;
    selectedIndex?: number | null;
    align?: "start" | "end";
    buttonVariantSize?: ButtonProps<HTMLButtonElement>["variantSize"];
    buttonVariantFill?: ButtonProps<HTMLButtonElement>["variantFill"];
    buttonVariantTheme?: ButtonProps<HTMLButtonElement>["variantTheme"];
    buttonVariantDropdown?: ButtonProps<HTMLButtonElement>["variantDropdown"];
    onSelectedIndexChange?: null | ((index: number | null) => (void | Promise<void>));
    header?: ComponentChildren;
    imperativeHandle?: Ref<UseMenuSurfaceReturnType<HTMLDivElement, HTMLDivElement, HTMLButtonElement>>
}

export function Popover({
    children,
    label,
    align,
    buttonVariantDropdown,
    buttonVariantFill,
    buttonVariantSize,
    buttonVariantTheme,
    disabled,
    forceOpen,
    imperativeHandle,
    header,
    onSelectedIndexChange,
    selectedIndex,
    ...props
}: PopoverProps, ref?: Ref<HTMLButtonElement>) {

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

    useImperativeHandle(imperativeHandle!, () => info);
    const portalId = usePortalId("menu");
    const { propsArrow, propsPopup, propsSource, propsData } = usePopper<HTMLButtonElement, HTMLDivElement, HTMLDivElement>({
        popperParameters: {
            open: popperOpen,
            placement: `bottom-${align || "start"}`,
            alignMode: "element"
        }
    })

    const defaultParentDepth = useContext(ParentDepthContext);
    let myDepth = (defaultParentDepth) + 1;

    const { propsSource: randomIdProps, randomIdReturn:  { id: surfaceId } } = useRandomId({ randomIdParameters: { prefix: "popover-surface-", otherReferencerProp: "aria-controls" } })

    const info = useMenuSurface<HTMLDivElement, HTMLDivElement, HTMLButtonElement>({
        dismissParameters: { closeOnBackdrop: true, closeOnEscape: true, closeOnLostFocus: true, onClose, open: menuOpen },
        escapeDismissParameters: { getWindow: useDefault("getWindow", undefined), parentDepth: defaultParentDepth },
        focusTrapParameters: { focusPopup: useStableCallback((e, f) => f()?.focus()) },
        menuSurfaceParameters: { role: "dialog", surfaceId },
    });

    const a = (
        <div class="popover bs-popover-auto fade show" role="tooltip" id="popover644101" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(961.45px, 1546.58px);" data-popper-placement="right">
            <div class="popover-arrow" style="position: absolute; top: 0px; transform: translate(0px, 46.9px);"></div>
            <h3 class="popover-header">Popover title</h3>
            <div class="popover-body">And here's some amazing content. It's very engaging. Right?</div>
        </div>
    )

    return (
        <>
            <Button
                variantDropdown={buttonVariantDropdown}
                variantFill={buttonVariantFill}
                variantSize={buttonVariantSize}
                variantTheme={buttonVariantTheme}
                onPress={onAnchorPress}
                disabled={disabled}
                {...useMergedProps<HTMLButtonElement>({ class: popperOpen ? "active" : "", ref }, props, info.propsTrigger, propsSource) as {}}>
                {label}
            </Button>
            {defaultRenderPortal({
                portalId,
                children: (
                    <ParentDepthContext.Provider value={myDepth}>
                        <div {...useMergedProps(propsPopup, { className: "popper-popover" })}>
                            <div {...propsArrow} />
                            <ZoomFade show={popperOpen} delayMountUntilShown exitVisibility="removed" zoomOriginInline={0} zoomOriginBlock={0} zoomMinInline={0.85} zoomMinBlock={0.85}>

                                <div {...useMergedProps(info.propsSurface, { className: clsx("popover bs-popover-auto fade show") })}>
                                    <div {...info.propsSentinel} />
                                    {header && <h3 class="popover-header">{header}</h3>}
                                    <div {...useMergedProps(info.propsTarget, { className: "dpopover-body" })}>{children}</div>
                                    <div {...info.propsSentinel} />
                                </div>

                            </ZoomFade>
                        </div>
                    </ParentDepthContext.Provider>
                )
            })}
        </>
    );
}
