import { clsx } from "clsx";
import { h, Ref } from "preact";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { GlobalAttributes } from "../utility/types.js";
import { useClonedElement } from "../utility/use-cloned-element.js";

export interface GridCssProps extends GlobalAttributes<HTMLDivElement, "children"> {
    columns?: number;
    /** Must be a measurement, e.g. `0.25rem 1rem` */
    gap?: string;
}

export interface GridCssItemProps extends GlobalAttributes<HTMLDivElement, "children"> {
    span?: number;
    spanXs?: number;
    spanSm?: number;
    spanMd?: number;
    spanLg?: number;
    spanXl?: number;
    spanXxl?: number;

    start?: number;
    startXs?: number;
    startSm?: number;
    startMd?: number;
    startLg?: number;
    startXl?: number;
    startXxl?: number;
}

export const GridCss = memo(forwardElementRef(function GridCss({ columns, gap, children, ...props }: GridCssProps, ref: Ref<HTMLDivElement>) {
    let style: h.JSX.CSSProperties = {};
    if (gap != null)
        style["--bs-gap"] = gap;
    if (columns != null)
        style["--bs-columns"] = columns;

    return (useClonedElement(children, useMergedProps(props, { class: "grid", style }), ref));
}))

export const GridCssItem = memo(forwardElementRef(function GridCssItem({
    span, spanXs, spanSm, spanMd, spanLg, spanXl, spanXxl,
    start, startXs, startSm, startMd, startLg, startXl, startXxl,
    children,
    ...props
}: GridCssItemProps, ref?: Ref<HTMLDivElement>) {
    return (
        useClonedElement(children, useMergedProps(props, {
            class: clsx(
                span && `g-col-${span}`,
                spanXs && `g-col-xs-${spanXs}`,
                spanSm && `g-col-sm-${spanSm}`,
                spanMd && `g-col-md-${spanMd}`,
                spanLg && `g-col-lg-${spanLg}`,
                spanXl && `g-col-xl-${spanXl}`,
                spanXxl && `g-col-xxl-${spanXxl}`,

                start && `g-start-${start}`,
                startXs && `g-start-xs-${startXs}`,
                startSm && `g-start-sm-${startSm}`,
                startMd && `g-start-md-${startMd}`,
                startLg && `g-start-lg-${startLg}`,
                startXl && `g-start-xl-${startXl}`,
                startXxl && `g-start-xxl-${startXxl}`,
            )
        }), ref)
    )
}));
