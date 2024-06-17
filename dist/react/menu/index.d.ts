import { ComponentChildren, EventType, Ref, UseTypeaheadNavigationReturnTypeSelf, VNode } from "preact-prop-helpers";
import { GlobalAttributes } from "../utility/types.js";
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
export declare const Menu: ({ anchor, forceOpen, children, selectedIndex, align, keyboardControlsDescription, onSelectedIndexChange, ...props }: MenuProps, ref?: Ref<HTMLButtonElement>) => any;
export interface StructureMenuPopperProps extends GlobalAttributes<HTMLDivElement, "children"> {
}
export declare const StructureMenuPopper: ({ children, ...props }: StructureMenuPopperProps, ref: Ref<HTMLDivElement>) => any;
export interface StructureMenuRootProps extends GlobalAttributes<HTMLDivElement, "children"> {
    popperOpen: boolean;
    typeaheadStatus: UseTypeaheadNavigationReturnTypeSelf["typeaheadStatus"];
    keyboardControlsDescription: string;
}
export declare const StructureMenuRoot: ({ popperOpen, typeaheadStatus, children, keyboardControlsDescription, ...props }: StructureMenuRootProps, ref: Ref<HTMLDivElement>) => any;
export interface StructureMenuListProps extends GlobalAttributes<HTMLDivElement, "children"> {
}
export declare const StructureMenuList: ({ children, ...props }: StructureMenuListProps, ref: Ref<HTMLDivElement>) => any;
export declare const StructureMenuArrow: (props: GlobalAttributes<HTMLDivElement>, ref: Ref<HTMLDivElement>) => any;
export declare const StructureMenuFocusSentinel: (props: GlobalAttributes<HTMLDivElement>, ref: Ref<HTMLDivElement>) => any;
export interface MenuItemProps extends GlobalAttributes<HTMLDivElement> {
    index: number;
    children?: ComponentChildren;
    disabled?: boolean;
    onPress?: (closeMenu: (e: EventType<any, any>) => void, e: EventType<any, any>) => (void | Promise<void>);
    getSortValue?: () => unknown;
    loadingLabel?: string;
}
export declare const MenuItem: ({ index, getSortValue, disabled, loadingLabel, onPress, children, ...props }: MenuItemProps, ref?: Ref<HTMLDivElement>) => any;
export interface StructureMenuItemProps extends GlobalAttributes<HTMLDivElement, "children"> {
    showSpinner: boolean;
    disabled: boolean;
    pressing: boolean;
}
export interface StructureMenuItemSpinnerProps extends GlobalAttributes<HTMLDivElement> {
    showSpinner: boolean;
}
//# sourceMappingURL=index.d.ts.map