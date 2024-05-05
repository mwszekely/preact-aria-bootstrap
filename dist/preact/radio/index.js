import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { Radio as AriaRadio, RadioGroup as AriaRadioGroup, EventDetail, Progress } from "preact-aria-widgets/preact";
import { createContext, useAsync, useContext, useMemo, useMergedProps, useRef, useState } from "preact-prop-helpers/preact";
import { Fade } from "preact-transition/preact";
import { DefaultDisabledType, DisabledContext } from "../context.js";
import { Tooltip } from "../tooltip/index.js";
import { KeyboardAssistIcon } from "../utility/keyboard-assist.js";
import { StructureRadioWrapper } from "./structure.js";
export const RadioGroupContext = createContext(null);
export function RadioGroup({ onValueChange: onSelectedIndexChangeAsync, keyboardControlsDescription, fieldset, selectionMode, name, children, inline, selectedValue, debounce, throttle, label, labelPosition, disabled, ...props }, ref) {
    labelPosition ??= (fieldset ? "within" : "before");
    selectionMode ??= "focus";
    const imperativeHandle = useRef(null);
    // Note: We use useAsync, instead of useAsyncHandler, because the actual event handler isn't here.
    // If we were listening for the individual radios' onInput events, we would do that, but
    // we're just listening for a regular ol' function.
    const [capturedValue, setCapturedValue] = useState(null);
    const { syncHandler: onSelectedIndexChangeSync, pending } = useAsync((event) => { return onSelectedIndexChangeAsync?.(event[EventDetail].selectedValue, event); }, {
        capture: (event) => { setCapturedValue(event[EventDetail].selectedValue); return [event]; },
        throttle,
        debounce
    });
    const pendingValue = (pending ? capturedValue : null);
    inline ??= false;
    if (labelPosition == "hidden")
        console.assert(typeof label == "string");
    return (_jsx(DisabledContext.Provider, { value: disabled ?? false, children: _jsx(RadioGroupContext.Provider, { value: useMemo(() => ({ pendingValue, inline: inline }), [pendingValue, inline]), children: _jsx(AriaRadioGroup, { ariaLabel: labelPosition == 'hidden' ? label : null, selectedValue: pendingValue ?? selectedValue, imperativeHandle: imperativeHandle, name: name, onSelectedValueChange: onSelectedIndexChangeSync, arrowKeyDirection: inline ? "horizontal" : "vertical", singleSelectionMode: selectionMode, render: info => {
                    const E = (fieldset ? "fieldset" : "span");
                    const L = (fieldset ? "legend" : "label");
                    const visibleLabel = _jsx(L, { ...useMergedProps({ class: clsx("form-label radio-group-label") }, info.propsRadioGroupLabel), children: label });
                    return (_jsxs(_Fragment, { children: [labelPosition == "before" && visibleLabel, _jsx(KeyboardAssistIcon, { leftRight: !!inline, upDown: !inline, homeEnd: true, pageKeys: true, typeaheadStatus: info.typeaheadNavigationReturn.typeaheadStatus, activateSpace: info.typeaheadNavigationReturn.typeaheadStatus == 'none', activateEnter: true, description: keyboardControlsDescription ?? "Select an option:", children: _jsxs(E, { ...useMergedProps({ className: clsx("radio-group"), ref }, info.propsRadioGroup, props), children: [labelPosition == "within" && visibleLabel, children] }) }), labelPosition == "after" && visibleLabel] }));
                } }) }) }));
}
export function Radio({ index, label, value, labelPosition, loadingLabel, debounce, throttle, disabled: userDisabled, ...props }, ref) {
    labelPosition ||= "after";
    const radioGroupInfo = useContext(RadioGroupContext);
    const { pendingValue, inline } = (radioGroupInfo ?? {});
    const singleSelectPending = pendingValue != null && (pendingValue === value);
    return (_jsx(Progress, { ariaLabel: loadingLabel ?? "Please wait while the operation completes.", value: singleSelectPending ? "indeterminate" : "disabled", tagProgressIndicator: "span", render: progressInfo => {
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
            const pending = singleSelectPending; //(pendingValue != null);
            const loadingJsx = (_jsx(Fade, { show: pending, exitVisibility: "removed", children: _jsx("span", { ...useMergedProps(propsProgressIndicator, { class: "spinner-border" }) }) }));
            const labelRef = useRef(null);
            if (labelPosition == "hidden")
                console.assert(typeof label == "string");
            return (_jsx(AriaRadio, { ariaLabel: labelPosition == 'hidden' ? label : null, value: value, index: index, labelPosition: labelPosition == "hidden" ? "none" : "separate", tagInput: "input", tagLabel: "label", disabled: d, getText: () => labelRef.current?.textContent || `${value}` || "", render: info => {
                    const inputJsx = _jsx("input", { className: "form-check-input", ...useMergedProps(info.propsInput, props, { ref }) });
                    return (_jsxs(StructureRadioWrapper, { inline: inline || false, pending: pending, labelPosition: labelPosition, children: [loadingJsx, _jsxs("label", { ...useMergedProps({ class: "form-check-label", ref: labelRef }, info.propsLabel), children: [labelPosition == "before" && label, labelPosition == "tooltip" ? _jsx(Tooltip, { forward: true, tooltip: label, alignMode: "element", absolutePositioning: true, children: inputJsx }) : inputJsx, labelPosition == "after" && label] })] }));
                } }));
        } }));
}
//# sourceMappingURL=index.js.map