import { Ref } from "preact-prop-helpers";
import { GlobalAttributes } from "../utility/types.js";
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
export declare const GridBsContainer: ({ fillUntil, children, ...props }: GridBsContainerProps, ref?: Ref<HTMLDivElement>) => import("preact").VNode<import("preact-prop-helpers").JSX.DOMAttributes<HTMLInputElement> & import("preact").ClassAttributes<HTMLInputElement>>;
export declare const GridBsRow: ({ justify, children, gutterHorizontal, gutterHorizontalXs, gutterHorizontalSm, gutterHorizontalMd, gutterHorizontalLg, gutterHorizontalXl, gutterHorizontalXxl, gutterVertical, gutterVerticalXs, gutterVerticalSm, gutterVerticalMd, gutterVerticalLg, gutterVerticalXl, gutterVerticalXxl, gutter, gutterXs, gutterSm, gutterMd, gutterLg, gutterXl, gutterXxl, ...props }: GridBsRowProps, ref: Ref<HTMLDivElement>) => import("preact").VNode<import("preact-prop-helpers").JSX.DOMAttributes<HTMLInputElement> & import("preact").ClassAttributes<HTMLInputElement>>;
export declare const GridBsItem: ({ children, offset, offsetXs, offsetSm, offsetMd, offsetLg, offsetXl, offsetXxl, span, spanXs, spanSm, spanMd, spanLg, spanXl, spanXxl, ...props }: GridBsItemProps, ref: Ref<HTMLDivElement>) => import("preact").VNode<import("preact-prop-helpers").JSX.DOMAttributes<HTMLInputElement> & import("preact").ClassAttributes<HTMLInputElement>>;
export declare const GridBsBreak: ({ hideUntil, children, ...props }: GridBsBreakProps, ref: Ref<HTMLDivElement>) => import("preact").VNode<import("preact-prop-helpers").JSX.DOMAttributes<HTMLInputElement> & import("preact").ClassAttributes<HTMLInputElement>>;
//# sourceMappingURL=grid-bootstrap.d.ts.map