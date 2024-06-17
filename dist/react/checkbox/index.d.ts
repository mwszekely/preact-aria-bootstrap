import { TargetedCheckboxChangeEvent, UseCheckboxReturnType } from "preact-aria-widgets";
import { ComponentChildren, JSX, Ref, UseAsyncHandlerParameters } from "preact-prop-helpers";
import { LabelledProps } from "../utility/types.js";
export interface CheckboxProps extends Pick<JSX.HTMLAttributes<any>, "children" | "style" | "class" | "className">, Partial<Pick<UseAsyncHandlerParameters<any, any>, "debounce" | "throttle">> {
    inline?: boolean;
    checked: boolean | "mixed";
    onValueChange(checked: boolean, event: TargetedCheckboxChangeEvent): void | Promise<void>;
    loadingLabel?: string;
    disabled?: boolean;
    forciblyPending?: boolean;
    /**
     * A checkbox can always be tristate implicitly by setting `checked` to `"mixed"`,
     * but by setting `tristate` to `true` event handlers will properly cycle through all three states.
     */
    tristate?: boolean;
    imperativeHandle?: Ref<UseCheckboxReturnType<HTMLInputElement, HTMLLabelElement>>;
    /** Optional props to spread *specifically* to the input element */
    propsInput?: JSX.HTMLAttributes<HTMLInputElement>;
    /** Optional props to spread *specifically* to the input element */
    propsLabel?: JSX.HTMLAttributes<HTMLLabelElement>;
}
export declare function Checkbox({ label, labelPosition, checked, tristate, onValueChange, loadingLabel, debounce, forciblyPending, throttle, inline, disabled: userDisabled, imperativeHandle, propsInput, propsLabel, ...props }: LabelledProps<CheckboxProps, "tooltip">, ref?: Ref<any>): any;
export interface StructureCheckboxNormalOuterProps {
    labelPosition: "before" | "after" | "hidden";
    isSwitch: boolean;
    pending: boolean;
    inline: boolean;
    childrenProgressIndicator: ComponentChildren;
    childrenLabel: ComponentChildren;
    childrenInput: ComponentChildren;
    childrenTooltip: ComponentChildren;
}
export declare const StructureCheckboxNormalOuter: ({ labelPosition, isSwitch, pending, inline, childrenProgressIndicator: loadingJsx, childrenTooltip: label, childrenInput: inputJsx, childrenLabel: visibleLabel, ...props }: StructureCheckboxNormalOuterProps, ref: Ref<HTMLDivElement>) => any;
export interface StructureCheckboxInputGroupOuterProps {
    labelPosition: "before" | "after" | "hidden";
    isSwitch: boolean;
    pending: boolean;
    inline: boolean;
    childrenProgressIndicator: ComponentChildren;
    childrenLabel: ComponentChildren;
    childrenInput: ComponentChildren;
    childrenTooltip: ComponentChildren;
}
export declare const StructureCheckboxInputGroupOuter: ({ labelPosition, isSwitch, pending, inline, childrenProgressIndicator: loadingJsx, childrenTooltip: label, childrenInput: inputJsx, childrenLabel: visibleLabel, ...props }: StructureCheckboxNormalOuterProps, ref: Ref<HTMLDivElement>) => any;
//# sourceMappingURL=index.d.ts.map