
import { clsx } from "clsx";
import { Ref } from "preact";
import { useMergedProps } from "preact-prop-helpers";
import { memoForwardRef } from "../utility/forward-element-ref.js";
import { GlobalAttributes } from "../utility/types.js";



export interface StructureRadioWrapperProps extends GlobalAttributes<HTMLSpanElement, "children"> {
    pending: boolean;
    inline: boolean;
    labelPosition: "before" | "after" | "hidden" | "tooltip";
}

export const StructureRadioWrapper = memoForwardRef(function StructureRadioWrapper({ labelPosition, pending, inline, children, ...props }: StructureRadioWrapperProps, ref: Ref<HTMLSpanElement>) {
    return (
        <span {...useMergedProps({ ...props, ref }, {
            className: clsx(
                "form-check",
                pending && "pending",
                inline && "form-check-inline",
                labelPosition == "before" && "form-check-reverse")
        })}>
            {children}
        </span>
    );
})
