
import { clsx } from "clsx";
import { ComponentChildren, createContext, h, Ref } from "preact";
import { Tab as AriaTab, TabPanel as AriaTabPanel, Tabs as AriaTabs } from "preact-aria-widgets";
import { PersistentStates, returnZero, useMergedProps } from "preact-prop-helpers";
import { memo, useContext } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { GlobalAttributes, LabelledProps } from "../utility/types.js";
import { StructureTabList, StructureTabPanel, StructureTabPanelsContainer, StructureTabs } from "./structure.js";

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
                        <StructureTabs orientation={orientation} ref={ref} {...props}>
                            <StructureTabList {...info.propsContainer} childrenLabel={labelJsx} labelPosition={labelPosition!} typeaheadStatus={info.typeaheadNavigationReturn.typeaheadStatus} orientation={orientation}>{tabs}</StructureTabList>
                            <StructureTabPanelsContainer>{panels}</StructureTabPanelsContainer>
                        </StructureTabs>
                    );
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
                    <li {...useMergedProps<HTMLLIElement>(props, { ref, className: `nav-item` })}>
                        <span {...useMergedProps(info.props, { className: clsx(`nav-link`, info.singleSelectionChildReturn.singleSelected && "active") })}>
                            {children}
                        </span>
                    </li>
                )
            }}
        />
    )
}))

export const TabPanel = memo(forwardElementRef(function TabPanel({ index, ...props }: TabPanelProps, ref: Ref<HTMLDivElement>) {
    const orientation = useContext(OrientationContext);

    return (
        <AriaTabPanel<HTMLDivElement>
            index={index}

            render={info => {

                return (
                    <StructureTabPanel
                        ref={ref}
                        visible={info.tabPanelReturn.visible || false}
                        visibleOffset={info.tabPanelReturn.visibleOffset || 0}
                        orientation={orientation}
                        {...useMergedProps(info.props, props)} />
                );
            }}
        />
    )
}))
