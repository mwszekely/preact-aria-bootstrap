import { ComponentChildren, Ref } from "preact";
import { UseTypeaheadNavigationReturnTypeSelf } from "preact-prop-helpers";
import { GlobalAttributes } from "../utility/types.js";
import type { TabsProps } from "./index.js";
export interface StructureTabPanelProps extends GlobalAttributes<HTMLDivElement, "children">, Pick<TabsProps, "orientation"> {
    visibleOffset: number;
    visible: boolean | null;
}
export declare const StructureTabPanel: ({ orientation, visibleOffset, visible, children, ...props }: StructureTabPanelProps, ref: Ref<HTMLDivElement>) => import("preact").JSX.Element;
export interface StructureTabsProps extends GlobalAttributes<HTMLDivElement, "children">, Pick<TabsProps, "orientation"> {
}
export interface StructureTabPanelsContainerProps extends GlobalAttributes<HTMLDivElement, "children">, Pick<TabsProps, "orientation"> {
}
export interface StructureTabListProps extends GlobalAttributes<HTMLUListElement, "children">, Pick<TabsProps, "orientation"> {
    childrenLabel: ComponentChildren;
    labelPosition: "before" | "after" | "hidden";
    typeaheadStatus: UseTypeaheadNavigationReturnTypeSelf["typeaheadStatus"];
}
export declare const StructureTabs: ({ orientation, children, ...props }: StructureTabsProps, ref: Ref<HTMLDivElement>) => import("preact").JSX.Element;
export declare const StructureTabPanelsContainer: ({ orientation, children: panels, ...props }: StructureTabPanelsContainerProps, ref: Ref<HTMLDivElement>) => import("preact").JSX.Element;
export declare const StructureTabList: ({ orientation, typeaheadStatus, labelPosition, childrenLabel: labelJsx, children: tabs, ...props }: StructureTabListProps, ref: Ref<HTMLUListElement>) => import("preact").JSX.Element;
//# sourceMappingURL=structure.d.ts.map