import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { EventDetail, useSlider, useSliderThumb } from "preact-aria-widgets";
import { createContext, createElement, generateRandomId, memo, useAsyncHandler, useContext, useEffect, useHasCurrentFocus, useMemo, useMergedProps, useRef, useRefElement, useState } from "preact-prop-helpers";
import { forwardElementRef } from "../utility/forward-element-ref.js";
const RangeThumbContext = createContext(null);
const DebounceContext = createContext(false);
const ValueContext = createContext(null);
const GetValueTextContext = createContext(null);
const GetListContext = createContext("");
const StepContext = createContext(1);
const SnapContext = createContext("discrete");
const DisabledContext = createContext(false);
const OrientationContext = createContext("inline");
const OnValueChangeContext = createContext(null);
export const Range = memo(forwardElementRef(function Range({ max, min, debounce, hideTickValues, hideTicks, orientation, children, getValueText, getTooltipText, value, onValueChange, step, snap, label, disabled, ...rest }, ref) {
    const { context, managedChildrenReturn } = useSlider({ managedChildrenParameters: {}, sliderParameters: { min, max } });
    let id = useMemo(generateRandomId, []);
    id ??= "";
    step ??= "any";
    let tickCount = (step == "any" ? Infinity : Math.ceil(1 + (max - min) / step));
    return (_jsx(OnValueChangeContext.Provider, { value: onValueChange, children: _jsx(RangeThumbContext.Provider, { value: context, children: _jsx(DebounceContext.Provider, { value: debounce ?? false, children: _jsx(GetValueTextContext.Provider, { value: getTooltipText ?? getValueText ?? defaultGetValueText, children: _jsx(GetListContext.Provider, { value: id, children: _jsx(StepContext.Provider, { value: step, children: _jsx(SnapContext.Provider, { value: snap ?? "discrete", children: _jsx(DisabledContext.Provider, { value: disabled ?? false, children: _jsx(ValueContext.Provider, { value: value ?? null, children: _jsx(OrientationContext.Provider, { value: orientation ?? "inline", children: createElement((label ? "label" : "div"), (useMergedProps({ class: clsx("form-range-container", orientation == "block" && "form-range-vertical"), ref, style: isFinite(tickCount) ? { "--form-range-tick-count": tickCount } : undefined }, rest)), label && _jsx("div", { className: "form-range-label", children: label }), children ?? _jsx(RangeThumb, { index: 0, min: min, max: max, value: value ?? 0, onValueChange: onValueChange, label: label ?? "" }), _jsx("div", { className: "form-range-track-background" }), _jsx(GetValueTextContext.Provider, { value: getValueText ?? defaultGetValueText, children: _jsx(RangeTicks, { min: min, max: max, step: step, id: id, hideTickValues: hideTickValues }) })) }) }) }) }) }) }) }) }) }) }));
}));
function defaultGetValueText(number) {
    return `${number}`;
}
const RangeTicks = memo(function RangeTicks({ step, min, max, id, hideTickValues }) {
    const onValueChange = useContext(OnValueChangeContext);
    if (step == "any")
        return null;
    hideTickValues ??= false;
    const getValueText = useContext(GetValueTextContext);
    let children = [];
    for (let i = min; i <= max; i += step) {
        const atEnds = (i == min || (i + step) > max);
        const valuePercent = (i - min) / (max - min);
        let shouldHide = (hideTickValues == "auto" ? !atEnds : hideTickValues);
        children.push(_jsx("div", { className: clsx("form-range-tick", "form-range-tick-line", onValueChange && "form-range-tick-selectable"), children: _jsx("option", { onClick: () => {
                    onValueChange?.(i);
                }, value: i, children: shouldHide ? null : getValueText(i) }, i) }));
    }
    /*for (let i = min; i <= max; i += step) {
        children.push(<option value={i} className={clsx("form-range-tick")}>{getValueText(i)}</option>)
    }*/
    return (_jsxs("datalist", { id: id, className: clsx("form-range-ticks"), children: [...children] }));
});
export const RangeThumb = memo(forwardElementRef(function RangeThumb({ index, value, max, min, onValueChange: onValueChangeAsync, disabled, label }, ref) {
    const parentOnValueChange = useContext(OnValueChangeContext);
    const context = useContext(RangeThumbContext);
    const debounceSetting = useContext(DebounceContext);
    console.assert(typeof label == "string");
    const { syncHandler, pending, hasError, currentCapture } = useAsyncHandler({
        asyncHandler: async (v, e) => { await parentOnValueChange?.(v); await onValueChangeAsync?.(v); },
        capture,
        debounce: debounceSetting == true ? 1500 : debounceSetting != false ? debounceSetting : undefined,
        throttle: undefined
    });
    const onValueChangeSync = syncHandler; // as UseSliderThumbArguments<HTMLInputElement>["onValueChange"];
    const valueFromParent = useContext(ValueContext);
    value = ((valueFromParent) ?? value ?? currentCapture) ?? 0;
    const getValueText = useContext(GetValueTextContext);
    const valueText = useMemo(() => { return ((getValueText?.(value)) ?? (value == null ? "" : `${value}`)); }, [value, getValueText]);
    const orientation = useContext(OrientationContext);
    let parentDisabled = useContext(DisabledContext);
    disabled ||= parentDisabled;
    const [inputHasFocus, setInputHasFocus] = useState(false);
    const { refElementReturn, refElementReturn: { getElement: getInputElement }, propsStable: p1 } = useRefElement({ refElementParameters: {} });
    const { hasCurrentFocusReturn: { propsStable: p2 } } = useHasCurrentFocus({ hasCurrentFocusParameters: { onCurrentFocusedChanged: setInputHasFocus, onCurrentFocusedInnerChanged: null }, refElementReturn });
    let usedStep = (useContext(StepContext) ?? 1);
    let userStep = usedStep;
    const [lastSnappedValue, setLastSnappedValue] = useState(null);
    const [forceSnap, setForceSnap] = useState(false);
    const snap = useContext(SnapContext);
    //const [snap, setSnap] = useState<boolean | null>(null);
    if (snap == "continuous" && !forceSnap)
        usedStep = "any";
    /*if (snap === false)
        step = "any";
    if (snap === true && step == "any")
        step = 1;*/
    const snapTimeout = useRef(-1);
    function onValueChange(e) {
        const newValue = e[EventDetail].value;
        if (userStep != "any") {
            let closestStep = Math.round(newValue / userStep) * userStep;
            let distanceToStep = (Math.abs(closestStep - newValue));
            let distanceToLastSnap = lastSnappedValue == null ? null : Math.abs(lastSnappedValue - newValue);
            if (distanceToLastSnap != null && distanceToLastSnap >= userStep) {
                setForceSnap(false);
                setLastSnappedValue(null);
            }
            if (distanceToStep <= 0.125 && closestStep != lastSnappedValue) {
                setLastSnappedValue(closestStep);
                setForceSnap(true);
                if (snapTimeout.current > 0)
                    clearTimeout(snapTimeout.current);
                if (typeof window !== "undefined")
                    snapTimeout.current = window.setTimeout(() => { setForceSnap(false); }, 500);
                e[EventDetail].value = closestStep;
            }
        }
        return onValueChangeSync?.(e);
    }
    const { propsSliderThumb, managedChildReturn, sliderThumbReturn: { min: usedMin, max: usedMax } } = useSliderThumb({
        info: {
            index,
        },
        sliderThumbParameters: {
            tag: "input",
            value,
            valueText,
            max,
            min,
            onValueChange,
            label
        },
        context
    });
    const valuePercent = (value - usedMin) / (usedMax - usedMin);
    const clampedValuePercent = Math.max(0, Math.min(1, valuePercent));
    const tooltipRootRef = useRef(null);
    // TODO: The tooltip is a nice idea, but there are a few problems that need solved conceptually:
    // When hovering, the tooltip needs to show the value under the mouse, which is hard to calculate.
    // It's not a "normal" tooltip, though given that each slider needs its own individual label, it's kind of close, but...
    // The closest thing would just be a CSS mock tooltip with no roles or anything, but then dismiss behavior? etc...
    /*
    
    <Tooltip
        forward
        absolutePositioning
        getElement={(function (e: HTMLElement) { return tooltipRootRef.current || e; })}
        alignMode="element"
        tooltip={`${valueText}`}
        children={}
    />

    */
    useEffect(() => {
        const element = getInputElement();
        if (element)
            element.value = `${value}`;
    }, [value]);
    return (_jsxs(_Fragment, { children: [_jsx("input", { ...useMergedProps(propsSliderThumb, p1, p2, {
                    ref,
                    ...{ orient: orientation == "block" ? "vertical" : undefined },
                    class: clsx("form-range", orientation == "block" && "form-range-vertical"),
                    disabled,
                    tabIndex: 0,
                    step: usedStep,
                    list: useContext(GetListContext)
                }) }), _jsx("div", { className: "form-range-track-fill-background", style: { "--form-range-value-percent": clampedValuePercent } })] }));
}));
function capture(e) {
    return e[EventDetail].value;
}
//# sourceMappingURL=index.js.map