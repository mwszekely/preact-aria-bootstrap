import clsx from "clsx";
import { ComponentChildren, createElement, Ref, VNode } from "preact";
import { Heading } from "preact-aria-widgets";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { ButtonThemes } from "../context";
import { forwardElementRef } from "../utility/forward-element-ref";
import { GlobalAttributes } from "../utility/types";



export interface CardProps extends GlobalAttributes<HTMLDivElement, "children"> { 
    title?: ComponentChildren;
    subtitle?: ComponentChildren;
    variantTheme?: ButtonThemes;
 }
interface CardBodyProps extends GlobalAttributes<HTMLDivElement, "children"> { }
interface CardTextProps extends GlobalAttributes<HTMLDivElement, "children"> { }
interface CardHeaderProps extends GlobalAttributes<HTMLDivElement, "children"> { }
interface CardFooterProps extends GlobalAttributes<HTMLDivElement, "children"> { }
interface CardTitleProps extends GlobalAttributes<HTMLHeadingElement, "children"> { title: ComponentChildren; children: ComponentChildren; }
interface CardSubtitleProps extends GlobalAttributes<HTMLHeadingElement, "children"> { subtitle: ComponentChildren; children: ComponentChildren; }
interface CardImageProps extends GlobalAttributes<HTMLImageElement> { src: string, position: "bottom" | "top" | "both" }


export const Card = memo(forwardElementRef(function Card(p: CardProps, ref: Ref<HTMLDivElement>) {
    let { children, title, subtitle, variantTheme, ...props } = p;

    if (title)
        children = <Heading heading={title}>{children}</Heading>;
    if (subtitle)
        children = <Heading heading={subtitle}>{children}</Heading>;

    return (
        <div {...useMergedProps<HTMLDivElement>({ ref, className: clsx("card elevation-raised-1 elevation-body-surface", variantTheme && `text-bg-${variantTheme}`) }, props)}>{children}</div>
    )
}));

export interface CardElementParagraphProps extends GlobalAttributes<HTMLElement, "children"> {
    /**
     * * `paragraph`: Any generic text. The default. Will be padded around the edges.
     */
    type: "paragraph" | "footer";
    children: ComponentChildren;
}
export interface CardElementTitleProps extends GlobalAttributes<HTMLHeadingElement, "children"> {
    /**
     * * `title`: The title at the top of the card.
     * * `subtitle`: The optional subtitle below the title.
     */
    type: "title" | "subtitle";
    children: ComponentChildren;
}
export interface CardElementImageProps extends GlobalAttributes<HTMLElement, "children"> {
    /**
     * * `image`: A header/footer image
     */
    type: "image";
    src: string;
    children: ComponentChildren;
}
export interface CardElementFlushProps extends GlobalAttributes<HTMLElement, "children"> {
    /**
     * * `flush` Any non-card content that needs to have no padding. A list, for example.
     */
    type: "flush";
    children: ComponentChildren;
}
export interface CardElementFooterProps extends GlobalAttributes<HTMLElement, "children"> {
    /**
     * * `footer`: A small, separated blurb of info at the bottom of the card.
     */
    type?: "paragraph" | "footer";
    children: ComponentChildren;
}
export type CardElementProps = CardElementParagraphProps | CardElementFooterProps | CardElementImageProps | CardElementTitleProps | CardElementFlushProps;


function CardElement2<E extends Element>(p: CardElementProps, ref: Ref<E>): VNode<any> {
    switch (p.type) {
        default:
        case "paragraph": {
            const { children, ...props } =(p as any as CardBodyProps);
            return <CardBody {...props} ref={ref as any}><CardText>{children}</CardText></CardBody>;
        }
        case "footer": {
            const { children,...props } = (p as any as CardFooterProps);
            return <CardFooter {...props} ref={ref as any}>{children}</CardFooter>;
        }
        case "subtitle": {
            const { children, subtitle, ...props } = (p as any as CardSubtitleProps);
            return <CardSubtitle subtitle={subtitle} {...useMergedProps<any>({ className: "card-body" }, props)} ref={ref as any}>{children}</CardSubtitle>;
        }
        case "title": {
            const { children, title, ...props } = (p as any as CardTitleProps);
            return <CardTitle title={title} {...useMergedProps<any>({ className: "card-body" }, props)} ref={ref as any}>{children}</CardTitle>;
        }
        case "image": {
            const { src, position, ...props } = (p as any as CardImageProps);
            return <CardImage src={src} position={position} {...props} ref={ref as any} />;
        }
        case "flush": {
            const { children, ...props } = p;
            return createElement("span", props, children);
        }
    }
}

export const CardElement = memo(forwardElementRef(CardElement2));

const CardImage = memo(forwardElementRef(function CardImage(p: CardImageProps, ref: Ref<HTMLImageElement>) {
    const { position, ...props } = p;
    return (
        <img {...useMergedProps<HTMLImageElement>(props, { ref, className: `card-img${position == "both" ? "" : `-${position}`}` })} />
    )
}));

const CardBody = memo(forwardElementRef(function CardBody(props: CardBodyProps, ref: Ref<HTMLDivElement>) {
    return (
        <div {...useMergedProps<HTMLDivElement>(props, { ref, className: "card-body" })} />
    )
}));

const CardFooter = memo(forwardElementRef(function CardHeader(props: CardFooterProps, ref: Ref<HTMLDivElement>) {
    return (
        <div {...useMergedProps<HTMLDivElement>(props, { ref, className: "card" })} />
    )
}));

const CardTitle = memo(forwardElementRef(function CardTitle<E extends Element>(p: CardTitleProps, ref: Ref<E>) {
    const { title, children, ref: unused, ...props } = p;
    console.assert(ref == unused || unused == null);
    return <Heading heading={title} {...useMergedProps<E>(props, { ref, className: "card-title" }) as any}>{children}</Heading>
}));

const CardSubtitle = memo(forwardElementRef(function CardSubtitle<E extends Element>(p: CardSubtitleProps, ref: Ref<E>) {
    const { subtitle, children, ref: unused, ...props } = p;
    console.assert(ref == unused || unused == null);
    return <Heading heading={subtitle} {...useMergedProps<E>(props, { ref, className: clsx("card-subtitle", "mb-2", "text-muted") }) as any}>{children}</Heading>
}));


const CardText = memo(forwardElementRef(function CardText(props: CardTextProps, ref: Ref<HTMLDivElement>) {
    return (
        <div {...useMergedProps<HTMLDivElement>(props, { ref, className: "card-text" })} />
    )
}));

const CardHeader = memo(forwardElementRef(function CardHeader(props: CardHeaderProps, ref: Ref<HTMLDivElement>) {
    return (
        <div {...useMergedProps<HTMLDivElement>(props, { ref, className: "card-header" })} />
    )
}));