import clsx from "clsx";
import { ComponentChildren, Ref } from "preact";
import { defaultRenderPortal, Menu as AriaMenu, MenuItem as AriaMenuItem, ProgressWithHandler, UseMenubarSubInfo, UseMenuItemReturnType, UseMenuReturnType } from "preact-aria-widgets";
import { useTimeout } from "preact-prop-helpers";
import { returnUndefined, returnZero, useHasCurrentFocus, useMergedProps, useRefElement, useStableCallback, useState } from "preact-prop-helpers";
import { ClipFade, ZoomFade } from "preact-transition";
import { memo } from "preact/compat";
import { useCallback, useImperativeHandle, useRef } from "preact/hooks";
import { Button as ButtonAction, ButtonProps } from "../button/button-action";
import { usePopper } from "../popper";
import { forwardElementRef, GlobalAttributes, KeyboardAssistIcon, usePortalId } from "../utility";


export interface MenuProps extends GlobalAttributes<HTMLButtonElement, "children"> {
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
    imperativeHandle?: Ref<UseMenuReturnType<HTMLDivElement, HTMLDivElement, HTMLDivElement, HTMLButtonElement, UseMenubarSubInfo<HTMLDivElement>>>
}

export const Menu = memo(forwardElementRef(function Menu({ forceOpen, children, disabled, label, selectedIndex, buttonVariantDropdown, buttonVariantFill, buttonVariantSize, buttonVariantTheme, align, onSelectedIndexChange, imperativeHandle, ...props }: MenuProps, ref?: Ref<HTMLButtonElement>) {
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

    return (
        <AriaMenu<HTMLDivElement, HTMLDivElement, HTMLDivElement, HTMLButtonElement>
            onOpen={onOpen}
            onClose={onClose}
            open={menuOpen}
            openDirection="down"
            orientation="vertical"
            selectedIndex={selectedIndex}
            onSelectedIndexChange={onSelectedIndexChange}

            render={(info) => {
                useImperativeHandle(imperativeHandle!, () => info);
                const portalId = usePortalId("menu");
                const { propsArrow, propsPopup, propsSource, propsData } = usePopper<HTMLButtonElement, HTMLDivElement, HTMLDivElement>({
                    popperParameters: {
                        open: popperOpen,
                        placement: `bottom-${align || "start"}`,
                        alignMode: "element"
                    }
                })


                return (
                    <>
                        <ButtonAction
                            variantDropdown={buttonVariantDropdown}
                            variantFill={buttonVariantFill}
                            variantSize={buttonVariantSize}
                            variantTheme={buttonVariantTheme}
                            onPress={onAnchorPress}
                            disabled={disabled}
                            {...useMergedProps({ class: popperOpen ? "active" : "", ref }, props, info.propsTrigger, propsSource) as {}}>
                            {label}
                        </ButtonAction>
                        {defaultRenderPortal({
                            portalId,
                            children: (
                                <div {...useMergedProps(propsPopup, { className: "popper-menu" })}>
                                    <div {...propsArrow} />
                                    <ZoomFade show={popperOpen} delayMountUntilShown exitVisibility="removed" zoomOriginInline={0} zoomOriginBlock={0} zoomMinInline={0.85} zoomMinBlock={0.85}>
                                        <KeyboardAssistIcon leftRight={false} upDown={true} homeEnd={true} pageKeys={true} typeahead={true} typeaheadActive={info.typeaheadNavigationReturn.typeaheadStatus != "none"}>
                                            <div {...useMergedProps(info.propsSurface, { className: clsx("dropdown-menu shadow show") })}>
                                                <div {...info.propsSentinel} />
                                                <div {...useMergedProps(info.propsTarget, { className: "dropdown-menu-list" })}>{children}</div>
                                                <div {...info.propsSentinel} />
                                            </div></KeyboardAssistIcon>
                                    </ZoomFade>
                                </div>
                            )
                        })}
                    </>
                );
            }
            } />
    )
}))

export interface MenuItemProps extends GlobalAttributes<HTMLDivElement> {
    index: number;
    children: ComponentChildren;
    disabled?: boolean;
    onPress?: (closeMenu: () => void) => (void | Promise<void>);
    //selected?: boolean;
    //iconStart?: ComponentChildren | null | undefined;
    //iconEnd?: ComponentChildren | null | undefined;
    //onSelectedChange?: null | ((selected: boolean) => (void | Promise<void>));
    getSortValue?: () => unknown;
    loadingLabel?: string;
}

export const MenuItem = memo(forwardElementRef(function MenuItem({ index, getSortValue, disabled, loadingLabel, onPress: onPressWithoutClose, children, ...props }: MenuItemProps, ref?: Ref<HTMLDivElement>) {
    /*const onClose = useStableCallback<typeof onPressWithoutClose>((e) => {
        const ret = onPressWithoutClose?.(e);
        if (ret && (typeof ret == "object") && (ret instanceof Promise)) {

        }
    })*/

    const imperativeHandle = useRef<UseMenuItemReturnType<HTMLDivElement, any>>(null);

    return (
        <ProgressWithHandler<Event, undefined, HTMLDivElement, HTMLDivElement>
            asyncHandler={() => {
                console.assert(!!imperativeHandle.current);
                return onPressWithoutClose?.(imperativeHandle.current!.menuItemReturn.closeMenu);
            }}
            ariaLabel={loadingLabel || "The operation is in progress"}
            capture={returnUndefined}
            tagIndicator="div"
            render={progressInfo => {

                const showSpinner = (progressInfo.asyncHandlerReturn.pending || progressInfo.asyncHandlerReturn.debouncingAsync || progressInfo.asyncHandlerReturn.debouncingSync);

                return (
                    <AriaMenuItem<HTMLDivElement>
                        ref={imperativeHandle}
                        index={index}
                        selectionMode="activation"
                        getSortValue={getSortValue ?? returnZero}
                        disabled={disabled || showSpinner}
                        onPress={progressInfo.asyncHandlerReturn.syncHandler}
                        render={menuInfo => {

                            const spinnerJsx = (<div {...progressInfo.propsIndicator} class={clsx("spinner-border", "spinner-border-sm")} />)

                            return (
                                <div {...useMergedProps(menuInfo.props, { ref, className: clsx("dropdown-item dropdown-item-with-icon-end", showSpinner && "pending", disabled && "disabled", menuInfo.pressReturn.pseudoActive && "active") }, props)}>
                                    {children}
                                    <div class="dropdown-item-icon dropdown-item-icon-end">{spinnerJsx}</div>
                                </div>
                            )
                        }}
                        ariaPropName="aria-selected"
                    />
                )
            }}
        />
    )
}))
