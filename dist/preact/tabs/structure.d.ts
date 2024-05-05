import { ComponentChildren, Ref, UseTypeaheadNavigationReturnTypeSelf } from "preact-prop-helpers/preact";
import { GlobalAttributes } from "../utility/types.js";
import type { TabsProps } from "./index.js";
export interface StructureTabPanelProps extends GlobalAttributes<HTMLDivElement, "children">, Pick<TabsProps, "orientation"> {
    visibleOffset: number;
    visible: boolean | null;
}
export declare const StructureTabPanel: ({ orientation, visibleOffset, visible, children, ...props }: StructureTabPanelProps, ref: Ref<HTMLDivElement>) => import("preact-prop-helpers").JSX.Element;
export interface StructureTabsProps extends GlobalAttributes<HTMLDivElement, "children">, Pick<TabsProps, "orientation"> {
}
export interface StructureTabPanelsContainerProps extends GlobalAttributes<HTMLDivElement, "children">, Pick<TabsProps, "orientation"> {
}
export interface StructureTabListProps extends GlobalAttributes<HTMLUListElement, "children">, Pick<TabsProps, "orientation"> {
    childrenLabel: ComponentChildren;
    labelPosition: "before" | "after" | "hidden";
    typeaheadStatus: UseTypeaheadNavigationReturnTypeSelf["typeaheadStatus"];
    keyboardControlsDescription: string;
}
export declare const StructureTabs: ({ orientation, children, ...props }: StructureTabsProps, ref: Ref<HTMLDivElement>) => import("preact-prop-helpers").JSX.Element;
export declare const StructureTabPanelsContainer: ({ orientation, children: panels, ...props }: StructureTabPanelsContainerProps, ref: Ref<HTMLDivElement>) => import("preact-prop-helpers").JSX.Element;
export declare const StructureTabList: ({ orientation, typeaheadStatus, labelPosition, childrenLabel: labelJsx, children: tabs, keyboardControlsDescription, ...props }: StructureTabListProps, ref: Ref<HTMLUListElement>) => import("preact-prop-helpers").JSX.Element;
//# sourceMappingURL=structure.d.ts.map