
import { clsx } from "clsx";
import { ComponentChildren, Ref } from "preact";
import { UseTypeaheadNavigationReturnTypeSelf, useMergedProps, useState, useTimeout } from "preact-prop-helpers";
import { SlideZoomFade, Swappable } from "preact-transition";
import { memo } from "preact/compat";
import { memoForwardRef } from "../utility/forward-element-ref.js";
import { KeyboardAssistIcon } from "../utility/keyboard-assist.js";
import { GlobalAttributes } from "../utility/types.js";
import type { TabsProps } from "./index.js";


export interface StructureTabPanelProps extends GlobalAttributes<HTMLDivElement, "children">, Pick<TabsProps, "orientation"> { visibleOffset: number; visible: boolean | null; }

export const StructureTabPanel = memoForwardRef(function StructureTabPanel({ orientation, visibleOffset, visible, children, ...props }: StructureTabPanelProps, ref: Ref<HTMLDivElement>) {

    // Get the names of the properties on the transition that are correct for the `orientation` the parent uses.
    // (i.e. if make the transition slide on the X axis for "horizontal" and the Y axis for "vertical")
    const zeroValued = (orientation == "horizontal" ? "slideTargetBlock" : "slideTargetInline");
    const offsetted = (orientation == "horizontal" ? "slideTargetInline" : "slideTargetBlock");

    const originZero = (orientation == "horizontal" ? "zoomOriginBlock" : "zoomOriginInline");
    const originOffset = (orientation == "horizontal" ? "zoomOriginInline" : "zoomOriginBlock");

    const transitionProps = {
        [zeroValued]: 0,
        [offsetted]: Math.sign(visibleOffset ?? 0) * (1 / 24),
        [originZero]: 0,
        [originOffset]: 0.5
    }

    // IMPORTANT: exitVisibility is "removed" instead of "hidden"
    // because "hidden" can still cause a lot of layout stuff to happen on hidden tabs,
    // which is bad if one tab is heavier than others -- it'll still affect them even when closed.
    return (
        <SlideZoomFade delayMountUntilShown exitVisibility="removed" duration={500} show={visible} zoomMin={(11 / 12)} {...transitionProps}>
            <div {...useMergedProps({ className: clsx("tab-panel scroll-shadows scroll-shadows-y") }, { ...props, ref })}>
                <TabPanelChildren visible={visible || false}>{children}</TabPanelChildren>
            </div>
        </SlideZoomFade>
    );
})

const TabPanelChildren = memo(function TabPanelChildren({ children, visible }: { visible: boolean, children: ComponentChildren }) {
    // It's more than likely that any given panel's children will be heavy to render,
    // but we *really* don't want that to block the transition animation
    // so we wait until just slightly after the transition starts to actually mount the children.
    const [delayedVisible, setDelayedVisible] = useState(false);
    useTimeout({
        callback: () => setDelayedVisible(true),
        timeout: 10,
        triggerIndex: visible,
    })
    return <>{delayedVisible && children}</>;
})

export interface StructureTabsProps extends GlobalAttributes<HTMLDivElement, "children">, Pick<TabsProps, "orientation"> { }
export interface StructureTabPanelsContainerProps extends GlobalAttributes<HTMLDivElement, "children">, Pick<TabsProps, "orientation"> { }

export interface StructureTabListProps extends GlobalAttributes<HTMLUListElement, "children">, Pick<TabsProps, "orientation"> { childrenLabel: ComponentChildren; labelPosition: "before" | "after" | "hidden"; typeaheadStatus: UseTypeaheadNavigationReturnTypeSelf["typeaheadStatus"] }

export const StructureTabs = memoForwardRef(function StructureTabs({ orientation, children, ...props }: StructureTabsProps, ref: Ref<HTMLDivElement>) {
    return (
        <div {...useMergedProps({ class: clsx("tabs-container", orientation == "vertical" && "tabs-container-vertical") }, { ...props, ref })}>
            {children}
        </div>
    )
})

export const StructureTabPanelsContainer = memoForwardRef(function StructureTabPanelsContainer({ orientation, children: panels, ...props }: StructureTabPanelsContainerProps, ref: Ref<HTMLDivElement>) {
    return (
        <Swappable>
            <div {...useMergedProps({ class: "tab-panels-container" }, { ...props, ref })}>
                {panels}
            </div>
        </Swappable>
    )
})


export const StructureTabList = memoForwardRef(function StructureTabList({ orientation, typeaheadStatus, labelPosition, childrenLabel: labelJsx, children: tabs, ...props }: StructureTabListProps, ref: Ref<HTMLUListElement>) {
    let typeaheadActive = (typeaheadStatus && typeaheadStatus != 'none');
    return (
        <>
            {labelPosition == "before" && labelJsx}
            <KeyboardAssistIcon leftRight={orientation == "horizontal"} upDown={orientation == "vertical"} homeEnd={true} pageKeys={false} typeahead={true} typeaheadActive={typeaheadActive}>
                <ul {...useMergedProps({ className: clsx(`nav nav-tabs`, `typeahead-status-${typeaheadStatus}`) }, { ...props, ref })}>
                    {tabs}
                </ul>
            </KeyboardAssistIcon>
            {labelPosition == "after" && labelJsx}
        </>
    )
})
