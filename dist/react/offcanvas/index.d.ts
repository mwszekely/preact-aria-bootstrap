import { ComponentChildren, h, Ref, VNode } from "preact";
import { DialogProps as AriaDialogProps } from "preact-aria-widgets";
import { GlobalAttributes } from "../utility/types.js";
export interface OffcanvasProps extends GlobalAttributes<HTMLSpanElement, "children"> {
    open: boolean;
    onClose: AriaDialogProps<HTMLSpanElement, HTMLSpanElement, HTMLSpanElement, HTMLSpanElement>["onDismiss"];
    headerPosition?: "hidden" | "start";
    header: ComponentChildren;
    anchor: VNode;
    /** Props are spread to the anchor element. If you need to have a class name or style set on the dialog itself, pass those here. */
    propsPortal?: h.JSX.HTMLAttributes<HTMLDivElement>;
}
export declare const Offcanvas: ({ open, header, headerPosition, onClose, anchor, children, propsPortal, ...props }: OffcanvasProps, ref?: Ref<HTMLSpanElement>) => import("preact").JSX.Element;
//# sourceMappingURL=index.d.ts.map