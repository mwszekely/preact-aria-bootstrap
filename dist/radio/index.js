import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { createContext } from "preact";
import { Progress, Radio as AriaRadio, RadioGroup as AriaRadioGroup } from "preact-aria-widgets";
import { useAsync, useMergedProps, useState } from "preact-prop-helpers";
import { Fade } from "preact-transition";
import { useContext, useMemo, useRef } from "preact/hooks";
import { DefaultDisabledType, DisabledContext } from "../context.js";
import { Tooltip } from "../tooltip/index.js";
import { KeyboardAssistIcon } from "../utility/keyboard-assist.js";
export const RadioGroupContext = createContext(null);
export function RadioGroup({ onValueChange: onSelectedIndexChangeAsync, name, children, inline, selectedValue, debounce, throttle, label, labelPosition, disabled, ...props }, ref) {
    const imperativeHandle = useRef(null);
    // Note: We use useAsync, instead of useAsyncHandler, because the actual event handler isn't here.
    // If we were listening for the individual radios' onInput events, we would do that, but
    // we're just listening for a regular ol' function.
    const [capturedValue, setCapturedValue] = useState(null);
    const { syncHandler: onSelectedIndexChangeSync, pending } = useAsync((value, event) => { return onSelectedIndexChangeAsync?.(value, event); }, {
        capture: (value, event) => { setCapturedValue(value); return [value, event]; },
        throttle,
        debounce
    });
    const pendingValue = (pending ? capturedValue : null);
    inline ??= false;
    return (_jsx(DisabledContext.Provider, { value: disabled ?? false, children: _jsx(RadioGroupContext.Provider, { value: useMemo(() => ({ pendingValue, inline: inline }), [pendingValue, inline]), children: _jsx(AriaRadioGroup, { ariaLabel: labelPosition == 'hidden' ? label : null, selectedValue: pendingValue ?? selectedValue, ref: imperativeHandle, name: name, onSelectedValueChange: onSelectedIndexChangeSync, arrowKeyDirection: inline ? "horizontal" : "vertical", render: info => {
                    const visibleLabel = _jsx("label", { ...info.propsRadioGroupLabel, children: label });
                    return (_jsxs(_Fragment, { children: [labelPosition == "before" && visibleLabel, _jsx(KeyboardAssistIcon, { leftRight: !!inline, upDown: !inline, homeEnd: true, pageKeys: true, typeahead: true, typeaheadActive: info.typeaheadNavigationReturn.typeaheadStatus != "none", children: _jsxs("span", { ...useMergedProps({ className: clsx("radio-group"), ref, "aria-busy": (pending ? "true" : undefined) }, info.propsRadioGroup, props), children: [labelPosition == "within" && visibleLabel, children] }) }), labelPosition == "after" && visibleLabel] }));
                } }) }) }));
}
export function Radio({ index, label, value, labelPosition, loadingLabel, debounce, throttle, disabled: userDisabled, ...props }, ref) {
    const radioGroupInfo = useContext(RadioGroupContext);
    const { pendingValue, inline } = (radioGroupInfo ?? {});
    const singleSelectPending = pendingValue != null && (pendingValue === value);
    return (_jsx(Progress, { ariaLabel: loadingLabel ?? "Please wait while the operation completes.", value: singleSelectPending ? "indeterminate" : "disabled", tagIndicator: "span", render: progressInfo => {
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
            const pending = singleSelectPending; //(pendingValue != null);
            const loadingJsx = (_jsx(Fade, { show: pending, exitVisibility: "removed", children: _jsx("span", { class: "spinner-border", ...propsIndicator }) }));
            return (_jsx(AriaRadio, { ariaLabel: labelPosition == 'hidden' ? label : null, value: value, index: index, labelPosition: labelPosition == "hidden" ? "none" : "separate", tagInput: "input", tagLabel: "label", disabled: d, render: info => {
                    const inputJsx = _jsx("input", { class: "form-check-input", ...useMergedProps(info.propsInput, props, { ref }) });
                    return (_jsxs("span", { ...useMergedProps({ className: clsx(labelPosition == "after" && ".form-check-reverse", "form-check", pending && "pending", inline && "form-check-inline", labelPosition == "before" && "form-check-reverse") }), children: [loadingJsx, _jsxs("label", { class: "form-check-label", ...info.propsLabel, children: [labelPosition == "before" && label, labelPosition == "tooltip" ? _jsx(Tooltip, { forward: true, tooltip: label, alignMode: "element", absolutePositioning: true, children: inputJsx }) : inputJsx, labelPosition == "after" && label] })] }));
                } }));
        } }));
}
//# sourceMappingURL=index.js.map