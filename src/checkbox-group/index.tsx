import { CheckboxGroup as AriaCheckboxGroup, CheckboxGroupChild as AriaCheckboxGroupChild, CheckboxGroupParent as AriaCheckboxGroupParent, TargetedCheckboxChangeEvent, UseCheckboxReturnType } from "preact-aria-widgets"
import { useMergedProps, useRef, useStableCallback, useState } from "preact-prop-helpers"
import { Checkbox, CheckboxProps } from "../checkbox/index.js"
import { GlobalAttributes, LabelledProps, OmitStrong } from "../utility/types.js"

export interface CheckboxGroupProps extends GlobalAttributes<HTMLSpanElement, "children">, CheckboxGroupParentProps {
    orientation: "horizontal" | "vertical"
}

export function CheckboxGroup({ orientation, children, label, labelPosition, debounce, loadingLabel, throttle, disabled, inline, getSortValue }: CheckboxGroupProps) {
    return (
        <AriaCheckboxGroup<HTMLSpanElement, HTMLInputElement>
            orientation={orientation}

            render={info => {
                return (
                    <span {...info.props}>
                        <CheckboxGroupParent label={label} labelPosition={labelPosition} debounce={debounce} loadingLabel={loadingLabel} throttle={throttle} disabled={disabled} inline={inline} getSortValue={getSortValue} />
                        {children}
                    </span>
                )
            }}
        />
    )
}

interface CheckboxGroupParentProps extends OmitStrong<LabelledProps<CheckboxProps, "tooltip">, "onValueChange" | "checked" | "tristate" | "imperativeHandle"> {
    getSortValue?(): unknown;
}

function CheckboxGroupParent({ label, labelPosition, debounce, loadingLabel, throttle, disabled, inline, getSortValue, ...props }: CheckboxGroupParentProps) {
    const imperativeHandle = useRef<UseCheckboxReturnType<HTMLInputElement, HTMLLabelElement>>(null);
    return (
        <AriaCheckboxGroupParent
            focusSelf={useStableCallback(() => {
                if (imperativeHandle.current)
                    imperativeHandle.current.checkboxLikeReturn.focusSelf();

            })}
            index={0}
            render={info => {
                return (
                    <Checkbox

                        labelPosition={labelPosition as any}
                        label={label}
                        throttle={throttle}
                        disabled={disabled}
                        inline={true}
                        tristate={true}
                        debounce={debounce}
                        loadingLabel={loadingLabel}
                        imperativeHandle={imperativeHandle}

                        checked={info.checkboxGroupParentReturn.checked}
                        onValueChange={useStableCallback(async (c, e) => { await info.checkboxGroupParentReturn.onParentCheckedChange(e) })}
                        propsInput={useMergedProps(props, info.propsChild, info.propsTabbable) as {}}
                    />
                )
            }}
        />
    )
}

export interface CheckboxGroupChildProps extends OmitStrong<LabelledProps<CheckboxProps, "tooltip">, "imperativeHandle"> {
    getSortValue?(): unknown;
    untabbable?: boolean;

    /**
     * This is 0-indexed (and auto-adjusted to be 1-indexed, aligned with the parent *technically* being the 0th index)
     */
    index: number;
}

export function CheckboxGroupChild({ checked, label, labelPosition, onValueChange, debounce, throttle, disabled, inline, loadingLabel, tristate, getSortValue, untabbable, index, ...props }: CheckboxGroupChildProps) {
    const imperativeHandle = useRef<UseCheckboxReturnType<HTMLInputElement, HTMLLabelElement>>(null);
    ++index;
    const [pendingFromParent, setPendingFromParent] = useState(false);

    return (
        <AriaCheckboxGroupChild
            checked={checked}
            focusSelf={useStableCallback(() => {
                if (imperativeHandle.current)
                    imperativeHandle.current.checkboxLikeReturn.focusSelf();

            })}
            index={index}
            onChangeFromParent={useStableCallback(async (c, e) => {
                try {
                    setPendingFromParent(true);
                    await onValueChange?.(c as boolean, e as TargetedCheckboxChangeEvent);
                }
                catch (ex) {
                    throw ex;
                }
                finally {
                    setPendingFromParent(false);
                }
            })}
            untabbable={untabbable}
            render={info => {
                return (
                    <Checkbox
                        checked={checked}
                        label={label}
                        inline={inline}
                        loadingLabel={loadingLabel}
                        tristate={tristate}
                        debounce={debounce}
                        throttle={throttle}
                        disabled={pendingFromParent || disabled}
                        labelPosition={labelPosition as any}
                        imperativeHandle={imperativeHandle}
                        onValueChange={useStableCallback(async (checked, event) => {
                            await onValueChange?.(checked, event);
                            info.checkboxGroupChildReturn.onChildCheckedChange(checked);
                        })}
                        propsInput={useMergedProps(props, info.propsChild, info.propsTabbable)}
                    />
                )
            }}
        />
    )
}
