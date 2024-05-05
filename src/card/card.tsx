import { clsx } from "clsx";
import { Heading } from "preact-aria-widgets/preact";
import { ComponentChildren, createElement, memo, Ref, useMergedProps, VNode } from "preact-prop-helpers/preact";
import { ButtonThemes } from "../context.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { GlobalAttributes } from "../utility/types.js";



export interface CardProps extends GlobalAttributes<HTMLDivElement, "children"> {
    title?: ComponentChildren;
    subtitle?: ComponentChildren;
    variantTheme?: ButtonThemes;
}


export const Card = memo(forwardElementRef(function Card(p: CardProps, ref: Ref<HTMLDivElement>) {
    let { children, title, subtitle, variantTheme, ...props } = p;

    if (subtitle)
        children = <CardSubtitle subtitle={subtitle} className={title? "pt-0" : ""}>{children}</CardSubtitle>;
    if (title)
        children = <CardTitle title={title} className={subtitle? "pb-0" : ""}>{children}</CardTitle>;

    return (
        <div {...useMergedProps<HTMLDivElement>({ ref, className: clsx("card", variantTheme && `text-bg-${variantTheme}`) }, props)}>{children}</div>
    )
}));

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


function CardElement2<E extends Element>({ type, ...p }: CardElementProps, ref: Ref<E>): VNode {
    switch (type) {
        default:
        case "paragraph": {
            const { children, ...props } = (p as any as CardElementParagraphProps);
            return <CardBody {...props} ref={ref as any}><CardText>{children}</CardText></CardBody>;
        }
        case "footer": {
            const { children, ...props } = (p as any as CardElementParagraphProps);
            return <CardFooter {...props} ref={ref as any}>{children}</CardFooter>;
        }
        case "subtitle": {
            const { children, subtitle, ...props } = (p as any as CardElementSubtitleProps);
            return <CardSubtitle subtitle={subtitle} {...props} ref={ref as any}>{children}</CardSubtitle>;
        }
        case "title": {
            const { children, title, ...props } = (p as any as CardElementTitleProps);
            return <CardTitle title={title as any} {...props} ref={ref as any}>{children}</CardTitle>;
        }
        case "image": {
            const { src, position, ...props } = (p as any as CardElementImageProps);
            return <CardImage src={src} position={position} {...props} ref={ref as any} />;
        }
        case "flush": {
            const { children, ...props } = (p as any as CardElementFlushProps);
            return createElement("span", props, children);
        }
    }
}

export const CardElement = memo(forwardElementRef(CardElement2));

const CardImage = memo(forwardElementRef(function CardImage(p: Omit<CardElementImageProps, "type">, ref: Ref<HTMLImageElement>) {
    const { position, src, ...props } = p;
    return (
        <img {...useMergedProps<HTMLImageElement>(props, { ref, className: `card-img${position == "both" ? "" : `-${position}`}` })} />
    )
}));

const CardBody = memo(forwardElementRef(function CardBody(props: Omit<CardElementParagraphProps, "type">, ref: Ref<HTMLDivElement>) {
    return (
        <div {...useMergedProps<HTMLDivElement>(props, { ref, className: "card-body" })} />
    )
}));

const CardFooter = memo(forwardElementRef(function CardFooter(p: Omit<CardElementFooterProps, "type">, ref: Ref<HTMLDivElement>) {
    const { ...props } = p;
    return (
        <div {...useMergedProps<HTMLDivElement>(props, { ref, className: "card-footer" })} />
    )
}));

const CardTitle = memo(forwardElementRef(function CardTitle<E extends Element>(p: Omit<CardElementTitleProps, "type">, ref: Ref<E>) {
    const { title, children, ref: unused, ...props } = p;
    console.assert(ref == unused || unused == null);
    return <Heading heading={title} {...useMergedProps<E>(props, { ref, className: "card-title card-body" }) as any}>{children}</Heading>
}));

const CardSubtitle = memo(forwardElementRef(function CardSubtitle<E extends Element>(p: Omit<CardElementSubtitleProps, "type">, ref: Ref<E>) {
    const { subtitle, children, ref: unused, ...props } = p;
    console.assert(ref == unused || unused == null);
    return <Heading heading={subtitle} {...useMergedProps<E>(props, { ref, className: clsx("card-subtitle card-body", "mb-2", "text-muted") }) as any}>{children}</Heading>
}));


const CardText = memo(forwardElementRef(function CardText(props: Omit<CardElementParagraphProps, "type">, ref: Ref<HTMLDivElement>) {
    return (
        <div {...useMergedProps<HTMLDivElement>(props, { ref, className: "card-text" })} />
    )
}));

/*const CardHeader = memo(forwardElementRef(function CardHeader(props: CardElementHeaderProps, ref: Ref<HTMLDivElement>) {
    return (
        <div {...useMergedProps<HTMLDivElement>(props, { ref, className: "card-header" })} />
    )
}));*/