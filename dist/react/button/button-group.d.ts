import { ToolbarProps } from "preact-aria-widgets";
import { JSX, Nullable, Ref } from "preact-prop-helpers";
import { ButtonThemes } from "../context.js";
import { LabelledProps } from "../utility/types.js";
import { ButtonProps } from "./button-action.js";
export interface ButtonGroupProps extends Pick<JSX.HTMLAttributes<HTMLSpanElement>, "children" | "style" | "class" | "className"> {
    /**
     * Disables all buttons in the group together (buttons cannot individually override this)
     */
    disabled?: boolean;
    keyboardControlsDescription?: string;
    /**
     * When `selectionMode` is `"single"`, this is the index of the child that's currently selected.
     */
    selectedIndex?: number | null;
    /** Only valid when `selectionLimit` is `"single"` */
    onSelectedIndexChange?: null | ((index: number | null) => (void | Promise<void>));
    /**
     * The size of each button in this group (buttons cannot individually override this; it is the same for all buttons)
     */
    variantSize?: ButtonProps["variantSize"];
    /**
     * The default theme for each button in this group (if a button specifies its own theme, the individual button's theme takes priority)
     */
    variantTheme?: ButtonThemes;
    /**
     * Is this button group arranged horizontally (default) or vertically?
     */
    orientation?: ToolbarProps<HTMLSpanElement, HTMLButtonElement, HTMLLabelElement, any>["orientation"];
    /**
     * Controls whether this button group allows selection, and how many children can be selected.
     *
     * * `"single"`: One child is selected with the `selectedIndex` prop.
     * * `"multi"`: Any number of children are selected on their individual `selected` props.
     * * `"off"`: Selection is disabled, implying this is a group of action buttons.
     */
    selectionMode?: Nullable<"single" | "multi" | "off">;
    /**
     * When true, each button in the group will have a gap between them and each have their own borders,
     * as opposed to all being connected.
     *
     * All other behavior remains the same. The group's class will be `btn-toolbar` instead of `btn-group`
     */
    separated?: boolean;
}
export interface ButtonGroupChildProps {
    /**
     * If contained within a ButtonGroup, this **must** be present and be the numeric index of the control.
     */
    buttonGroupIndex: number;
    /**
     * For multi-select groups, indicates this button is one of the selected ones.
     *
     * For single-select groups, prefer the `selectedIndex` prop.
     */
    pressed: boolean | null;
}
export interface ButtonGroupContext {
    pendingIndex: number | null;
}
export declare const ButtonGroupContext: import("preact").Context<ButtonGroupContext | null>;
export declare function ButtonGroup({ children, onSelectedIndexChange: onSelectedIndexChangeAsync, keyboardControlsDescription, variantTheme, variantSize, orientation, label, labelPosition, separated, disabled, selectedIndex, selectionMode, ...props }: LabelledProps<ButtonGroupProps, "within">, ref?: Ref<HTMLSpanElement>): any;
export declare function ButtonGroupGroup({ label, labelPosition, children, ...props }: LabelledProps<Pick<JSX.HTMLAttributes<HTMLSpanElement>, "class" | "className" | "style" | "children">, "within">, ref?: Ref<HTMLSpanElement>): any;
//# sourceMappingURL=button-group.d.ts.map