import { clsx } from "clsx";
import { JSX, Ref, memo, useMergedProps } from "preact-prop-helpers";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { GlobalAttributes } from "../utility/types.js";
import { WithinInputGroup } from "./shared.js";

export interface InputGroupProps extends Pick<JSX.HTMLAttributes<HTMLDivElement>, "children" | "style" | "class" | "className"> {
    wrap?: boolean;
    size?: "sm" | "md" | "lg";
}

export const InputGroup = /* @__PURE__ */ memo(forwardElementRef(function InputGroup({ wrap, size, children, ...props }: InputGroupProps, ref?: Ref<HTMLDivElement>) {
    return (
        <WithinInputGroup.Provider value={true}>
            <div {...useMergedProps({ class: clsx("input-group", !wrap && "flex-nowrap", size && `input-group-${size}`), ref, children }, props)} />
        </WithinInputGroup.Provider>
    )
}));

export const InputGroupText = /* @__PURE__ */ memo(forwardElementRef(function InputGroupText(props: GlobalAttributes<HTMLDivElement, "children">, ref: Ref<HTMLDivElement>) {
    return <div {...useMergedProps({ className: "input-group-text" }, props)} ref={ref} />
}))
