import { jsx as _jsx } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { createElement } from "preact";
import { Heading } from "preact-aria-widgets";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref.js";
export const Card = memo(forwardElementRef(function Card(p, ref) {
    let { children, title, subtitle, variantTheme, ...props } = p;
    if (subtitle)
        children = _jsx(CardSubtitle, { subtitle: subtitle, class: title ? "pt-0" : "", children: children });
    if (title)
        children = _jsx(CardTitle, { title: title, class: subtitle ? "pb-0" : "", children: children });
    return (_jsx("div", { ...useMergedProps({ ref, className: clsx("card", variantTheme && `text-bg-${variantTheme}`) }, props), children: children }));
}));
function CardElement2({ type, ...p }, ref) {
    switch (type) {
        default:
        case "paragraph": {
            const { children, ...props } = p;
            return _jsx(CardBody, { ...props, ref: ref, children: _jsx(CardText, { children: children }) });
        }
        case "footer": {
            const { children, ...props } = p;
            return _jsx(CardFooter, { ...props, ref: ref, children: children });
        }
        case "subtitle": {
            const { children, subtitle, ...props } = p;
            return _jsx(CardSubtitle, { subtitle: subtitle, ...props, ref: ref, children: children });
        }
        case "title": {
            const { children, title, ...props } = p;
            return _jsx(CardTitle, { title: title, ...props, ref: ref, children: children });
        }
        case "image": {
            const { src, position, ...props } = p;
            return _jsx(CardImage, { src: src, position: position, ...props, ref: ref });
        }
        case "flush": {
            const { children, ...props } = p;
            return createElement("span", props, children);
        }
    }
}
export const CardElement = memo(forwardElementRef(CardElement2));
const CardImage = memo(forwardElementRef(function CardImage(p, ref) {
    const { position, src, ...props } = p;
    return (_jsx("img", { ...useMergedProps(props, { ref, className: `card-img${position == "both" ? "" : `-${position}`}` }) }));
}));
const CardBody = memo(forwardElementRef(function CardBody(props, ref) {
    return (_jsx("div", { ...useMergedProps(props, { ref, className: "card-body" }) }));
}));
const CardFooter = memo(forwardElementRef(function CardFooter(p, ref) {
    const { ...props } = p;
    return (_jsx("div", { ...useMergedProps(props, { ref, className: "card-footer" }) }));
}));
const CardTitle = memo(forwardElementRef(function CardTitle(p, ref) {
    const { title, children, ref: unused, ...props } = p;
    console.assert(ref == unused || unused == null);
    return _jsx(Heading, { heading: title, ...useMergedProps(props, { ref, className: "card-title card-body" }), children: children });
}));
const CardSubtitle = memo(forwardElementRef(function CardSubtitle(p, ref) {
    const { subtitle, children, ref: unused, ...props } = p;
    console.assert(ref == unused || unused == null);
    return _jsx(Heading, { heading: subtitle, ...useMergedProps(props, { ref, className: clsx("card-subtitle card-body", "mb-2", "text-muted") }), children: children });
}));
const CardText = memo(forwardElementRef(function CardText(props, ref) {
    return (_jsx("div", { ...useMergedProps(props, { ref, className: "card-text" }) }));
}));
//# sourceMappingURL=card.js.map