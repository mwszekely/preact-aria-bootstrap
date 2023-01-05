
import { ComponentChildren } from "preact";
import { Tab as AriaTab, TabPanel as AriaTabPanel, Tabs as AriaTabs } from "preact-aria-widgets"
import { GlobalAttributes, KeyboardAssistIcon, LabelledProps } from "../utility";
import { SlideZoomFade, Swappable } from "preact-transition";
import { PersistentStates, returnZero, useMergedProps, useState, useTimeout } from "preact-prop-helpers";
import clsx from "clsx";
import { memo } from "preact/compat";

export interface TabsProps {
    orientation?: "horizontal" | "vertical";
    tabs: ComponentChildren;
    panels: ComponentChildren;
    localStorageKey: keyof PersistentStates | null;
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

export function Tabs({ orientation, label, localStorageKey, labelPosition, panels, tabs }: LabelledProps<TabsProps, never>) {
    return (
        <AriaTabs<HTMLUListElement, HTMLLIElement, HTMLLabelElement>
            localStorageKey={localStorageKey}
            orientation={orientation ?? "horizontal"}
            ariaLabel={labelPosition == "hidden" ? label : null}
            pageNavigationSize={0}
            render={info => {
                const labelJsx = <label {...info.propsLabel}>{label}</label>;
                return (
                    <div class="tabs-container">
                        {labelPosition == "before" && labelJsx}
                        <KeyboardAssistIcon leftRight={orientation == "horizontal"} upDown={orientation == "vertical"} homeEnd={true} pageKeys={false} typeahead={true} typeaheadActive={info.typeaheadNavigationReturn.typeaheadStatus != "none"}>
                            <ul {...useMergedProps(info.propsContainer, { className: clsx(`nav nav-tabs`, `typeahead-status-${info.typeaheadNavigationReturn.typeaheadStatus}`) })}>
                                {tabs}
                            </ul>
                        </KeyboardAssistIcon>
                        {labelPosition == "before" && labelJsx}
                        <Swappable>
                            <div class="tab-panels-container">
                                {panels}
                            </div>
                        </Swappable>
                    </div>
                )
            }}
        />
    )
}

export function Tab({ index, getSortValue, children, ...props }: TabProps) {
    return (
        <AriaTab<HTMLSpanElement>
            index={index}
            getSortValue={getSortValue || returnZero}

            render={info => {
                return (
                    <li {...useMergedProps<HTMLLIElement>(props, { className: `nav-item` })}><span {...useMergedProps(info.props, { className: clsx(`nav-link`, info.singleSelectionChildReturn.selected && "active") })}>{children}</span></li>
                )
            }}
        />
    )
}

export function TabPanel({ index, children, ...props }: TabPanelProps) {
    return (
        <AriaTabPanel<HTMLDivElement>
            index={index}

            render={info => {
                // IMPORTANT: exitVisibility is "removed" instead of "hidden"
                // because "hidden" can still cause a lot of layout stuff to happen on hidden tabs,
                // which is bad if one tab is heavier than others -- it'll still affect them even when closed.
                return (
                    <SlideZoomFade {...{ "data-index": index } as {}} exitVisibility="removed" delayMountUntilShown duration={500} show={info.tabPanelReturn.visible} slideTargetBlock={0} slideTargetInline={Math.sign(info.tabPanelReturn.visibleOffset ?? 0) * (1 / 24)} zoomMin={(11 / 12)} zoomOriginBlock={0} zoomOriginInline={0.5}>
                        <div {...useMergedProps(info.props, props, { className: clsx("tab-panel scroll-shadows scroll-shadows-y") })}>
                            <TabPanelChildren visible={info.tabPanelReturn.visible || false}>{children}</TabPanelChildren>
                        </div>
                    </SlideZoomFade>
                )
            }}
        />
    )
}

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
