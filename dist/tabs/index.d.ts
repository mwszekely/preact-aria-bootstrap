import { ComponentChildren, h, Ref } from "preact";
import { PersistentStates } from "preact-prop-helpers";
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
export declare const Tabs: ({ orientation, label, localStorageKey, labelPosition, panels, tabs, propsPanelsContainer, propsTabsContainer, ...props }: LabelledProps<TabsProps, never>, ref: Ref<HTMLDivElement>) => import("preact").JSX.Element;
export declare const Tab: ({ index, getSortValue, children, ...props }: TabProps, ref: Ref<HTMLLIElement>) => import("preact").JSX.Element;
export declare const TabPanel: ({ index, children, ...props }: TabPanelProps, ref: Ref<HTMLDivElement>) => import("preact").JSX.Element;
export interface StructureTabsProps extends GlobalAttributes<HTMLDivElement, "children">, Pick<TabsProps, "orientation"> {
}
export interface StructureTabPanelsContainerProps extends GlobalAttributes<HTMLDivElement, "children">, Pick<TabsProps, "orientation"> {
}
export interface StructureTabListProps extends GlobalAttributes<HTMLLIElement, "children">, Pick<TabsProps, "orientation"> {
    childrenLabel: ComponentChildren;
    labelPosition: "before" | "after" | "hidden";
    typeaheadActive: boolean;
}
export declare const StructureTabs: ({ orientation, children, ...props }: StructureTabsProps, ref: Ref<HTMLDivElement>) => import("preact").JSX.Element;
export declare const StructureTabPanelsContainer: ({ orientation, children: panels, ...props }: StructureTabPanelsContainerProps, ref: Ref<HTMLDivElement>) => import("preact").JSX.Element;
export declare const StructureTabList: ({ orientation, typeaheadActive, labelPosition, childrenLabel: labelJsx, children: tabs, ...props }: StructureTabListProps, ref: Ref<HTMLUListElement>) => import("preact").JSX.Element;
//# sourceMappingURL=index.d.ts.map