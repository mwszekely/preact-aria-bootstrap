import { clsx } from "clsx";
import { cloneElement, ComponentChildren, JSX, memo, Ref, useMergedProps } from "preact-prop-helpers";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { GlobalAttributes } from "../utility/types.js";

export interface FigureProps extends Omit<GlobalAttributes<HTMLElement>, "children"> {
    caption: ComponentChildren;
    align?: "start" | "end" | "center";
    children: JSX.Element;
}

export const Figure = /* @__PURE__ */ memo(forwardElementRef(function Figure({ children, caption, align, ...props }: FigureProps, ref: Ref<HTMLElement>) {
    return (
        <figure {...useMergedProps<HTMLElement>({ className: "figure", ref }, props)}>
            {cloneElement(children, useMergedProps<HTMLImageElement>({ className: "figure-img", ref: children.props.ref }, children.props))}
            <figcaption className={clsx("figure", align === "end" && "text-end", align == "center" && "text-center")}>{caption}</figcaption>
        </figure>
    )
}))
