import { ComponentChildren, h, Ref, VNode } from "preact";
import { Dialog as AriaDialog, DialogProps as AriaDialogProps, useDefaultRenderPortal } from "preact-aria-widgets";
import { Nullable, useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { GlobalAttributes } from "../utility/types.js";
import { useClonedElement } from "../utility/use-cloned-element.js";
import { usePortalId } from "../utility/use-portal-id.js";
import { StructureDialogBackdrop, StructureDialogModal, StructureDialogModalBody, StructureDialogModalCloseButton, StructureDialogModalContent, StructureDialogModalDialog, StructureDialogModalFooter, StructureDialogModalTitle, StructureDialogPortalRoot } from "./structure.js";

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

export const Dialog = memo(forwardElementRef(function Dialog({ open, fullscreen, variantSize, header, headerPosition, footer, onClose, anchor, modal, children, propsPortal, ...props }: DialogProps, ref?: Ref<HTMLSpanElement>) {
    variantSize ??= "xl";

    headerPosition ??= "start";
    if (headerPosition == "hidden") {
        console.assert(typeof header == "string", `A dialog whose label is hidden must provide the label to use as a string to the header`);
    }
    return (
        <AriaDialog<HTMLDivElement, HTMLSpanElement, HTMLDivElement, HTMLSpanElement>

            ariaLabel={headerPosition == "hidden" ? header as string : null}
            active={open}
            onDismiss={onClose}
            focusPopup={(e, f) => f()?.focus?.()}
            dismissBackdropActive={modal ? false : true}
            dismissEscapeActive={modal ? false : true}

            render={info => {
                const headingJsx = (<>
                    <StructureDialogModalTitle>{header}</StructureDialogModalTitle>
                    <StructureDialogModalCloseButton onClose={onClose} />
                </>)
                const bodyJsx = <StructureDialogModalBody>{children}</StructureDialogModalBody>
                const footerJsx = (<StructureDialogModalFooter>{footer}</StructureDialogModalFooter>);

                return (
                    <>
                        {anchor && useClonedElement(anchor, useMergedProps(info.propsSource, props), ref)}
                        {useDefaultRenderPortal({
                            portalId: usePortalId("dialog"),
                            children: (
                                <StructureDialogPortalRoot {...useMergedProps(info.propsFocusContainer, propsPortal || {})}>
                                    <StructureDialogModal fullscreen={fullscreen} open={open} variantSize={variantSize} {...(info.propsDialog as {})}>
                                        <StructureDialogBackdrop open={open} modal={modal} />
                                        <StructureDialogModalDialog open={open} header={header}>
                                            <StructureDialogModalContent
                                                childrenHeading={headingJsx}
                                                childrenBody={bodyJsx}
                                                childrenFooter={footerJsx}
                                                headerPosition={headerPosition}
                                            />
                                        </StructureDialogModalDialog>
                                    </StructureDialogModal>
                                </StructureDialogPortalRoot>
                            )
                        })}
                    </>
                )
            }}
        />
    )
}))

