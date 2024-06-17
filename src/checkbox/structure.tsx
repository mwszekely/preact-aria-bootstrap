
import { clsx } from "clsx";
import { Ref, useMergedProps } from "preact-prop-helpers";
import { memoForwardRef } from "../utility/forward-element-ref.js";
import { GlobalAttributes } from "../utility/types.js";



export interface StructureCheckboxInputProps extends GlobalAttributes<HTMLInputElement> { }

export const StructureCheckboxInput = memoForwardRef(function StructureCheckboxInput({ ...props }: StructureCheckboxInputProps, ref: Ref<HTMLInputElement>) {
    return (
        <input {...useMergedProps({ class: clsx("form-check-input") }, { ...props, ref })} />
    )
})


export interface StructureCheckboxLabelProps extends GlobalAttributes<HTMLLabelElement, "children"> { }

export const StructureCheckboxLabel = memoForwardRef(function StructureCheckboxLabel({ children, ...props }: StructureCheckboxLabelProps, ref: Ref<HTMLLabelElement>) {
    return (
        <label {...useMergedProps({ class: "form-check-label" }, { ...props, ref })}>{children}</label>
    )
})
