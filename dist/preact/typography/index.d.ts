import { Ref } from "preact-prop-helpers";
import { GlobalAttributes } from "../utility/types.js";
interface TypePropsBase<T extends EventTarget> extends GlobalAttributes<T, "children"> {
}
interface TypeLeadProps extends TypePropsBase<HTMLParagraphElement> {
    type: 'lead';
}
interface TypeHighlightProps extends TypePropsBase<HTMLSpanElement> {
    type: 'highlighted';
    semantics: "marked" | "none";
}
interface TypeStrikeProps extends TypePropsBase<HTMLElement> {
    type: 'strike';
    semantics: "deleted" | "inaccurate" | "none";
}
interface TypeUnderlineProps extends TypePropsBase<HTMLElement> {
    type: 'underline';
    semantics: "inserted" | "annotated" | "none";
}
interface TypeSmallProps extends TypePropsBase<HTMLElement> {
    type: 'small';
    semantics: "fine" | "none";
}
interface TypeBoldProps extends TypePropsBase<HTMLElement> {
    type: 'bold';
    semantics: "important" | "noticeable" | "none";
}
interface TypeItalicsProps extends TypePropsBase<HTMLElement> {
    type: 'italics';
    semantics: "emphasized" | "idiomatic" | "none";
}
export type TypeProps = (TypeLeadProps | TypeHighlightProps | TypeStrikeProps | TypeUnderlineProps | TypeSmallProps | TypeBoldProps | TypeItalicsProps);
export declare const Type: ({ type, ...rest }: TypeProps, ref: Ref<any>) => import("preact-prop-helpers").JSX.Element | null;
export {};
//# sourceMappingURL=index.d.ts.map