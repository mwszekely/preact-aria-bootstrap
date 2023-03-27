
import { clsx } from "clsx";
import { ComponentChildren, Ref } from "preact";
import { Accordion as AriaAccordion, AccordionProps as AriaAccordionProps, AccordionSection as AriaAccordionSection, AccordionSectionProps as AriaAccordionSectionProps } from "preact-aria-widgets";
import { useMergedProps } from "preact-prop-helpers";
import { CollapseFade } from "preact-transition";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { GlobalAttributes } from "../utility/types.js";

export interface AccordionProps extends Partial<Pick<AriaAccordionProps<HTMLButtonElement>, "orientation" | "localStorageKey">>, GlobalAttributes<HTMLDivElement, "children"> {

}

export interface AccordionSectionProps extends Pick<AriaAccordionSectionProps<HTMLDivElement, HTMLDivElement, HTMLDivElement>, "open" | "index" | "hidden" | "disabled" | "bodyRole">, GlobalAttributes<HTMLDivElement, "children"> {
  header: ComponentChildren;
}

export const Accordion = memo(forwardElementRef(function Accordion({ children, ...props }: AccordionProps, ref: Ref<HTMLDivElement>) {
  return (
    <AriaAccordion
      orientation="vertical"
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
