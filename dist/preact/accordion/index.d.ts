import { ComponentChildren, Ref } from "preact";
import { AccordionProps as AriaAccordionProps, AccordionSectionProps as AriaAccordionSectionProps } from "preact-aria-widgets";
import { GlobalAttributes } from "../utility/types.js";
export interface AccordionProps extends Partial<Pick<AriaAccordionProps<HTMLButtonElement>, "orientation" | "localStorageKey">>, GlobalAttributes<HTMLDivElement, "children"> {
}
export interface AccordionSectionProps extends Pick<AriaAccordionSectionProps<HTMLDivElement, HTMLDivElement, HTMLDivElement>, "index">, Partial<Pick<AriaAccordionSectionProps<HTMLDivElement, HTMLDivElement, HTMLDivElement>, "open" | "untabbable" | "disabled" | "bodyRole">>, GlobalAttributes<HTMLDivElement, "children"> {
    header: ComponentChildren;
}
export declare const Accordion: ({ children, ...props }: AccordionProps, ref: Ref<HTMLDivElement>) => import("preact").JSX.Element;
export declare const AccordionSection: ({ index, children, header, bodyRole, disabled, untabbable, open, ...props }: AccordionSectionProps, ref: Ref<HTMLDivElement>) => import("preact").JSX.Element;
//# sourceMappingURL=index.d.ts.map