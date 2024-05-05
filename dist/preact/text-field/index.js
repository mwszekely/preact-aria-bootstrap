import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import { Temporal } from "@js-temporal/polyfill";
import { clsx } from "clsx";
import { ProgressWithHandler, useLabel } from "preact-aria-widgets/preact";
import { memo, useContext, useHasCurrentFocus, useLayoutEffect, useMergedProps, useRef, useRefElement, useStableCallback, useTimeout } from "preact-prop-helpers/preact";
import { Fade } from "preact-transition/preact";
import { DefaultDisabledType } from "../context.js";
import { WithinInputGroup } from "../input-group/shared.js";
import { Tooltip } from "../tooltip/index.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
export const TextField = memo(forwardElementRef(function TextField({ type, ...props }, ref) {
    switch (type) {
        case "bigint":
            return (_jsx(TextFieldBigInt, { ref: ref, type: type, ...props }));
        case "number":
            return (_jsx(TextFieldNumber, { ref: ref, type: type, ...props }));
        case "date":
            return (_jsx(TextFieldDate, { ref: ref, type: type, ...props }));
        case "datetime-local":
            return (_jsx(TextFieldDateTime, { ref: ref, type: type, ...props }));
        case "time":
            return (_jsx(TextFieldTime, { ref: ref, type: type, ...props }));
        case "email":
        case "search":
        default:
            return (_jsx(TextFieldText, { ref: ref, type: type, ...props }));
    }
}));
const TextFieldDateTime = memo(forwardElementRef(function TextFieldDateTime({ type, value, onValueChange: onValueChangeDateTime, marginBottom, iconEnd, iconStart, loadingLabel, debounce, throttle, disabled, placeholder, readonly, size, label, labelPosition, autocomplete, inputMode, enterKeyHint, ...props }, ref) {
    let value2 = value ? value.toString({ smallestUnit: "second" }) : null;
    if (value2) {
        console.assert(value2.endsWith("Z"));
        value2 = value2.substring(0, value2.length - 1);
    }
    return (_jsx(TextFieldBase, { ref: ref, capture: e => {
            if (e.currentTarget.valueAsDate)
                return Temporal.Instant.fromEpochMilliseconds(+e.currentTarget.valueAsDate);
            if (e.currentTarget.valueAsNumber != null && isFinite(e.currentTarget.valueAsNumber))
                return Temporal.Instant.fromEpochMilliseconds(e.currentTarget.valueAsNumber);
            return null;
        }, iconEnd: iconEnd, iconStart: iconStart, loadingLabel: loadingLabel ?? "Please wait while the operation completes", readonly: readonly ?? false, size: size ?? null, throttle: throttle ?? 0, debounce: debounce ?? 0, resizeable: false, rows: 1, disabled: disabled ?? false, inputMode: inputMode ?? null, placeholder: placeholder ?? null, autocomplete: autocomplete ?? null, label: label, labelPosition: labelPosition, onValueChange: onValueChangeDateTime, propsInput: useMergedProps(props, { type: "datetime-local" }), propsLabel: {}, value: value2, marginBottom: marginBottom }));
}));
const TextFieldDate = memo(forwardElementRef(function TextFieldDateTime({ type, value, onValueChange: onValueChangeDateTime, marginBottom, iconEnd, iconStart, loadingLabel, debounce, throttle, disabled, placeholder, readonly, size, label, labelPosition, autocomplete, inputMode, enterKeyHint, ...props }, ref) {
    let value2 = value ? value.toString({}) : null;
    return (_jsx(TextFieldBase, { ref: ref, capture: e => {
            //if (e.currentTarget.valueAsDate)
            //    return Temporal.PlainDate.from(e.currentTarget.valueAsDate.toISOString());
            if (e.currentTarget.value)
                return Temporal.PlainDate.from(e.currentTarget.value);
            return null;
        }, 
        // capture={e => e.currentTarget.valueAsDate ? Temporal.PlainDate.from(e.currentTarget.valueAsDate.toISOString()) : null}
        iconEnd: iconEnd, iconStart: iconStart, loadingLabel: loadingLabel ?? "Please wait while the operation completes", readonly: readonly ?? false, size: size ?? null, throttle: throttle ?? 0, debounce: debounce ?? 0, resizeable: false, rows: 1, disabled: disabled ?? false, inputMode: inputMode ?? null, placeholder: placeholder ?? null, autocomplete: autocomplete ?? null, label: label, labelPosition: labelPosition, onValueChange: onValueChangeDateTime, propsInput: useMergedProps(props, { type: "date" }), propsLabel: {}, value: value2, marginBottom: marginBottom }));
}));
const TextFieldTime = memo(forwardElementRef(function TextFieldDateTime({ type, value, seconds, onValueChange: onValueChangeDateTime, marginBottom, iconEnd, iconStart, loadingLabel, debounce, throttle, disabled, placeholder, readonly, size, label, labelPosition, autocomplete, inputMode, enterKeyHint, ...props }, ref) {
    let value2 = value ? (`${value.hour.toString().padStart(2, "0")}:${value.minute.toString().padStart(2, "0")}${seconds ? `:${value.second.toString().padStart(2, "0")}` : ``}`) : null;
    return (_jsx(TextFieldBase, { ref: ref, capture: e => {
            if (e.currentTarget.value) {
                let value = e.currentTarget.value;
                const [hour, minute, second] = value.split(":").map(s => +s);
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
        }, iconEnd: iconEnd, iconStart: iconStart, loadingLabel: loadingLabel ?? "Please wait while the operation completes", readonly: readonly ?? false, size: size ?? null, throttle: throttle ?? 0, debounce: debounce ?? 0, resizeable: false, rows: 1, disabled: disabled ?? false, inputMode: inputMode ?? null, placeholder: placeholder ?? null, autocomplete: autocomplete ?? null, label: label, otherClasses: seconds ? "form-text-field-time-seconds" : "", labelPosition: labelPosition, onValueChange: onValueChangeDateTime, propsInput: useMergedProps(props, { type: "time", step: seconds ? 1 : 60 }), propsLabel: {}, value: value2, marginBottom: marginBottom }));
}));
const TextFieldNumber = memo(forwardElementRef(function TextFieldNumber({ type, value, onValueChange: onValueChangeNumber, digitDisplay, showSpinButtons, marginBottom, iconEnd, iconStart, loadingLabel, min, max, step, debounce, throttle, disabled, placeholder, readonly, size, label, labelPosition, autocomplete, inputMode, enterKeyHint, ...props }, ref) {
    if (value != null && max != null && value > max)
        value = max;
    if (value != null && min != null && value < min)
        value = min;
    return (_jsx(TextFieldBase, { ref: ref, capture: e => Math.max(Math.min(e.currentTarget.valueAsNumber, max ?? Infinity), min ?? -Infinity), iconEnd: iconEnd, iconStart: iconStart, loadingLabel: loadingLabel ?? "Please wait while the operation completes", readonly: readonly ?? false, size: size ?? null, throttle: throttle ?? 0, debounce: debounce ?? 0, resizeable: false, rows: 1, disabled: disabled ?? false, inputMode: inputMode ?? null, placeholder: placeholder ?? null, autocomplete: autocomplete ?? null, label: label, labelPosition: labelPosition, onValueChange: onValueChangeNumber, propsInput: useMergedProps(props, { min, max, type: "number" }), otherClasses: clsx(!showSpinButtons ? "hide-spin-buttons" : "", digitDisplay && "form-text-field-number-sized"), otherProps: { style: (digitDisplay ? { "--form-text-field-digits": (digitDisplay) } : {}) }, propsLabel: {}, value: value, marginBottom: marginBottom }));
}));
const TextFieldBigInt = memo(forwardElementRef(function TextFieldBigInt({ type, value, onValueChange: onValueChangeNumber, marginBottom, loadingLabel, min, max, step, iconEnd, iconStart, debounce, throttle, disabled, placeholder, readonly, size, label, labelPosition, autocomplete, inputMode, enterKeyHint, ...props }, ref) {
    return (_jsx(TextFieldBase, { ref: ref, marginBottom: marginBottom, capture: e => BigInt(e.currentTarget.value), iconEnd: iconEnd, iconStart: iconStart, loadingLabel: loadingLabel ?? "Please wait while the operation completes", readonly: readonly ?? false, size: size ?? null, throttle: throttle ?? null, resizeable: false, rows: 1, debounce: debounce ?? null, disabled: disabled ?? false, inputMode: inputMode ?? null, placeholder: placeholder ?? null, autocomplete: autocomplete ?? null, label: label, labelPosition: labelPosition, onValueChange: onValueChangeNumber, propsInput: useMergedProps(props, { min, max, step, type: "number" }), propsLabel: {}, value: value?.toString() ?? null }));
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

    const labelJsx = (<label className="form-label" {...useMergedProps(propsLabel1, propsLabel2)}>{label}</label>);
    const inputJsx = <input value={value} onInput={syncHandler} type="text" className={clsx("form-control", disabled && "disabled", readonly && "readonly", size && `form-control-${size ?? "md"}`)} {...useMergedProps(propsInput1, propsInput2)} />;
    const textAreaJsx = <textarea className={clsx("form-controls", resizeable && "resizeable")} value={value} onInput={syncHandler} rows={rows ?? 1} />
    return (
        <div className={clsx("mb-3", labelPosition == "floating" && "form-floating")}>
            {labelPosition == "before" && labelJsx}
            {isTextArea ? textAreaJsx : inputJsx}
            {labelPosition == "after" && labelJsx}
        </div>
    );
}*/
const TextFieldText = memo(forwardElementRef(function TextFieldText(allProps, ref) {
    const { onValueChange, autocomplete, inputMode, enterKeyHint, type, value, label, loadingLabel, labelPosition, iconEnd, iconStart, marginBottom, debounce, throttle, disabled, placeholder, readonly, size, rows, resizeable, ...props } = allProps;
    return (_jsx(TextFieldBase, { ref: ref, iconEnd: iconEnd, iconStart: iconStart, loadingLabel: loadingLabel ?? "Please wait while the operation completes", value: value ?? "", resizeable: resizeable ?? false, capture: e => e.currentTarget.value, placeholder: placeholder ?? null, rows: rows ?? 1, readonly: readonly || false, onValueChange: onValueChange || null, propsInput: useMergedProps(props, { type: "text" }), propsLabel: {}, size: size || null, inputMode: inputMode || null, autocomplete: autocomplete || null, marginBottom: marginBottom, label: label, labelPosition: labelPosition, debounce: debounce ?? null, throttle: throttle ?? null, disabled: disabled ?? false }));
}));
export function useCommitTextField({ getFocused, commit, currentCapture, showSpinner, value }) {
    const updateDOMValue = useStableCallback((newValue) => {
        if (getFocused())
            return;
        const value2 = (showSpinner ? currentCapture : (newValue ?? value));
        commit(value2);
    });
    // Always make sure that, when the value changes, so does the displayed input's value
    // except when it's currently being edited!
    const triggerIndex = useRef(0);
    useTimeout({
        timeout: 50,
        triggerIndex: value,
        callback: () => {
            if (!getFocused() && !showSpinner)
                updateDOMValue(value);
        }
    });
}
const TextFieldBase = memo(forwardElementRef(function TextFieldBase({ capture, otherClasses, otherProps, marginBottom, autocomplete, iconEnd, iconStart, inputMode, loadingLabel, rows, resizeable, value, onValueChange, label, labelPosition, propsInput, propsLabel, debounce, disabled, placeholder, size, readonly, throttle }, ref) {
    labelPosition ??= "before";
    if (labelPosition == "hidden") {
        console.assert(typeof label == "string");
    }
    const { refElementReturn: { getElement: getInputElement }, propsStable: propsInput1 } = useRefElement({ refElementParameters: {} });
    const { refElementReturn: { getElement: getLabelElement }, propsStable: propsLabel1 } = useRefElement({ refElementParameters: {} });
    const withinInputGroup = useContext(WithinInputGroup);
    const { propsInput: propsInput2, propsLabel: propsLabel2 } = useLabel({
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
        placeholder ||= "\xA0";
    }
    /*const {
        pending,
        currentCapture,
        syncHandler
    } = useAsyncHandler<JSX.TargetedEvent<E>, V>({
        asyncHandler: onValueChange ?? null,
        capture: useStableCallback(capture),
        debounce: debounce ?? undefined,
        throttle: throttle ?? undefined
    });*/
    const isTextArea = (resizeable || (rows || 0) > 1);
    return (_jsx(ProgressWithHandler, { ariaLabel: loadingLabel ?? "Please wait while the operation completes.", asyncHandler: onValueChange, capture: capture, debounce: debounce ?? 500, throttle: throttle ?? 1000, tagProgressIndicator: "span", render: progressInfo => {
            const { asyncHandlerReturn: { pending: p, debouncingAsync, callCount, debouncingSync, currentCapture, syncHandler, invocationResult }, propsProgressIndicator } = progressInfo;
            const showSpinner = (p || debouncingAsync || debouncingSync);
            const updateDOMValue = useStableCallback((newValue) => {
                if (getCurrentFocusedInner())
                    return;
                const element = getElement();
                const value2 = (showSpinner ? currentCapture : (newValue ?? value));
                if (element) {
                    if (element instanceof HTMLInputElement && typeof value2 == "number")
                        element.valueAsNumber = value2;
                    else
                        element.value = (value2 ?? "");
                }
            });
            // Always make sure that, when the value changes, so does the displayed input's value
            // except when it's currently being edited!
            useLayoutEffect(() => {
                if (!getCurrentFocusedInner() && !showSpinner)
                    updateDOMValue(value);
            });
            const { refElementReturn: { getElement }, refElementReturn, propsStable: p1 } = useRefElement({ refElementParameters: {} });
            const { hasCurrentFocusReturn: { propsStable: p2, getCurrentFocusedInner } } = useHasCurrentFocus({
                hasCurrentFocusParameters: {
                    onCurrentFocusedInnerChanged: null, onCurrentFocusedChanged: useStableCallback((focused) => {
                        if (!focused) {
                            updateDOMValue(undefined);
                        }
                        else {
                            updateDOMValue(value);
                        }
                    })
                },
                refElementReturn
            });
            useCommitTextField({
                getFocused: getCurrentFocusedInner,
                currentCapture,
                showSpinner,
                value: value,
                commit: (value2) => {
                    const element = getElement();
                    if (element) {
                        if (element instanceof HTMLInputElement && typeof value2 == "number")
                            element.valueAsNumber = value2;
                        else
                            element.value = (value2 ?? "");
                    }
                }
            });
            const disabledType = useContext(DefaultDisabledType);
            let baseInputClass = clsx("form-control", disabled && "disabled", readonly && "readonly", size && `form-control-${size ?? "md"}`, readonly == 'plaintext' && 'form-control-plaintext');
            if (disabled && disabledType == 'soft') {
                disabled = false;
                readonly = true;
            }
            if (readonly == 'plaintext') {
                readonly = true;
            }
            const onInput = (e) => {
                // Special handling for number
                // Basically, ensure that, if we have a min/max, 
                // we're never allowed to enter a number below/above them.
                //
                // TODO: This can kick the input out from under the user's feet.
                // Ideally it's not intrusive enough to matter 
                if (e.currentTarget.type == "number") {
                    const { valueAsNumber, max: maxS, min: minS } = e.currentTarget;
                    if (valueAsNumber != value) {
                        if (valueAsNumber != null && isFinite(valueAsNumber)) {
                            let max = +maxS;
                            let min = +minS;
                            let clampedValue = null;
                            max = isFinite(max) ? max : null;
                            min = isFinite(min) ? min : null;
                            if (max != null && valueAsNumber > max) {
                                clampedValue = max;
                            }
                            if (min != null && valueAsNumber < min) {
                                clampedValue = min;
                            }
                            if (clampedValue) {
                                e.currentTarget.valueAsNumber = clampedValue;
                            }
                        }
                        syncHandler(e);
                    }
                }
                else {
                    syncHandler(e);
                }
            };
            const dataProps = {
                "data-async-call-count": progressInfo.asyncHandlerReturn.callCount,
                "data-async-resolve-count": progressInfo.asyncHandlerReturn.resolveCount,
                "data-async-reject-count": progressInfo.asyncHandlerReturn.rejectCount,
                "data-async-settle-count": progressInfo.asyncHandlerReturn.settleCount,
                "data-async-has-error": progressInfo.asyncHandlerReturn.hasError,
            };
            const labelJsx = (_jsx("label", { className: clsx(!withinInputGroup ? "form-label" : "input-group-text"), ...useMergedProps(propsLabel1, propsLabel2, propsLabel), children: label }));
            const inputJsx = _jsx("input", { ...dataProps, inputMode: inputMode || undefined, autocomplete: autocomplete || undefined, placeholder: placeholder ?? undefined, readonly: readonly, onInput: onInput, ...useMergedProps({ ref }, p1, p2, propsInput1, propsInput2, { className: clsx(baseInputClass) }, propsInput) });
            const textAreaJsx = _jsx("textarea", { ...dataProps, placeholder: placeholder ?? undefined, readonly: readonly, onInput: onInput, rows: rows ?? 1, ...useMergedProps({ ref }, p1, p2, { className: clsx(baseInputClass, resizeable && "resizeable") }, propsInput1, propsInput2, propsInput) });
            const finalInputJsx = (isTextArea ? textAreaJsx : inputJsx);
            if (!withinInputGroup) {
                return (_jsxs("div", { ...useMergedProps({
                        className: clsx("form-text-field", otherClasses, `mb-${marginBottom ?? 3}`, `form-text-field-type-${propsInput.type}`, !!iconStart && "form-text-field-with-icon-start", (!!iconEnd || showSpinner) && "form-text-field-with-icon-end", showSpinner && "pending")
                    }, otherProps || {}), children: [labelPosition == "before" && labelJsx, _jsxs("div", { className: clsx("form-text-field-control-container", labelPosition == "floating" && "form-floating"), children: [iconStart && _jsx("span", { className: clsx("form-control-icon-start form-control-icon show"), children: iconStart }), labelPosition == "tooltip" ? _jsx(Tooltip, { tooltip: label, absolutePositioning: true, children: finalInputJsx }) : finalInputJsx, labelPosition == "floating" && labelJsx, iconEnd && _jsx("span", { className: clsx("form-control-icon-end form-control-icon", !showSpinner && "show"), children: iconEnd }), _jsx(TextFieldSpinner, { callCount: callCount, containerClass: "form-control-icon-end form-control-icon", invocationResult: invocationResult, debouncingAsync: debouncingAsync, debouncingSync: debouncingSync, pending: p, propsIndicator: propsProgressIndicator })] }), labelPosition == "after" && labelJsx] }));
            }
            else {
                return (_jsxs(_Fragment, { children: [labelPosition == "before" && labelJsx, iconStart && _jsx("span", { className: clsx("input-group-text"), children: iconStart }), labelPosition == "tooltip" ? _jsx(Tooltip, { tooltip: label, absolutePositioning: true, children: finalInputJsx }) : finalInputJsx, labelPosition == "floating" && labelJsx, iconEnd && _jsx("span", { className: clsx("input-group-text", !showSpinner && "show"), children: iconEnd }), _jsx(TextFieldSpinner, { callCount: callCount, containerClass: "", invocationResult: invocationResult, debouncingAsync: debouncingAsync, debouncingSync: debouncingSync, pending: p, propsIndicator: propsProgressIndicator }), labelPosition == "after" && labelJsx] }));
            }
        } }));
}));
export const TextFieldSpinner = memo(function A({ debouncingAsync, debouncingSync, pending: p, propsIndicator, containerClass, callCount, invocationResult }) {
    if (invocationResult != "async")
        return null;
    let pendingDisplayType = ((debouncingAsync || debouncingSync) ? 2 : p ? 1 : 0);
    const withinInputGroup = useContext(WithinInputGroup);
    const ret = (_jsxs(_Fragment, { children: [_jsx(Fade, { show: (pendingDisplayType == 1), animateOnMount: false, exitVisibility: "removed", children: _jsx("span", { className: clsx(containerClass, `spinner-container`, "show"), children: _jsx("span", { className: clsx(`spinner spinner-border spinner-border-sm`), ...((pendingDisplayType == 1) ? propsIndicator : {}) }) }) }), _jsx(Fade, { show: (pendingDisplayType == 2), animateOnMount: false, exitVisibility: "removed", children: _jsx("span", { className: clsx(containerClass, `spinner-container`, "show"), children: _jsx("span", { className: clsx(`spinner spinner-grow spinner-grow-sm`), ...((pendingDisplayType == 2) ? propsIndicator : {}) }) }) })] }));
    if (!withinInputGroup) {
        return ret;
    }
    else {
        return (_jsx("div", { className: "input-group-text input-group-text-field-spinners", children: ret }));
    }
});
//# sourceMappingURL=index.js.map