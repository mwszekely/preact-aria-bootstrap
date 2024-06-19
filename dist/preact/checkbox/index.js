import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { Checkbox as AriaCheckbox, EventDetail, ProgressWithHandler } from "preact-aria-widgets";
import { useContext, useMergedProps } from "preact-prop-helpers";
import { Fade } from "preact-transition";
import { DefaultDisabledType, DisabledContext, useAutoAsyncHandler } from "../context.js";
import { WithinInputGroup } from "../input-group/shared.js";
import { Tooltip } from "../tooltip/index.js";
import { memoForwardRef } from "../utility/forward-element-ref.js";
import { StructureCheckboxInput, StructureCheckboxLabel } from "./structure.js";
function nextTristate(checked) {
    if (checked == false)
        return "mixed";
    else if (checked === "mixed")
        return true;
    else
        return false;
}
export function Checkbox({ label, labelPosition, checked, tristate, onValueChange, loadingLabel, debounce, forciblyPending, throttle, inline, disabled: userDisabled, imperativeHandle, propsInput, propsLabel, ...props }, ref) {
    labelPosition ??= "after";
    const isSwitch = props._isSwitch;
    if (isSwitch)
        delete props._isSwitch;
    const withinInputGroup = useContext(WithinInputGroup);
    return (_jsx(ProgressWithHandler, { ariaLabel: loadingLabel ?? "Please wait while the operation completes.", forciblyPending: forciblyPending, asyncHandler: useAutoAsyncHandler((next, event) => {
            if (tristate)
                return onValueChange(nextTristate(checked), event);
            else
                return onValueChange?.(next, event);
        }), capture: e => {
            if (tristate)
                return nextTristate(checked);
            else
                return e[EventDetail].checked;
        }, debounce: debounce, throttle: throttle, tagProgressIndicator: "span", render: progressInfo => {
            const { asyncHandlerReturn, propsProgressIndicator, propsProgressRegion } = progressInfo;
            const { pending: p, debouncingAsync, debouncingSync, currentCapture, syncHandler } = asyncHandlerReturn;
            const pending = (p || debouncingAsync || debouncingSync);
            const loadingJsx = (_jsx(Fade, { show: p, exitVisibility: "removed", children: _jsx("span", { className: "spinner-border spinner-border-sm", ...propsProgressIndicator }) }));
            const defaultDisabled = useContext(DisabledContext);
            const disabledType = useContext(DefaultDisabledType);
            let disabled = userDisabled;
            disabled ||= defaultDisabled;
            const d = disabled ? disabledType : false;
            if (labelPosition == 'hidden')
                console.assert(typeof label == "string", `<Checkbox />: When labelPosition is 'hidden', the label must be a string (as opposed to arbitrary JSX)`);
            return (_jsx(AriaCheckbox, { ariaLabel: labelPosition == 'hidden' ? label : null, checked: (pending ? currentCapture : null) ?? checked, onCheckedChange: syncHandler, labelPosition: labelPosition == "hidden" || labelPosition == "tooltip" ? "none" : "separate", tagInput: "input", tagLabel: "label", disabled: d, imperativeHandle: imperativeHandle, render: info => {
                    let inputJsx = _jsx(StructureCheckboxInput, { ...useMergedProps(info.propsInput, propsInput || {}, withinInputGroup ? { class: "mt-0" } : {}) });
                    const visibleLabel = _jsx(StructureCheckboxLabel, { ...useMergedProps(info.propsLabel, propsLabel || {}), children: label });
                    if (labelPosition == 'tooltip') {
                        inputJsx = _jsx(Tooltip, { forward: true, tooltip: label, alignMode: "element", absolutePositioning: true, children: inputJsx });
                        labelPosition = "hidden";
                    }
                    if (!withinInputGroup) {
                        return (_jsx(StructureCheckboxNormalOuter, { inline: inline || false, pending: pending, isSwitch: isSwitch, labelPosition: labelPosition || "before", childrenInput: inputJsx, childrenLabel: visibleLabel, childrenProgressIndicator: loadingJsx, childrenTooltip: label }));
                    }
                    else {
                        return (_jsx(StructureCheckboxInputGroupOuter, { inline: inline || false, pending: pending, isSwitch: isSwitch, labelPosition: labelPosition || "before", childrenInput: inputJsx, childrenLabel: visibleLabel, childrenProgressIndicator: loadingJsx, childrenTooltip: label }));
                    }
                } }));
        } }));
}
export const StructureCheckboxNormalOuter = memoForwardRef(function StructureCheckboxNormalOuter({ labelPosition, isSwitch, pending, inline, childrenProgressIndicator: loadingJsx, childrenTooltip: label, childrenInput: inputJsx, childrenLabel: visibleLabel, ...props }, ref) {
    return (_jsxs("div", { ...useMergedProps({
            className: clsx("form-check", pending && "pending", isSwitch && "form-switch", inline && "form-check-inline", labelPosition == "before" && "form-check-reverse")
        }, { ...props, ref }), children: [loadingJsx, labelPosition == "before" && visibleLabel, inputJsx, labelPosition == "after" && visibleLabel] }));
});
export const StructureCheckboxInputGroupOuter = memoForwardRef(function StructureCheckboxNormalOuter({ labelPosition, isSwitch, pending, inline, childrenProgressIndicator: loadingJsx, childrenTooltip: label, childrenInput: inputJsx, childrenLabel: visibleLabel, ...props }, ref) {
    const label2 = _jsx("div", { ...({ className: clsx("input-group-text", pending && "pending") }), children: visibleLabel });
    return (_jsxs(_Fragment, { children: [labelPosition == "before" && label2, _jsx("div", { ...useMergedProps({
                    className: clsx("input-group-text", pending && "pending", isSwitch && "form-switch", inline && "form-check-inline")
                }, props, { ref }), children: inputJsx }), labelPosition == "after" && label2] }));
});
//# sourceMappingURL=index.js.map