import { ComponentChildren, Ref, VNode } from "preact";
import { DialogProps as AriaDialogProps } from "preact-aria-widgets";
import { GlobalAttributes } from "../utility/types.js";
export interface OffcanvasProps extends GlobalAttributes<HTMLSpanElement, "children"> {
    open: boolean;
    onClose: AriaDialogProps<HTMLSpanElement, HTMLSpanElement, HTMLSpanElement, HTMLSpanElement>["onClose"];
    headerPosition?: "hidden" | "start";
    header: ComponentChildren;
    anchor: VNode;
}
export declare const Offcanvas: ({ open, header, headerPosition, onClose, anchor, children, ...props }: OffcanvasProps, ref?: Ref<HTMLSpanElement>) => import("preact").JSX.Element;
//# sourceMappingURL=index.d.ts.map