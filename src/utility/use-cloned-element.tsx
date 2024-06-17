import { ComponentChildren, createElement, JSX, Ref, useMergedProps, VNode } from "preact-prop-helpers";

function childrenIsVnode(children?: ComponentChildren | null | undefined): children is VNode {
    if (children && (children as VNode).type && (children as VNode).props)
        return true;
    return false;
}

export function useClonedElement(children: ComponentChildren | undefined | null, props: JSX.HTMLAttributes<any>, ref: Ref<any> | null | undefined, Tag: keyof JSX.IntrinsicElements = 'span') {
    const T = Tag as any;
    const c = (childrenIsVnode(children) ? children : <T>{children}</T>) as any as VNode;
    return createElement(c.type as any, useMergedProps(c.props, { ref: c.ref }, props, { ref }));
}
