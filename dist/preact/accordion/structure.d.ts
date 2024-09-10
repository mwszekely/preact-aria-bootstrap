import { Ref } from "preact-prop-helpers";
import { GlobalAttributes } from "../utility/types.js";
export interface StructureProps<E extends Element> extends GlobalAttributes<E, "children"> {
}
export interface StructureAccordionProps extends StructureProps<HTMLDivElement> {
}
export interface StructureAccordionSectionProps extends StructureProps<HTMLDivElement> {
}
export interface StructureAccordionSectionHeaderProps extends StructureProps<HTMLHeadingElement> {
}
export interface StructureAccordionSectionHeaderButtonProps extends StructureProps<HTMLButtonElement> {
}
export interface StructureAccordionSectionBodyProps extends StructureProps<HTMLDivElement> {
    show: boolean;
}
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
export declare const StructureAccordion: ({ children, ...props }: StructureAccordionProps, ref: Ref<HTMLDivElement>) => import("preact").h.JSX.Element;
export declare const StructureAccordionSection: ({ children, ...props }: StructureAccordionSectionProps, ref: Ref<HTMLDivElement>) => import("preact").h.JSX.Element;
export declare const StructureAccordionSectionHeader: ({ children, ...props }: StructureAccordionSectionHeaderProps, ref: Ref<HTMLHeadingElement>) => import("preact").h.JSX.Element;
export declare const StructureAccordionSectionHeaderButton: ({ children, ...props }: StructureAccordionSectionHeaderButtonProps, ref: Ref<HTMLButtonElement>) => import("preact").h.JSX.Element;
export declare const StructureAccordionSectionBody: ({ show, children, ...props }: StructureAccordionSectionBodyProps, ref: Ref<HTMLDivElement>) => import("preact").h.JSX.Element;
//# sourceMappingURL=structure.d.ts.map