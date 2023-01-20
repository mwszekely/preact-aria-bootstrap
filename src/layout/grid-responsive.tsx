import { Ref } from "preact";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef, GlobalAttributes, useClonedElement } from "../utility";

/**
 * Very simple, easy responsive grid that guarantees each column is the minimum size.
 * 
 * Use leftover to control what happens when there's more space than minimally required.
 * * "fill" to have each element expand equally to fill the remaining space
 * * "shrink" to keep as many elements on one line as possible
 * 
 * Easy one-liners all around here!
 */
export const GridResponsive = memo(forwardElementRef(function ResponsiveGrid<E extends Element>({ minWidth, leftover, children, ...props }: { leftover?: "fill" | "shrink", minWidth: `${string}em`, tag?: "passthrough" } & GlobalAttributes<E, "children">, ref: Ref<E>) {
    const mergedProps = useMergedProps<E>({
        className: "responsive-grid",
        style: !minWidth ? {} : {
            "--grid-min-width": `${minWidth}`,
            "--grid-auto-behavior": leftover ? `auto-${leftover == "shrink" ? "fit" : leftover}` : ""
        }
    }, props);


    return useClonedElement(children, mergedProps, ref);
}));