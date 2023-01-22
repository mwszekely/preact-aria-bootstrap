import { Ref } from "preact";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref";
import { GlobalAttributes } from "../utility/types";
import { useClonedElement } from "../utility/use-cloned-element";

interface TypePropsBase<T extends EventTarget> extends GlobalAttributes<T, "children"> {

}

interface TypeLeadProps extends TypePropsBase<HTMLParagraphElement> { type: 'lead'; }
interface TypeHighlightProps extends TypePropsBase<HTMLSpanElement> { type: 'highlighted'; semantics: "marked" | "none"; }
interface TypeStrikeProps extends TypePropsBase<HTMLElement> { type: 'strike'; semantics: "deleted" | "inaccurate" | "none"; }
interface TypeUnderlineProps extends TypePropsBase<HTMLElement> { type: 'underline'; semantics: "inserted" | "annotated" | "none"; }
interface TypeSmallProps extends TypePropsBase<HTMLElement> { type: 'small'; semantics: "fine" | "none"; }
interface TypeBoldProps extends TypePropsBase<HTMLElement> { type: 'bold'; semantics: "important" | "noticeable" | "none" }
interface TypeItalicsProps extends TypePropsBase<HTMLElement> { type: 'italics'; semantics: "emphasized" | "idiomatic" | "none" }

//interface TypeAlignStartProps<T extends EventTarget> extends TypePropsBase<HTMLSpanElement> { type: 'align-start'; }

export type TypeProps = (TypeLeadProps | TypeHighlightProps | TypeStrikeProps | TypeUnderlineProps | TypeSmallProps | TypeBoldProps | TypeItalicsProps)

export const Type = memo(forwardElementRef(function Type({ type, ...rest }: TypeProps, ref: Ref<any>) {
    switch (type) {
        case 'lead': return <TypeLead {...rest as any} ref={ref} />
        case 'bold': return <TypeBold {...rest as any} ref={ref} />
        case 'italics': return <TypeItalics {...rest as any} ref={ref} />
        case 'small': return <TypeSmall {...rest as any} ref={ref} />
        case 'strike': return <TypeStrike {...rest as any} ref={ref} />
        case 'highlighted': return <TypeHighlighted {...rest as any} ref={ref} />
        case 'underline': return <TypeUnderline {...rest as any} ref={ref} />
    }

    return null;
}))

const TypeLead = memo(forwardElementRef(function TypeLead({ children, ...rest }: Omit<TypeLeadProps, "type">, ref?: Ref<any>) {
    return useClonedElement(children, useMergedProps({ class: "lead" }, rest), ref, 'p');
}));
const TypeHighlighted = memo(forwardElementRef(function TypeMark({ children, semantics, ...rest }: Omit<TypeHighlightProps, "type">, ref?: Ref<any>) {
    if (semantics == 'none')
        return useClonedElement(children, useMergedProps({ class: "mark" }, rest), ref, 'span');
    else
        return <mark {...rest} ref={ref}>{children}</mark>
}));

const TypeStrike = memo(forwardElementRef(function TypeDel({ children, semantics, ...rest }: Omit<TypeStrikeProps, "type">, ref?: Ref<any>) {

    if (semantics == 'deleted')
        return <del {...rest} ref={ref}>{children}</del>
    else if (semantics == 'inaccurate')
        return <del {...rest} ref={ref}>{children}</del>
    else
        return useClonedElement(children, useMergedProps({ class: "text-decoration-line-through" }, rest), ref);
}));
const TypeUnderline = memo(forwardElementRef(function TypeIns({ children, semantics, ...rest }: Omit<TypeUnderlineProps, "type">, ref?: Ref<any>) {

    if (semantics == 'inserted')
        return <ins {...rest} ref={ref}>{children}</ins>
    else if (semantics == 'annotated')
        return <u {...rest} ref={ref}>{children}</u>
    else
        return useClonedElement(children, useMergedProps({ class: "text-decoration-underline" }, rest), ref);
}));
const TypeSmall = memo(forwardElementRef(function TypeSmall({ children, semantics, ...rest }: Omit<TypeSmallProps, "type">, ref?: Ref<any>) {
    if (semantics == 'fine')
        return <small {...rest} ref={ref}>{children}</small>
    else
        return useClonedElement(children, useMergedProps({ class: "small" }, rest), ref);
}));
const TypeBold = memo(forwardElementRef(function TypeStrong({ children, semantics, ...rest }: Omit<TypeBoldProps, "type">, ref?: Ref<any>) {
    if (semantics == 'important')
        return <strong {...rest} ref={ref}>{children}</strong>
    else if (semantics == 'noticeable')
        return <b {...rest} ref={ref}>{children}</b>
    else
        return useClonedElement(children, useMergedProps({}, rest), ref);
}));
const TypeItalics = memo(forwardElementRef(function TypeEm({ children, semantics, ...rest }: Omit<TypeItalicsProps, "type">, ref?: Ref<any>) {
    if (semantics == 'emphasized')
        return <em {...rest} ref={ref}>{children}</em>
    else if (semantics == 'idiomatic')
        return <i {...rest} ref={ref}>{children}</i>
    else
        return useClonedElement(children, useMergedProps({}, rest), ref);
}));
