import { Ref, useMergedProps } from "preact-prop-helpers/preact";
import { CollapseFade } from "preact-transition/preact";
import { memoForwardRef } from "../utility/forward-element-ref.js";
import { GlobalAttributes } from "../utility/types.js";

export interface StructureProps<E extends Element> extends GlobalAttributes<E, "children"> { }

export interface StructureAccordionProps extends StructureProps<HTMLDivElement> { }
export interface StructureAccordionSectionProps extends StructureProps<HTMLDivElement> { }
export interface StructureAccordionSectionHeaderProps extends StructureProps<HTMLHeadingElement> { }
export interface StructureAccordionSectionHeaderButtonProps extends StructureProps<HTMLButtonElement> { }
export interface StructureAccordionSectionBodyProps extends StructureProps<HTMLDivElement> { show: boolean; }

/**
 * 
 * <StructureAccordion>
 *     <StructureAccordionSection>
 *         <StructureAccordionSectionHeader>
 *             <StructureAccordionSectionHeaderButton></StructureAccordionSectionHeaderButton>
 *         </StructureAccordionSectionHeader>
 *     </StructureAccordionSection>
 *     <StructureAccordionSection>{...}</StructureAccordionSection>
 *     <StructureAccordionSection>{...}</StructureAccordionSection>
 *     <StructureAccordionSection>{...}</StructureAccordionSection>
 *     <StructureAccordionSection>{...}</StructureAccordionSection>
 *     <StructureAccordionSection>{...}</StructureAccordionSection>
 * </StructureAccordion>
 */


export const StructureAccordion = memoForwardRef(function StructureAccordion({ children, ...props }: StructureAccordionProps, ref: Ref<HTMLDivElement>) {
    return (
        <div {...useMergedProps({ class: "accordion" }, { ...props, ref })}>{children}</div>
    )
});

export const StructureAccordionSection = memoForwardRef(function Structure({ children, ...props }: StructureAccordionSectionProps, ref: Ref<HTMLDivElement>) {
    return (
        <div {...useMergedProps({ class: "accordion-item" }, { ...props, ref })}>
            {children}
        </div>
    )
});

export const StructureAccordionSectionHeader = memoForwardRef(function Structure({ children, ...props }: StructureAccordionSectionHeaderProps, ref: Ref<HTMLHeadingElement>) {
    return (
        <h2 {...useMergedProps({ class: "accordion-header" }, { ...props, ref })}>
            {children}
        </h2>
    )
});

export const StructureAccordionSectionHeaderButton = memoForwardRef(function Structure({ children, ...props }: StructureAccordionSectionHeaderButtonProps, ref: Ref<HTMLButtonElement>) {
    return (
        <button {...useMergedProps<HTMLButtonElement>({ class: "accordion-button", type: "button" }, { ...props, ref })}>{children}</button>
    )
});

export const StructureAccordionSectionBody = memoForwardRef(function Structure({ show, children, ...props }: StructureAccordionSectionBodyProps, ref: Ref<HTMLDivElement>) {
    return (
        <CollapseFade show={show}>
            <div {...useMergedProps({ class: "accordion-collapse" }, { ...props, ref })}>
                <div className="accordion-body">{children}</div>
            </div>
        </CollapseFade>
    )
});
 