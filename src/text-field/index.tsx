import { Temporal } from "@js-temporal/polyfill";
import clsx from "clsx";
import { WithinInputGroup } from "../input-group/shared";
import { ComponentChildren, h, Ref } from "preact";
import { LabelPosition, ProgressWithHandler, useLabel } from "preact-aria-widgets";
import { useHasCurrentFocus, useMergedProps, useRefElement, useStableCallback, useTimeout } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useContext, useLayoutEffect, useRef } from "preact/hooks";
import { DefaultDisabledType } from "../context";
import { Tooltip } from "../tooltip";
import { forwardElementRef } from "../utility/forward-element-ref";
import { LabelledProps } from "../utility/types";
import { Fade } from "preact-transition";

interface TextFieldBase<E extends HTMLInputElement | HTMLTextAreaElement, T> extends Pick<h.JSX.HTMLAttributes<E>, "class" | "className" | "style"> {
    value: T | null;
    marginBottom?: number;
    onValueChange: null | ((value: T | null, event: h.JSX.TargetedEvent<E>) => void | Promise<void>);
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
    autocomplete?: null | 'off' | 'on' | 'name' | 'honorific-prefix' | 'given-name' | 'additional-name' | 'family-name' | 'nickname' | 'email' | 'username' | 'new-password' | 'current-password' | 'one-time-code' | 'organization-title' | 'organization' | 'street-address' | 'address-line1' | 'address-line2' | 'address-line3' | 'address-line4' | 'country' | 'country-name' | 'postal-code' | 'cc-name' | 'cc-given-name' | 'cc-additional-name' | 'cc-family-name' | 'cc-number' | 'cc-exp' | 'cc-exp-month' | 'cc-exp-year' | 'cc-csc' | 'cc-type' | 'transaction-currency' | 'transaction-amount' | 'language' | 'bday-day' | 'bday-month' | 'bday-year' | 'sex' | 'tel-country-code' | 'tel-national' | 'tel-area-code' | 'tel-local' | 'tel-extention' | 'impp' | 'url' | 'photo'
}

interface TextFieldNumericBase<T extends number | bigint> extends TextFieldBase<HTMLInputElement, T> {
    min?: number; // not T
    max?: number; // not T
    step?: number; // not T
    showSpinButtons?: boolean;

    /**
     * If provided, the input is resized, visually, to appear to accomodate a number as large as the specified number of digits.
     */
    digitDisplay?: number;

    //base?: number;
}

interface TextFieldNumberProps extends TextFieldNumericBase<number> { type: "number" }
interface TextFieldBigIntProps extends TextFieldNumericBase<bigint> { type: "bigint" }
type TextFieldNumeric = TextFieldNumberProps | TextFieldBigIntProps;

interface TextFieldDateTimeProps extends TextFieldBase<HTMLInputElement, Temporal.Instant> { type: "datetime-local" }
interface TextFieldDateProps extends TextFieldBase<HTMLInputElement, Temporal.PlainDate> { type: "date" }
interface TextFieldTimeProps extends TextFieldBase<HTMLInputElement, Temporal.PlainTime> {
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

export const TextField = memo(forwardElementRef(function TextField({ type, ...props }: LabelledProps<TextFieldProps, "floating" | "tooltip">, ref?: Ref<HTMLInputElement>) {
    switch (type) {
        case "bigint":
            return (<TextFieldBigInt ref={ref} type={type} {...props as any} />);
        case "number":
            return (<TextFieldNumber ref={ref} type={type} {...props as any} />);
        case "date":
            return (<TextFieldDate ref={ref} type={type} {...props as any} />)
        case "datetime-local":
            return (<TextFieldDateTime ref={ref} type={type} {...props as any} />)
        case "time":
            return (<TextFieldTime ref={ref} type={type} {...props as any} />)
        case "email":
        case "search":
        case "email":
        default:
            return (<TextFieldText ref={ref} type={type} {...props as any} />)
    }
}))

const TextFieldDateTime = memo(forwardElementRef(function TextFieldDateTime({ type, value, onValueChange: onValueChangeDateTime, marginBottom, iconEnd, iconStart, loadingLabel, debounce, throttle, disabled, placeholder, readonly, size, label, labelPosition, autocomplete, inputMode, enterKeyHint, ...props }: LabelledProps<TextFieldDateTimeProps, "floating">, ref?: Ref<HTMLInputElement>) {
    let value2 = value ? value.toString({ smallestUnit: "second" }) : null;
    if (value2) {
        console.assert(value2.endsWith("Z"));
        value2 = value2.substring(0, value2.length - 1);
    }

    return (
        <TextFieldBase<HTMLInputElement, Temporal.Instant | null>
            ref={ref}
            capture={e => {
                if (e.currentTarget.valueAsDate)
                    return Temporal.Instant.fromEpochMilliseconds(+e.currentTarget.valueAsDate);
                if (e.currentTarget.valueAsNumber != null && isFinite(e.currentTarget.valueAsNumber))
                    return Temporal.Instant.fromEpochMilliseconds(e.currentTarget.valueAsNumber);
                return null;
            }}
            iconEnd={iconEnd}
            iconStart={iconStart}
            loadingLabel={loadingLabel ?? "Please wait while the operation completes"}
            readonly={readonly ?? false}
            size={size ?? null}
            throttle={throttle ?? 0}
            debounce={debounce ?? 0}
            resizeable={false}
            rows={1}
            disabled={disabled ?? false}
            inputMode={inputMode ?? null}
            placeholder={placeholder ?? null}
            autocomplete={autocomplete ?? null}
            label={label as any}
            labelPosition={labelPosition as any}
            onValueChange={onValueChangeDateTime}
            propsInput={useMergedProps(props, { type: "datetime-local" })}
            propsLabel={{}}
            value={value2}
            marginBottom={marginBottom}
        />
    )
}))

const TextFieldDate = memo(forwardElementRef(function TextFieldDateTime({ type, value, onValueChange: onValueChangeDateTime, marginBottom, iconEnd, iconStart, loadingLabel, debounce, throttle, disabled, placeholder, readonly, size, label, labelPosition, autocomplete, inputMode, enterKeyHint, ...props }: LabelledProps<TextFieldDateProps, "floating">, ref?: Ref<HTMLInputElement>) {
    let value2 = value ? value.toString({}) : null;

    return (
        <TextFieldBase<HTMLInputElement, Temporal.PlainDate | null>
            ref={ref}
            capture={e => {
                //if (e.currentTarget.valueAsDate)
                //    return Temporal.PlainDate.from(e.currentTarget.valueAsDate.toISOString());
                if (e.currentTarget.value)
                    return Temporal.PlainDate.from(e.currentTarget.value);
                return null;
            }}
            // capture={e => e.currentTarget.valueAsDate ? Temporal.PlainDate.from(e.currentTarget.valueAsDate.toISOString()) : null}
            iconEnd={iconEnd}
            iconStart={iconStart}
            loadingLabel={loadingLabel ?? "Please wait while the operation completes"}
            readonly={readonly ?? false}
            size={size ?? null}
            throttle={throttle ?? 0}
            debounce={debounce ?? 0}
            resizeable={false}
            rows={1}
            disabled={disabled ?? false}
            inputMode={inputMode ?? null}
            placeholder={placeholder ?? null}
            autocomplete={autocomplete ?? null}
            label={label as any}
            labelPosition={labelPosition as any}
            onValueChange={onValueChangeDateTime}
            propsInput={useMergedProps(props, { type: "date" })}
            propsLabel={{}}
            value={value2}
            marginBottom={marginBottom}
        />
    )
}))

const TextFieldTime = memo(forwardElementRef(function TextFieldDateTime({ type, value, seconds, onValueChange: onValueChangeDateTime, marginBottom, iconEnd, iconStart, loadingLabel, debounce, throttle, disabled, placeholder, readonly, size, label, labelPosition, autocomplete, inputMode, enterKeyHint, ...props }: LabelledProps<TextFieldTimeProps, "floating">, ref?: Ref<HTMLInputElement>) {
    let value2 = value ? (`${value.hour.toString().padStart(2, "0")}:${value.minute.toString().padStart(2, "0")}${seconds ? `:${value.second.toString().padStart(2, "0")}` : ``}`) : null;

    return (
        <TextFieldBase<HTMLInputElement, Temporal.PlainTime | null>
            ref={ref}
            capture={e => {
                if (e.currentTarget.value) {
                    let value = e.currentTarget.value;
                    const [hour, minute, second] = value.split(":").map(s => +s) as [number, number, number?];
                    if (second == undefined)
                        return Temporal.PlainTime.from({
                            hour,
                            minute
                        });
                    else
                        return Temporal.PlainTime.from({
                            hour,
                            minute,
                            second
                        });
                }
                return null;
            }}
            iconEnd={iconEnd}
            iconStart={iconStart}
            loadingLabel={loadingLabel ?? "Please wait while the operation completes"}
            readonly={readonly ?? false}
            size={size ?? null}
            throttle={throttle ?? 0}
            debounce={debounce ?? 0}
            resizeable={false}
            rows={1}
            disabled={disabled ?? false}
            inputMode={inputMode ?? null}
            placeholder={placeholder ?? null}
            autocomplete={autocomplete ?? null}
            label={label as any}
            otherClasses={seconds ? "form-text-field-time-seconds" : ""}
            labelPosition={labelPosition as any}
            onValueChange={onValueChangeDateTime}
            propsInput={useMergedProps(props, { type: "time", step: seconds ? 1 : 60 })}
            propsLabel={{}}
            value={value2}
            marginBottom={marginBottom}
        />
    )
}))

const TextFieldNumber = memo(forwardElementRef(function TextFieldNumber({ type, value, onValueChange: onValueChangeNumber, digitDisplay, showSpinButtons, marginBottom, iconEnd, iconStart, loadingLabel, min, max, step, debounce, throttle, disabled, placeholder, readonly, size, label, labelPosition, autocomplete, inputMode, enterKeyHint, ...props }: LabelledProps<TextFieldNumberProps, "floating">, ref?: Ref<HTMLInputElement>) {

    if (value != null && max != null && value > max)
        value = max;
    if (value != null && min != null && value < min)
        value = min;


    return (
        <TextFieldBase<HTMLInputElement, number>
            ref={ref}
            capture={e => Math.max(Math.min(e.currentTarget.valueAsNumber, max ?? Infinity), min ?? -Infinity)}
            iconEnd={iconEnd}
            iconStart={iconStart}
            loadingLabel={loadingLabel ?? "Please wait while the operation completes"}
            readonly={readonly ?? false}
            size={size ?? null}
            throttle={throttle ?? 0}
            debounce={debounce ?? 0}
            resizeable={false}
            rows={1}
            disabled={disabled ?? false}
            inputMode={inputMode ?? null}
            placeholder={placeholder ?? null}
            autocomplete={autocomplete ?? null}
            label={label as any}
            labelPosition={labelPosition as any}
            onValueChange={onValueChangeNumber}
            propsInput={useMergedProps(props, { min, max, type: "number" })}
            otherClasses={clsx(!showSpinButtons ? "hide-spin-buttons" : "", digitDisplay && "form-text-field-number-sized")}
            otherProps={{ style: (digitDisplay ? { "--form-text-field-digits": (digitDisplay) } : {}) as {} }}
            propsLabel={{}}
            value={value}
            marginBottom={marginBottom}
        />
    )
}));


const TextFieldBigInt = memo(forwardElementRef(function TextFieldBigInt({ type, value, onValueChange: onValueChangeNumber, marginBottom, loadingLabel, min, max, step, iconEnd, iconStart, debounce, throttle, disabled, placeholder, readonly, size, label, labelPosition, autocomplete, inputMode, enterKeyHint, ...props }: LabelledProps<TextFieldBigIntProps, "floating">, ref?: Ref<any>) {
    return (
        <TextFieldBase<HTMLInputElement, bigint>
            ref={ref}
            marginBottom={marginBottom}
            capture={e => BigInt(e.currentTarget.value)}
            iconEnd={iconEnd}
            iconStart={iconStart}
            loadingLabel={loadingLabel ?? "Please wait while the operation completes"}
            readonly={readonly ?? false}
            size={size ?? null}
            throttle={throttle ?? null}
            resizeable={false}
            rows={1}
            debounce={debounce ?? null}
            disabled={disabled ?? false}
            inputMode={inputMode ?? null}
            placeholder={placeholder ?? null}
            autocomplete={autocomplete ?? null}
            label={label as any}
            labelPosition={labelPosition as any}
            onValueChange={onValueChangeNumber}
            propsInput={useMergedProps<HTMLInputElement>(props, { min, max, step, type: "number" })}
            propsLabel={{}}
            value={value?.toString() ?? null}
        />
    )
}));

/*
function TextFieldText({ type, onValueChange, value, label, labelPosition, disabled, placeholder, readonly, size, debounce, throttle, ...props }: LabelledProps<TextFieldProps, "floating">) {
    const { refElementReturn: { getElement: getInputElement, propsStable: propsInput1 } } = useRefElement<HTMLInputElement>({ refElementParameters: {} });
    const { refElementReturn: { getElement: getLabelElement, propsStable: propsLabel1 } } = useRefElement<HTMLLabelElement>({ refElementParameters: {} });
    const {
        propsInput: propsInput2,
        propsLabel: propsLabel2
    } = useLabel<LabelPosition, HTMLInputElement, HTMLLabelElement>({
        labelParameters: {
            ariaLabel: labelPosition == "hidden" ? label : null,
            labelPosition: "separate",
            onLabelClick: () => { getInputElement()?.focus(); },
            tagInput: "input",
            tagLabel: "label"
        },
        randomIdInputParameters: { prefix: "tfi-" },
        randomIdLabelParameters: { prefix: "tfl-" }
    });
    const {
        pending,
        currentCapture,
        syncHandler
    } = useAsyncHandler<Event, string>({
        asyncHandler: onValueChange ?? null,
        capture: useStableCallback(e => e.currentTarget.value),
        debounce,
        throttle
    });

    const isTextArea = (resizeable || (rows || 0) > 1);

    const labelJsx = (<label class="form-label" {...useMergedProps(propsLabel1, propsLabel2)}>{label}</label>);
    const inputJsx = <input value={value} onInput={syncHandler} type="text" class={clsx("form-control", disabled && "disabled", readonly && "readonly", size && `form-control-${size ?? "md"}`)} {...useMergedProps(propsInput1, propsInput2)} />;
    const textAreaJsx = <textarea class={clsx("form-controls", resizeable && "resizeable")} value={value} onInput={syncHandler} rows={rows ?? 1} />
    return (
        <div class={clsx("mb-3", labelPosition == "floating" && "form-floating")}>
            {labelPosition == "before" && labelJsx}
            {isTextArea ? textAreaJsx : inputJsx}
            {labelPosition == "after" && labelJsx}
        </div>
    );
}*/

const TextFieldText = memo(forwardElementRef(function TextFieldText(allProps: LabelledProps<TextFieldTextProps, "floating">, ref?: Ref<any>) {
    const { onValueChange, autocomplete, inputMode, enterKeyHint, type, value, label, loadingLabel, labelPosition, iconEnd, iconStart, marginBottom, debounce, throttle, disabled, placeholder, readonly, size, rows, resizeable, ...props } = allProps as (Partial<LabelledProps<TextFieldTextInput, "floating">> & Partial<LabelledProps<TextFieldTextAreaProps, "floating">>);
    return (
        <TextFieldBase<HTMLInputElement, string>
            ref={ref}
            iconEnd={iconEnd}
            iconStart={iconStart}
            loadingLabel={loadingLabel ?? "Please wait while the operation completes"}
            value={value ?? ""}
            resizeable={resizeable ?? false}
            capture={e => e.currentTarget.value}
            placeholder={placeholder ?? null}
            rows={rows ?? 1}
            readonly={readonly || false}
            onValueChange={onValueChange as any || null}
            propsInput={useMergedProps(props, { type: "text" })}
            propsLabel={{}}
            size={size || null}
            inputMode={inputMode || null}
            autocomplete={autocomplete || null}
            marginBottom={marginBottom}



            label={label as any}
            labelPosition={labelPosition as any}
            debounce={debounce ?? null}
            throttle={throttle ?? null}
            disabled={disabled ?? false}
        />
    )
}));
/*
function TextFieldTextInput({ onValueChange, autocomplete, inputMode, enterKeyHint, type, value, label, labelPosition, debounce, throttle, disabled, placeholder, readonly, size, ...props }: LabelledProps<TextFieldTextInput, "floating">) {
    return (
        <TextFieldBase<HTMLInputElement, string>
            value={value}
            capture={e => e.currentTarget.value}
            placeholder={placeholder ?? null}
            readonly={readonly || false}
            onValueChange={onValueChange as any || null}
            propsInput={{ type: "text" }}
            propsLabel={{}}
            size={size || null}
            inputMode={inputMode || null}
            autocomplete={autocomplete || null}

            label={label as any}
            labelPosition={labelPosition as any}
            debounce={debounce ?? null}
            throttle={throttle ?? null}
            disabled={disabled ?? false}
        />
    )
}

function TextFieldTextArea({ onValueChange, value, label, labelPosition, type, autocomplete, debounce, disabled, throttle, enterKeyHint, inputMode, placeholder, resizeable, rows, readonly, size, ...props }: LabelledProps<TextFieldTextArea, "floating">) {
    return (
        <TextFieldBase<HTMLInputElement, string>
            value={value}
            capture={e => e.currentTarget.value}
            placeholder={placeholder ?? null}
            readonly={readonly || false}
            resizeable={resizeable}
            rows={rows}
            size={size || null}
            onValueChange={onValueChange as any || null}
            propsInput={{ type: "text" }}
            propsLabel={{}}
            inputMode={inputMode ?? null}
            autocomplete={autocomplete ?? null}
            label={label as any}
            labelPosition={labelPosition as any}
            debounce={debounce ?? null}
            throttle={throttle ?? null}
            disabled={disabled || false}
        />
    )
}*/

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

export function useCommitTextField<C>({ getFocused, commit, currentCapture, showSpinner, value }: { showSpinner: boolean, currentCapture: C | undefined, value: C, commit: (value: C | undefined) => void, getFocused: () => boolean }) {


    const updateDOMValue = useStableCallback((newValue: C | undefined | null) => {
        if (getFocused())
            return;

        const value2 = (showSpinner ? currentCapture : (newValue ?? value));
        commit(value2);
    })

    // Always make sure that, when the value changes, so does the displayed input's value
    // except when it's currently being edited!
    const triggerIndex = useRef(0);
    useTimeout({
        timeout: 50,
        triggerIndex: ++(triggerIndex.current),
        callback: () => {
            if (!getFocused() && !showSpinner)
                updateDOMValue(value);
        }
    });
}

const TextFieldBase = memo(forwardElementRef(function TextFieldBase<E extends HTMLInputElement | HTMLTextAreaElement, V>({ capture, otherClasses, otherProps, marginBottom, autocomplete, iconEnd, iconStart, inputMode, loadingLabel, rows, resizeable, value, onValueChange, label, labelPosition, propsInput, propsLabel, debounce, disabled, placeholder, size, readonly, throttle }: LabelledProps<TFB<E, V>, "floating" | "tooltip">, ref?: Ref<any>) {
    const { refElementReturn: { getElement: getInputElement, propsStable: propsInput1 } } = useRefElement<HTMLInputElement>({ refElementParameters: {} });
    const { refElementReturn: { getElement: getLabelElement, propsStable: propsLabel1 } } = useRefElement<HTMLLabelElement>({ refElementParameters: {} });
    const withinInputGroup = useContext(WithinInputGroup);
    const {
        propsInput: propsInput2,
        propsLabel: propsLabel2
    } = useLabel<LabelPosition, HTMLInputElement, HTMLLabelElement>({
        labelParameters: {
            ariaLabel: labelPosition == "hidden" ? label : null,
            labelPosition: "separate",
            onLabelClick: () => { getInputElement()?.focus(); },
            tagInput: "input",
            tagLabel: "label"
        },
        randomIdInputParameters: { prefix: "tfi-" },
        randomIdLabelParameters: { prefix: "tfl-" }
    });

    if (labelPosition == "floating") {
        placeholder ||= "\xA0"
    }

    /*const {
        pending,
        currentCapture,
        syncHandler
    } = useAsyncHandler<h.JSX.TargetedEvent<E>, V>({
        asyncHandler: onValueChange ?? null,
        capture: useStableCallback(capture),
        debounce: debounce ?? undefined,
        throttle: throttle ?? undefined
    });*/

    const isTextArea = (resizeable || (rows || 0) > 1);

    return (
        <ProgressWithHandler<h.JSX.TargetedEvent<E, Event>, V, HTMLSpanElement, HTMLLabelElement>
            ariaLabel={loadingLabel ?? "Please wait while the operation completes."}
            asyncHandler={onValueChange}
            capture={capture}
            debounce={debounce ?? 500}
            throttle={throttle ?? 1000}

            tagIndicator="span"
            render={progressInfo => {


                const { asyncHandlerReturn: { pending: p, debouncingAsync, callCount, debouncingSync, currentCapture, syncHandler }, propsIndicator } = progressInfo;

                const showSpinner = (p || debouncingAsync || debouncingSync);

                const updateDOMValue = useStableCallback((newValue: string | number | undefined | null) => {
                    if (getCurrentFocusedInner())
                        return;

                    const element = getElement();
                    const value2 = (showSpinner ? currentCapture : (newValue ?? value));
                    if (element) {
                        if (element instanceof HTMLInputElement && typeof value2 == "number")
                            element.valueAsNumber = value2;
                        else
                            element.value = ((value2 as string) ?? "");
                    }
                })

                // Always make sure that, when the value changes, so does the displayed input's value
                // except when it's currently being edited!
                useLayoutEffect(() => {
                    if (!getCurrentFocusedInner() && !showSpinner)
                        updateDOMValue(value);
                });

                const { refElementReturn: { propsStable: p1, getElement }, refElementReturn } = useRefElement<E>({ refElementParameters: {} })
                const { hasCurrentFocusReturn: { propsStable: p2, getCurrentFocusedInner } } = useHasCurrentFocus<E>({
                    hasCurrentFocusParameters: {
                        onCurrentFocusedInnerChanged: null, onCurrentFocusedChanged: useStableCallback((focused) => {
                            if (!focused) {
                                updateDOMValue(undefined);
                            }
                            else {
                                updateDOMValue(value)
                            }
                        })
                    },
                    refElementReturn
                });



                useCommitTextField<V>({
                    getFocused: getCurrentFocusedInner, currentCapture, showSpinner, value: value as V, commit: (value2) => {

                        const element = getElement();
                        if (element) {
                            if (element instanceof HTMLInputElement && typeof value2 == "number")
                                element.valueAsNumber = value2;
                            else
                                element.value = ((value2 as string) ?? "");
                        }
                    }
                })



                const disabledType = useContext(DefaultDisabledType);

                let baseInputClass = clsx(
                    "form-control",
                    disabled && "disabled",
                    readonly && "readonly",
                    size && `form-control-${size ?? "md"}`,
                    readonly == 'plaintext' && 'form-control-plaintext'
                );
                if (disabled && disabledType == 'soft') {
                    disabled = false;
                    readonly = true;
                }
                if (readonly == 'plaintext') {
                    readonly = true;
                }

                const onInput: typeof syncHandler = (e) => {

                    // Special handling for number
                    // Basically, ensure that, if we have a min/max, 
                    // we're never allowed to enter a number below/above them.
                    //
                    // TODO: This can kick the input out from under the user's feet.
                    // Ideally it's not intrusive enough to matter 
                    if (e.currentTarget.type == "number") {
                        const { valueAsNumber, max: maxS, min: minS } = (e.currentTarget as HTMLInputElement);
                        if (valueAsNumber != value) {
                            if (valueAsNumber != null && isFinite(valueAsNumber)) {
                                let max: number | null = +maxS;
                                let min: number | null = +minS;
                                let clampedValue = null as number | null;
                                max = isFinite(max) ? max : null;
                                min = isFinite(min) ? min : null;
                                if (max != null && valueAsNumber > max) {
                                    clampedValue = max;
                                }
                                if (min != null && valueAsNumber < min) {
                                    clampedValue = min;
                                }
                                if (clampedValue) {
                                    (e.currentTarget as HTMLInputElement).valueAsNumber = clampedValue;
                                }
                            }
                            syncHandler(e);
                        }
                    }
                    else {
                        syncHandler(e);
                    }

                }

                const dataProps = {
                    "data-async-call-count": progressInfo.asyncHandlerReturn.callCount,
                    "data-async-resolve-count": progressInfo.asyncHandlerReturn.resolveCount,
                    "data-async-reject-count": progressInfo.asyncHandlerReturn.rejectCount,
                    "data-async-settle-count": progressInfo.asyncHandlerReturn.settleCount,
                    "data-async-has-error": progressInfo.asyncHandlerReturn.hasError,
                } as {};

                const labelJsx = (<label class={clsx(!withinInputGroup ? "form-label" : "input-group-text")} {...useMergedProps(propsLabel1, propsLabel2, propsLabel as h.JSX.HTMLAttributes<any>)}>{label}</label>);
                const inputJsx = <input {...dataProps} inputMode={inputMode || undefined} autocomplete={autocomplete || undefined} placeholder={placeholder ?? undefined} readonly={readonly} onInput={onInput as h.JSX.EventHandler<any>} {...useMergedProps({ ref }, p1, p2, propsInput1, propsInput2, { className: clsx(baseInputClass) }, propsInput as h.JSX.HTMLAttributes<any>)} />;
                const textAreaJsx = <textarea {...dataProps} placeholder={placeholder ?? undefined} readonly={readonly} onInput={onInput as h.JSX.EventHandler<any>} rows={rows ?? 1} {...useMergedProps({ ref }, p1, p2, { className: clsx(baseInputClass, resizeable && "resizeable") }, propsInput1, propsInput2, propsInput as h.JSX.HTMLAttributes<any>)} />
                const finalInputJsx = (isTextArea ? textAreaJsx : inputJsx);

                if (!withinInputGroup) {


                    return (
                        <div {...useMergedProps({
                            className: clsx(
                                "form-text-field",
                                otherClasses,
                                `mb-${marginBottom ?? 3}`,
                                `form-text-field-type-${propsInput.type}`,
                                !!iconStart && "form-text-field-with-icon-start",
                                (!!iconEnd || showSpinner) && "form-text-field-with-icon-end",
                                showSpinner && "pending")
                        }, otherProps || {})}>
                            {labelPosition == "before" && labelJsx}
                            <div class={clsx("form-text-field-control-container", labelPosition == "floating" && "form-floating")}>
                                {iconStart && <span class={clsx("form-control-icon-start form-control-icon show")}>{iconStart}</span>}
                                {labelPosition == "tooltip" ? <Tooltip tooltip={label}>{finalInputJsx}</Tooltip> : finalInputJsx}
                                {labelPosition == "floating" && labelJsx}
                                {iconEnd && <span class={clsx("form-control-icon-end form-control-icon", !showSpinner && "show")}>{iconEnd}</span>}
                                <TextFieldSpinner callCount={callCount} containerClass={"form-control-icon-end form-control-icon"} debouncingAsync={debouncingAsync} debouncingSync={debouncingSync} pending={p} propsIndicator={propsIndicator} />
                            </div>
                            {labelPosition == "after" && labelJsx}
                        </div>
                    );
                }
                else {


                    return (
                        <>
                            {labelPosition == "before" && labelJsx}
                            {iconStart && <span class={clsx("input-group-text")}>{iconStart}</span>}
                            {labelPosition == "tooltip" ? <Tooltip tooltip={label}>{finalInputJsx}</Tooltip> : finalInputJsx}
                            {labelPosition == "floating" && labelJsx}
                            {iconEnd && <span class={clsx("input-group-text", !showSpinner && "show")}>{iconEnd}</span>}
                            <TextFieldSpinner callCount={callCount} containerClass={""} debouncingAsync={debouncingAsync} debouncingSync={debouncingSync} pending={p} propsIndicator={propsIndicator} />
                            {labelPosition == "after" && labelJsx}
                        </>
                    );
                }

            }
            }
        />
    );
}));

export const TextFieldSpinner = memo(function A({ debouncingAsync, debouncingSync, pending: p, propsIndicator, containerClass, callCount }: { callCount: number, containerClass: string, debouncingAsync: boolean, debouncingSync: boolean, pending: boolean, propsIndicator: h.JSX.HTMLAttributes<any> }) {

    if (callCount == 0)
        return null;

    let pendingDisplayType = ((debouncingAsync || debouncingSync) ? 2 : p ? 1 : 0);

    const withinInputGroup = useContext(WithinInputGroup);

    const ret = (
        <>
            <Fade show={(pendingDisplayType == 1)} animateOnMount><span class={clsx(containerClass, `spinner-container`, "show")}><span class={clsx(`spinner spinner-border spinner-border-sm`)} {...((pendingDisplayType == 1) ? propsIndicator : {})} /></span></Fade>
            <Fade show={(pendingDisplayType == 2)} animateOnMount><span class={clsx(containerClass, `spinner-container`, "show")}><span class={clsx(`spinner spinner-grow spinner-grow-sm`)} {...((pendingDisplayType == 2) ? propsIndicator : {})} /></span></Fade>
        </>
    )

    if (!withinInputGroup) {
        return ret;
    }
    else {
        return (
            <div class="input-group-text input-group-text-field-spinners">{ret}</div>
        )
    }
})
