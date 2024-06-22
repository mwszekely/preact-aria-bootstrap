
import { clsx } from "clsx";
import { Tab as AriaTab, TabPanel as AriaTabPanel, Tabs as AriaTabs } from "preact-aria-widgets";
import { ComponentChildren, JSX, PersistentStates, Ref, createContext, memo, useContext, useMergedProps } from "preact-prop-helpers";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { GlobalAttributes, LabelledProps } from "../utility/types.js";
import { StructureTabList, StructureTabPanel, StructureTabPanelsContainer, StructureTabs } from "./structure.js";

export interface TabsProps extends GlobalAttributes<HTMLDivElement> {
    orientation?: "horizontal" | "vertical";
    tabs: ComponentChildren;
    panels: ComponentChildren;
    localStorageKey: keyof PersistentStates | null;
    propsTabsContainer?: JSX.HTMLAttributes<HTMLUListElement>;
    propsPanelsContainer?: JSX.HTMLAttributes<HTMLDivElement>;
    keyboardControlsDescription?: string;
}

export interface TabProps extends GlobalAttributes<HTMLLIElement, "children"> {
    index: number;
    children?: ComponentChildren;
}

export interface TabPanelProps extends GlobalAttributes<HTMLDivElement, "children"> {
    index: number;
    children?: ComponentChildren;
}

const OrientationContext = createContext<"horizontal" | "vertical">("horizontal");

export const Tabs = /* @__PURE__ */ memo(forwardElementRef(function Tabs({ keyboardControlsDescription, orientation, label, localStorageKey, labelPosition, panels, tabs, propsPanelsContainer, propsTabsContainer, ...props }: LabelledProps<TabsProps, never>, ref: Ref<HTMLDivElement>) {
    orientation ??= "horizontal"
    labelPosition ??= "before";
    if (labelPosition == "hidden")
        console.assert(typeof label == "string", `<Tabs />: When labelPosition is 'hidden', the label must be a string (as opposed to arbitrary JSX)`);
    return (
        <OrientationContext.Provider value={orientation}>
            <AriaTabs<HTMLUListElement, HTMLLIElement, HTMLLabelElement>
                localStorageKey={localStorageKey}
                orientation={orientation}
                ariaLabel={labelPosition == "hidden" ? label as string : null}
                pageNavigationSize={0}
                render={info => {
                    const labelJsx = <label {...info.propsLabel}>{label}</label>;
                    return (
                        <StructureTabs orientation={orientation} ref={ref} {...props}>
                            <StructureTabList {...info.propsContainer} childrenLabel={labelJsx} labelPosition={labelPosition!} typeaheadStatus={info.typeaheadNavigationReturn.typeaheadStatus} orientation={orientation} keyboardControlsDescription={keyboardControlsDescription ?? "Move to a tab:"}>{tabs}</StructureTabList>
                            <StructureTabPanelsContainer>{panels}</StructureTabPanelsContainer>
                        </StructureTabs>
                    );
                }}
            />
        </OrientationContext.Provider>
    )
}))

export const Tab = /* @__PURE__ */ memo(forwardElementRef(function Tab({ index, children, ...props }: TabProps, ref: Ref<HTMLLIElement>) {
    return (
        <AriaTab<HTMLSpanElement>
            index={index}

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

export const TabPanel = /* @__PURE__ */ memo(forwardElementRef(function TabPanel({ index, ...props }: TabPanelProps, ref: Ref<HTMLDivElement>) {
    const orientation = useContext(OrientationContext);

    return (
        <AriaTabPanel<HTMLDivElement>
            index={index}

            render={info => {

                return (
                    <StructureTabPanel
                        ref={ref}
                        visible={info.tabPanelReturn.visible}
                        visibleOffset={info.tabPanelReturn.visibleOffset || 0}
                        orientation={orientation}
                        {...useMergedProps(info.props, props)} />
                );
            }}
        />
    )
}))
