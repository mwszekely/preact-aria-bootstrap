import { JSX, Ref } from "preact-prop-helpers/preact";
import { GlobalAttributes } from "../utility/types.js";
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
export declare const GridCss: ({ columns, gap, children, ...props }: GridCssProps, ref: Ref<HTMLDivElement>) => import("preact").VNode<JSX.DOMAttributes<HTMLInputElement> & import("preact").ClassAttributes<HTMLInputElement>>;
export declare const GridCssItem: ({ span, spanXs, spanSm, spanMd, spanLg, spanXl, spanXxl, start, startXs, startSm, startMd, startLg, startXl, startXxl, children, ...props }: GridCssItemProps, ref?: Ref<HTMLDivElement>) => import("preact").VNode<JSX.DOMAttributes<HTMLInputElement> & import("preact").ClassAttributes<HTMLInputElement>>;
//# sourceMappingURL=grid-css.d.ts.map