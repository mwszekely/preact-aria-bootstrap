import clsx from "clsx";
import { ComponentChildren, Ref, VNode } from "preact";
import { defaultRenderPortal, Dialog as AriaDialog, DialogProps as AriaDialogProps, Heading } from "preact-aria-widgets";
import { useMergedProps } from "preact-prop-helpers";
import { SlideFade } from "preact-transition";
import { memo } from "preact/compat";
import { Button } from "../button/button-action";
import { forwardElementRef } from "../utility/forward-element-ref";
import { GlobalAttributes } from "../utility/types";
import { useClonedElement } from "../utility/use-cloned-element";
import { usePortalId } from "../utility/use-portal-id";

export interface DialogProps extends GlobalAttributes<HTMLSpanElement, "children"> {
    open: boolean;
    onClose: AriaDialogProps<HTMLSpanElement, HTMLSpanElement, HTMLSpanElement, HTMLSpanElement>["onClose"];
    headerPosition?: "hidden" | "start";
    header: ComponentChildren;
    anchor: VNode;
    footer?: null | undefined | ComponentChildren;
    variantSize?: "xs" | "sm" | "md" | "lg" | "xl" | "unbounded";
    fullscreen?: boolean | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

    /**
     * If true, this dialog cannot be closed with the Escape key or by clicking the backdrop.
     */
    modal?: boolean;
}

export const Dialog = memo(forwardElementRef(function Dialog({ open, fullscreen, variantSize, header, headerPosition, footer, onClose, anchor, modal, children, ...props }: DialogProps, ref?: Ref<HTMLSpanElement>) {
    variantSize ??= "xl";

    headerPosition ??= "start";
    if (headerPosition == "hidden") {
        console.assert(typeof header == "string", `A dialog whose label is hidden must provide the label to use as a string to the header`);
    }
    return (
        <div>
            <AriaDialog<HTMLDivElement, HTMLSpanElement, HTMLDivElement, HTMLSpanElement>

                ariaLabel={headerPosition == "hidden" ? header as string : null}
                open={open}
                onClose={onClose}
                focusPopup={(e, f) => f()?.focus?.()}
                closeOnBackdrop={modal ? false : true}
                closeOnEscape={modal ? false : true}

                render={info => {
                    const headingJsx = (<>
                        <span class="modal-title">{header}</span>
                        <Button class="btn-close" onPress={() => onClose("escape")} aria-label="Close" />
                    </>)
                    const bodyJsx = (<span class="modal-body">{children}</span>);
                    const footerJsx = (<span class="modal-footer">{footer}</span>)

                    return (
                        <>
                            {useClonedElement(anchor, useMergedProps(info.propsSource, props), ref)}
                            {defaultRenderPortal({
                                portalId: usePortalId("dialog"),
                                children: (
                                    <div {...info.propsFocusContainer}>
                                        <div {...useMergedProps(info.propsDialog, {
                                            tabIndex: -1,
                                            className: clsx(
                                                "modal modal-dialog-scrollable",
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
        </div >
    )
}))
