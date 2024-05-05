import { forwardRef, memo } from "preact-prop-helpers/preact";

interface MutableRefObject<T> {
    current: T;
}
type ForwardedRef<T> =
    | ((instance: T | null) => void)
    | MutableRefObject<T | null>
    | null;
interface ForwardFn<P = {}, T = any> {
    (props: P, ref: ForwardedRef<T>): preact.ComponentChild;
    displayName?: string;
}

export function forwardElementRef<T extends ForwardFn<any, any>>(t: T): T {
    return forwardRef(t) as T;
}

export function memoForwardRef<T extends ForwardFn<any, any>>(fn: T): T {
    return memo(forwardRef(fn)) as T;
}
