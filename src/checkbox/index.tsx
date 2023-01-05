
import clsx from "clsx";
import { DefaultDisabledType, DisabledContext } from "../context";
import { ComponentChildren, h, Ref } from "preact";
import { Checkbox as AriaCheckbox, CheckboxChangeEvent, CheckboxProps as AriaCheckboxProps, EventDetail, ProgressWithHandler } from "preact-aria-widgets";
import { UseAsyncHandlerParameters, useMergedProps } from "preact-prop-helpers";
import { useContext } from "preact/hooks";
import { LabelledProps } from "../utility";
import { WithinInputGroup } from "../input-group/shared";
import { Tooltip } from "../tooltip";

export interface CheckboxProps extends Pick<h.JSX.HTMLAttributes<any>, "children" | "style" | "class" | "className">, Pick<UseAsyncHandlerParameters<any, any>, "debounce" | "throttle"> {
    inline?: boolean;
    checked: boolean | "mixed";
    onValueChange(checked: boolean, event: CheckboxChangeEvent<HTMLInputElement>): void | Promise<void>;
    loadingLabel?: string;
    disabled?: boolean;
}

export function Checkbox({ label, labelPosition, checked, onValueChange, loadingLabel, debounce, throttle, inline, disabled: userDisabled, ...props }: LabelledProps<CheckboxProps, "tooltip">, ref?: Ref<any>) {
    const isSwitch = (props as { _isSwitch: boolean })._isSwitch;
    if (isSwitch)
        delete (props as any)._isSwitch;

        const w = useContext(WithinInputGroup);

    return (
        <ProgressWithHandler<CheckboxChangeEvent<HTMLInputElement>, boolean, HTMLSpanElement, HTMLLabelElement>
            ariaLabel={loadingLabel ?? "Please wait while the operation completes."}
            asyncHandler={onValueChange}
            capture={e => e[EventDetail].checked as boolean}
            debounce={debounce}
            throttle={throttle}

            tagIndicator="span"
            render={progressInfo => {
                const { asyncHandlerReturn, propsIndicator, propsRegion } = progressInfo;
                const { pending: p, debouncingAsync, debouncingSync, currentCapture, syncHandler } = asyncHandlerReturn;

                const pending = (p || debouncingAsync || debouncingSync);

                const loadingJsx = (
                    <span class="spinner-border" {...propsIndicator} />
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
                        labelPosition={labelPosition == "hidden" || labelPosition == "tooltip"? "none" : "separate"}
                        tagInput="input"
                        tagLabel="label"
                        disabled={d}


                        render={info => {
                            const inputJsx = <input class={clsx("form-check-input", w && (labelPosition == 'hidden') && "mt-0")} {...info.propsInput} />
                            const visibleLabel = <label class="form-check-label" {...info.propsLabel}>{label}</label>
                            return (
                                <div {...useMergedProps({ className: clsx(labelPosition == "after" && ".form-check-reverse", w? "input-group-text" : "form-check", pending && "pending", isSwitch && "form-switch", inline && "form-check-inline", labelPosition == "before" && "form-check-reverse") }, props, { ref })}>
                                    {loadingJsx}
                                    {labelPosition == "before" && visibleLabel}
                                        {labelPosition == "tooltip"? <Tooltip forward tooltip={label}>{inputJsx}</Tooltip> : inputJsx}
                                    {labelPosition == "after" && visibleLabel}
                                </div>
                            )
                        }}
                    />
                );

            }}
        />
    )
}
