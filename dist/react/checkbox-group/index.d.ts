import { CheckboxProps } from "../checkbox/index.js";
import { GlobalAttributes, LabelledProps, OmitStrong } from "../utility/types.js";
export interface CheckboxGroupProps extends GlobalAttributes<HTMLSpanElement, "children">, CheckboxGroupParentProps {
    orientation: "horizontal" | "vertical";
}
export declare function CheckboxGroup({ orientation, children, label, labelPosition, debounce, loadingLabel, throttle, disabled, inline, getSortValue }: CheckboxGroupProps): any;
interface CheckboxGroupParentProps extends OmitStrong<LabelledProps<CheckboxProps, "tooltip">, "onValueChange" | "checked" | "tristate" | "imperativeHandle"> {
    getSortValue?(): unknown;
}
export interface CheckboxGroupChildProps extends OmitStrong<LabelledProps<CheckboxProps, "tooltip">, "imperativeHandle"> {
    getSortValue?(): unknown;
    untabbable?: boolean;
    /**
     * This is 0-indexed (and auto-adjusted to be 1-indexed, aligned with the parent *technically* being the 0th index)
     */
    index: number;
}
export declare function CheckboxGroupChild({ checked, label, labelPosition, onValueChange, debounce, throttle, disabled, inline, loadingLabel, tristate, getSortValue, untabbable, index, ...props }: CheckboxGroupChildProps): any;
export {};
//# sourceMappingURL=index.d.ts.map