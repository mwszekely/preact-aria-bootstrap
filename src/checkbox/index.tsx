
import { clsx } from "clsx";
import { h, Ref } from "preact";
import { Checkbox as AriaCheckbox, CheckboxCheckedType, EventDetail, ProgressWithHandler, TargetedCheckboxChangeEvent, UseCheckboxReturnType } from "preact-aria-widgets";
import { UseAsyncHandlerParameters, useMergedProps } from "preact-prop-helpers";
import { Fade } from "preact-transition";
import { useContext } from "preact/hooks";
import { DefaultDisabledType, DisabledContext } from "../context.js";
import { WithinInputGroup } from "../input-group/shared.js";
import { Tooltip } from "../tooltip/index.js";
import { LabelledProps } from "../utility/types.js";
import { StructureCheckboxInput, StructureCheckboxLabel } from "./structure.js";

export interface CheckboxProps extends Pick<h.JSX.HTMLAttributes<any>, "children" | "style" | "class" | "className">, Partial<Pick<UseAsyncHandlerParameters<any, any>, "debounce" | "throttle">> {
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

function nextTristate(checked: CheckboxCheckedType) {
        if (checked == false)
            return "mixed" as unknown as boolean;
        else if (checked === "mixed")
            return true;
        else
            return false;
}

export function Checkbox({ label, labelPosition, checked, tristate, onValueChange, loadingLabel, debounce, forciblyPending, throttle, inline, disabled: userDisabled, imperativeHandle, propsInput, propsLabel, ...props }: LabelledProps<CheckboxProps, "tooltip">, ref?: Ref<any>) {
    labelPosition ??= "after"
    const isSwitch = (props as { _isSwitch: boolean })._isSwitch;
    if (isSwitch)
        delete (props as any)._isSwitch;

    const withinInputGroup = useContext(WithinInputGroup);

    return (
        <ProgressWithHandler<TargetedCheckboxChangeEvent, boolean, HTMLSpanElement, HTMLLabelElement>
            ariaLabel={loadingLabel ?? "Please wait while the operation completes."}
            forciblyPending={forciblyPending}
            asyncHandler={(next, event) => {
                if (tristate) 
                    return onValueChange(nextTristate(checked), event);
                else 
                    return onValueChange?.(next, event);
            }}
            capture={e => {
                if (tristate) 
                    return nextTristate(checked);
                else 
                    return e[EventDetail].checked as boolean;
            }}
            debounce={debounce}
            throttle={throttle}

            tagProgressIndicator="span"
            render={progressInfo => {
                const { asyncHandlerReturn, propsProgressIndicator, propsProgressRegion } = progressInfo;
                const { pending: p, debouncingAsync, debouncingSync, currentCapture, syncHandler } = asyncHandlerReturn;

                const pending = (p || debouncingAsync || debouncingSync);

                const loadingJsx = (
                    <Fade show={p} exitVisibility="removed"><span class="spinner-border spinner-border-sm" {...propsProgressIndicator} /></Fade>
                )

                const defaultDisabled = useContext(DisabledContext);
                const disabledType = useContext(DefaultDisabledType);
                let disabled = userDisabled;
                disabled ||= defaultDisabled;
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
                        imperativeHandle={imperativeHandle}


                        render={info => {

                            const inputJsx = <StructureCheckboxInput {...useMergedProps(info.propsInput, propsInput || {}, withinInputGroup ? { class: "mt-0" } : {})} />
                            const visibleLabel = <StructureCheckboxLabel {...useMergedProps(info.propsLabel, propsLabel || {})}>{label}</StructureCheckboxLabel>

                            if (!withinInputGroup) {
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
                                        {labelPosition == "tooltip" ? <Tooltip forceOpen={info.pressReturn.longPress || false} forward tooltip={label} alignMode="element" absolutePositioning={true}>{inputJsx}</Tooltip> : inputJsx}
                                        {labelPosition == "after" && visibleLabel}
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <>
                                        {labelPosition == "before" && <div {...({ className: clsx("input-group-text", pending && "pending") })}>{visibleLabel}</div>}
                                        <div {...useMergedProps({ className: clsx("input-group-text", pending && "pending", isSwitch && "form-switch", inline && "form-check-inline") }, props, { ref })}>
                                            {labelPosition == "tooltip" ? <Tooltip forceOpen={info.pressReturn.longPress || false} forward tooltip={label} alignMode="element" absolutePositioning={true}>{inputJsx}</Tooltip> : inputJsx}
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

