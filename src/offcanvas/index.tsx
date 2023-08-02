import { ComponentChildren, h, Ref, VNode } from "preact";
import { Dialog as AriaDialog, DialogProps as AriaDialogProps, useDefaultRenderPortal } from "preact-aria-widgets";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { GlobalAttributes } from "../utility/types.js";
import { useClonedElement } from "../utility/use-cloned-element.js";
import { usePortalId } from "../utility/use-portal-id.js";
import { StructureOffcanvasBackdrop, StructureOffcanvasModal, StructureOffcanvasModalBody, StructureOffcanvasModalCloseButton, StructureOffcanvasModalHeader, StructureOffcanvasModalTitle, StructureOffcanvasPortalRoot } from "./structure.js";

export interface OffcanvasProps extends GlobalAttributes<HTMLSpanElement, "children"> {
    open: boolean;
    onClose: AriaDialogProps<HTMLSpanElement, HTMLSpanElement, HTMLSpanElement, HTMLSpanElement>["onDismiss"];
    headerPosition?: "hidden" | "start";
    header: ComponentChildren;
    anchor: VNode;

    /** Props are spread to the anchor element. If you need to have a class name or style set on the dialog itself, pass those here. */
    propsPortal?: h.JSX.HTMLAttributes<HTMLDivElement>;
}

export const Offcanvas = memo(forwardElementRef(function Offcanvas({ open, header, headerPosition, onClose, anchor, children, propsPortal, ...props }: OffcanvasProps, ref?: Ref<HTMLSpanElement>) {
    headerPosition ??= "start";
    if (headerPosition == "hidden") {
        console.assert(typeof header == "string", `An offcanvas whose label is hidden must provide the label to use as a string to the header`);
    }
    return (
        <AriaDialog<HTMLDivElement, HTMLSpanElement, HTMLDivElement, HTMLHeadingElement>

            ariaLabel={headerPosition == "hidden" ? header as string : null}
            active={open}
            onDismiss={onClose}
            focusPopup={(e, f) => f()?.focus?.()}
            dismissBackdropActive={true}
            dismissEscapeActive={true}

            render={info => {

                return (
                    <>
                        {useClonedElement(anchor, useMergedProps(info.propsSource, props), ref)}
                        {useDefaultRenderPortal({
                            portalId: usePortalId("offcanvas"),
                            children: (
                                <StructureOffcanvasPortalRoot {...useMergedProps(info.propsFocusContainer, propsPortal || {})}>
                                    <StructureOffcanvasModal open={open} {...info.propsDialog as {}}>
                                        <StructureOffcanvasModalHeader>
                                            <StructureOffcanvasModalTitle {...info.propsTitle}>{header}</StructureOffcanvasModalTitle>
                                            <StructureOffcanvasModalCloseButton onClose={onClose} />
                                        </StructureOffcanvasModalHeader>
                                        <StructureOffcanvasModalBody>{children}</StructureOffcanvasModalBody>
                                    </StructureOffcanvasModal>
                                    <StructureOffcanvasBackdrop open={open} />
                                </StructureOffcanvasPortalRoot>
                            )
                        })}
                    </>
                )
            }}
        />
    )
}))
