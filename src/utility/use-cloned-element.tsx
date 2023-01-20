import { ComponentChildren, createElement, h, Ref, VNode } from "preact";
import { useMergedProps } from "preact-prop-helpers";

function childrenIsVnode(children: ComponentChildren | null | undefined): children is VNode {
    if (children && (children as VNode).type && (children as VNode).props)
        return true;
    return false;
}

export function useClonedElement(children: ComponentChildren | undefined | null, props: h.JSX.HTMLAttributes<any>, ref: Ref<any> | null | undefined) {
    const c = (childrenIsVnode(children) ? children : <span>{children}</span>) as any as VNode;
    return createElement(c.type as any, useMergedProps(c.props, { ref: c.ref }, props, { ref }));
}
