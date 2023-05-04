
import { clsx } from "clsx";
import { ComponentChildren, createContext, h, Ref } from "preact";
import { Tab as AriaTab, TabPanel as AriaTabPanel, Tabs as AriaTabs } from "preact-aria-widgets";
import { PersistentStates, returnZero, useMergedProps, useState, useTimeout } from "preact-prop-helpers";
import { SlideZoomFade, Swappable } from "preact-transition";
import { memo, useContext } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { KeyboardAssistIcon } from "../utility/keyboard-assist.js";
import { GlobalAttributes, LabelledProps } from "../utility/types.js";

export interface TabsProps extends GlobalAttributes<HTMLDivElement> {
    orientation?: "horizontal" | "vertical";
    tabs: ComponentChildren;
    panels: ComponentChildren;
    localStorageKey: keyof PersistentStates | null;
    propsTabsContainer?: h.JSX.HTMLAttributes<HTMLUListElement>;
    propsPanelsContainer?: h.JSX.HTMLAttributes<HTMLDivElement>;
}

export interface TabProps extends GlobalAttributes<HTMLLIElement, "children"> {
    index: number;
    getSortValue?: () => unknown;
    children?: ComponentChildren;
}

export interface TabPanelProps extends GlobalAttributes<HTMLDivElement, "children"> {
    index: number;
    children?: ComponentChildren;
}

const OrientationContext = createContext<"horizontal" | "vertical">("horizontal");

export const Tabs = memo(forwardElementRef(function Tabs({ orientation, label, localStorageKey, labelPosition, panels, tabs, propsPanelsContainer, propsTabsContainer, ...props }: LabelledProps<TabsProps, never>, ref: Ref<HTMLDivElement>) {
    orientation ??= "horizontal"
    labelPosition ??= "before";
    return (
        <OrientationContext.Provider value={orientation}>
            <AriaTabs<HTMLUListElement, HTMLLIElement, HTMLLabelElement>
                localStorageKey={localStorageKey}
                orientation={orientation}
                ariaLabel={labelPosition == "hidden" ? label : null}
                pageNavigationSize={0}
                render={info => {
                    const labelJsx = <label {...info.propsLabel}>{label}</label>;
                    return (
                        <div {...useMergedProps({ class: clsx("tabs-container", orientation == "vertical" && "tabs-container-vertical") }, { ...props, ref })}>
                            {labelPosition == "before" && labelJsx}
                            <KeyboardAssistIcon leftRight={orientation == "horizontal"} upDown={orientation == "vertical"} homeEnd={true} pageKeys={false} typeahead={true} typeaheadActive={info.typeaheadNavigationReturn.typeaheadStatus != "none"}>
                                <ul {...useMergedProps(info.propsContainer, propsTabsContainer ?? {}, { className: clsx(`nav nav-tabs`, `typeahead-status-${info.typeaheadNavigationReturn.typeaheadStatus}`) })}>
                                    {tabs}
                                </ul>
                            </KeyboardAssistIcon>
                            {labelPosition == "before" && labelJsx}
                            <Swappable>
                                <div {...useMergedProps({ class: "tab-panels-container" }, propsPanelsContainer ?? {})}>
                                    {panels}
                                </div>
                            </Swappable>
                        </div>
                    )
                }}
            />
        </OrientationContext.Provider>
    )
}))

export const Tab = memo(forwardElementRef(function Tab({ index, getSortValue, children, ...props }: TabProps, ref: Ref<HTMLLIElement>) {
    return (
        <AriaTab<HTMLSpanElement>
            index={index}
            getSortValue={getSortValue || returnZero}

            render={info => {
                return (
                    <li {...useMergedProps<HTMLLIElement>(props, { ref, className: `nav-item` })}><span {...useMergedProps(info.props, { className: clsx(`nav-link`, info.singleSelectionChildReturn.selected && "active") })}>{children}</span></li>
                )
            }}
        />
    )
}))

export const TabPanel = memo(forwardElementRef(function TabPanel({ index, children, ...props }: TabPanelProps, ref: Ref<HTMLDivElement>) {
    const orientation = useContext(OrientationContext);

    // Get the names of the properties on the transition that are correct for the `orientation` the parent uses.
    // (i.e. if make the transition slide on the X axis for "horizontal" and the Y axis for "vertical")
    const zeroValued = (orientation == "horizontal" ? "slideTargetBlock" : "slideTargetInline");
    const offsetted = (orientation == "horizontal" ? "slideTargetInline" : "slideTargetBlock");

    const originZero = (orientation == "horizontal" ? "zoomOriginBlock" : "zoomOriginInline");
    const originOffset = (orientation == "horizontal" ? "zoomOriginInline" : "zoomOriginBlock");

    return (
        <AriaTabPanel<HTMLDivElement>
            index={index}

            render={info => {

                // These use the 
                const transitionProps = {
                    [zeroValued]: 0,
                    [offsetted]: Math.sign(info.tabPanelReturn.visibleOffset ?? 0) * (1 / 24),
                    [originZero]: 0,
                    [originOffset]: 0.5
                }


                // IMPORTANT: exitVisibility is "removed" instead of "hidden"
                // because "hidden" can still cause a lot of layout stuff to happen on hidden tabs,
                // which is bad if one tab is heavier than others -- it'll still affect them even when closed.
                return (
                    <SlideZoomFade {...{ "data-index": index } as {}} exitVisibility="removed" delayMountUntilShown duration={500} show={info.tabPanelReturn.visible} zoomMin={(11 / 12)} {...transitionProps}>
                        <div {...useMergedProps(info.props, props, { ref, className: clsx("tab-panel scroll-shadows scroll-shadows-y") })}>
                            <TabPanelChildren visible={info.tabPanelReturn.visible || false}>{children}</TabPanelChildren>
                        </div>
                    </SlideZoomFade>
                )
            }}
        />
    )
}))

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
