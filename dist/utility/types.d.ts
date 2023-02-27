import { ComponentChildren, h } from "preact";
export type OmitStrong<T, K extends keyof T> = Omit<T, K>;
interface LabelledComponent1 {
    labelPosition: "hidden";
    label: string;
}
interface LabelledComponent2<W extends "within" | "floating" | "tooltip"> {
    labelPosition: "before" | "after" | W;
    label: ComponentChildren;
}
export type LabelledProps<P, W extends "within" | "floating" | "tooltip"> = P & (LabelledComponent1 | LabelledComponent2<W>);
interface CaptionedComponent1 {
    captionPosition: "hidden";
    caption: string;
}
interface CaptionedComponent2 {
    captionPosition: "before" | "after";
    caption: ComponentChildren;
}
export type CaptionedProps<P> = P & (CaptionedComponent1 | CaptionedComponent2);
interface PaginatedComponent1 {
    paginationLabel: string;
    paginationLocation?: "before" | "after";
    paginationSize: number;
}
interface PaginatedComponent2 {
    paginationSize?: number | undefined | null;
    paginationLocation?: string | undefined | null;
    paginationLabel?: string | undefined | null;
}
export type PaginatedProps<P> = P & (PaginatedComponent1 | PaginatedComponent2);
export type GlobalAttributes<T extends EventTarget, Others extends keyof h.JSX.HTMLAttributes<T> = never> = Pick<h.JSX.HTMLAttributes<T>, "ref" | "class" | "className" | "style" | Others>;
export {};
//# sourceMappingURL=types.d.ts.map