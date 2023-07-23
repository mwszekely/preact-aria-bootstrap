import { ComponentChildren, h, Ref, VNode } from "preact";
import { ElementToTag, TargetedButtonPressEvent } from "preact-aria-widgets";
import { Nullable, UseAsyncHandlerParameters } from "preact-prop-helpers";
import { ButtonFills, ButtonSizes, ButtonThemes } from "../context.js";
import { TooltipProps } from "../tooltip/index.js";
import { ButtonGroupChildProps } from "./button-group.js";
export interface ButtonProps<E extends HTMLElement> extends Pick<h.JSX.HTMLAttributes<E>, "children" | "style" | "class" | "className">, Partial<ButtonGroupChildProps>, Pick<UseAsyncHandlerParameters<any, any>, "debounce" | "throttle"> {
    ref?: Ref<E>;
    disabled?: boolean;
    loadingLabel?: string;
    tooltip?: ComponentChildren;
    tooltipPlacement?: TooltipProps["placement"];
    onPress: null | ((pressed: boolean | null, event: TargetedButtonPressEvent<E>) => (void | Promise<void>));
    tag?: ElementToTag<E>;
    badge?: VNode;
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
    pressed?: boolean;
}
export declare const Button: <E extends HTMLElement>({ tag: Tag, tooltip, buttonGroupIndex, children, tooltipPlacement, badge, pressed: standaloneOrMultiSelectPressed, disabled: userDisabled, onPress: onPressAsync, variantDropdown, variantFill, variantSize, loadingLabel, throttle, debounce, variantTheme, ...props }: ButtonProps<E>, ref?: Ref<E> | undefined) => import("preact").JSX.Element;
//# sourceMappingURL=button-action.d.ts.map