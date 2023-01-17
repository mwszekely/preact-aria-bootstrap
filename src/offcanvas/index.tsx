import { memo } from "preact/compat";
import { forwardElementRef, GlobalAttributes, useClonedElement, usePortalId } from "../utility";
import { defaultRenderPortal, Dialog as AriaDialog, DialogProps as AriaDialogProps, Heading } from "preact-aria-widgets"
import { ComponentChildren, h, Ref, VNode } from "preact";
import { useMergedProps } from "preact-prop-helpers";
import { Fade, Slide, SlideFade } from "preact-transition";
import clsx from "clsx";
import { Button } from "../button";
import { BootstrapIcon } from "../icon";

export interface OffcanvasProps extends GlobalAttributes<HTMLSpanElement, "children"> {
    open: boolean;
    onClose: AriaDialogProps<HTMLSpanElement, HTMLSpanElement, HTMLSpanElement, HTMLSpanElement>["onClose"];
    headerPosition?: "hidden" | "start";
    header: ComponentChildren;
    anchor: VNode;

    /**
     * If true, this dialog cannot be closed with the Escape key or by clicking the backdrop.
     */
    //modal?: boolean;
}

export const Offcanvas = memo(forwardElementRef(function Offcanvas({ open, header, headerPosition, onClose, anchor, children, ...props }: OffcanvasProps, ref?: Ref<HTMLSpanElement>) {
    headerPosition ??= "start";
    if (headerPosition == "hidden") {
        console.assert(typeof header == "string", `An offcanvas whose label is hidden must provide the label to use as a string to the header`);
    }
    return (
        <div>
            <AriaDialog<HTMLDivElement, HTMLSpanElement, HTMLDivElement, HTMLHeadingElement>

                ariaLabel={headerPosition == "hidden" ? header as string : null}
                open={open}
                onClose={onClose}
                focusPopup={(e, f) => f()?.focus?.()}
                closeOnBackdrop={true}
                closeOnEscape={true}

                render={info => {

                    return (
                        <>
                            {useClonedElement(anchor, useMergedProps(info.propsSource, props), ref)}
                            {defaultRenderPortal({
                                portalId: usePortalId("offcanvas"),
                                children: (
                                    <div {...info.propsFocusContainer}>
                                        <Slide show={open} slideTargetInline={-1} duration={1000}>
                                            <div {...useMergedProps(info.propsDialog, { class: clsx("offcanvas"), tabIndex: -1 })}>
                                                <div {...useMergedProps({ class: "offcanvas-header" })}>
                                                    <h5 {...useMergedProps(info.propsTitle, { class: "offcanvas-title" })}>{header}</h5>
                                                    <Button class="btn-close" aria-label="Close" onPress={() => onClose("escape")} />
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
        </div >
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
