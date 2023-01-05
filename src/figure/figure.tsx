import clsx from "clsx";
import { cloneElement, ComponentChildren, h, Ref, VNode } from "preact";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef, GlobalAttributes } from "../utility";

export interface FigureProps extends Omit<GlobalAttributes<HTMLElement>, "children"> {
    caption: ComponentChildren;
    align?: "start" | "end" | "center";
    children: VNode<any>;
}

export const Figure = memo(forwardElementRef(function Figure({ children, caption, align, ...props }: FigureProps, ref: Ref<HTMLElement>) {
    return (
        <figure {...useMergedProps<HTMLElement>({ className: "figure", ref }, props)}>
            {cloneElement(children, useMergedProps<HTMLImageElement>({ className: "figure-img", ref: children.props.ref }, children.props))}
            <figcaption className={clsx("figure", align === "end" && "text-end", align == "center" && "text-center")}>{caption}</figcaption>
        </figure>
    )
}))
