import { ComponentChildren, h, Ref, VNode } from "preact";
import { DialogProps as AriaDialogProps } from "preact-aria-widgets";
import { Nullable } from "preact-prop-helpers";
import { GlobalAttributes } from "../utility/types.js";
export interface DialogProps extends GlobalAttributes<HTMLSpanElement, "children"> {
    open: boolean;
    onClose: AriaDialogProps<HTMLSpanElement, HTMLSpanElement, HTMLSpanElement, HTMLSpanElement>["onDismiss"];
    headerPosition?: "hidden" | "start";
    header: ComponentChildren;
    anchor: Nullable<VNode>;
    footer?: null | undefined | ComponentChildren;
    variantSize?: "xs" | "sm" | "md" | "lg" | "xl" | "unbounded";
    /**
     * The size at which this dialog becomes fullscreen, or just `true` to make it always fullscreen
     */
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