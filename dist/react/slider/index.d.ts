import { ComponentChildren, createElement, Ref } from "preact";
import { SliderThumbInfo, UseSliderParameters, UseSliderThumbParameters } from "preact-aria-widgets";
import { GlobalAttributes } from "../utility/types.js";
export interface RangeProps extends GlobalAttributes<HTMLDivElement> {
    debounce?: number | boolean;
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
    snap?: "discrete" | "continuous";
    children?: ComponentChildren;
    value?: number;
    onValueChange?: (value: number) => (void | Promise<void>);
    label?: ComponentChildren;
}
export interface RangeThumbProps {
    onValueChange?: (value: number) => (void | Promise<void>);
    label: string;
    disabled?: boolean;
    index: UseSliderThumbParameters<HTMLInputElement, SliderThumbInfo>["info"]["index"];
    value?: UseSliderThumbParameters<HTMLInputElement, SliderThumbInfo>["sliderThumbParameters"]["value"];
    valueText?: UseSliderThumbParameters<HTMLInputElement, SliderThumbInfo>["sliderThumbParameters"]["valueText"];
    max?: UseSliderThumbParameters<HTMLInputElement, SliderThumbInfo>["sliderThumbParameters"]["max"];
    min?: UseSliderThumbParameters<HTMLInputElement, SliderThumbInfo>["sliderThumbParameters"]["min"];
}
export declare const Range: ({ max, min, debounce, hideTickValues, hideTicks, orientation, children, getValueText, getTooltipText, value, onValueChange, step, snap, label, disabled, ...rest }: RangeProps, ref: Ref<HTMLDivElement>) => createElement.JSX.Element;
export declare const RangeThumb: ({ index, value, max, min, onValueChange: onValueChangeAsync, disabled, label }: RangeThumbProps, ref: Ref<HTMLInputElement>) => createElement.JSX.Element;
//# sourceMappingURL=index.d.ts.map