import clsx from "clsx";
import { ComponentChildren, createContext, createElement, h, Ref } from "preact";
import { EventDetail, RangeChangeEvent, SliderContext, SliderProps, SliderThumbInfo, useSlider, UseSliderParameters, useSliderThumb, UseSliderThumbParameters } from "preact-aria-widgets";
import { generateRandomId, useAsyncHandler, useHasCurrentFocus, useMergedProps, useRefElement } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useContext, useEffect, useMemo, useRef, useState } from "preact/hooks";
import { Tooltip } from "../tooltip";
import { forwardElementRef } from "../utility/forward-element-ref";
import { GlobalAttributes } from "../utility/types";




export interface RangeProps extends GlobalAttributes<HTMLDivElement> {
    debounce?: number | boolean;
    //ticks?: "numbers-all" | "numbers-edges" | "ticks-only" | "none";
    hideTicks?: boolean;
    hideTickValues?: boolean | "auto";
    orientation?: "inline" | "block";
    disabled?: boolean;
    min: UseSliderParameters<SliderThumbInfo>["sliderParameters"]["min"];
    max: UseSliderParameters<SliderThumbInfo>["sliderParameters"]["max"];
    /**
     * Allows you to override how the numeric value this Range uses is displayed/read as a string
     */
    getValueText?: (value: number) => string;
    /**
     * Defaults to the value of getValueText. Use this to further customize the tooltip that appears when hovering over the Range.
     */
    getTooltipText?: (value: number) => string;
    step?: number | null | "any";
    snap?: "discrete" | "continuous";   // "continuous" allows selecting values outside of the "step" restriction, but still prefers step values.


    children?: ComponentChildren;
    value?: number;
    onValueChange?: (value: number) => (void | Promise<void>);
    label?: string;
}

export interface RangeThumbProps {
    onValueChange?: (value: number) => (void | Promise<void>);
    label: string;
    disabled?: boolean;
    index: UseSliderThumbParameters<HTMLInputElement, SliderThumbInfo>["managedChildParameters"]["index"];
    value?: UseSliderThumbParameters<HTMLInputElement, SliderThumbInfo>["sliderThumbParameters"]["value"];
    valueText?: UseSliderThumbParameters<HTMLInputElement, SliderThumbInfo>["sliderThumbParameters"]["valueText"];
    max?: UseSliderThumbParameters<HTMLInputElement, SliderThumbInfo>["sliderThumbParameters"]["max"];
    min?: UseSliderThumbParameters<HTMLInputElement, SliderThumbInfo>["sliderThumbParameters"]["min"];
}

const RangeThumbContext = createContext<SliderContext<SliderThumbInfo>>(null!);
const DebounceContext = createContext<number | boolean>(false);
const ValueContext = createContext<number | null>(null);
const GetValueTextContext = createContext<(n: number) => string>(null!);
const GetListContext = createContext("");
const StepContext = createContext<number | "any">(1);
const SnapContext = createContext<"discrete" | "continuous">("discrete");
const DisabledContext = createContext(false);
const OrientationContext = createContext<"block" | "inline">("inline");
const OnValueChangeContext = createContext<RangeProps["onValueChange"]>(null!);

export const Range = memo(forwardElementRef(function Range({ max, min, debounce, hideTickValues, hideTicks, orientation, children, getValueText, getTooltipText, value, onValueChange, step, snap, label, disabled, ...rest }: RangeProps, ref: Ref<HTMLDivElement>) {
    const {
        context,
        managedChildrenReturn
    } = useSlider({ managedChildrenParameters: {}, sliderParameters: { min, max } });
    let id = useMemo(generateRandomId, []);
    id ??= "";
    step ??= "any";
    let tickCount = (step == "any" ? Infinity : Math.ceil(1 + (max - min) / step));

    return (
        <OnValueChangeContext.Provider value={onValueChange}>
            <RangeThumbContext.Provider value={context}>
                <DebounceContext.Provider value={debounce ?? false}>
                    <GetValueTextContext.Provider value={getTooltipText ?? getValueText ?? defaultGetValueText}>
                        <GetListContext.Provider value={id}>
                            <StepContext.Provider value={step}>
                                <SnapContext.Provider value={snap ?? "discrete"}>
                                    <DisabledContext.Provider value={disabled ?? false}>
                                        <ValueContext.Provider value={value ?? null}>
                                            <OrientationContext.Provider value={orientation ?? "inline"}>
                                                {createElement((label ? "label" : "div") as any, (useMergedProps<HTMLDivElement>({ class: clsx("form-range-container", orientation == "block" && "form-range-vertical"), ref, style: isFinite(tickCount) ? { "--form-range-tick-count": tickCount } : undefined }, rest)),
                                                    label && <div class="form-range-label">{label}</div>,
                                                    children ?? <RangeThumb index={0} min={min} max={max} value={value ?? 0} onValueChange={onValueChange} label={label ?? ""} />,
                                                    <div class="form-range-track-background" />,
                                                    <GetValueTextContext.Provider value={getValueText ?? defaultGetValueText}>
                                                        <RangeTicks min={min} max={max} step={step} id={id} hideTickValues={hideTickValues} />
                                                    </GetValueTextContext.Provider>
                                                )}
                                            </OrientationContext.Provider>
                                        </ValueContext.Provider>
                                    </DisabledContext.Provider>
                                </SnapContext.Provider>
                            </StepContext.Provider>
                        </GetListContext.Provider>
                    </GetValueTextContext.Provider>
                </DebounceContext.Provider>
            </RangeThumbContext.Provider>
        </OnValueChangeContext.Provider>
    );
}));

function defaultGetValueText(number: number) {
    return `${number}`
}

const RangeTicks = memo(function RangeTicks({ step, min, max, id, hideTickValues }: { id: string; step: number | "any", min: number, max: number, hideTickValues?: boolean | "auto" }) {
    const onValueChange = useContext(OnValueChangeContext);
    if (step == "any")
        return null;
    hideTickValues ??= false;
    const getValueText = useContext(GetValueTextContext);
    let children: ComponentChildren[] = [];
    for (let i = min; i <= max; i += step) {
        const atEnds = (i == min || (i + step) > max);
        const valuePercent = (i - min) / (max - min);
        let shouldHide = (hideTickValues == "auto" ? !atEnds : hideTickValues);
        children.push(
            <div class={clsx(
                "form-range-tick",
                "form-range-tick-line",
                onValueChange && "form-range-tick-selectable"
            )}
            ><option
                onClick={() => { 

                    onValueChange?.(i);
                 }}
                value={i}
                key={i}>{shouldHide ? null : getValueText(i)}</option></div>)
    }
    /*for (let i = min; i <= max; i += step) {
        children.push(<option value={i} class={clsx("form-range-tick")}>{getValueText(i)}</option>)
    }*/
    return (
        <datalist id={id} class={clsx("form-range-ticks")}>
            {...children}
        </datalist>
    );
});

export const RangeThumb = memo(forwardElementRef(function RangeThumb({ index, value, max, min, onValueChange: onValueChangeAsync, disabled, label }: RangeThumbProps, ref: Ref<HTMLInputElement>) {
    const parentOnValueChange = useContext(OnValueChangeContext);
    const context = useContext(RangeThumbContext);
    const debounceSetting = useContext(DebounceContext);
    const { syncHandler, pending, hasError, currentCapture } = useAsyncHandler({
        asyncHandler: async (v, e) => { await parentOnValueChange?.(v); await onValueChangeAsync?.(v); },
        capture,
        debounce: debounceSetting == true ? 1500 : debounceSetting != false ? debounceSetting : undefined
    });
    const onValueChangeSync = syncHandler;// as UseSliderThumbArguments<HTMLInputElement>["onValueChange"];
    const valueFromParent = useContext(ValueContext);
    value = ((valueFromParent) ?? value ?? currentCapture) ?? 0;
    const getValueText = useContext(GetValueTextContext);
    const valueText = useMemo(() => { return ((getValueText?.(value!)) ?? (value == null ? "" : `${value}`)); }, [value, getValueText]);
    const orientation = useContext(OrientationContext);
    let parentDisabled = useContext(DisabledContext);
    disabled ||= parentDisabled;

    const [inputHasFocus, setInputHasFocus] = useState(false);
    const { refElementReturn, refElementReturn: { propsStable: p1, getElement: getInputElement } } = useRefElement<HTMLInputElement>({ refElementParameters: {} })
    const { hasCurrentFocusReturn: { propsStable: p2 } } = useHasCurrentFocus<HTMLInputElement>({ hasCurrentFocusParameters: { onCurrentFocusedChanged: setInputHasFocus, onCurrentFocusedInnerChanged: null }, refElementReturn });
    let usedStep = (useContext(StepContext) ?? 1);
    let userStep = usedStep;

    const [lastSnappedValue, setLastSnappedValue] = useState<number | null>(null);
    const [forceSnap, setForceSnap] = useState(false);
    const snap = useContext(SnapContext);
    //const [snap, setSnap] = useState<boolean | null>(null);

    if (snap == "continuous" && !forceSnap)
        usedStep = "any";

    /*if (snap === false)
        step = "any";
    if (snap === true && step == "any")
        step = 1;*/

    const snapTimeout = useRef<number>(-1);
    function onValueChange(e: RangeChangeEvent<HTMLInputElement>) {
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
                snapTimeout.current = setTimeout(() => { setForceSnap(false); }, 500);
                e[EventDetail].value = closestStep;
            }

        }

        return onValueChangeSync?.(e as any as h.JSX.TargetedEvent<HTMLInputElement, Event>);
    }

    const { propsSliderThumb, managedChildReturn, sliderThumbReturn: { min: usedMin, max: usedMax } } = useSliderThumb<HTMLInputElement, SliderThumbInfo>({
        managedChildParameters: {
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
    const tooltipRootRef = useRef<HTMLDivElement>(null);

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
    }, [value])

    return (
        <>
            <input {...useMergedProps<HTMLInputElement>(
                propsSliderThumb,
                p1,
                p2,
                {
                    ref,
                    ...({ orient: orientation == "block" ? "vertical" : undefined } as {}),
                    class: clsx("form-range", orientation == "block" && "form-range-vertical"),
                    disabled,
                    tabIndex: 0,
                    step: usedStep,
                    list: useContext(GetListContext)
                })} />
            {/*<div class="form-range-tooltip-container">
                <div ref={tooltipRootRef} class="form-range-tooltip-root" style={{ "--range-value": `${valuePercent}` }} />
            </div>*/}
            <div class="form-range-track-fill-background" style={{ "--form-range-value-percent": clampedValuePercent }} />
        </>
    );
}));


function capture(e: h.JSX.TargetedEvent<HTMLInputElement>): number {
    return (e as any as RangeChangeEvent<any>)[EventDetail].value;
}

