import { cloneElement, JSX, memo, Ref, useMergedProps, VNode } from "preact-prop-helpers";
import { forwardElementRef } from "../utility/forward-element-ref.js";


export interface IconProps<E extends Element> extends Omit<JSX.HTMLAttributes<E>, "label" | "children"> {
    /**
     * All icons must either have an accessible label, or
     * explicitly declare that they do not have a label (and are implicitly presentation-only).
     */
    label: string | null;


    /**
     * Some icons, like a "help" icon, are actually interactive components that
     * are used to display help in a tooltip. If a tooltip is provided, then this
     * icon will become focusable for keyboard users (besides also, well, having a tooltip).
     */
    //tooltip?: ComponentChild;

    children?: VNode;
}

export const Icon = /* @__PURE__ */ memo(forwardElementRef(function Icon<E extends Element>({ label, role, "aria-label": ariaLabel, children, ref: unused, ...props }: IconProps<E>, ref: Ref<HTMLElement>) {
    console.assert(ref == unused || unused == null);

    const iconProps = useMergedProps<any>(props, {
        class: "icon",
        [children?.type === "img" ? "alt" : "aria-label"]: (ariaLabel || (label ?? undefined)),
        role: (role || (label ? "img" : "presentation")),
        ref,
    })

    const iconElement = cloneElement(children as any, useMergedProps<any>(("props" in (children || {}) as any? (children as any).props : {}), iconProps));

    return iconElement;
}));