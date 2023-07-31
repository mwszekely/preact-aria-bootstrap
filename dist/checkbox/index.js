import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { Checkbox as AriaCheckbox, EventDetail, ProgressWithHandler } from "preact-aria-widgets";
import { useMergedProps } from "preact-prop-helpers";
import { Fade } from "preact-transition";
import { useContext } from "preact/hooks";
import { DefaultDisabledType, DisabledContext } from "../context.js";
import { WithinInputGroup } from "../input-group/shared.js";
import { Tooltip } from "../tooltip/index.js";
export function Checkbox({ label, labelPosition, checked, tristate, onValueChange, loadingLabel, debounce, forciblyPending, throttle, inline, disabled: userDisabled, imperativeHandle, propsInput, propsLabel, ...props }, ref) {
    labelPosition ??= "after";
    const isSwitch = props._isSwitch;
    if (isSwitch)
        delete props._isSwitch;
    const w = useContext(WithinInputGroup);
    return (_jsx(ProgressWithHandler, { ariaLabel: loadingLabel ?? "Please wait while the operation completes.", forciblyPending: forciblyPending, asyncHandler: (next, event) => {
            if (tristate) {
                if (checked == false)
                    return onValueChange?.("mixed", event);
                else if (checked === "mixed")
                    return onValueChange?.(true, event);
                else
                    return onValueChange?.(false, event);
            }
            else {
                return onValueChange?.(next, event);
            }
        }, capture: e => {
            if (tristate) {
                if (checked == false)
                    return "mixed";
                else if (checked === "mixed")
                    return true;
                else
                    return false;
            }
            else {
                return e[EventDetail].checked;
            }
        }, debounce: debounce, throttle: throttle, tagProgressIndicator: "span", render: progressInfo => {
            const { asyncHandlerReturn, propsProgressIndicator, propsProgressRegion } = progressInfo;
            const { pending: p, debouncingAsync, debouncingSync, currentCapture, syncHandler } = asyncHandlerReturn;
            const pending = (p || debouncingAsync || debouncingSync);
            const loadingJsx = (_jsx(Fade, { show: p, exitVisibility: "removed", children: _jsx("span", { class: "spinner-border spinner-border-sm", ...propsProgressIndicator }) }));
            const defaultDisabled = useContext(DisabledContext);
            const disabledType = useContext(DefaultDisabledType);
            let disabled = userDisabled;
            disabled ||= defaultDisabled;
            //disabled ||= pending;
            const d = disabled ? disabledType : false;
            return (_jsx(AriaCheckbox, { ariaLabel: labelPosition == 'hidden' ? label : null, checked: (pending ? currentCapture : null) ?? checked, onCheckedChange: syncHandler, labelPosition: labelPosition == "hidden" || labelPosition == "tooltip" ? "none" : "separate", tagInput: "input", tagLabel: "label", disabled: d, imperativeHandle: imperativeHandle, render: info => {
                    debugger;
                    const inputJsx = _jsx("input", { ...useMergedProps(info.propsInput, propsInput || {}, { class: clsx("form-check-input", w && "mt-0") }) });
                    const visibleLabel = _jsx("label", { ...useMergedProps(info.propsLabel, propsLabel || {}, { class: "form-check-label" }), children: label });
                    if (!w) {
                        return (_jsxs("div", { ...useMergedProps({
                                className: clsx("form-check", pending && "pending", isSwitch && "form-switch", inline && "form-check-inline", labelPosition == "before" && "form-check-reverse")
                            }, props, { ref }), children: [loadingJsx, labelPosition == "before" && visibleLabel, labelPosition == "tooltip" ? _jsx(Tooltip, { forward: true, tooltip: label, alignMode: "element", absolutePositioning: true, children: inputJsx }) : inputJsx, labelPosition == "after" && visibleLabel] }));
                    }
                    else {
                        return (_jsxs(_Fragment, { children: [labelPosition == "before" && _jsx("div", { ...({ className: clsx("input-group-text", pending && "pending") }), children: visibleLabel }), _jsx("div", { ...useMergedProps({ className: clsx("input-group-text", pending && "pending", isSwitch && "form-switch", inline && "form-check-inline") }, props, { ref }), children: labelPosition == "tooltip" ? _jsx(Tooltip, { forward: true, tooltip: label, alignMode: "element", absolutePositioning: true, children: inputJsx }) : inputJsx }), labelPosition == "after" && _jsx("div", { ...({ className: clsx("input-group-text", pending && "pending") }), children: visibleLabel })] }));
                    }
                } }));
        } }));
}
//# sourceMappingURL=index.js.map