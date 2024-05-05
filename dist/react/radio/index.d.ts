import { JSX, Ref, UseAsyncHandlerParameters } from "preact-prop-helpers/preact";
import { LabelledProps } from "../utility/types.js";
export interface RadioGroupProps<V extends string | number> extends Pick<JSX.HTMLAttributes<HTMLSpanElement>, "children" | "style" | "class" | "className">, Partial<Pick<UseAsyncHandlerParameters<any, any>, "debounce" | "throttle">> {
    selectedValue: V | null;
    fieldset?: boolean;
    onValueChange: (value: V, event: Event) => (void | Promise<void>);
    disabled?: boolean;
    inline?: boolean;
    name: string;
    keyboardControlsDescription?: string;
    /**
     * Radio buttons generally auto-activate when they're focused,
     * but you can set that behavior to be manual activation (e.g. with the mouse, spacebar, etc.) instead.
     */
    selectionMode?: "activation" | "focus";
}
export interface RadioGroupContext<V extends string | number> {
    pendingValue: V | null;
    inline: boolean;
}
export declare const RadioGroupContext: import("preact").Context<RadioGroupContext<string | number> | null>;
export declare function RadioGroup<V extends string | number>({ onValueChange: onSelectedIndexChangeAsync, keyboardControlsDescription, fieldset, selectionMode, name, children, inline, selectedValue, debounce, throttle, label, labelPosition, disabled, ...props }: LabelledProps<RadioGroupProps<V>, "within">, ref?: Ref<any>): any;
export interface RadioProps<V extends number | string> extends Pick<JSX.HTMLAttributes<any>, "children" | "style" | "class" | "className">, Partial<Pick<UseAsyncHandlerParameters<any, any>, "debounce" | "throttle">> {
    loadingLabel?: string;
    disabled?: boolean;
    value: V;
    index: number;
}
export declare function Radio<V extends number | string>({ index, label, value, labelPosition, loadingLabel, debounce, throttle, disabled: userDisabled, ...props }: LabelledProps<RadioProps<V>, "tooltip">, ref?: Ref<any>): any;
//# sourceMappingURL=index.d.ts.map