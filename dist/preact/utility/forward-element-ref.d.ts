interface MutableRefObject<T> {
    current: T;
}
type ForwardedRef<T> = ((instance: T | null) => void) | MutableRefObject<T | null> | null;
interface ForwardFn<P = {}, T = any> {
    (props: P, ref: ForwardedRef<T>): preact.ComponentChild;
    displayName?: string;
}
export declare function forwardElementRef<T extends ForwardFn<any, any>>(t: T): T;
export declare function memoForwardRef<T extends ForwardFn<any, any>>(fn: T): T;
export {};
//# sourceMappingURL=forward-element-ref.d.ts.map