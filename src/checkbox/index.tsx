
import clsx from "clsx";
import { h, Ref } from "preact";
import { Checkbox as AriaCheckbox, CheckboxChangeEvent, EventDetail, ProgressWithHandler, UseCheckboxReturnType } from "preact-aria-widgets";
import { UseAsyncHandlerParameters, useMergedProps } from "preact-prop-helpers";
import { Fade } from "preact-transition";
import { useContext, useImperativeHandle } from "preact/hooks";
import { DefaultDisabledType, DisabledContext } from "../context";
import { WithinInputGroup } from "../input-group/shared";
import { Tooltip } from "../tooltip";
import { LabelledProps } from "../utility/types";

export interface CheckboxProps extends Pick<h.JSX.HTMLAttributes<any>, "children" | "style" | "class" | "className">, Pick<UseAsyncHandlerParameters<any, any>, "debounce" | "throttle"> {
    inline?: boolean;
    checked: boolean | "mixed";
    onValueChange(checked: boolean, event: CheckboxChangeEvent<HTMLInputElement>): void | Promise<void>;
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

export function Checkbox({ label, labelPosition, checked, tristate, onValueChange, loadingLabel, debounce, forciblyPending, throttle, inline, disabled: userDisabled, imperativeHandle, propsInput, propsLabel, ...props }: LabelledProps<CheckboxProps, "tooltip">, ref?: Ref<any>) {
    const isSwitch = (props as { _isSwitch: boolean })._isSwitch;
    if (isSwitch)
        delete (props as any)._isSwitch;

    const w = useContext(WithinInputGroup);

    return (
        <ProgressWithHandler<CheckboxChangeEvent<HTMLInputElement>, boolean, HTMLSpanElement, HTMLLabelElement>
            ariaLabel={loadingLabel ?? "Please wait while the operation completes."}
            forciblyPending={forciblyPending}
            asyncHandler={(next, event) => {
                if (tristate) {
                    if (checked == false)
                        return onValueChange?.("mixed" as unknown as boolean, event);
                    else if (checked === "mixed")
                        return onValueChange?.(true, event);
                    else
                        return onValueChange?.(false, event);
                }
                else {
                    return onValueChange?.(next, event);
                }
            }}
            capture={e => {
                if (tristate) {
                    if (checked == false)
                        return "mixed" as unknown as boolean;
                    else if (checked === "mixed")
                        return true;
                    else
                        return false;
                }
                else {
                    return e[EventDetail].checked as boolean
                }
            }}
            debounce={debounce}
            throttle={throttle}

            tagIndicator="span"
            render={progressInfo => {
                const { asyncHandlerReturn, propsIndicator, propsRegion } = progressInfo;
                const { pending: p, debouncingAsync, debouncingSync, currentCapture, syncHandler } = asyncHandlerReturn;

                const pending = (p || debouncingAsync || debouncingSync);

                const loadingJsx = (
                    <Fade show={p}><span class="spinner-border spinner-border-sm" {...propsIndicator} /></Fade>
                )

                const defaultDisabled = useContext(DisabledContext);
                const disabledType = useContext(DefaultDisabledType);
                let disabled = userDisabled;
                disabled ||= defaultDisabled;
                //disabled ||= pending;
                const d = disabled ? disabledType : false;

                return (
                    <AriaCheckbox<HTMLInputElement, HTMLLabelElement>
                        ariaLabel={labelPosition == 'hidden' ? label : null}
                        checked={(pending ? currentCapture : null) ?? checked}
                        onCheckedChange={syncHandler}
                        labelPosition={labelPosition == "hidden" || labelPosition == "tooltip" ? "none" : "separate"}
                        tagInput="input"
                        tagLabel="label"
                        disabled={d}
                        ref={imperativeHandle}


                        render={info => {
                            const inputJsx = <input class={clsx("form-check-input", w && "mt-0")} {...useMergedProps(info.propsInput, propsInput || {})} />
                            const visibleLabel = <label class="form-check-label" {...useMergedProps(info.propsLabel, propsLabel || {})}>{label}</label>;

                            if (!w) {
                                return (
                                    <div {...useMergedProps({
                                        className: clsx(
                                            "form-check",
                                            pending && "pending",
                                            isSwitch && "form-switch",
                                            inline && "form-check-inline",
                                            labelPosition == "before" && "form-check-reverse"
                                        )
                                    }, props, { ref })}>
                                        {loadingJsx}
                                        {labelPosition == "before" && visibleLabel}
                                        {labelPosition == "tooltip" ? <Tooltip forward tooltip={label} alignMode="element" absolutePositioning={true}>{inputJsx}</Tooltip> : inputJsx}
                                        {labelPosition == "after" && visibleLabel}
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <>
                                        {labelPosition == "before" && <div {...({ className: clsx("input-group-text", pending && "pending") })}>{visibleLabel}</div>}
                                        <div {...useMergedProps({ className: clsx("input-group-text", pending && "pending", isSwitch && "form-switch", inline && "form-check-inline") }, props, { ref })}>
                                            {labelPosition == "tooltip" ? <Tooltip forward tooltip={label} alignMode="element" absolutePositioning={true}>{inputJsx}</Tooltip> : inputJsx}
                                        </div>
                                        {labelPosition == "after" && <div {...({ className: clsx("input-group-text", pending && "pending") })}>{visibleLabel}</div>}
                                    </>
                                )
                            }

                        }}
                    />
                );

            }}
        />
    )
}
