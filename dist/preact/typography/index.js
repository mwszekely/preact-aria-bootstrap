import { jsx as _jsx } from "preact/jsx-runtime";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { useClonedElement } from "../utility/use-cloned-element.js";
export const Type = memo(forwardElementRef(function Type({ type, ...rest }, ref) {
    switch (type) {
        case 'lead': return _jsx(TypeLead, { ...rest, ref: ref });
        case 'bold': return _jsx(TypeBold, { ...rest, ref: ref });
        case 'italics': return _jsx(TypeItalics, { ...rest, ref: ref });
        case 'small': return _jsx(TypeSmall, { ...rest, ref: ref });
        case 'strike': return _jsx(TypeStrike, { ...rest, ref: ref });
        case 'highlighted': return _jsx(TypeHighlighted, { ...rest, ref: ref });
        case 'underline': return _jsx(TypeUnderline, { ...rest, ref: ref });
    }
    return null;
}));
const TypeLead = memo(forwardElementRef(function TypeLead({ children, ...rest }, ref) {
    return useClonedElement(children, useMergedProps({ class: "lead" }, rest), ref, 'p');
}));
const TypeHighlighted = memo(forwardElementRef(function TypeMark({ children, semantics, ...rest }, ref) {
    if (semantics == 'none')
        return useClonedElement(children, useMergedProps({ class: "mark" }, rest), ref, 'span');
    else
        return _jsx("mark", { ...rest, ref: ref, children: children });
}));
const TypeStrike = memo(forwardElementRef(function TypeDel({ children, semantics, ...rest }, ref) {
    if (semantics == 'deleted')
        return _jsx("del", { ...rest, ref: ref, children: children });
    else if (semantics == 'inaccurate')
        return _jsx("del", { ...rest, ref: ref, children: children });
    else
        return useClonedElement(children, useMergedProps({ class: "text-decoration-line-through" }, rest), ref);
}));
const TypeUnderline = memo(forwardElementRef(function TypeIns({ children, semantics, ...rest }, ref) {
    if (semantics == 'inserted')
        return _jsx("ins", { ...rest, ref: ref, children: children });
    else if (semantics == 'annotated')
        return _jsx("u", { ...rest, ref: ref, children: children });
    else
        return useClonedElement(children, useMergedProps({ class: "text-decoration-underline" }, rest), ref);
}));
const TypeSmall = memo(forwardElementRef(function TypeSmall({ children, semantics, ...rest }, ref) {
    if (semantics == 'fine')
        return _jsx("small", { ...rest, ref: ref, children: children });
    else
        return useClonedElement(children, useMergedProps({ class: "small" }, rest), ref);
}));
const TypeBold = memo(forwardElementRef(function TypeStrong({ children, semantics, ...rest }, ref) {
    if (semantics == 'important')
        return _jsx("strong", { ...rest, ref: ref, children: children });
    else if (semantics == 'noticeable')
        return _jsx("b", { ...rest, ref: ref, children: children });
    else
        return useClonedElement(children, useMergedProps({}, rest), ref);
}));
const TypeItalics = memo(forwardElementRef(function TypeEm({ children, semantics, ...rest }, ref) {
    if (semantics == 'emphasized')
        return _jsx("em", { ...rest, ref: ref, children: children });
    else if (semantics == 'idiomatic')
        return _jsx("i", { ...rest, ref: ref, children: children });
    else
        return useClonedElement(children, useMergedProps({}, rest), ref);
}));
//# sourceMappingURL=index.js.map