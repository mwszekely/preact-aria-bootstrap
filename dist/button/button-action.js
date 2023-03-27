import { Fragment as _Fragment, jsxs as _jsxs, jsx as _jsx } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { h } from "preact";
import { Button as AriaButton, EventDetail, Progress, ToolbarChild } from "preact-aria-widgets";
import { returnZero, useAsyncHandler, useMergedProps } from "preact-prop-helpers";
import { Fade } from "preact-transition";
import { memo } from "preact/compat";
import { useContext } from "preact/hooks";
import { DefaultDisabledType, DisabledContext } from "../context.js";
import { Tooltip } from "../tooltip/index.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { ButtonGroupContext } from "./button-group.js";
export const Button = memo(forwardElementRef(function Button({ tag: Tag, tooltip, buttonGroupIndex, children, tooltipPlacement, badge, pressed: standaloneOrMultiSelectPressed, disabled: userDisabled, onPress: onPressAsync, variantDropdown, variantFill, variantSize, loadingLabel, throttle, debounce, variantTheme, ...props }, ref) {
    Tag ??= "button";
    const { currentCapture, pending: individualPending, syncHandler, callCount } = useAsyncHandler({
        asyncHandler: onPressAsync,
        capture: (e) => e[EventDetail].pressed,
        debounce,
        throttle
    });
    // A button can look pressed for multiple reasons:
    // * The user has specified the button is pressed.
    // * This button is contained in a single-select widget, and that widget is telling this button that it is the selected one among all its siblings.
    // * The onPress handler is an async handler that sets the button to pressed/unpressed, in which case we show it in that state until the handler completes.
    const buttonGroupInfo = useContext(ButtonGroupContext);
    const { pendingIndex } = (buttonGroupInfo ?? {});
    const isThePressedOne = ((pendingIndex == null ? (individualPending ? currentCapture : standaloneOrMultiSelectPressed) : (pendingIndex === buttonGroupIndex)) ?? null);
    const singleSelectPending = pendingIndex != null && isThePressedOne;
    const defaultDisabled = useContext(DisabledContext);
    const disabledType = useContext(DefaultDisabledType);
    const pending = ((individualPending || singleSelectPending) ?? false);
    //variantSize ??= "md";
    let disabled = userDisabled;
    disabled ||= defaultDisabled;
    //disabled ||= (pendingIndex != null);
    disabled ||= pending;
    const d = disabled ? disabledType : false;
    children = _jsxs(_Fragment, { children: [children, badge] });
    if (buttonGroupInfo == null) {
        return (_jsx(ButtonStructure, { ref: ref, Tag: (Tag), tooltip: tooltip, disabled: d, pending: pending, children: children, tooltipPlacement: tooltipPlacement, callCount: callCount, loadingLabel: loadingLabel ?? null, variantTheme: variantTheme ?? "primary", variantSize: variantSize, variantDropdown: variantDropdown || null, pressed: isThePressedOne, onPress: syncHandler ?? null, otherProps: props, variantFill: variantFill ?? null }));
    }
    else {
        return (_jsx(ToolbarChild, { index: buttonGroupIndex ?? 0, ariaPropName: "aria-pressed", selectionMode: "disabled", getSortValue: returnZero, render: toolbarChildInfo => {
                return (_jsx(ButtonStructure, { ref: ref, Tag: (Tag), tooltip: tooltip, disabled: d, pending: pending, children: children, tooltipPlacement: tooltipPlacement, loadingLabel: loadingLabel ?? null, variantTheme: variantTheme ?? "primary", variantFill: variantFill ?? null, variantSize: variantSize, variantDropdown: variantDropdown || null, pressed: toolbarChildInfo.singleSelectionChildReturn.selected || isThePressedOne, callCount: callCount, onPress: (e) => {
                        toolbarChildInfo.singleSelectionChildReturn.setThisOneSelected(e);
                        return syncHandler?.(e);
                    }, otherProps: useMergedProps(props, toolbarChildInfo.props) }));
            } }));
    }
}));
/**
 * A "raw" button -- just the markup.
 */
const ButtonStructure = memo(forwardElementRef(function ButtonStructure({ Tag, tooltip, disabled, onPress, pressed, loadingLabel, otherProps, tooltipPlacement, pending, variantDropdown, variantTheme, variantFill, variantSize, children, callCount }, ref) {
    return (_jsx(AriaButton, { tagButton: (Tag), disabled: disabled, onPress: onPress, pressed: pressed, render: buttonInfo => {
            return (_jsx(Progress, { ariaLabel: loadingLabel ?? "Please wait while the operation completes.", value: pending ? "indeterminate" : "disabled", tagIndicator: "span", render: progressInfo => {
                    const { propsIndicator, propsRegion } = progressInfo;
                    const loadingJsx = (_jsx(Fade, { show: pending, exitVisibility: "removed", children: _jsx("span", { class: "spinner-border", ...propsIndicator }) }));
                    if (pressed !== null)
                        variantFill ??= (pressed ? "fill" : "outline");
                    const buttonClass = clsx(`btn position-relative`, variantDropdown && "dropdown-toggle", variantDropdown == "split" && "dropdown-toggle-split", variantSize && `btn-${variantSize}`, `btn${variantFill == "outline" ? "-outline" : ""}-${variantTheme || "primary"}`, pending && "pending", pressed && "pressed", disabled && "disabled", buttonInfo.pressReturn.pressing && "active");
                    const ret = (h(Tag, useMergedProps(otherProps, buttonInfo.props, { className: buttonClass, ref }), children, loadingJsx));
                    if (tooltip) {
                        return _jsx(Tooltip, { forward: true, alignMode: "element", semanticType: "label", absolutePositioning: true, placement: tooltipPlacement || "top", tooltip: tooltip, children: ret });
                    }
                    else {
                        return ret;
                    }
                } }));
        } }));
}));
//# sourceMappingURL=button-action.js.map