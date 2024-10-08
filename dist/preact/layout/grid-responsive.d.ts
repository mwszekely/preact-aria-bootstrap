import { Ref } from "preact-prop-helpers";
import { GlobalAttributes } from "../utility/types.js";
/**
 * Very simple, easy responsive grid that guarantees each column is the minimum size.
 *
 * Use leftover to control what happens when there's more space than minimally required.
 * * "fill" to have each element expand equally to fill the remaining space
 * * "shrink" to keep as many elements on one line as possible
 *
 * Easy one-liners all around here!
 */
export declare const GridResponsive: <E extends Element>({ minWidth, leftover, children, ...props }: {
    leftover?: "fill" | "shrink";
    minWidth: `${string}em`;
    tag?: "passthrough";
} & GlobalAttributes<E, "children">, ref: Ref<E>) => import("preact").VNode<import("preact").h.JSX.DOMAttributes<HTMLInputElement> & import("preact").ClassAttributes<HTMLInputElement>>;
//# sourceMappingURL=grid-responsive.d.ts.map