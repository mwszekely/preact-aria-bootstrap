import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { CheckboxGroup as AriaCheckboxGroup, CheckboxGroupChild as AriaCheckboxGroupChild, CheckboxGroupParent as AriaCheckboxGroupParent } from "preact-aria-widgets";
import { useMergedProps, useRef, useStableCallback, useState } from "preact-prop-helpers";
import { Checkbox } from "../checkbox/index.js";
export function CheckboxGroup({ orientation, children, label, labelPosition, debounce, loadingLabel, throttle, disabled, inline, getSortValue }) {
    return (_jsx(AriaCheckboxGroup, { orientation: orientation, render: info => {
            return (_jsxs("span", { ...info.props, children: [_jsx(CheckboxGroupParent, { label: label, labelPosition: labelPosition, debounce: debounce, loadingLabel: loadingLabel, throttle: throttle, disabled: disabled, inline: inline, getSortValue: getSortValue }), children] }));
        } }));
}
function CheckboxGroupParent({ label, labelPosition, debounce, loadingLabel, throttle, disabled, inline, getSortValue, ...props }) {
    const imperativeHandle = useRef(null);
    return (_jsx(AriaCheckboxGroupParent, { focusSelf: useStableCallback(() => {
            if (imperativeHandle.current)
                imperativeHandle.current.checkboxLikeReturn.focusSelf();
        }), index: 0, render: info => {
            return (_jsx(Checkbox, { labelPosition: labelPosition, label: label, throttle: throttle, disabled: disabled, inline: true, tristate: true, debounce: debounce, loadingLabel: loadingLabel, imperativeHandle: imperativeHandle, checked: info.checkboxGroupParentReturn.checked, onValueChange: useStableCallback(async (c, e) => { await info.checkboxGroupParentReturn.onParentCheckedChange(e); }), propsInput: useMergedProps(props, info.propsChild, info.propsTabbable) }));
        } }));
}
export function CheckboxGroupChild({ checked, label, labelPosition, onValueChange, debounce, throttle, disabled, inline, loadingLabel, tristate, getSortValue, untabbable, index, ...props }) {
    const imperativeHandle = useRef(null);
    ++index;
    const [pendingFromParent, setPendingFromParent] = useState(false);
    return (_jsx(AriaCheckboxGroupChild, { checked: checked, focusSelf: useStableCallback(() => {
            if (imperativeHandle.current)
                imperativeHandle.current.checkboxLikeReturn.focusSelf();
        }), index: index, onChangeFromParent: useStableCallback(async (c, e) => {
            try {
                setPendingFromParent(true);
                await onValueChange?.(c, e);
            }
            catch (ex) {
                throw ex;
            }
            finally {
                setPendingFromParent(false);
            }
        }), untabbable: untabbable, render: info => {
            return (_jsx(Checkbox, { checked: checked, label: label, inline: inline, loadingLabel: loadingLabel, tristate: tristate, debounce: debounce, throttle: throttle, disabled: pendingFromParent || disabled, labelPosition: labelPosition, imperativeHandle: imperativeHandle, onValueChange: useStableCallback(async (checked, event) => {
                    await onValueChange?.(checked, event);
                    info.checkboxGroupChildReturn.onChildCheckedChange(checked);
                }), propsInput: useMergedProps(props, info.propsChild, info.propsTabbable) }));
        } }));
}
//# sourceMappingURL=index.js.map