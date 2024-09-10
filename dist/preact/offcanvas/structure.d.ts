import { EventType, Ref } from "preact-prop-helpers";
import { GlobalAttributes } from "../utility/types.js";
import type { OffcanvasProps } from "./index.js";
export interface StructureOffcanvasPortalRootProps extends GlobalAttributes<HTMLDivElement, "children"> {
}
export interface StructureOffcanvasBackdropProps extends GlobalAttributes<HTMLDivElement> {
    open: boolean;
}
export interface StructureOffcanvasModalProps extends GlobalAttributes<HTMLDivElement, "children">, Pick<OffcanvasProps, never> {
    open: boolean;
}
export interface StructureOffcanvasModalTitleProps extends GlobalAttributes<HTMLDivElement, "children"> {
}
export interface StructureOffcanvasModalBodyProps extends GlobalAttributes<HTMLDivElement, "children"> {
}
export interface StructureOffcanvasModalHeaderProps extends GlobalAttributes<HTMLDivElement, "children"> {
}
export interface StructureOffcanvasModalCloseButtonProps extends GlobalAttributes<HTMLDivElement> {
    onClose(e: EventType<any, any>, reason: "escape"): void;
}
export declare const StructureOffcanvasPortalRoot: ({ children, ...props }: StructureOffcanvasPortalRootProps, ref: Ref<HTMLDivElement>) => import("preact").h.JSX.Element;
export declare const StructureOffcanvasBackdrop: ({ open, ...props }: StructureOffcanvasBackdropProps, ref: Ref<HTMLDivElement>) => import("preact").h.JSX.Element;
export declare const StructureOffcanvasModalTitle: ({ children, ...props }: StructureOffcanvasModalTitleProps, ref: Ref<HTMLDivElement>) => import("preact").h.JSX.Element;
export declare const StructureOffcanvasModalCloseButton: ({ onClose, ...props }: StructureOffcanvasModalCloseButtonProps, ref: Ref<HTMLDivElement>) => import("preact").h.JSX.Element;
export declare const StructureOffcanvasModalBody: ({ children, ...props }: StructureOffcanvasModalBodyProps, ref: Ref<HTMLDivElement>) => import("preact").h.JSX.Element;
export declare const StructureOffcanvasModalHeader: ({ children, ...props }: StructureOffcanvasModalHeaderProps, ref: Ref<HTMLDivElement>) => import("preact").h.JSX.Element;
export declare const StructureOffcanvasModal: ({ open, children, ...props }: StructureOffcanvasModalProps, ref: Ref<HTMLDivElement>) => import("preact").h.JSX.Element;
//# sourceMappingURL=structure.d.ts.map