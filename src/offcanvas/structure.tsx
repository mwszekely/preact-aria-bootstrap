import { clsx } from "clsx";
import { Ref } from "preact";
import { EventType, useMergedProps } from "preact-prop-helpers";
import { Fade, Slide } from "preact-transition";
import { Button } from "../button/index.js";
import { memoForwardRef } from "../utility/forward-element-ref.js";
import { GlobalAttributes } from "../utility/types.js";
import type { OffcanvasProps } from "./index.js";

export interface StructureOffcanvasPortalRootProps extends GlobalAttributes<HTMLDivElement, "children"> { }
export interface StructureOffcanvasBackdropProps extends GlobalAttributes<HTMLDivElement> { open: boolean; }
export interface StructureOffcanvasModalProps extends GlobalAttributes<HTMLDivElement, "children">, Pick<OffcanvasProps, never> { open: boolean; }
export interface StructureOffcanvasModalTitleProps extends GlobalAttributes<HTMLDivElement, "children"> { }
export interface StructureOffcanvasModalBodyProps extends GlobalAttributes<HTMLDivElement, "children"> { }
export interface StructureOffcanvasModalHeaderProps extends GlobalAttributes<HTMLDivElement, "children"> { }
export interface StructureOffcanvasModalCloseButtonProps extends GlobalAttributes<HTMLDivElement> { onClose(e: EventType<any, any>, reason: "escape"): void; }


export const StructureOffcanvasPortalRoot = memoForwardRef(function StructureOffcanvasPortalRoot({ children, ...props }: StructureOffcanvasPortalRootProps, ref: Ref<HTMLDivElement>) { return (<div {...props} ref={ref}>{children}</div>) })
export const StructureOffcanvasBackdrop = memoForwardRef(function StructureOffcanvasBackdrop({ open, ...props }: StructureOffcanvasBackdropProps, ref: Ref<HTMLDivElement>) {
    return (
        <Fade show={open} fadeMax={0.25} duration={350}>
            <div {...useMergedProps({ class: "offcanvas-backdrop" }, { ...props, ref })} />
        </Fade>
    )
});

export const StructureOffcanvasModalTitle = memoForwardRef(function StructureOffcanvasModalTitle({ children, ...props }: StructureOffcanvasModalTitleProps, ref: Ref<HTMLDivElement>) {
    return (<div {...useMergedProps({ class: "offcanvas-title" }, { ...props, ref })}>{children}</div>)
})

export const StructureOffcanvasModalCloseButton = memoForwardRef(function StructureOffcanvasModalCloseButton({ onClose, ...props }: StructureOffcanvasModalCloseButtonProps, ref: Ref<HTMLDivElement>) {
    return (<Button onPress={(_pressed, e) => onClose(e, "escape")} {...useMergedProps({ class: "btn-close", "aria-label": "Close" }, { ...props, ref }) as {}} />)
})

export const StructureOffcanvasModalBody = memoForwardRef(function StructureOffcanvasModalBody({ children, ...props }: StructureOffcanvasModalBodyProps, ref: Ref<HTMLDivElement>) {
    return (<div {...useMergedProps({ class: "offcanvas-body" }, { ...props, ref })}>{children}</div>)
})

export const StructureOffcanvasModalHeader = memoForwardRef(function StructureOffcanvasModalHeader({ children, ...props }: StructureOffcanvasModalHeaderProps, ref: Ref<HTMLDivElement>) {
    return (<div {...useMergedProps({ class: "offcanvas-header" }, { ...props, ref })}>{children}</div>)
})



export const StructureOffcanvasModal = memoForwardRef(function StructureOffcanvasModal({ open, children, ...props }: StructureOffcanvasModalProps, ref: Ref<HTMLDivElement>) {

    const otherProps = {
        tabIndex: -1,
        className: clsx("offcanvas")
    }

    return (
        <Slide show={open} slideTargetInline={-1} duration={350}>
            <div {...useMergedProps(otherProps, { ...props, ref })}>
                {children}
            </div>
        </Slide>
    )
})
