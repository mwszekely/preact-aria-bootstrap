
import { clsx } from "clsx";
import { createContext, h, Ref } from "preact";
import { Radio as AriaRadio, RadioGroup as AriaRadioGroup, EventDetail, LabelPosition, Progress, TargetedRadioChangeEvent, UseRadioGroupReturnType } from "preact-aria-widgets";
import { useAsync, UseAsyncHandlerParameters, useMergedProps, useState } from "preact-prop-helpers";
import { Fade } from "preact-transition";
import { useContext, useMemo, useRef } from "preact/hooks";
import { DefaultDisabledType, DisabledContext } from "../context.js";
import { Tooltip } from "../tooltip/index.js";
import { KeyboardAssistIcon } from "../utility/keyboard-assist.js";
import { LabelledProps } from "../utility/types.js";
import { StructureRadioWrapper } from "./structure.js";


export interface RadioGroupProps<V extends string | number> extends
    Pick<h.JSX.HTMLAttributes<HTMLSpanElement>, "children" | "style" | "class" | "className">,
    Partial<Pick<UseAsyncHandlerParameters<any, any>, "debounce" | "throttle">> {
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
export const RadioGroupContext = createContext<RadioGroupContext<string | number> | null>(null);

export function RadioGroup<V extends string | number>({ onValueChange: onSelectedIndexChangeAsync, keyboardControlsDescription, fieldset, selectionMode, name, children, inline, selectedValue, debounce, throttle, label, labelPosition, disabled, ...props }: LabelledProps<RadioGroupProps<V>, "within">, ref?: Ref<any>) {
    labelPosition ??= (fieldset? "within" : "after");
    selectionMode ??= "focus";

    const imperativeHandle = useRef<UseRadioGroupReturnType<V, HTMLSpanElement, HTMLLabelElement, HTMLInputElement>>(null);

    // Note: We use useAsync, instead of useAsyncHandler, because the actual event handler isn't here.
    // If we were listening for the individual radios' onInput events, we would do that, but
    // we're just listening for a regular ol' function.
    const [capturedValue, setCapturedValue] = useState(null as V | null);
    const { syncHandler: onSelectedIndexChangeSync, pending } = useAsync<[TargetedRadioChangeEvent<V>], void | Promise<void>>(
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
                    imperativeHandle={imperativeHandle}
                    name={name}
                    onSelectedValueChange={onSelectedIndexChangeSync}
                    arrowKeyDirection={inline ? "horizontal" : "vertical"}
                    singleSelectionMode={selectionMode}
                    render={info => {
                        const E = (fieldset? "fieldset" : "span");
                        const L = (fieldset? "legend" : "label") as "label";
                        const visibleLabel = <L {...useMergedProps({ class: clsx("form-label radio-group-label") }, info.propsRadioGroupLabel)}>{label}</L>
                        return (
                            <>
                                {labelPosition == "before" && visibleLabel}
                                <KeyboardAssistIcon leftRight={!!inline} upDown={!inline} homeEnd={true} pageKeys={true} typeahead={true} typeaheadActive={info.typeaheadNavigationReturn.typeaheadStatus != "none"} description={keyboardControlsDescription ?? "Select an option:"}>
                                    <E {...useMergedProps({ className: clsx("radio-group"), ref }, info.propsRadioGroup, props)}>
                                        {labelPosition == "within" && visibleLabel}
                                        {children}
                                    </E>
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

export interface RadioProps<V extends number | string> extends
    Pick<h.JSX.HTMLAttributes<any>, "children" | "style" | "class" | "className">,
    Partial<Pick<UseAsyncHandlerParameters<any, any>, "debounce" | "throttle">> {
    loadingLabel?: string;
    disabled?: boolean;
    value: V;
    index: number;
}

export function Radio<V extends number | string>({ index, label, value, labelPosition, loadingLabel, debounce, throttle, disabled: userDisabled, ...props }: LabelledProps<RadioProps<V>, "tooltip">, ref?: Ref<any>) {

    labelPosition ||= "after";

    const radioGroupInfo = useContext(RadioGroupContext);
    const { pendingValue, inline } = (radioGroupInfo ?? {});
    const singleSelectPending = pendingValue != null && (pendingValue === value);

    return (
        <Progress<HTMLSpanElement, HTMLLabelElement>
            ariaLabel={loadingLabel ?? "Please wait while the operation completes."}
            value={singleSelectPending ? "indeterminate" : "disabled"}
            tagProgressIndicator="span"
            render={progressInfo => {
                const { propsProgressIndicator, propsProgressRegion, propsProgressLabel } = progressInfo;




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
                    <Fade show={pending} exitVisibility="removed"><span  {...useMergedProps(propsProgressIndicator, { class: "spinner-border" })} /></Fade>
                );
                const labelRef = useRef<HTMLLabelElement>(null);

                return (
                    <AriaRadio<LabelPosition, V, HTMLInputElement, HTMLLabelElement>
                        ariaLabel={labelPosition == 'hidden' ? label : null}
                        value={value}
                        index={index}
                        labelPosition={labelPosition == "hidden" ? "none" : "separate"}
                        tagInput="input"
                        tagLabel="label"
                        disabled={d}
                        getText={() => labelRef.current?.textContent || `${value}` || ""}

                        render={info => {
                            const inputJsx = <input class="form-check-input" {...useMergedProps(info.propsInput, props, { ref })} />;

                            return (
                                <StructureRadioWrapper inline={inline || false} pending={pending} labelPosition={labelPosition!}>
                                    {loadingJsx}
                                    <label {...useMergedProps({ class: "form-check-label", ref: labelRef }, info.propsLabel)}>
                                        {labelPosition == "before" && label}
                                        {labelPosition == "tooltip" ? <Tooltip forward tooltip={label} alignMode="element" absolutePositioning={true}>{inputJsx}</Tooltip> : inputJsx}
                                        {labelPosition == "after" && label}
                                    </label>
                                </StructureRadioWrapper>
                            )
                        }}
                    />
                );

            }}
        />
    )
}
