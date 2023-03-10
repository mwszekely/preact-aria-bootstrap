import { ComponentChildren, h, Ref, VNode } from "preact";
import { DialogProps as AriaDialogProps } from "preact-aria-widgets";
import { GlobalAttributes } from "../utility/types.js";
export interface DialogProps extends GlobalAttributes<HTMLSpanElement, "children"> {
    open: boolean;
    onClose: AriaDialogProps<HTMLSpanElement, HTMLSpanElement, HTMLSpanElement, HTMLSpanElement>["onClose"];
    headerPosition?: "hidden" | "start";
    header: ComponentChildren;
    anchor: VNode;
    footer?: null | undefined | ComponentChildren;
    variantSize?: "xs" | "sm" | "md" | "lg" | "xl" | "unbounded";
    fullscreen?: boolean | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
    /** Props are spread to the anchor element. If you need to have a class name or style set on the dialog itself, pass those here. */
    propsPortal?: h.JSX.HTMLAttributes<HTMLDivElement>;
    /**
     * If true, this dialog cannot be closed with the Escape key or by clicking the backdrop.
     */
    modal?: boolean;
}
export declare const Dialog: ({ open, fullscreen, variantSize, header, headerPosition, footer, onClose, anchor, modal, children, propsPortal, ...props }: DialogProps, ref?: Ref<HTMLSpanElement>) => import("preact").JSX.Element;
//# sourceMappingURL=index.d.ts.map