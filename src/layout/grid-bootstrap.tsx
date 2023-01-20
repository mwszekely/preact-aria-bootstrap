import clsx from "clsx";
import { Ref } from "preact";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef, GlobalAttributes, useClonedElement } from "../utility";

export interface GridBsContainerProps extends GlobalAttributes<HTMLDivElement, "children"> {
    /**
     * When set, this container will be width: 100% until the specified breakpoint is hit, 
     * at which point it will snap to the appropriate sizes above.
     */
    fillUntil?: "auto" | "fluid" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}
export interface GridBsRowProps extends GlobalAttributes<HTMLDivElement, "children"> {
    justify?: "start" | "center" | "end" | "space-around" | "space-between" | "space-evenly";

    gutterHorizontal?: number;
    gutterHorizontalXs?: number;
    gutterHorizontalSm?: number;
    gutterHorizontalMd?: number;
    gutterHorizontalLg?: number;
    gutterHorizontalXl?: number;
    gutterHorizontalXxl?: number;

    gutterVertical?: number;
    gutterVerticalXs?: number;
    gutterVerticalSm?: number;
    gutterVerticalMd?: number;
    gutterVerticalLg?: number;
    gutterVerticalXl?: number;
    gutterVerticalXxl?: number;

    gutter?: number;
    gutterXs?: number;
    gutterSm?: number;
    gutterMd?: number;
    gutterLg?: number;
    gutterXl?: number;
    gutterXxl?: number;

}
export interface GridBsItemProps extends GlobalAttributes<HTMLDivElement, "children"> {
    /** How many columns this item will take up (if the viewport is smaller than any breakpoint option given). */
    span?: number;

    /** Will only apply if the viewport is smaller than any other breakpoint option given */
    spanXs?: number;
    /** Will only apply if the viewport is ≥576px and smaller than any other breakpoint option given */
    spanSm?: number;
    /** Will only apply if the viewport is ≥768px and smaller than any other breakpoint option given */
    spanMd?: number;
    /** Will only apply if the viewport is ≥992px and smaller than any other breakpoint option given */
    spanLg?: number;
    /** Will only apply if the viewport is ≥1200px and smaller than any other breakpoint option given */
    spanXl?: number;
    /** Will only apply if the viewport is ≥1400px */
    spanXxl?: number;

    /** How many columns over from the left(/start) this item starts from */
    offset?: number;

    offsetXs?: number;
    offsetSm?: number;
    offsetMd?: number;
    offsetLg?: number;
    offsetXl?: number;
    offsetXxl?: number;
}
export interface GridBsBreakProps extends GlobalAttributes<HTMLDivElement, "children"> {
    hideUntil?: "sm" | "md" | "lg" | "xl" | "xxl";
}

export const GridBsContainer = memo(forwardElementRef(function GridContainer({ fillUntil, children, ...props }: GridBsContainerProps, ref?: Ref<HTMLDivElement>) {
    fillUntil ??= "auto"
    return (useClonedElement(children, useMergedProps(props, {
        className:
            clsx(
                fillUntil == "auto" ? `container` :
                    `container-${fillUntil}`
            )
    }), ref))
}));

export const GridBsRow = memo(forwardElementRef(function GridRow({
    justify,
    children,

    gutterHorizontal,
    gutterHorizontalXs,
    gutterHorizontalSm,
    gutterHorizontalMd,
    gutterHorizontalLg,
    gutterHorizontalXl,
    gutterHorizontalXxl,

    gutterVertical,
    gutterVerticalXs,
    gutterVerticalSm,
    gutterVerticalMd,
    gutterVerticalLg,
    gutterVerticalXl,
    gutterVerticalXxl,

    gutter,
    gutterXs,
    gutterSm,
    gutterMd,
    gutterLg,
    gutterXl,
    gutterXxl,
    ...props }: GridBsRowProps, ref: Ref<HTMLDivElement>) {
    return (
        useClonedElement(children, useMergedProps(props, {
            className: clsx(
                "row",
                gutterHorizontal != null && `gx-${gutterHorizontal}`,
                gutterHorizontalXs != null && `gx-xs-${gutterHorizontalXs}`,
                gutterHorizontalSm != null && `gx-sm-${gutterHorizontalSm}`,
                gutterHorizontalMd != null && `gx-md-${gutterHorizontalMd}`,
                gutterHorizontalLg != null && `gx-lg-${gutterHorizontalLg}`,
                gutterHorizontalXl != null && `gx-xl-${gutterHorizontalXl}`,
                gutterHorizontalXxl != null && `gx-xxl-${gutterHorizontalXxl}`,

                gutterVertical != null && `gy-${gutterVertical}`,
                gutterVerticalXs != null && `gy-xs-${gutterVerticalXs}`,
                gutterVerticalSm != null && `gy-sm-${gutterVerticalSm}`,
                gutterVerticalMd != null && `gy-md-${gutterVerticalMd}`,
                gutterVerticalLg != null && `gy-lg-${gutterVerticalLg}`,
                gutterVerticalXl != null && `gy-xl-${gutterVerticalXl}`,
                gutterVerticalXxl != null && `gy-xxl-${gutterVerticalXxl}`,

                gutter != null && `g-${gutter}`,
                gutterXs != null && `g-xs-${gutterXs}`,
                gutterSm != null && `g-sm-${gutterSm}`,
                gutterMd != null && `g-md-${gutterMd}`,
                gutterLg != null && `g-lg-${gutterLg}`,
                gutterXl != null && `g-xl-${gutterXl}`,
                gutterXxl != null && `g-xxl-${gutterXxl}`,
            )
        }), ref)
    )
}));

export const GridBsItem = memo(forwardElementRef(function GridItem({
    children,
    offset,
    offsetXs,
    offsetSm,
    offsetMd,
    offsetLg,
    offsetXl,
    offsetXxl,
    span,
    spanXs,
    spanSm,
    spanMd,
    spanLg,
    spanXl,
    spanXxl,
    ...props
}: GridBsItemProps, ref: Ref<HTMLDivElement>) {
    return (
        useClonedElement(children, useMergedProps(props, {
            className: clsx(
                "col",

                offset && `offset-${offset}`,
                offsetXs && `offset-xs-${offsetXs}`,
                offsetSm && `offset-sm-${offsetSm}`,
                offsetMd && `offset-md-${offsetMd}`,
                offsetLg && `offset-lg-${offsetLg}`,
                offsetXl && `offset-xl-${offsetXl}`,
                offsetXxl && `offset-xxl-${offsetXxl}`,

                span && `span-${span}`,
                spanXs && `span-xs-${spanXs}`,
                spanSm && `span-sm-${spanSm}`,
                spanMd && `span-md-${spanMd}`,
                spanLg && `span-lg-${spanLg}`,
                spanXl && `span-xl-${spanXl}`,
                spanXxl && `span-xxl-${spanXxl}`,
            )
        }), ref)
    )
}));

export const GridBsBreak = memo(forwardElementRef(function GridBreak({ hideUntil, children, ...props }: GridBsBreakProps, ref: Ref<HTMLDivElement>) {
    return (useClonedElement(children, useMergedProps(props, { className: clsx("w-100", hideUntil && `d-none d-${hideUntil}-block`) }), ref))
}))
