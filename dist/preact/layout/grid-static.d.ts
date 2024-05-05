import { Ref } from "preact-prop-helpers/preact";
import { GlobalAttributes } from "../utility/types.js";
/**
 * Very simple, easy static grid that guarantees the number of columns is displayed,
 * no matter how janky it looks.
 *
 * (This can, of course, be achieved fairly easily with other grids -- this is more of a fun one-liner)
 */
export declare const GridStatic: <E extends Element>({ columns, children, ...props }: {
    columns: number | string;
} & GlobalAttributes<E, "children">, ref: Ref<E>) => import("preact").VNode<import("preact-prop-helpers").JSX.DOMAttributes<HTMLInputElement> & import("preact").ClassAttributes<HTMLInputElement>>;
//# sourceMappingURL=grid-static.d.ts.map