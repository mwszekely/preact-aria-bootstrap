import { h, Ref } from "preact";
import { ToolbarProps } from "preact-aria-widgets";
import { ButtonThemes } from "../context.js";
import { LabelledProps } from "../utility/types.js";
import { ButtonProps } from "./button-action.js";
export interface ButtonGroupProps extends Pick<h.JSX.HTMLAttributes<HTMLSpanElement>, "children" | "style" | "class" | "className"> {
    disabled?: boolean;
    selectedIndex?: number | null;
    onSelectedIndexChange?: null | ((index: number | null) => (void | Promise<void>));
    variantSize?: ButtonProps["variantSize"];
    variantTheme?: ButtonThemes;
    orientation?: ToolbarProps<HTMLSpanElement, HTMLButtonElement, HTMLLabelElement, any>["orientation"];
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
export declare function ButtonGroup({ children, onSelectedIndexChange: onSelectedIndexChangeAsync, variantTheme, variantSize, orientation, label, labelPosition, separated, disabled, selectedIndex, ...props }: LabelledProps<ButtonGroupProps, "within">, ref?: Ref<HTMLSpanElement>): import("preact").JSX.Element;
export declare function ButtonGroupGroup({ label, labelPosition, children, ...props }: LabelledProps<Pick<h.JSX.HTMLAttributes<HTMLSpanElement>, "class" | "className" | "style" | "children">, "within">, ref?: Ref<HTMLSpanElement>): import("preact").JSX.Element;
//# sourceMappingURL=button-group.d.ts.map