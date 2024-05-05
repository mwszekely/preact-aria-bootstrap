import { TargetedButtonPressEvent } from "preact-aria-widgets/preact";
import { ComponentChildren, Nullable, Ref, UseAsyncHandlerParameters, VNode } from "preact-prop-helpers/preact";
import { ButtonFills, ButtonSizes, ButtonThemes } from "../context.js";
import { TooltipProps } from "../tooltip/index.js";
import { GlobalAttributes } from "../utility/types.js";
import { ButtonGroupChildProps } from "./button-group.js";
export interface ButtonProps extends GlobalAttributes<HTMLButtonElement, "children" | "ref">, Partial<ButtonGroupChildProps>, Partial<Pick<UseAsyncHandlerParameters<any, any>, "debounce" | "throttle">> {
    disabled?: boolean;
    loadingLabel?: string;
    tooltip?: ComponentChildren;
    tooltipPlacement?: TooltipProps["placement"];
    onPress: null | ((pressed: boolean | null, event: TargetedButtonPressEvent<HTMLButtonElement>) => (void | Promise<void>));
    badge?: Nullable<VNode>;
    variantTheme?: Nullable<ButtonThemes>;
    variantFill?: Nullable<ButtonFills>;
    variantSize?: Nullable<ButtonSizes>;
    /**
     * Generally only used as part of a menu button
     */
    variantDropdown?: Nullable<"split" | "joined">;
    /**
     * If outside of a `ButtonGroup`, effectively acts like a checkbox.
     *
     * If inside of a `ButtonGroup`, used for multi-selection. Prefer `selectedIndex` for single-selection.
     *
     */
    pressed?: Nullable<boolean>;
}
export declare const Button: ({ tooltip, buttonGroupIndex, children, tooltipPlacement, badge, pressed: standaloneOrMultiSelectPressed, disabled: userDisabled, onPress: onPressAsync, variantDropdown, variantFill, variantSize, loadingLabel, throttle, debounce, variantTheme, ...props }: ButtonProps, ref: Ref<HTMLButtonElement>) => any;
export interface StructureButtonProps extends GlobalAttributes<HTMLButtonElement, "children"> {
}
export interface StructureButtonProgressIndicatorProps extends GlobalAttributes<HTMLProgressElement> {
}
export interface StructureButtonProgressLabelProps extends GlobalAttributes<HTMLLabelElement, "children"> {
}
//# sourceMappingURL=button-action.d.ts.map