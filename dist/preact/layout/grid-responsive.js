import { memo, useMergedProps } from "preact-prop-helpers/preact";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { useClonedElement } from "../utility/use-cloned-element.js";
/**
 * Very simple, easy responsive grid that guarantees each column is the minimum size.
 *
 * Use leftover to control what happens when there's more space than minimally required.
 * * "fill" to have each element expand equally to fill the remaining space
 * * "shrink" to keep as many elements on one line as possible
 *
 * Easy one-liners all around here!
 */
export const GridResponsive = memo(forwardElementRef(function ResponsiveGrid({ minWidth, leftover, children, ...props }, ref) {
    const mergedProps = useMergedProps({
        className: "responsive-grid",
        style: !minWidth ? {} : {
            "--grid-min-width": `${minWidth}`,
            "--grid-auto-behavior": leftover ? `auto-${leftover == "shrink" ? "fit" : leftover}` : ""
        }
    }, props);
    return useClonedElement(children, mergedProps, ref);
}));
//# sourceMappingURL=grid-responsive.js.map