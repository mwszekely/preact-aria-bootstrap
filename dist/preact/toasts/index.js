import { Fragment as _Fragment, jsxs as _jsxs, jsx as _jsx } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { Component } from "preact";
import { Toast as AriaToast, Toasts as AriaToasts } from "preact-aria-widgets";
import { createContext, useContext, useMergedProps, usePortalChildren } from "preact-prop-helpers";
import { SlideFade } from "preact-transition";
import { Button } from "../button/index.js";
import { usePortalId } from "../utility/use-portal-id.js";
const PushToastContext = createContext(null);
const UpdateToastContext = createContext(null);
const DefaultToastTimeout = createContext(Infinity);
export function ToastsProvider({ children, defaultTimeout, visibleCount }) {
    const { children: portalChildren, portalElement, pushChild, removeChild, updateChild } = usePortalChildren({ target: usePortalId("toast") });
    return (_jsx(DefaultToastTimeout.Provider, { value: defaultTimeout ?? Infinity, children: _jsx(PushToastContext.Provider, { value: pushChild, children: _jsx(UpdateToastContext.Provider, { value: updateChild, children: _jsx(AriaToasts, { visibleCount: visibleCount, render: info => {
                        return (_jsxs(_Fragment, { children: [children, portalChildren] }));
                    } }) }) }) }));
}
export function usePushToast() {
    const pushToast = useContext(PushToastContext);
    return pushToast;
}
export function useUpdateToast() {
    const updateToast = useContext(UpdateToastContext);
    return updateToast;
}
const ToastDismissContext = createContext(null);
export function Toast({ timeout, politeness, children, ...p }) {
    const { index, ...props } = p;
    const defaultTimeout = useContext(DefaultToastTimeout);
    // const { useToastProps, dismiss, status } = useToast<HTMLDivElement>({ timeout: timeout ?? defaultTimeout, politeness });
    const t = 10000000;
    return (_jsx(AriaToast, { index: index, timeout: (t) ?? timeout ?? defaultTimeout, children: children, render: info => {
            const show = (info.toastReturn.showing);
            return (_jsx(ToastDismissContext.Provider, { value: info.toastReturn.dismiss, children: _jsx(SlideFade, { show: show, slideTargetInline: 1, animateOnMount: show, exitVisibility: "removed", children: _jsx("div", { ...useMergedProps(info.props, props, { class: clsx("toast show" /*, colorVariant && `text-bg-${colorVariant}`*/) }), children: _jsxs("div", { className: "d-flex", children: [_jsx("div", { className: "toast-body", children: children }), _jsx(Button, { className: "btn-close me-2 m-auto", "aria-label": "Dismiss alert", onPress: info.toastReturn.dismiss })] }) }) }) }));
        } }));
}
function defaultErrorToToast(error) {
    return _jsx(Toast, { timeout: Infinity, children: error instanceof Error ? _jsxs("details", { children: [_jsx("summary", { children: error.message }), _jsx("pre", { children: _jsx("code", { children: error.stack }) })] }) : JSON.stringify(error) });
}
/**
 * A component that will catch any errors thrown during render
 * and present them as toasts.
 *
 * Ideally you should provide a custom errorToToast function that can handle expected types of errors,
 * but having a default one at the root of the app probably isn't a bad idea.
 * @param param0
 * @returns
 */
/*function ToastErrorBoundary({ errorToToast, children }: { errorToToast?: (error: any) => JSX.Element, children?: ComponentChildren }) {
    const pushToast = usePushToast();
    //const [error, resetError] = useErrorBoundary(error => void (pushToast((errorToToast ?? defaultErrorToToast)(error))));
    return <>{children}</>;
}*/
export class ToastErrorBoundary extends Component {
    componentDidCatch(error, errorInfo) {
        this.setState({ hasError: true, error, pushedToast: false });
    }
    render() {
        return (_jsx(PushToastContext.Consumer, { children: (pushToast) => {
                if (!this.state.pushedToast && this.state.error) {
                    pushToast(defaultErrorToToast(this.state.error));
                    this.setState({ pushedToast: true });
                }
                return _jsx(_Fragment, { children: this.props.children });
            } }));
    }
}
//# sourceMappingURL=index.js.map