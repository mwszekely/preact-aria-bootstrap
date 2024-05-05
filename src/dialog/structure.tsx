import { clsx } from "clsx";
import { Heading } from "preact-aria-widgets/preact";
import { ComponentChildren, EventType, Ref, useMergedProps } from "preact-prop-helpers/preact";
import { SlideFade } from "preact-transition/preact";
import { Button } from "../button/index.js";
import { memoForwardRef } from "../utility/forward-element-ref.js";
import { GlobalAttributes } from "../utility/types.js";
import type { DialogProps } from "./index.js";

export interface StructureDialogPortalRootProps extends GlobalAttributes<HTMLDivElement, "children"> { }
export interface StructureDialogBackdropProps extends GlobalAttributes<HTMLDivElement> { modal: boolean | undefined; open: boolean; }
export interface StructureDialogModalProps extends GlobalAttributes<HTMLDivElement, "children">, Pick<DialogProps, "variantSize" | "fullscreen"> { open: boolean; }
export interface StructureDialogModalTitleProps extends GlobalAttributes<HTMLDivElement, "children"> { }
export interface StructureDialogModalBodyProps extends GlobalAttributes<HTMLDivElement, "children"> { }
export interface StructureDialogModalFooterProps extends GlobalAttributes<HTMLDivElement, "children"> { }
export interface StructureDialogModalCloseButtonProps extends GlobalAttributes<HTMLDivElement> { onClose(e: EventType<any, any>, reason: "escape"): void; }
export interface StructureDialogModalDialogProps extends GlobalAttributes<HTMLDivElement, "children">, Required<Pick<DialogProps, "open" | "header">> { }
export interface StructureDialogModalContentProps extends GlobalAttributes<HTMLSpanElement>, Pick<DialogProps, "headerPosition"> { childrenHeading: ComponentChildren; childrenBody: ComponentChildren; childrenFooter: ComponentChildren | null; }

export const StructureDialogPortalRoot = memoForwardRef(function StructureDialogPortalRoot({ children, ...props }: StructureDialogPortalRootProps, ref: Ref<HTMLDivElement>) { return (<div {...props} ref={ref}>{children}</div>) })
export const StructureDialogBackdrop = memoForwardRef(function StructureDialogBackdrop({ open, modal, ...props }: StructureDialogBackdropProps, ref: Ref<HTMLDivElement>) {
    return (
        <div {...useMergedProps({ class: clsx("dialog-backdrop", open && "visible", modal && "dialog-backdrop-blur"), role: "presentation" }, { ...props, ref })} />
    )
});

export const StructureDialogModalTitle = memoForwardRef(function StructureDialogModalTitle({ children, ...props }: StructureDialogModalTitleProps, ref: Ref<HTMLDivElement>) {
    return (<div {...useMergedProps({ class: "modal-title" }, { ...props, ref })}>{children}</div>)
})

export const StructureDialogModalCloseButton = memoForwardRef(function StructureDialogModalCloseButton({ onClose, ...props }: StructureDialogModalCloseButtonProps, ref: Ref<HTMLDivElement>) {
    return (<Button onPress={(_pressed, e) => onClose(e, "escape")} {...useMergedProps({ class: "btn-close", "aria-label": "Close" }, { ...props, ref }) as {}} />)
})

export const StructureDialogModalBody = memoForwardRef(function StructureDialogModalBody({ children, ...props }: StructureDialogModalBodyProps, ref: Ref<HTMLDivElement>) {
    return (<div {...useMergedProps({ class: "modal-body" }, { ...props, ref })}>{children}</div>)
})

export const StructureDialogModalFooter = memoForwardRef(function StructureDialogModalFooter({ children, ...props }: StructureDialogModalFooterProps, ref: Ref<HTMLDivElement>) {
    return (children == null ? null : <div {...useMergedProps({ class: "modal-footer" }, { ...props, ref })}>{children}</div>)
})


export const StructureDialogModalDialog = memoForwardRef(function StructureDialogModalDialog({ open, children, header, ...props }: StructureDialogModalDialogProps, ref: Ref<HTMLDivElement>) {
    return (
        <SlideFade animateOnMount={true} delayMountUntilShown={true} show={open} slideTargetBlock={0.125 * (open ? 1 : -1)}>
            <div {...useMergedProps({ class: "modal-dialog" }, { ...props, ref })}>
                {children}
            </div>
        </SlideFade>
    )
})

export const StructureDialogModalContent = memoForwardRef(function StructureDialogModalContent({ childrenHeading, childrenBody, childrenFooter, headerPosition, ...props }: StructureDialogModalContentProps, ref: Ref<HTMLSpanElement>) {
    return (
        <span {...useMergedProps({ class: "modal-content" }, { ...props, ref })}>
            {headerPosition == "start" ? <Heading className="modal-header" heading={childrenHeading}>{childrenBody}</Heading> : childrenBody}
            {childrenFooter}
        </span>
    )
})

export const StructureDialogModal = memoForwardRef(function StructureDialogModal({ open, variantSize, fullscreen, children, ...props }: StructureDialogModalProps, ref: Ref<HTMLDivElement>) {

    const otherProps = {
        tabIndex: -1,
        className: clsx(
            "modal modal-dialog-scrollable overflow-hidden",
            open ? "d-block" : "d-hidden",
            variantSize && `modal-${variantSize}`,
            fullscreen && (fullscreen === true ? "modal-fullscreen" : `modal-fullscreen-${fullscreen}`)
        )
    }

    return (
        <div {...useMergedProps(otherProps, { ...props, ref })}>
            {children}
        </div>
    )
})
