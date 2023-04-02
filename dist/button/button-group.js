import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { createContext } from "preact";
import { Toolbar, useLabelSynthetic } from "preact-aria-widgets";
import { useAsync, useMergedProps, useState } from "preact-prop-helpers";
import { useMemo, useRef } from "preact/hooks";
import { DisabledContext } from "../context.js";
import { KeyboardAssistIcon } from "../utility/keyboard-assist.js";
export const ButtonGroupContext = createContext(null);
export function ButtonGroup({ children, onSelectedIndexChange: onSelectedIndexChangeAsync, variantSize, orientation, label, labelPosition, separated, disabled, selectedIndex, ...props }, ref) {
    const imperativeHandle = useRef(null);
    const [capturedIndex, setCapturedIndex] = useState(null);
    const { syncHandler: onSelectedIndexChangeSync, pending } = useAsync((e) => { return onSelectedIndexChangeAsync?.(e); }, {
        capture: (e, r) => { setCapturedIndex(e); return [e, r]; }
    });
    const pendingIndex = (pending ? capturedIndex : null);
    const classBase = (separated ? "btn-toolbar" : "btn-group");
    return (_jsx(DisabledContext.Provider, { value: disabled ?? false, children: _jsx(ButtonGroupContext.Provider, { value: useMemo(() => ({ pendingIndex }), [pendingIndex]), children: _jsx(Toolbar, { onSelectedIndexChange: onSelectedIndexChangeSync, ref: imperativeHandle, ariaPropName: "aria-pressed", selectionMode: "disabled", role: "toolbar" // TODO: Was group, but that doesn't count as an application, I think?
                , pageNavigationSize: 0, orientation: orientation || "horizontal", ariaLabel: labelPosition == 'hidden' ? label : null, selectedIndex: pendingIndex ?? selectedIndex, render: info => {
                    const visibleLabel = _jsx("label", { ...info.propsLabel, children: label });
                    return (_jsxs(_Fragment, { children: [labelPosition == "before" && visibleLabel, _jsx(KeyboardAssistIcon, { leftRight: orientation == "horizontal", upDown: orientation == "vertical", homeEnd: true, pageKeys: false, typeahead: false, typeaheadActive: false, children: _jsxs("span", { ...useMergedProps({ className: clsx(classBase, variantSize && `btn-group-${variantSize}`, orientation == "vertical" && `${classBase}-vertical`) }, info.propsToolbar, props, { ref }), children: [labelPosition == "within" && visibleLabel, children] }) }), labelPosition == "after" && visibleLabel] }));
                } }) }) }));
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