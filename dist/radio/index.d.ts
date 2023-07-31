import { h, Ref } from "preact";
import { UseAsyncHandlerParameters } from "preact-prop-helpers";
import { LabelledProps } from "../utility/types.js";
export interface RadioGroupProps<V extends string | number> extends Pick<h.JSX.HTMLAttributes<HTMLSpanElement>, "children" | "style" | "class" | "className">, Partial<Pick<UseAsyncHandlerParameters<any, any>, "debounce" | "throttle">> {
    selectedValue: V | null;
    onValueChange: (value: V, event: Event) => (void | Promise<void>);
    disabled?: boolean;
    inline?: boolean;
    name: string;
}
export interface RadioGroupContext<V extends string | number> {
    pendingValue: V | null;
    inline: boolean;
}
export declare const RadioGroupContext: import("preact").Context<RadioGroupContext<string | number> | null>;
export declare function RadioGroup<V extends string | number>({ onValueChange: onSelectedIndexChangeAsync, name, children, inline, selectedValue, debounce, throttle, label, labelPosition, disabled, ...props }: LabelledProps<RadioGroupProps<V>, "within">, ref?: Ref<any>): import("preact").JSX.Element;
export interface RadioProps<V extends number | string> extends Pick<h.JSX.HTMLAttributes<any>, "children" | "style" | "class" | "className">, Partial<Pick<UseAsyncHandlerParameters<any, any>, "debounce" | "throttle">> {
    loadingLabel?: string;
    disabled?: boolean;
    value: V;
    index: number;
}
export declare function Radio<V extends number | string>({ index, label, value, labelPosition, loadingLabel, debounce, throttle, disabled: userDisabled, ...props }: LabelledProps<RadioProps<V>, "tooltip">, ref?: Ref<any>): import("preact").JSX.Element;
//# sourceMappingURL=index.d.ts.map