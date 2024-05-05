
import { Accordion as AriaAccordion, AccordionProps as AriaAccordionProps, AccordionSection as AriaAccordionSection, AccordionSectionProps as AriaAccordionSectionProps } from "preact-aria-widgets/preact";
import { ComponentChildren, Ref, memo, useMergedProps } from "preact-prop-helpers/preact";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { GlobalAttributes } from "../utility/types.js";
import { StructureAccordion, StructureAccordionSection, StructureAccordionSectionBody, StructureAccordionSectionHeader, StructureAccordionSectionHeaderButton } from "./structure.js";

export interface AccordionProps extends
  Partial<Pick<AriaAccordionProps<HTMLButtonElement>, "orientation" | "localStorageKey">>,
  GlobalAttributes<HTMLDivElement, "children"> {
}

export interface AccordionSectionProps extends
  Pick<AriaAccordionSectionProps<HTMLDivElement, HTMLDivElement, HTMLDivElement>, "index">,
  Partial<Pick<AriaAccordionSectionProps<HTMLDivElement, HTMLDivElement, HTMLDivElement>, "open" | "untabbable" | "disabled" | "bodyRole">>,
  GlobalAttributes<HTMLDivElement, "children"> {
  header: ComponentChildren;
}

export const Accordion = memo(forwardElementRef(function Accordion({ children, ...props }: AccordionProps, ref: Ref<HTMLDivElement>) {
  return (
    <AriaAccordion
      orientation="vertical"
      render={info => {
        return (
          <StructureAccordion {...useMergedProps({ ...props, ref })}>{children}</StructureAccordion>
        )
      }} />
  )
}));

export const AccordionSection = memo(forwardElementRef(function AccordionSection({ index, children, header, bodyRole, disabled, untabbable, open, ...props }: AccordionSectionProps, ref: Ref<HTMLDivElement>) {
  return (
    <AriaAccordionSection<HTMLDivElement, HTMLButtonElement, HTMLDivElement>
      index={index}
      tagButton="button"
      bodyRole={bodyRole}
      disabled={disabled}
      untabbable={untabbable}
      open={open}
      render={info => {

        const show = info.accordionSectionReturn.expanded;
        const propsHeader = info.propsHeader;
        const propsHeaderButton = useMergedProps(info.propsHeaderButton, { className: show ? "" : "collapsed" })
        const propsBody = useMergedProps(info.propsBody, { className: show ? "show" : "" })

        return (
          <StructureAccordionSection>
            <StructureAccordionSectionHeader {...propsHeader}>
              <StructureAccordionSectionHeaderButton {...propsHeaderButton}>{header}</StructureAccordionSectionHeaderButton>
            </StructureAccordionSectionHeader>
            <StructureAccordionSectionBody show={show} {...propsBody}>
              {children}
            </StructureAccordionSectionBody>
          </StructureAccordionSection>
        );
      }}
    />
  )
}))
