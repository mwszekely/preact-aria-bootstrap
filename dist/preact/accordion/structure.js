import { jsx as _jsx } from "preact/jsx-runtime";
import { useMergedProps } from "preact-prop-helpers";
import { CollapseFade } from "preact-transition";
import { memoForwardRef } from "../utility/forward-element-ref.js";
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
export const StructureAccordion = /* @__PURE__ */ memoForwardRef(function StructureAccordion({ children, ...props }, ref) {
    return (_jsx("div", { ...useMergedProps({ class: "accordion" }, { ...props, ref }), children: children }));
});
export const StructureAccordionSection = /* @__PURE__ */ memoForwardRef(function Structure({ children, ...props }, ref) {
    return (_jsx("div", { ...useMergedProps({ class: "accordion-item" }, { ...props, ref }), children: children }));
});
export const StructureAccordionSectionHeader = /* @__PURE__ */ memoForwardRef(function Structure({ children, ...props }, ref) {
    return (_jsx("h2", { ...useMergedProps({ class: "accordion-header" }, { ...props, ref }), children: children }));
});
export const StructureAccordionSectionHeaderButton = /* @__PURE__ */ memoForwardRef(function Structure({ children, ...props }, ref) {
    return (_jsx("button", { ...useMergedProps({ class: "accordion-button", type: "button" }, { ...props, ref }), children: children }));
});
export const StructureAccordionSectionBody = /* @__PURE__ */ memoForwardRef(function Structure({ show, children, ...props }, ref) {
    return (_jsx(CollapseFade, { show: show, children: _jsx("div", { ...useMergedProps({ class: "accordion-collapse" }, { ...props, ref }), children: _jsx("div", { className: "accordion-body", children: children }) }) }));
});
//# sourceMappingURL=structure.js.map