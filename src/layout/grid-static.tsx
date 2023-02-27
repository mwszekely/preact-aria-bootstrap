import { Ref } from "preact";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { GlobalAttributes } from "../utility/types.js";
import { useClonedElement } from "../utility/use-cloned-element.js";

/**
 * Very simple, easy static grid that guarantees the number of columns is displayed,
 * no matter how janky it looks.
 * 
 * (This can, of course, be achieved fairly easily with other grids -- this is more of a fun one-liner)
 */
export const GridStatic = memo(forwardElementRef(function ResponsiveGrid<E extends Element>({ columns, children, ...props }: { columns: number | string } & GlobalAttributes<E, "children">, ref: Ref<E>) {

    const mergedProps = useMergedProps<E>({
        className: "static-grid",
        style: typeof columns === "string" ? { "--static-grid-columns": columns } : { "--grid-column-count": columns }
    }, props);

    return useClonedElement(children, mergedProps, ref);
}));
