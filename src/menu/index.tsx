import { clsx } from "clsx";
import { Menu as AriaMenu, MenuItem as AriaMenuItem, ProgressWithHandler, UseMenuItemReturnType, useDefaultRenderPortal } from "preact-aria-widgets/preact";
import { ComponentChildren, EventDetail, EventType, Ref, UseTypeaheadNavigationReturnTypeSelf, VNode, memo, returnUndefined, useCallback, useMergedProps, useRef, useStableCallback, useState, useTimeout } from "preact-prop-helpers/preact";
import { Fade, ZoomFade } from "preact-transition/preact";
import { usePopper } from "../popper/index.js";
import { forwardElementRef, memoForwardRef } from "../utility/forward-element-ref.js";
import { KeyboardAssistIcon } from "../utility/keyboard-assist.js";
import { GlobalAttributes } from "../utility/types.js";
import { useClonedElement } from "../utility/use-cloned-element.js";
import { usePortalId } from "../utility/use-portal-id.js";


export interface MenuProps extends GlobalAttributes<HTMLButtonElement, "children"> {
    forceOpen?: boolean | null | undefined;
    children?: ComponentChildren;
    selectedIndex?: number | null;
    align?: "start" | "end";
    keyboardControlsDescription?: string;
    onSelectedIndexChange?: null | ((index: number | null) => (void | Promise<void>));

    /**
     * This **MUST** be a `Button` or something that accepts `onPress` as a prop.
     */
    anchor: VNode;
}

export const Menu = memo(forwardElementRef(function Menu({ anchor, forceOpen, children, selectedIndex, align, keyboardControlsDescription, onSelectedIndexChange, ...props }: MenuProps, ref?: Ref<HTMLButtonElement>) {
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
            onDismiss={onClose}
            active={menuOpen}
            openDirection="down"
            orientation="vertical"
            singleSelectionMode="activation"
            singleSelectionAriaPropName="aria-selected"
            singleSelectedIndex={selectedIndex}
            onSingleSelectedIndexChange={useStableCallback(e => onSelectedIndexChange?.(e[EventDetail].selectedIndex))}

            render={(info) => {
                const portalId = usePortalId("menu");
                const { propsArrow, propsPopup, propsSource, propsData } = usePopper<HTMLButtonElement, HTMLDivElement, HTMLDivElement>({
                    popperParameters: {
                        open: popperOpen,
                        placement: `bottom-${align || "start"}`,
                        alignMode: "element",
                        absolutePositioning: false
                    }
                })


                return (
                    <>
                        {useClonedElement(anchor, useMergedProps({
                            onPress: onAnchorPress,
                            class: popperOpen ? "active" : ""
                        } as {}, props, info.propsTrigger, propsSource) as {}, ref)}

                        {useDefaultRenderPortal({
                            portalId,
                            children: (
                                <StructureMenuPopper {...propsPopup}>
                                    <StructureMenuArrow {...propsArrow} />
                                    <StructureMenuRoot {...info.propsSurface} popperOpen={popperOpen} typeaheadStatus={info.typeaheadNavigationReturn.typeaheadStatus} keyboardControlsDescription={keyboardControlsDescription ?? "Move to a menu item:"}>
                                        <StructureMenuFocusSentinel {...info.propsSentinel} />
                                        <StructureMenuList {...info.propsTarget}>{children}</StructureMenuList>
                                        <StructureMenuFocusSentinel {...info.propsSentinel} />
                                    </StructureMenuRoot>
                                </StructureMenuPopper>
                            )
                        })}
                    </>
                );
            }}
        />
    )
}))

export interface StructureMenuPopperProps extends GlobalAttributes<HTMLDivElement, "children"> { }

export const StructureMenuPopper = memoForwardRef(function StructureMenuPopper({ children, ...props }: StructureMenuPopperProps, ref: Ref<HTMLDivElement>) {
    return (<div {...useMergedProps({ className: "popper-menu" }, { ...props, ref })}>{children}</div>)
});

export interface StructureMenuRootProps extends GlobalAttributes<HTMLDivElement, "children"> {
    popperOpen: boolean;
    typeaheadStatus: UseTypeaheadNavigationReturnTypeSelf["typeaheadStatus"];
    keyboardControlsDescription: string;
}

export const StructureMenuRoot = memoForwardRef(function StructureMenuRoot({ popperOpen, typeaheadStatus, children, keyboardControlsDescription, ...props }: StructureMenuRootProps, ref: Ref<HTMLDivElement>) {
    return (
        <ZoomFade show={popperOpen} delayMountUntilShown exitVisibility="removed" zoomOriginInline={0} zoomOriginBlock={0} zoomMinInline={0.85} zoomMinBlock={0.85}>
            <KeyboardAssistIcon 
            leftRight={false} 
            upDown={true} 
            homeEnd={true} 
            pageKeys={true} 
            typeaheadStatus={typeaheadStatus}
            activateSpace={typeaheadStatus == 'none'}
            activateEnter={true}
            description={keyboardControlsDescription}>
                <div {...useMergedProps({ className: clsx("dropdown-menu shadow show") }, { ...props, ref })}>
                    {children}
                </div>
            </KeyboardAssistIcon>
        </ZoomFade>
    )
})

export interface StructureMenuListProps extends GlobalAttributes<HTMLDivElement, "children"> { }

export const StructureMenuList = memoForwardRef(function StructureMenuList({ children, ...props }: StructureMenuListProps, ref: Ref<HTMLDivElement>) {
    return (
        <div {...useMergedProps({ className: "dropdown-menu-list" }, { ...props, ref })}>{children}</div>
    )
})

export const StructureMenuArrow = memoForwardRef(function StructureMenuArrow(props: GlobalAttributes<HTMLDivElement>, ref: Ref<HTMLDivElement>) {
    return (<div {...props} ref={ref} />)
})

export const StructureMenuFocusSentinel = memoForwardRef(function StructureMenuFocusSentinel(props: GlobalAttributes<HTMLDivElement>, ref: Ref<HTMLDivElement>) {
    return (<div {...props} ref={ref} />)
})

export interface MenuItemProps extends GlobalAttributes<HTMLDivElement> {
    index: number;
    children?: ComponentChildren;
    disabled?: boolean;
    onPress?: (closeMenu: (e: EventType<any, any>) => void, e: EventType<any, any>) => (void | Promise<void>);
    getSortValue?: () => unknown;
    loadingLabel?: string;
}

export const MenuItem = memo(forwardElementRef(function MenuItem({ index, getSortValue, disabled, loadingLabel, onPress, children, ...props }: MenuItemProps, ref?: Ref<HTMLDivElement>) {
    const imperativeHandle = useRef<UseMenuItemReturnType<HTMLDivElement, any>>(null);

    return (
        <ProgressWithHandler<Event, undefined, HTMLDivElement, HTMLDivElement>
            asyncHandler={(_unused, e) => {
                console.assert(!!imperativeHandle.current);
                return onPress?.(imperativeHandle.current!.menuItemReturn.closeMenu, e);
            }}
            ariaLabel={loadingLabel || "The operation is in progress"}
            capture={returnUndefined}
            tagProgressIndicator="div"
            render={progressInfo => {

                const showSpinner = (progressInfo.asyncHandlerReturn.pending || progressInfo.asyncHandlerReturn.debouncingAsync || progressInfo.asyncHandlerReturn.debouncingSync);

                return (
                    <AriaMenuItem<HTMLDivElement>
                        imperativeHandle={imperativeHandle}
                        index={index}
                        singleSelectionDisabled={disabled || showSpinner}
                        onPress={progressInfo.asyncHandlerReturn.syncHandler}
                        render={menuInfo => {

                            return (
                                <StructureMenuItem {...useMergedProps(menuInfo.props, { ...props, ref })} showSpinner={showSpinner} disabled={(!!disabled) as never} pressing={menuInfo.pressReturn.pressing}>
                                    {children}
                                    <StructureMenuItemSpinner showSpinner={showSpinner} {...progressInfo.propsProgressIndicator} />
                                </StructureMenuItem>
                            )

                            /*const spinnerJsx = (<Fade show={showSpinner} exitVisibility="removed"><div {...progressInfo.propsProgressIndicator} className={clsx("spinner-border", "spinner-border-sm")} /></Fade>)
            
                            return (
                                <div {...useMergedProps(menuInfo.props, { ref, className: clsx("dropdown-item dropdown-item-with-icon-end", showSpinner && "pending", disabled && "disabled", menuInfo.pressReturn.pressing && "active") }, props)}>
                                    {children}
                                    <div className="dropdown-item-icon dropdown-item-icon-end">{spinnerJsx}</div>
                                </div>
                            )*/
                        }}
                    />
                )
            }}
        />
    )
}));

export interface StructureMenuItemProps extends GlobalAttributes<HTMLDivElement, "children"> {
    showSpinner: boolean;
    disabled: boolean;
    pressing: boolean;
}

export interface StructureMenuItemSpinnerProps extends GlobalAttributes<HTMLDivElement> {
    showSpinner: boolean;
}

const StructureMenuItem = memoForwardRef(function StructureMenuItem({ children, showSpinner, disabled, pressing, ...props }: StructureMenuItemProps, ref: Ref<HTMLDivElement>) {
    return (
        <div {...useMergedProps({ className: clsx("dropdown-item dropdown-item-with-icon-end", showSpinner && "pending", disabled && "disabled", pressing && "active") }, { ...props, ref })}>
            {children}
        </div>
    )
});


const StructureMenuItemSpinner = memoForwardRef(function StructureMenuItemSpinner({ showSpinner, ...props }: StructureMenuItemSpinnerProps, ref: Ref<HTMLDivElement>) {

    return (
        <div className="dropdown-item-icon dropdown-item-icon-end">
            <Fade show={showSpinner} exitVisibility="removed">
                <div {...useMergedProps({ class: clsx("spinner-border", "spinner-border-sm") }, { ...props, ref })} />
            </Fade>
        </div>
    )
});
