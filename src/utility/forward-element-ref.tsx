import { ForwardFn, forwardRef } from "preact/compat";

export function forwardElementRef<T extends ForwardFn<any, any>>(t: T): T {
    return forwardRef(t) as T;
}