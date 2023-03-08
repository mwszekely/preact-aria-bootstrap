import { ComponentChildren, Ref, VNode } from "preact";
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
    /**
     * If true, this dialog cannot be closed with the Escape key or by clicking the backdrop.
     */
    modal?: boolean;
}
export declare const Dialog: ({ open, fullscreen, variantSize, header, headerPosition, footer, onClose, anchor, modal, children, ...props }: DialogProps, ref?: Ref<HTMLSpanElement>) => import("preact").JSX.Element;
//# sourceMappingURL=index.d.ts.map