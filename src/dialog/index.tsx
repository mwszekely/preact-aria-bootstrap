import { clsx } from "clsx";
import { ComponentChildren, h, Ref, VNode } from "preact";
import { Dialog as AriaDialog, DialogProps as AriaDialogProps, Heading, useDefaultRenderPortal } from "preact-aria-widgets";
import { useMergedProps } from "preact-prop-helpers";
import { SlideFade } from "preact-transition";
import { memo } from "preact/compat";
import { Button } from "../button/button-action.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { GlobalAttributes } from "../utility/types.js";
import { useClonedElement } from "../utility/use-cloned-element.js";
import { usePortalId } from "../utility/use-portal-id.js";

export interface DialogProps extends GlobalAttributes<HTMLSpanElement, "children"> {
    open: boolean;
    onClose: AriaDialogProps<HTMLSpanElement, HTMLSpanElement, HTMLSpanElement, HTMLSpanElement>["onDismiss"];
    headerPosition?: "hidden" | "start";
    header: ComponentChildren;
    anchor: VNode;
    footer?: null | undefined | ComponentChildren;
    variantSize?: "xs" | "sm" | "md" | "lg" | "xl" | "unbounded";
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
                    <span class="modal-title">{header}</span>
                    <Button class="btn-close" onPress={(_pressed, e) => onClose(e, "escape")} aria-label="Close" />
                </>)
                const bodyJsx = (<span class="modal-body">{children}</span>);
                const footerJsx = (<span class="modal-footer">{footer}</span>)

                return (
                    <>
                        {useClonedElement(anchor, useMergedProps(info.propsSource, props), ref)}
                        {useDefaultRenderPortal({
                            portalId: usePortalId("dialog"),
                            children: (
                                <div {...useMergedProps(info.propsFocusContainer, propsPortal || {})}>
                                    <div {...useMergedProps(info.propsDialog, {
                                        tabIndex: -1,
                                        className: clsx(
                                            "modal modal-dialog-scrollable overflow-hidden",
                                            open ? "d-block" : "d-hidden",
                                            variantSize && `modal-${variantSize}`,
                                            fullscreen && (fullscreen === true ? "modal-fullscreen" : `modal-fullscreen-${fullscreen}`)
                                        )
                                    })}>
                                        <div class={clsx("dialog-backdrop", open && "visible", modal && "dialog-backdrop-blur")} role="presentation"></div>
                                        <SlideFade animateOnMount={true} delayMountUntilShown={true} show={open} slideTargetBlock={0.125 * (open ? 1 : -1)}>
                                            <div class="modal-dialog">
                                                <span class="modal-content">
                                                    {headerPosition == "start" ? <Heading class="modal-header" heading={headingJsx}>{bodyJsx}</Heading> : bodyJsx}
                                                    {footer && footerJsx}
                                                </span>
                                            </div>
                                        </SlideFade>
                                    </div>
                                </div>
                            )
                        })}
                    </>
                )
            }}
        />
    )
}))
