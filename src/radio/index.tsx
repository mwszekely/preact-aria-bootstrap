
import { clsx } from "clsx";
import { createContext, h, Ref } from "preact";
import { LabelPosition, Progress, Radio as AriaRadio, RadioGroup as AriaRadioGroup, UseRadioGroupReturnType, RadioChangeEventHandler, TargetedRadioChangeEvent, EventDetail } from "preact-aria-widgets";
import { useAsync, UseAsyncHandlerParameters, useMergedProps, useState } from "preact-prop-helpers";
import { Fade } from "preact-transition";
import { useContext, useMemo, useRef } from "preact/hooks";
import { DefaultDisabledType, DisabledContext } from "../context.js";
import { Tooltip } from "../tooltip/index.js";
import { KeyboardAssistIcon } from "../utility/keyboard-assist.js";
import { LabelledProps } from "../utility/types.js";


export interface RadioGroupProps<V extends string | number> extends Pick<h.JSX.HTMLAttributes<HTMLSpanElement>, "children" | "style" | "class" | "className">, Pick<UseAsyncHandlerParameters<any, any>, "debounce" | "throttle"> {
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
export const RadioGroupContext = createContext<RadioGroupContext<string | number> | null>(null);

export function RadioGroup<V extends string | number>({ onValueChange: onSelectedIndexChangeAsync, name, children, inline, selectedValue, debounce, throttle, label, labelPosition, disabled, ...props }: LabelledProps<RadioGroupProps<V>, "within">, ref?: Ref<any>) {
    labelPosition ??= "after";
    
    const imperativeHandle = useRef<UseRadioGroupReturnType<V, HTMLSpanElement, HTMLLabelElement, HTMLInputElement>>(null);

    // Note: We use useAsync, instead of useAsyncHandler, because the actual event handler isn't here.
    // If we were listening for the individual radios' onInput events, we would do that, but
    // we're just listening for a regular ol' function.
    const [capturedValue, setCapturedValue] = useState(null as V | null);
    const { syncHandler: onSelectedIndexChangeSync, pending } = useAsync<[TargetedRadioChangeEvent<HTMLInputElement, V>], void | Promise<void>>(
        (event) => { return onSelectedIndexChangeAsync?.(event[EventDetail].selectedValue!, event); },
        {
            capture: (event) => { setCapturedValue(event[EventDetail].selectedValue!); return [event]; },
            throttle,
            debounce
        });

    const pendingValue = (pending ? capturedValue : null);
    inline ??= false;

    return (
        <DisabledContext.Provider value={disabled ?? false}>
            <RadioGroupContext.Provider value={useMemo(() => ({ pendingValue, inline: inline! }), [pendingValue, inline])}>
                <AriaRadioGroup<V, HTMLSpanElement, HTMLLabelElement, HTMLInputElement>
                    ariaLabel={labelPosition == 'hidden' ? label : null}
                    selectedValue={pendingValue ?? selectedValue}
                    ref={imperativeHandle}
                    name={name}
                    onSelectedValueChange={onSelectedIndexChangeSync}
                    arrowKeyDirection={inline ? "horizontal" : "vertical"}
                    render={info => {
                        const visibleLabel = <label {...info.propsRadioGroupLabel}>{label}</label>
                        return (
                            <>
                                {labelPosition == "before" && visibleLabel}
                                <KeyboardAssistIcon leftRight={!!inline} upDown={!inline} homeEnd={true} pageKeys={true} typeahead={true} typeaheadActive={info.typeaheadNavigationReturn.typeaheadStatus != "none"}>
                                    <span {...useMergedProps({ className: clsx("radio-group"), ref, "aria-busy": (pending ? "true" : undefined) }, info.propsRadioGroup, props)}>
                                        {labelPosition == "within" && visibleLabel}
                                        {children}
                                    </span>
                                </KeyboardAssistIcon>
                                {labelPosition == "after" && visibleLabel}
                            </>
                        )
                    }}
                />
            </RadioGroupContext.Provider>
        </DisabledContext.Provider>
    )
}

export interface RadioProps<V extends number | string> extends Pick<h.JSX.HTMLAttributes<any>, "children" | "style" | "class" | "className">, Pick<UseAsyncHandlerParameters<any, any>, "debounce" | "throttle"> {
    //inline?: boolean;
    //checked: boolean | "mixed";
    //onValueChange(checked: boolean, event: RadioChangeEvent<HTMLInputElement>): void | Promise<void>;
    loadingLabel?: string;
    disabled?: boolean;
    value: V;
    index: number;
}

export function Radio<V extends number | string>({ index, label, value, labelPosition, loadingLabel, debounce, throttle, disabled: userDisabled, ...props }: LabelledProps<RadioProps<V>, "tooltip">, ref?: Ref<any>) {


    const radioGroupInfo = useContext(RadioGroupContext);
    const { pendingValue, inline } = (radioGroupInfo ?? {});
    const singleSelectPending = pendingValue != null && (pendingValue === value);

    return (
        <Progress<HTMLSpanElement, HTMLLabelElement>
            ariaLabel={loadingLabel ?? "Please wait while the operation completes."}
            value={singleSelectPending ? "indeterminate" : "disabled"}
            tagIndicator="span"
            render={progressInfo => {
                const { propsIndicator, propsRegion, propsLabel } = progressInfo;




                //const inButtonGroup = (useContext(ButtonGroupContext) ?? false);
                const defaultDisabled = useContext(DisabledContext);
                const disabledType = useContext(DefaultDisabledType);
                let disabled = userDisabled;
                disabled ||= defaultDisabled;
                disabled ||= (pendingValue != null);
                //disabled ||= progressInfo.asyncHandlerReturn.pending;
                const d = disabled ? disabledType : false;
                //const buttonClass = clsx(`btn`, `btn-${variantTheme ?? "primary"}`, asyncHandlerReturn.pending && "pending", disabled && "disabled");

                const pending = singleSelectPending;//(pendingValue != null);

                const loadingJsx = (
                    <Fade show={pending} exitVisibility="removed"><span class="spinner-border" {...propsIndicator} /></Fade>
                );

                return (
                    <AriaRadio<LabelPosition, V, HTMLInputElement, HTMLLabelElement>
                        ariaLabel={labelPosition == 'hidden' ? label : null}
                        value={value}
                        index={index}
                        labelPosition={labelPosition == "hidden" ? "none" : "separate"}
                        tagInput="input"
                        tagLabel="label"
                        disabled={d}

                        render={info => {
                            const inputJsx = <input class="form-check-input" {...useMergedProps(info.propsInput, props, { ref })} />;

                            return (
                                <span {...useMergedProps({ className: clsx(labelPosition == "after" && ".form-check-reverse", "form-check", pending && "pending", inline && "form-check-inline", labelPosition == "before" && "form-check-reverse") })}>
                                    {loadingJsx}
                                    <label class="form-check-label" {...info.propsLabel}>
                                        {labelPosition == "before" && label}
                                        {labelPosition == "tooltip" ? <Tooltip forward tooltip={label} alignMode="element" absolutePositioning={true}>{inputJsx}</Tooltip> : inputJsx}
                                        {labelPosition == "after" && label}
                                    </label>
                                </span>
                            )
                        }}
                    />
                );

            }}
        />
    )
}
