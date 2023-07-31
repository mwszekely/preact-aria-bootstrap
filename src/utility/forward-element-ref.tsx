import { ForwardFn, forwardRef, memo } from "preact/compat";

export function forwardElementRef<T extends ForwardFn<any, any>>(t: T): T {
    return forwardRef(t) as T;
}

export function memoForwardRef<T extends ForwardFn<any, any>>(fn: T): T {
    return memo(forwardRef(fn)) as T;
}
 