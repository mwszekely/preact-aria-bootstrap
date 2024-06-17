import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { Accordion as AriaAccordion, AccordionSection as AriaAccordionSection } from "preact-aria-widgets";
import { memo, useMergedProps } from "preact-prop-helpers";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { StructureAccordion, StructureAccordionSection, StructureAccordionSectionBody, StructureAccordionSectionHeader, StructureAccordionSectionHeaderButton } from "./structure.js";
export const Accordion = memo(forwardElementRef(function Accordion({ children, ...props }, ref) {
    return (_jsx(AriaAccordion, { orientation: "vertical", render: info => {
            return (_jsx(StructureAccordion, { ...useMergedProps({ ...props, ref }), children: children }));
        } }));
}));
export const AccordionSection = memo(forwardElementRef(function AccordionSection({ index, children, header, bodyRole, disabled, untabbable, open, ...props }, ref) {
    return (_jsx(AriaAccordionSection, { index: index, tagButton: "button", bodyRole: bodyRole, disabled: disabled, untabbable: untabbable, open: open, render: info => {
            const show = info.accordionSectionReturn.expanded;
            const propsHeader = info.propsHeader;
            const propsHeaderButton = useMergedProps(info.propsHeaderButton, { className: show ? "" : "collapsed" });
            const propsBody = useMergedProps(info.propsBody, { className: show ? "show" : "" });
            return (_jsxs(StructureAccordionSection, { children: [_jsx(StructureAccordionSectionHeader, { ...propsHeader, children: _jsx(StructureAccordionSectionHeaderButton, { ...propsHeaderButton, children: header }) }), _jsx(StructureAccordionSectionBody, { show: show, ...propsBody, children: children })] }));
        } }));
}));
//# sourceMappingURL=index.js.map