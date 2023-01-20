
import clsx from "clsx";
import { ComponentChildren, Ref } from "preact";
import { Accordion as AriaAccordion, AccordionProps as AriaAccordionProps, AccordionSection as AriaAccordionSection, AccordionSectionProps as AriaAccordionSectionProps } from "preact-aria-widgets";
import { useMergedProps } from "preact-prop-helpers";
import { CollapseFade } from "preact-transition";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref";
import { GlobalAttributes } from "../utility/types";

export interface AccordionProps extends Partial<Pick<AriaAccordionProps<HTMLButtonElement>, "navigationDirection" | "localStorageKey">>, GlobalAttributes<HTMLDivElement, "children"> {

}

export interface AccordionSectionProps extends Pick<AriaAccordionSectionProps<HTMLDivElement, HTMLDivElement, HTMLDivElement>, "open" | "index" | "hidden" | "disabled" | "bodyRole">, GlobalAttributes<HTMLDivElement, "children"> {
  header: ComponentChildren;
}

export const Accordion = memo(forwardElementRef(function Accordion({ children, ...props }: AccordionProps, ref: Ref<HTMLDivElement>) {
  return (
    <AriaAccordion
      navigationDirection="vertical"
      render={info => {
        return (
          <div {...useMergedProps({ class: "accordion" }, { children, ...props, ref })} />
        )
      }} />
  )
}))

export const AccordionSection = memo(forwardElementRef(function AccordionSection({ index, children, header, bodyRole, disabled, hidden, open, ...props }: AccordionSectionProps, ref: Ref<HTMLDivElement>) {
  return (
    <AriaAccordionSection<HTMLDivElement, HTMLButtonElement, HTMLDivElement>
      index={index}
      tagButton="button"
      bodyRole={bodyRole}
      disabled={disabled}
      hidden={hidden}
      open={open}
      render={info => {

        return (
          <div {...useMergedProps({ class: "accordion-item" }, { ...props, ref })}>
            <h2 {...useMergedProps(info.propsHeader, { class: "accordion-header" })}>
              <button {...useMergedProps(info.propsHeaderButton, { class: clsx("accordion-button", !info.accordionSectionReturn.expanded && "collapsed"), type: "button" })}>{header}</button>
            </h2>
            <CollapseFade show={info.accordionSectionReturn.expanded}>
              <div {...useMergedProps(info.propsBody, { class: clsx("accordion-collapse", info.accordionSectionReturn.expanded && "show") })}>
                <div class="accordion-body">{children}</div>
              </div>
            </CollapseFade>
          </div>
        )
      }}
    />
  )
}))


/*

<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>

*/