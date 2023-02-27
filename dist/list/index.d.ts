import { ComponentChildren, h, Ref, VNode } from "preact";
import { AsyncHandler } from "preact-prop-helpers";
import { ButtonThemes } from "../context.js";
import { GlobalAttributes, LabelledProps, PaginatedProps } from "../utility/types.js";
export interface ListProps extends GlobalAttributes<HTMLDivElement, "children"> {
    /** Used to determine if left/right arrow key navigation is shown as an option */
    columns?: number;
    disabled?: boolean;
    selectedIndex?: number | null;
    staggered?: boolean;
    onSelectedIndexChange?: null | ((index: number | null) => (void | Promise<void>));
}
export interface ListItemProps extends GlobalAttributes<HTMLDivElement, "children"> {
    index: number;
    variantTheme?: ButtonThemes;
    disabled?: boolean;
    selected?: boolean;
    iconStart?: ComponentChildren | null | undefined;
    iconEnd?: ComponentChildren | null | undefined;
    onSelectedChange?: null | ((selected: boolean) => (void | Promise<void>));
    getSortValue?: () => unknown;
    badge?: VNode;
    loadingLabel?: string;
    onPress?: AsyncHandler<h.JSX.TargetedEvent<HTMLDivElement, Event>, void>;
}
export declare function List({ columns, disabled, selectedIndex, onSelectedIndexChange, label, labelPosition, children, paginationLabel, paginationLocation, paginationSize, staggered, ...props }: PaginatedProps<LabelledProps<ListProps, never>>): import("preact").JSX.Element;
export declare const ListItem: ({ index, variantTheme, getSortValue, children, selected, disabled, iconEnd, iconStart, badge, onPress, loadingLabel, onSelectedChange, ...props }: ListItemProps, ref?: Ref<any>) => import("preact").JSX.Element;
//# sourceMappingURL=index.d.ts.map