import { ComponentChildren, createElement, Ref, VNode } from "preact-prop-helpers/preact";
import { ButtonThemes } from "../context.js";
import { GlobalAttributes } from "../utility/types.js";
export interface CardProps extends GlobalAttributes<HTMLDivElement, "children"> {
    title?: ComponentChildren;
    subtitle?: ComponentChildren;
    variantTheme?: ButtonThemes;
}
export declare const Card: (p: CardProps, ref: Ref<HTMLDivElement>) => createElement.JSX.Element;
export interface CardElementParagraphProps extends GlobalAttributes<HTMLDivElement, "children"> {
    /**
     * * `paragraph`: Any generic text. The default. Will be padded around the edges.
     */
    type: "paragraph" | "footer";
    children?: ComponentChildren;
}
export interface CardElementTitleProps extends GlobalAttributes<HTMLHeadingElement, "children"> {
    /**
     * * `title`: The title at the top of the card.
     * * `subtitle`: The optional subtitle below the title.
     */
    type: "title";
    title: ComponentChildren;
    children?: ComponentChildren;
}
export interface CardElementSubtitleProps extends GlobalAttributes<HTMLHeadingElement, "children"> {
    /**
     * * `title`: The title at the top of the card.
     * * `subtitle`: The optional subtitle below the title.
     */
    type: "subtitle";
    subtitle: ComponentChildren;
    children?: ComponentChildren;
}
export interface CardElementImageProps extends GlobalAttributes<HTMLImageElement, "children"> {
    /**
     * * `image`: A header/footer image
     */
    type: "image";
    src: string;
    position: "bottom" | "top" | "both";
    children?: ComponentChildren;
}
export interface CardElementFlushProps extends GlobalAttributes<HTMLSpanElement, "children"> {
    /**
     * * `flush` Any non-card content that needs to have no padding. A list, for example.
     */
    type: "flush";
    children?: ComponentChildren;
}
export interface CardElementFooterProps extends GlobalAttributes<HTMLDivElement, "children"> {
    /**
     * * `footer`: A small, separated blurb of info at the bottom of the card.
     */
    type?: "paragraph" | "footer";
    children?: ComponentChildren;
}
export type CardElementProps = CardElementParagraphProps | CardElementFooterProps | CardElementImageProps | CardElementTitleProps | CardElementSubtitleProps | CardElementFlushProps;
declare function CardElement2<E extends Element>({ type, ...p }: CardElementProps, ref: Ref<E>): VNode;
export declare const CardElement: typeof CardElement2;
export {};
//# sourceMappingURL=card.d.ts.map