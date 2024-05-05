import { memo, useMergedProps } from "preact-prop-helpers/preact";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { useClonedElement } from "../utility/use-cloned-element.js";
/**
 * Very simple, easy static grid that guarantees the number of columns is displayed,
 * no matter how janky it looks.
 *
 * (This can, of course, be achieved fairly easily with other grids -- this is more of a fun one-liner)
 */
export const GridStatic = memo(forwardElementRef(function ResponsiveGrid({ columns, children, ...props }, ref) {
    const mergedProps = useMergedProps({
        className: "static-grid",
        style: typeof columns === "string" ? { "--static-grid-columns": columns } : { "--grid-column-count": columns }
    }, props);
    return useClonedElement(children, mergedProps, ref);
}));
//# sourceMappingURL=grid-static.js.map