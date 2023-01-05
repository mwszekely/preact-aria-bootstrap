import clsx from "clsx";
import { h, Ref } from "preact";
import { WithinInputGroup } from "./shared";

export interface InputGroupProps extends Pick<h.JSX.HTMLAttributes<HTMLDivElement>, "children" | "style" | "class" | "className"> {
    wrap?: boolean;
    size?: "sm" | "md" | "lg";
}

export function InputGroup({ wrap, size, children, ...props }: InputGroupProps, ref?: Ref<HTMLDivElement>) {
    return (
        <WithinInputGroup.Provider value={true}>
            <div class={clsx(!wrap && "flex-nowrap", size && `input-group-${size}`, "mb-3")} ref={ref}>{children}</div>
        </WithinInputGroup.Provider>
    )
}