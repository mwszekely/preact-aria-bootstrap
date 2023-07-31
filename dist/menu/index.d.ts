import { ComponentChildren, Ref, VNode } from "preact";
import { UseMenuReturnType, UseMenubarSubInfo } from "preact-aria-widgets";
import { EventType } from "preact-prop-helpers";
import { GlobalAttributes } from "../utility/types.js";
export interface MenuProps extends GlobalAttributes<HTMLButtonElement, "children"> {
    forceOpen?: boolean | null | undefined;
    children: ComponentChildren;
    selectedIndex?: number | null;
    align?: "start" | "end";
    onSelectedIndexChange?: null | ((index: number | null) => (void | Promise<void>));
    imperativeHandle?: Ref<UseMenuReturnType<HTMLDivElement, HTMLDivElement, HTMLDivElement, HTMLButtonElement, UseMenubarSubInfo<HTMLDivElement>>>;
    /**
     * This **MUST** be a `Button` or something that accepts `onPress` as a prop.
     */
    anchor: VNode;
}
export declare const Menu: ({ anchor, forceOpen, children, selectedIndex, align, onSelectedIndexChange, imperativeHandle, ...props }: MenuProps, ref?: Ref<HTMLButtonElement>) => import("preact").JSX.Element;
export interface MenuItemProps extends GlobalAttributes<HTMLDivElement> {
    index: number;
    children: ComponentChildren;
    disabled?: boolean;
    onPress?: (closeMenu: (e: EventType<any, any>) => void) => (void | Promise<void>);
    getSortValue?: () => unknown;
    loadingLabel?: string;
}
export declare const MenuItem: ({ index, getSortValue, disabled, loadingLabel, onPress, children, ...props }: MenuItemProps, ref?: Ref<HTMLDivElement>) => import("preact").JSX.Element;
//# sourceMappingURL=index.d.ts.map