import { ComponentChildren, JSX, PersistentStates, Ref } from "preact-prop-helpers/preact";
import { GlobalAttributes, LabelledProps } from "../utility/types.js";
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
export declare const Tabs: ({ keyboardControlsDescription, orientation, label, localStorageKey, labelPosition, panels, tabs, propsPanelsContainer, propsTabsContainer, ...props }: LabelledProps<TabsProps, never>, ref: Ref<HTMLDivElement>) => JSX.Element;
export declare const Tab: ({ index, children, ...props }: TabProps, ref: Ref<HTMLLIElement>) => JSX.Element;
export declare const TabPanel: ({ index, ...props }: TabPanelProps, ref: Ref<HTMLDivElement>) => JSX.Element;
//# sourceMappingURL=index.d.ts.map