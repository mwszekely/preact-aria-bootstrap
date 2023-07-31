import { clsx } from "clsx";
import { ComponentChildren, h, Ref, VNode } from "preact";
import { Dialog as AriaDialog, DialogProps as AriaDialogProps, useDefaultRenderPortal } from "preact-aria-widgets";
import { useMergedProps } from "preact-prop-helpers";
import { Fade, Slide } from "preact-transition";
import { memo } from "preact/compat";
import { Button } from "../button/index.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { GlobalAttributes } from "../utility/types.js";
import { useClonedElement } from "../utility/use-cloned-element.js";
import { usePortalId } from "../utility/use-portal-id.js";

export interface OffcanvasProps extends GlobalAttributes<HTMLSpanElement, "children"> {
    open: boolean;
    onClose: AriaDialogProps<HTMLSpanElement, HTMLSpanElement, HTMLSpanElement, HTMLSpanElement>["onDismiss"];
    headerPosition?: "hidden" | "start";
    header: ComponentChildren;
    anchor: VNode;

    /** Props are spread to the anchor element. If you need to have a class name or style set on the dialog itself, pass those here. */
    propsPortal?: h.JSX.HTMLAttributes<HTMLDivElement>;

    /**
     * If true, this dialog cannot be closed with the Escape key or by clicking the backdrop.
     */
    //modal?: boolean;
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
                                <div {...useMergedProps(info.propsFocusContainer, propsPortal || {})}>
                                    <Slide show={open} slideTargetInline={-1} duration={500}>
                                        <div {...useMergedProps(info.propsDialog, { class: clsx("offcanvas"), tabIndex: -1 })}>
                                            <div {...useMergedProps({ class: "offcanvas-header" })}>
                                                <h5 {...useMergedProps(info.propsTitle, { class: "offcanvas-title" })}>{header}</h5>
                                                <Button class="btn-close" aria-label="Close" onPress={(_pressed, e) => onClose(e, "escape")} />
                                            </div>
                                            <div class="offcanvas-body">{children}</div>
                                        </div>
                                    </Slide>
                                    <Fade show={open} fadeMax={0.25} duration={1000}>
                                        <div class={clsx("offcanvas-backdrop")}></div>
                                    </Fade>
                                </div>
                            )
                        })}
                    </>
                )
            }}
        />
    )
}))

/*


<div class="offcanvas offcanvas-start show" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasLabel">Offcanvas</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    Content for the offcanvas goes here. You can place just about any Bootstrap component or custom elements here.
  </div>
</div>


 */
