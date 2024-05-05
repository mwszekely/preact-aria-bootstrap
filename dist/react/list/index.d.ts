import { AsyncHandler, ComponentChildren, JSX, Nullable, Ref, VNode } from "preact-prop-helpers/preact";
import { ButtonThemes } from "../context.js";
import { GlobalAttributes, LabelledProps, PaginatedProps } from "../utility/types.js";
export interface ListProps extends GlobalAttributes<HTMLDivElement, "children"> {
    /**
     * Disables the entire list if set, allowing no selection or press events to occur.
     */
    disabled?: boolean;
    /**
     * Controls whether this list allows selection, and how many children can be selected.
     *
     * * `"single"`: One child is selected with the `selectedIndex` prop.
     * * `"multi"`: Any number of children are selected on their individual `selected` props.
     * * `"off"`: Selection is disabled, implying this is a list of action items.
     */
    selectionMode?: Nullable<"single" | "multi" | "off">;
    /**
     * When `selectionMode` is `"single"`, this is the index of the child that's currently selected.
     */
    selectedIndex?: number | null;
    /**
     * Delays rendering any given list item until the one before it renders. Recommended for long lists.
     */
    staggered?: boolean;
    /**
     * When `selectionMode` is `"single"`, this is called to change the selected index.
     */
    onSelectedIndexChange?: null | ((index: number | null) => (void | Promise<void>));
    children: VNode[];
}
export interface ListItemProps extends GlobalAttributes<HTMLDivElement, "children"> {
    /**
     * A unique integer for this child, relative to other children.
     */
    index: number;
    /**
     * The color of this list item's background
     */
    variantTheme?: ButtonThemes;
    /**
     * Disables this list item if set
     */
    disabled?: boolean;
    /**
     * **Multi-selection only**, i.e. if the parent List's `selectionMode` is `"multi"`.
     */
    selected?: boolean;
    /**
     * **Multi-selection only**, i.e. if the parent List's `selectionMode` is `"multi"`.
     */
    onSelectedChange?: null | ((selected: boolean) => (void | Promise<void>));
    /**
     * Optional child on the left side of the list item
     */
    iconStart?: ComponentChildren | null | undefined;
    /**
     * Optional child on the right side of the list item
     */
    iconEnd?: ComponentChildren | null | undefined;
    /**
     * A visual indicator in the corner of the list item. Read out alongside the main contents as one long string, so label it well.
     */
    badge?: VNode;
    loadingLabel?: string;
    /**
     * Optional. Only necessary if this is an "action-only" list; it's not needed for selection behavior.
     */
    onPress?: AsyncHandler<JSX.TargetedEvent<HTMLDivElement, Event>, void>;
    keyboardControlsDescription?: string;
}
export declare const List: import("preact").FunctionComponent<import("preact/compat").PropsWithoutRef<PaginatedProps<LabelledProps<ListProps, never>>> & {
    ref?: Ref<any> | undefined;
}>;
export declare const ListItem: ({ index, keyboardControlsDescription, variantTheme, children, selected, disabled, iconEnd, iconStart, badge, onPress, loadingLabel, onSelectedChange, ...props }: ListItemProps, ref?: Ref<any>) => any;
//# sourceMappingURL=index.d.ts.map