import { clsx } from "clsx";
import { memo, useMergedProps } from "preact-prop-helpers";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { useClonedElement } from "../utility/use-cloned-element.js";
export const GridBsContainer = memo(forwardElementRef(function GridContainer({ fillUntil, children, ...props }, ref) {
    fillUntil ??= "auto";
    return (useClonedElement(children, useMergedProps(props, {
        className: clsx(fillUntil == "auto" ? `container` :
            `container-${fillUntil}`)
    }), ref));
}));
export const GridBsRow = memo(forwardElementRef(function GridRow({ justify, children, gutterHorizontal, gutterHorizontalXs, gutterHorizontalSm, gutterHorizontalMd, gutterHorizontalLg, gutterHorizontalXl, gutterHorizontalXxl, gutterVertical, gutterVerticalXs, gutterVerticalSm, gutterVerticalMd, gutterVerticalLg, gutterVerticalXl, gutterVerticalXxl, gutter, gutterXs, gutterSm, gutterMd, gutterLg, gutterXl, gutterXxl, ...props }, ref) {
    return (useClonedElement(children, useMergedProps(props, {
        className: clsx("row", gutterHorizontal != null && `gx-${gutterHorizontal}`, gutterHorizontalXs != null && `gx-xs-${gutterHorizontalXs}`, gutterHorizontalSm != null && `gx-sm-${gutterHorizontalSm}`, gutterHorizontalMd != null && `gx-md-${gutterHorizontalMd}`, gutterHorizontalLg != null && `gx-lg-${gutterHorizontalLg}`, gutterHorizontalXl != null && `gx-xl-${gutterHorizontalXl}`, gutterHorizontalXxl != null && `gx-xxl-${gutterHorizontalXxl}`, gutterVertical != null && `gy-${gutterVertical}`, gutterVerticalXs != null && `gy-xs-${gutterVerticalXs}`, gutterVerticalSm != null && `gy-sm-${gutterVerticalSm}`, gutterVerticalMd != null && `gy-md-${gutterVerticalMd}`, gutterVerticalLg != null && `gy-lg-${gutterVerticalLg}`, gutterVerticalXl != null && `gy-xl-${gutterVerticalXl}`, gutterVerticalXxl != null && `gy-xxl-${gutterVerticalXxl}`, gutter != null && `g-${gutter}`, gutterXs != null && `g-xs-${gutterXs}`, gutterSm != null && `g-sm-${gutterSm}`, gutterMd != null && `g-md-${gutterMd}`, gutterLg != null && `g-lg-${gutterLg}`, gutterXl != null && `g-xl-${gutterXl}`, gutterXxl != null && `g-xxl-${gutterXxl}`)
    }), ref));
}));
export const GridBsItem = memo(forwardElementRef(function GridItem({ children, offset, offsetXs, offsetSm, offsetMd, offsetLg, offsetXl, offsetXxl, span, spanXs, spanSm, spanMd, spanLg, spanXl, spanXxl, ...props }, ref) {
    return (useClonedElement(children, useMergedProps(props, {
        className: clsx("col", offset && `offset-${offset}`, offsetXs && `offset-xs-${offsetXs}`, offsetSm && `offset-sm-${offsetSm}`, offsetMd && `offset-md-${offsetMd}`, offsetLg && `offset-lg-${offsetLg}`, offsetXl && `offset-xl-${offsetXl}`, offsetXxl && `offset-xxl-${offsetXxl}`, span && `col-${span}`, spanXs && `col-xs-${spanXs}`, spanSm && `col-sm-${spanSm}`, spanMd && `col-md-${spanMd}`, spanLg && `col-lg-${spanLg}`, spanXl && `col-xl-${spanXl}`, spanXxl && `col-xxl-${spanXxl}`)
    }), ref));
}));
export const GridBsBreak = memo(forwardElementRef(function GridBreak({ hideUntil, children, ...props }, ref) {
    return (useClonedElement(children, useMergedProps(props, { className: clsx("w-100", hideUntil && `d-none d-${hideUntil}-block`) }), ref));
}));
//# sourceMappingURL=grid-bootstrap.js.map