import { Component, ErrorInfo } from "preact";
import { ToastProps as AriaToastProps } from "preact-aria-widgets";
import { ComponentChildren, PushPortalChild, UpdatePortalChild } from "preact-prop-helpers";
export type PushToast = PushPortalChild;
export type UpdateToast = UpdatePortalChild;
export declare function ToastsProvider({ children, defaultTimeout, visibleCount }: {
    children?: ComponentChildren;
    visibleCount: number;
    defaultTimeout?: number;
}): any;
export declare function usePushToast(): (child: import("preact").JSX.Element) => number;
export declare function useUpdateToast(): (index: number, child: import("preact").JSX.Element) => void;
export interface ToastProps extends Pick<AriaToastProps<HTMLDivElement>, "politeness" | "index"> {
    children?: ComponentChildren;
    timeout?: number;
}
export declare function Toast({ timeout, politeness, children, ...p }: Omit<ToastProps, "index">): any;
/**
 * A component that will catch any errors thrown during render
 * and present them as toasts.
 *
 * Ideally you should provide a custom errorToToast function that can handle expected types of errors,
 * but having a default one at the root of the app probably isn't a bad idea.
 * @param param0
 * @returns
 */
export declare class ToastErrorBoundary extends Component<{
    children?: ComponentChildren;
}, {
    hasError: boolean;
    error: unknown;
    pushedToast: boolean;
}> {
    componentDidCatch(error: any, errorInfo: ErrorInfo): void;
    render(): any;
}
//# sourceMappingURL=index.d.ts.map