import { clsx } from "clsx";
import { h, Ref } from "preact";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { GlobalAttributes } from "../utility/types.js";
import { WithinInputGroup } from "./shared.js";

export interface InputGroupProps extends Pick<h.JSX.HTMLAttributes<HTMLDivElement>, "children" | "style" | "class" | "className"> {
    wrap?: boolean;
    size?: "sm" | "md" | "lg";
}

export const InputGroup = memo(forwardElementRef(function InputGroup({ wrap, size, children, ...props }: InputGroupProps, ref?: Ref<HTMLDivElement>) {
    return (
        <WithinInputGroup.Provider value={true}>
            <div {...useMergedProps({ class: clsx("input-group", !wrap && "flex-nowrap", size && `input-group-${size}`), ref, children }, props)} />
        </WithinInputGroup.Provider>
    )
}));

export const InputGroupText = memo(forwardElementRef(function InputGroupText(props: GlobalAttributes<HTMLDivElement, "children">, ref: Ref<HTMLDivElement>) {
    return <div {...useMergedProps({ className: "input-group-text" }, props)} ref={ref} />
}))
