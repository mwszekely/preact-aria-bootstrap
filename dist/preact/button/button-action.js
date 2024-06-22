import { Fragment as _Fragment, jsxs as _jsxs, jsx as _jsx } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { Button as AriaButton, EventDetail, Progress, ToolbarChild } from "preact-aria-widgets";
import { memo, returnFalse, useAsyncHandler, useContext, useMergedProps } from "preact-prop-helpers";
import { Fade } from "preact-transition";
import { DefaultButtonSize, DefaultButtonTheme, DefaultDisabledType, DisabledContext, useAutoAsyncHandler } from "../context.js";
import { Tooltip } from "../tooltip/index.js";
import { forwardElementRef, memoForwardRef } from "../utility/forward-element-ref.js";
import { ButtonGroupContext } from "./button-group.js";
export const Button = /* @__PURE__ */ memoForwardRef(function Button({ tooltip, buttonGroupIndex, children, tooltipPlacement, badge, pressed: standaloneOrMultiSelectPressed, disabled: userDisabled, onPress: onPressAsync, variantDropdown, variantFill, variantSize, loadingLabel, throttle, debounce, variantTheme, ...props }, ref) {
    //Tag ??= "button" as never;
    let defaultTheme = useContext(DefaultButtonTheme);
    let defaultSize = useContext(DefaultButtonSize);
    variantTheme ??= defaultTheme ?? undefined;
    variantSize ??= defaultSize ?? undefined;
    const { currentCapture, pending: individualPending, syncHandler, callCount } = useAsyncHandler({
        asyncHandler: useAutoAsyncHandler(onPressAsync),
        capture: (e) => e[EventDetail].pressed ?? null,
        debounce,
        throttle
    });
    // A button can look pressed for multiple reasons:
    // * The user has specified the button is pressed.
    // * This button is contained in a single-select widget, and that widget is telling this button that it is the selected one among all its siblings.
    // * The onPress handler is an async handler that sets the button to pressed/unpressed, in which case we show it in that state until the handler completes.
    const buttonGroupInfo = useContext(ButtonGroupContext);
    const { pendingIndex } = (buttonGroupInfo ?? {});
    //const isThePressedOne = ((pendingIndex == null ? (individualPending ? currentCapture : standaloneOrMultiSelectPressed) : (pendingIndex === buttonGroupIndex)) ?? null);
    //const singleSelectPending = pendingIndex != null && isThePressedOne;
    let isPendingForMultiSelect = null;
    let isPendingForSingleSelect = null;
    let isPressedForMultiSelect = null;
    let isPressedForSingleSelect = null; // This one we won't know until we render ToolbarChild
    if (individualPending) {
        isPendingForMultiSelect = true;
    }
    if (pendingIndex != null && pendingIndex == buttonGroupIndex) {
        isPendingForSingleSelect = true;
    }
    if (individualPending)
        isPressedForMultiSelect = currentCapture ?? null;
    else
        isPressedForMultiSelect = standaloneOrMultiSelectPressed ?? null;
    //let isPressed = null;
    const defaultDisabled = useContext(DisabledContext);
    const disabledType = useContext(DefaultDisabledType);
    //const pending = ((individualPending || singleSelectPending) ?? false);
    children = _jsxs(_Fragment, { children: [children, badge] });
    if (buttonGroupInfo == null) {
        //variantSize ??= "md";
        let pending = individualPending;
        let disabled = userDisabled;
        disabled ||= defaultDisabled;
        //disabled ||= (pendingIndex != null);
        disabled ||= pending;
        const d = disabled ? disabledType : false;
        let isPressed = (isPressedForMultiSelect) ?? null;
        return (_jsx(ButtonStructure, { ref: ref, 
            //Tag={(Tag) as never}
            tooltip: tooltip, disabled: d, pending: pending, children: children, tooltipPlacement: tooltipPlacement, callCount: callCount, loadingLabel: loadingLabel ?? null, variantTheme: variantTheme ?? "primary", variantSize: variantSize, variantDropdown: variantDropdown || null, pressed: isPressed, onPress: syncHandler ?? null, excludeSpace: returnFalse, otherProps: props, variantFill: variantFill ?? null }));
    }
    else {
        return (_jsx(ToolbarChild, { index: buttonGroupIndex ?? 0, disabledProp: "disabled", render: toolbarChildInfo => {
                //let pending = (toolbarChildInfo.multiSelectionChildReturn? isPendingForMultiSelect : selectionLimit == 'single'? isPendingForSingleSelect : individualPending) || false;
                let pending = (toolbarChildInfo.singleSelectionChildReturn.singleSelectionMode != "disabled" ? isPendingForSingleSelect :
                    toolbarChildInfo.multiSelectionChildReturn.multiSelectionMode != "disabled" ? isPendingForMultiSelect :
                        individualPending) || false;
                let disabled = userDisabled;
                disabled ||= defaultDisabled;
                //disabled ||= (pendingIndex != null);
                disabled ||= pending;
                const d = disabled ? disabledType : false;
                isPressedForSingleSelect = (toolbarChildInfo.singleSelectionChildReturn.singleSelected);
                let isPressed = toolbarChildInfo.singleSelectionChildReturn.singleSelected || toolbarChildInfo.multiSelectionChildReturn.multiSelected;
                return (_jsx(ButtonStructure, { ref: ref, 
                    //Tag={(Tag) as never}
                    tooltip: tooltip, disabled: d, pending: pending, children: children, tooltipPlacement: tooltipPlacement, loadingLabel: loadingLabel ?? null, variantTheme: variantTheme ?? "primary", variantFill: variantFill ?? null, variantSize: variantSize ?? "md", variantDropdown: variantDropdown || null, pressed: isPressed, callCount: callCount, excludeSpace: toolbarChildInfo.pressParameters.excludeSpace || returnFalse, onPress: (e) => {
                        toolbarChildInfo.pressParameters.onPressSync?.(e);
                        return syncHandler?.(e);
                    }, otherProps: useMergedProps(props, toolbarChildInfo.propsChild, toolbarChildInfo.propsTabbable) }));
            } }));
    }
});
/**
 * A "raw" button -- just the markup.
 */
const ButtonStructure = /* @__PURE__ */ memo(forwardElementRef(function ButtonStructure({ excludeSpace, tooltip, disabled, onPress, pressed, loadingLabel, otherProps, tooltipPlacement, pending, variantDropdown, variantTheme, variantFill, variantSize, children, callCount }, ref) {
    return (_jsx(AriaButton, { tagButton: "button", disabled: disabled, onPressSync: onPress, pressed: pressed, excludeSpace: excludeSpace, render: buttonInfo => {
            return (_jsx(Progress, { ariaLabel: loadingLabel ?? "Please wait while the operation completes.", value: pending ? "indeterminate" : "disabled", tagProgressIndicator: "span", render: progressInfo => {
                    const { propsProgressIndicator, propsProgressRegion } = progressInfo;
                    const loadingJsx = (_jsx(Fade, { show: pending, exitVisibility: "removed", children: _jsx("span", { className: "spinner-border", ...propsProgressIndicator }) }));
                    if (pressed != null)
                        variantFill ??= (pressed ? "fill" : "outline");
                    const buttonClass = clsx(`btn position-relative`, variantDropdown && "dropdown-toggle", variantDropdown == "split" && "dropdown-toggle-split", variantSize && `btn-${variantSize}`, `btn${variantFill == "outline" ? "-outline" : ""}-${variantTheme || "primary"}`, pending && "pending", pressed && "pressed", disabled && "disabled", buttonInfo.pressReturn.pressing && "active");
                    //const ret = (h(Tag as never, useMergedProps<E>(otherProps, buttonInfo.props, { className: buttonClass, ref }), children, loadingJsx))
                    const ret = _jsxs(StructureButtonButton, { ...useMergedProps(otherProps, buttonInfo.props, { className: buttonClass, ref }), children: [children, loadingJsx] });
                    if (tooltip) {
                        return _jsx(Tooltip, { forward: true, alignMode: "element", semanticType: "label", absolutePositioning: true, placement: tooltipPlacement || "top", tooltip: tooltip, children: ret });
                    }
                    else {
                        return ret;
                    }
                } }));
        } }));
}));
const StructureButtonButton = /* @__PURE__ */ memoForwardRef(function ButtonStructure({ children, ...props }, ref) {
    return (_jsx("button", { ...useMergedProps({ class: "btn" }, { ...props, ref }), children: children }));
});
const StructureButtonProgressLabel = /* @__PURE__ */ memoForwardRef(function StructureButtonProgress({ children, ...props }, ref) {
    return (_jsx("label", { ...useMergedProps({ class: "btn-progress-label" }, { ...props, ref }), children: children }));
});
const StructureButtonProgressIndicator = /* @__PURE__ */ memoForwardRef(function StructureButtonProgress({ ...props }, ref) {
    return (_jsx("progress", { ...useMergedProps({ class: "btn-progress-indicator" }, { ...props, ref }) }));
});
//# sourceMappingURL=button-action.js.map