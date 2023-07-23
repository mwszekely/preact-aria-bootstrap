import { Temporal } from "@js-temporal/polyfill";
import { ComponentChildren, h, Ref } from "preact";
import { UseAsyncReturnType } from "preact-prop-helpers";
import { LabelledProps } from "../utility/types.js";
interface TextFieldBase<E extends HTMLInputElement | HTMLTextAreaElement, T> extends Pick<h.JSX.HTMLAttributes<E>, "class" | "className" | "style"> {
    value: T;
    marginBottom?: number;
    onValueChange: null | ((value: T, event: h.JSX.TargetedEvent<E>) => void | Promise<void>);
    iconStart?: ComponentChildren | null | undefined;
    iconEnd?: ComponentChildren | null | undefined;
    size?: "lg" | "sm" | "md" | null;
    disabled?: boolean;
    readonly?: boolean | "plaintext";
    placeholder?: string | null;
    debounce?: number | null;
    throttle?: number | null;
    loadingLabel?: string;
    inputMode?: null | 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
    enterKeyHint?: null | 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
    autocomplete?: null | 'off' | 'on' | 'name' | 'honorific-prefix' | 'given-name' | 'additional-name' | 'family-name' | 'nickname' | 'email' | 'username' | 'new-password' | 'current-password' | 'one-time-code' | 'organization-title' | 'organization' | 'street-address' | 'address-line1' | 'address-line2' | 'address-line3' | 'address-line4' | 'country' | 'country-name' | 'postal-code' | 'cc-name' | 'cc-given-name' | 'cc-additional-name' | 'cc-family-name' | 'cc-number' | 'cc-exp' | 'cc-exp-month' | 'cc-exp-year' | 'cc-csc' | 'cc-type' | 'transaction-currency' | 'transaction-amount' | 'language' | 'bday-day' | 'bday-month' | 'bday-year' | 'sex' | 'tel-country-code' | 'tel-national' | 'tel-area-code' | 'tel-local' | 'tel-extention' | 'impp' | 'url' | 'photo';
}
interface TextFieldNumericBase<T extends number | bigint> extends TextFieldBase<HTMLInputElement, T | null> {
    min?: number;
    max?: number;
    step?: number;
    showSpinButtons?: boolean;
    /**
     * If provided, the input is resized, visually, to appear to accomodate a number as large as the specified number of digits.
     */
    digitDisplay?: number;
}
interface TextFieldNumberProps extends TextFieldNumericBase<number> {
    type: "number";
}
interface TextFieldBigIntProps extends TextFieldNumericBase<bigint> {
    type: "bigint";
}
interface TextFieldDateTimeProps extends TextFieldBase<HTMLInputElement, Temporal.Instant | null> {
    type: "datetime-local";
}
interface TextFieldDateProps extends TextFieldBase<HTMLInputElement, Temporal.PlainDate | null> {
    type: "date";
}
interface TextFieldTimeProps extends TextFieldBase<HTMLInputElement, Temporal.PlainTime | null> {
    type: "time";
    /**
     * **IMPORTANT**: Does not work on iOS Safari, which ignores the `step` attribute. An alternate solution must be used if this is important.
     */
    seconds?: boolean;
}
interface TextFieldTextAreaProps extends TextFieldBase<HTMLTextAreaElement, string> {
    type: "text";
    /**
     * Any value > 1 implies this is a textfield element.
     */
    rows?: number;
    /**
     * If true, this is a resizeable textarea element.
     *
     * Even if `rows` is 1, this forces the creation of a textarea.
     */
    resizeable?: boolean;
}
interface TextFieldTextInput extends TextFieldBase<HTMLInputElement, string> {
    type: "text" | "email" | "search";
}
type TextFieldTextProps = TextFieldTextInput | TextFieldTextAreaProps;
type TextFieldProps = TextFieldTextProps | TextFieldNumberProps | TextFieldBigIntProps | TextFieldDateTimeProps | TextFieldDateProps | TextFieldTimeProps;
export declare const TextField: ({ type, ...props }: LabelledProps<TextFieldProps, "floating" | "tooltip">, ref?: Ref<HTMLInputElement>) => import("preact").JSX.Element;
interface TFB<E extends HTMLInputElement | HTMLTextAreaElement, V> extends Required<Pick<TextFieldBase<E, any>, "inputMode" | "autocomplete" | "readonly" | "placeholder" | "disabled" | "size" | "debounce" | "throttle">> {
    rows: number | null;
    resizeable: boolean;
    value: string | number | null;
    capture: (e: h.JSX.TargetedEvent<E>) => V;
    onValueChange: null | ((value: V, event: h.JSX.TargetedEvent<E>) => (void | Promise<void>));
    loadingLabel: string;
    propsInput: h.JSX.HTMLAttributes<E>;
    propsLabel: h.JSX.HTMLAttributes<HTMLLabelElement>;
    iconEnd: ComponentChildren | null;
    iconStart: ComponentChildren | null;
    marginBottom: number | undefined;
    otherClasses?: string;
    otherProps?: h.JSX.HTMLAttributes<any>;
    ref?: Ref<any>;
}
export declare function useCommitTextField<C>({ getFocused, commit, currentCapture, showSpinner, value }: {
    showSpinner: boolean;
    currentCapture: C | undefined;
    value: C;
    commit: (value: C | undefined) => void;
    getFocused: () => boolean;
}): void;
declare const TextFieldBase: <E extends HTMLInputElement | HTMLTextAreaElement, V>({ capture, otherClasses, otherProps, marginBottom, autocomplete, iconEnd, iconStart, inputMode, loadingLabel, rows, resizeable, value, onValueChange, label, labelPosition, propsInput, propsLabel, debounce, disabled, placeholder, size, readonly, throttle }: LabelledProps<TFB<E, V>, "tooltip" | "floating">, ref?: Ref<any>) => import("preact").JSX.Element;
export declare const TextFieldSpinner: import("preact").FunctionComponent<{
    callCount: number;
    containerClass: string;
    debouncingAsync: boolean;
    debouncingSync: boolean;
    pending: boolean;
    propsIndicator: h.JSX.HTMLAttributes<any>;
    invocationResult: UseAsyncReturnType<any, any>["invocationResult"];
}>;
export {};
//# sourceMappingURL=index.d.ts.map