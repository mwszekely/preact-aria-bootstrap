import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { Accordion as AriaAccordion, AccordionSection as AriaAccordionSection } from "preact-aria-widgets";
import { useMergedProps } from "preact-prop-helpers";
import { CollapseFade } from "preact-transition";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref.js";
export const Accordion = memo(forwardElementRef(function Accordion({ children, ...props }, ref) {
    return (_jsx(AriaAccordion, { orientation: "vertical", render: info => {
            return (_jsx("div", { ...useMergedProps({ class: "accordion" }, { children, ...props, ref }) }));
        } }));
}));
export const AccordionSection = memo(forwardElementRef(function AccordionSection({ index, children, header, bodyRole, disabled, untabbable, open, ...props }, ref) {
    return (_jsx(AriaAccordionSection, { index: index, tagButton: "button", bodyRole: bodyRole, disabled: disabled, untabbable: untabbable, open: open, render: info => {
            return (_jsxs("div", { ...useMergedProps({ class: "accordion-item" }, { ...props, ref }), children: [_jsx("h2", { ...useMergedProps(info.propsHeader, { class: "accordion-header" }), children: _jsx("button", { ...useMergedProps(info.propsHeaderButton, { class: clsx("accordion-button", !info.accordionSectionReturn.expanded && "collapsed"), type: "button" }), children: header }) }), _jsx(CollapseFade, { show: info.accordionSectionReturn.expanded, children: _jsx("div", { ...useMergedProps(info.propsBody, { class: clsx("accordion-collapse", info.accordionSectionReturn.expanded && "show") }), children: _jsx("div", { class: "accordion-body", children: children }) }) })] }));
        } }));
}));
//# sourceMappingURL=index.js.map