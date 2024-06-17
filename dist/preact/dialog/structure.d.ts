import { ComponentChildren, EventType, Ref } from "preact-prop-helpers";
import { GlobalAttributes } from "../utility/types.js";
import type { DialogProps } from "./index.js";
export interface StructureDialogPortalRootProps extends GlobalAttributes<HTMLDivElement, "children"> {
}
export interface StructureDialogBackdropProps extends GlobalAttributes<HTMLDivElement> {
    modal: boolean | undefined;
    open: boolean;
}
export interface StructureDialogModalProps extends GlobalAttributes<HTMLDivElement, "children">, Pick<DialogProps, "variantSize" | "fullscreen"> {
    open: boolean;
}
export interface StructureDialogModalTitleProps extends GlobalAttributes<HTMLDivElement, "children"> {
}
export interface StructureDialogModalBodyProps extends GlobalAttributes<HTMLDivElement, "children"> {
}
export interface StructureDialogModalFooterProps extends GlobalAttributes<HTMLDivElement, "children"> {
}
export interface StructureDialogModalCloseButtonProps extends GlobalAttributes<HTMLDivElement> {
    onClose(e: EventType<any, any>, reason: "escape"): void;
}
export interface StructureDialogModalDialogProps extends GlobalAttributes<HTMLDivElement, "children">, Required<Pick<DialogProps, "open" | "header">> {
}
export interface StructureDialogModalContentProps extends GlobalAttributes<HTMLSpanElement>, Pick<DialogProps, "headerPosition"> {
    childrenHeading: ComponentChildren;
    childrenBody: ComponentChildren;
    childrenFooter: ComponentChildren | null;
}
export declare const StructureDialogPortalRoot: ({ children, ...props }: StructureDialogPortalRootProps, ref: Ref<HTMLDivElement>) => import("preact-prop-helpers").JSX.Element;
export declare const StructureDialogBackdrop: ({ open, modal, ...props }: StructureDialogBackdropProps, ref: Ref<HTMLDivElement>) => import("preact-prop-helpers").JSX.Element;
export declare const StructureDialogModalTitle: ({ children, ...props }: StructureDialogModalTitleProps, ref: Ref<HTMLDivElement>) => import("preact-prop-helpers").JSX.Element;
export declare const StructureDialogModalCloseButton: ({ onClose, ...props }: StructureDialogModalCloseButtonProps, ref: Ref<HTMLDivElement>) => import("preact-prop-helpers").JSX.Element;
export declare const StructureDialogModalBody: ({ children, ...props }: StructureDialogModalBodyProps, ref: Ref<HTMLDivElement>) => import("preact-prop-helpers").JSX.Element;
export declare const StructureDialogModalFooter: ({ children, ...props }: StructureDialogModalFooterProps, ref: Ref<HTMLDivElement>) => import("preact-prop-helpers").JSX.Element | null;
export declare const StructureDialogModalDialog: ({ open, children, header, ...props }: StructureDialogModalDialogProps, ref: Ref<HTMLDivElement>) => import("preact-prop-helpers").JSX.Element;
export declare const StructureDialogModalContent: ({ childrenHeading, childrenBody, childrenFooter, headerPosition, ...props }: StructureDialogModalContentProps, ref: Ref<HTMLSpanElement>) => import("preact-prop-helpers").JSX.Element;
export declare const StructureDialogModal: ({ open, variantSize, fullscreen, children, ...props }: StructureDialogModalProps, ref: Ref<HTMLDivElement>) => import("preact-prop-helpers").JSX.Element;
//# sourceMappingURL=structure.d.ts.map