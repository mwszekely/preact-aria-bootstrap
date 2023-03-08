import { clsx } from "clsx";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { useClonedElement } from "../utility/use-cloned-element.js";
export const GridCss = memo(forwardElementRef(function GridCss({ columns, gap, children, ...props }, ref) {
    let style = {};
    if (gap != null)
        style["--bs-gap"] = gap;
    if (columns != null)
        style["--bs-columns"] = columns;
    return (useClonedElement(children, useMergedProps(props, { class: "grid", style }), ref));
}));
export const GridCssItem = memo(forwardElementRef(function GridCssItem({ span, spanXs, spanSm, spanMd, spanLg, spanXl, spanXxl, start, startXs, startSm, startMd, startLg, startXl, startXxl, children, ...props }, ref) {
    return (useClonedElement(children, useMergedProps(props, {
        class: clsx(span && `g-col-${span}`, spanXs && `g-col-xs-${spanXs}`, spanSm && `g-col-sm-${spanSm}`, spanMd && `g-col-md-${spanMd}`, spanLg && `g-col-lg-${spanLg}`, spanXl && `g-col-xl-${spanXl}`, spanXxl && `g-col-xxl-${spanXxl}`, start && `g-start-${start}`, startXs && `g-start-xs-${startXs}`, startSm && `g-start-sm-${startSm}`, startMd && `g-start-md-${startMd}`, startLg && `g-start-lg-${startLg}`, startXl && `g-start-xl-${startXl}`, startXxl && `g-start-xxl-${startXxl}`)
    }), ref));
}));
//# sourceMappingURL=grid-css.js.map