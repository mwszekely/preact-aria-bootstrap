import { h, Ref } from "preact";
import { TargetedCheckboxChangeEvent, UseCheckboxReturnType } from "preact-aria-widgets";
import { UseAsyncHandlerParameters } from "preact-prop-helpers";
import { LabelledProps } from "../utility/types.js";
export interface CheckboxProps extends Pick<h.JSX.HTMLAttributes<any>, "children" | "style" | "class" | "className">, Pick<UseAsyncHandlerParameters<any, any>, "debounce" | "throttle"> {
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
    propsInput?: h.JSX.HTMLAttributes<HTMLInputElement>;
    /** Optional props to spread *specifically* to the input element */
    propsLabel?: h.JSX.HTMLAttributes<HTMLLabelElement>;
}
export declare function Checkbox({ label, labelPosition, checked, tristate, onValueChange, loadingLabel, debounce, forciblyPending, throttle, inline, disabled: userDisabled, imperativeHandle, propsInput, propsLabel, ...props }: LabelledProps<CheckboxProps, "tooltip">, ref?: Ref<any>): import("preact").JSX.Element;
//# sourceMappingURL=index.d.ts.map