import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { createContext } from "preact";
import { Toolbar, useLabelSynthetic } from "preact-aria-widgets";
import { EventDetail, useAsync, useMergedProps, useState } from "preact-prop-helpers";
import { useMemo, useRef } from "preact/hooks";
import { DefaultButtonSize, DefaultButtonTheme, DisabledContext } from "../context.js";
import { KeyboardAssistIcon } from "../utility/keyboard-assist.js";
export const ButtonGroupContext = createContext(null);
export function ButtonGroup({ children, onSelectedIndexChange: onSelectedIndexChangeAsync, keyboardControlsDescription, variantTheme, variantSize, orientation, label, labelPosition, separated, disabled, selectedIndex, selectionMode, ...props }, ref) {
    labelPosition ??= "before";
    orientation ||= "horizontal";
    const imperativeHandle = useRef(null);
    const [capturedIndex, setCapturedIndex] = useState(null);
    const { syncHandler: onSelectedIndexChangeSync, pending } = useAsync((e) => { return onSelectedIndexChangeAsync?.(e[EventDetail].selectedIndex); }, {
        capture: (e) => { setCapturedIndex(e[EventDetail].selectedIndex); return [e]; },
        debounce: null,
        throttle: null,
    });
    const pendingIndex = (pending ? capturedIndex : null);
    const classBase = (separated ? "btn-toolbar" : "btn-group");
    return (_jsx(DefaultButtonSize.Provider, { value: variantSize ?? null, children: _jsx(DefaultButtonTheme.Provider, { value: variantTheme ?? null, children: _jsx(DisabledContext.Provider, { value: disabled ?? false, children: _jsx(ButtonGroupContext.Provider, { value: useMemo(() => ({ pendingIndex }), [pendingIndex]), children: _jsx(Toolbar, { onSingleSelectedIndexChange: (...e) => {
                            onSelectedIndexChangeSync(...e);
                        }, imperativeHandle: imperativeHandle, singleSelectionAriaPropName: "aria-pressed", singleSelectionMode: selectionMode == "single" ? "activation" : "disabled", multiSelectionMode: selectionMode == "multi" ? "activation" : "disabled", role: "toolbar" // TODO: Was group, but that doesn't count as an application, I think?
                        , pageNavigationSize: 0, orientation: orientation, ariaLabel: labelPosition == 'hidden' ? label : null, singleSelectedIndex: selectionMode == "single" ? (pendingIndex ?? selectedIndex) : undefined, render: info => {
                            const visibleLabel = _jsx("label", { ...info.propsLabel, children: label });
                            return (_jsxs(_Fragment, { children: [labelPosition == "before" && visibleLabel, _jsx(KeyboardAssistIcon, { leftRight: orientation == "horizontal", upDown: orientation == "vertical", homeEnd: true, pageKeys: false, typeaheadStatus: info.typeaheadNavigationReturn.typeaheadStatus, activateSpace: info.typeaheadNavigationReturn.typeaheadStatus == 'none', activateEnter: true, description: keyboardControlsDescription || "Keyboard controls for these buttons:", children: _jsxs("span", { ...useMergedProps({ className: clsx(classBase, variantSize && `btn-group-${variantSize}`, orientation == "vertical" && `${classBase}-vertical`) }, info.propsToolbar, props, { ref }), children: [labelPosition == "within" && visibleLabel, children] }) }), labelPosition == "after" && visibleLabel] }));
                        } }) }) }) }) }));
}
export function ButtonGroupGroup({ label, labelPosition, children, ...props }, ref) {
    const { propsInput, propsLabel } = useLabelSynthetic({
        labelParameters: { ariaLabel: labelPosition == "hidden" ? label : null, onLabelClick: null },
        randomIdInputParameters: { prefix: "bggg-" },
        randomIdLabelParameters: { prefix: "bggi-" }
    });
    const labelJsx = _jsx("label", { ...propsLabel, children: children });
    return (_jsxs(_Fragment, { children: [labelPosition == "before" && labelJsx, _jsxs("span", { ...useMergedProps({ className: "btn-toolbar", role: "toolbar", ref }, props, propsInput), children: [labelPosition == "within" && labelJsx, children] }), labelPosition == "after" && labelJsx] }));
}
//# sourceMappingURL=button-group.js.map