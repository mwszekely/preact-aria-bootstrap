import { cloneElement, ComponentChildren, createContext, Fragment, h } from "preact";
import { UseToastParameters, Toasts as AriaToasts, ToastsProps as AriaToastsProps, Toast as AriaToast, ToastInfo, ToastProps as AriaToastProps, defaultRenderPortal, ToastsContext } from "preact-aria-widgets";
import { generateRandomId, useMergedProps, useMutationObserver, useStableCallback, useState } from "preact-prop-helpers";
import { SlideFade } from "preact-transition";
import { useCallback, useContext, useEffect, useErrorBoundary, useLayoutEffect } from "preact/hooks";
import { Button } from "../button";
import { usePortalId } from "../utility/use-portal-id";
import clsx from "clsx";
import { usePortalChildren, PushPortalChild, UpdatePortalChild } from "preact-prop-helpers"



//export type StateUpdater<S> = (value: ((prevState: S) => S)) => void;
export type PushToast = PushPortalChild
export type UpdateToast = UpdatePortalChild;
const PushToastContext = createContext<PushPortalChild>(null!);
const UpdateToastContext = createContext<UpdatePortalChild>(null!);
const DefaultToastTimeout = createContext(Infinity);
export function ToastsProvider({ children, defaultTimeout, visibleCount }: { children: ComponentChildren, visibleCount: number; defaultTimeout?: number }) {

    const { children: portalChildren, portalElement, pushChild, removeChild, updateChild } = usePortalChildren({ target: usePortalId("toast") })

    return (
        <DefaultToastTimeout.Provider value={defaultTimeout ?? Infinity}>
            <PushToastContext.Provider value={pushChild}>
                <UpdateToastContext.Provider value={updateChild}>
                    <AriaToasts visibleCount={visibleCount} render={info => {
                        return (
                            <>
                                {children}
                                {portalChildren}
                            </>
                        )
                    }} />
                </UpdateToastContext.Provider>
            </PushToastContext.Provider>
        </DefaultToastTimeout.Provider>
    )
}

export function usePushToast() {
    const pushToast = useContext(PushToastContext);
    return pushToast;
}

export function useUpdateToast() {
    const updateToast = useContext(UpdateToastContext);
    return updateToast;
}

export interface ToastProps extends Pick<AriaToastProps<HTMLDivElement>, "politeness" | "index"> { children: ComponentChildren; timeout?: number; }


const ToastDismissContext = createContext<() => void>(null!);
export function Toast({ timeout, politeness, children, ...p }: Omit<ToastProps, "index">) {
    const { index, ...props } = p as ToastProps;
    const defaultTimeout = useContext(DefaultToastTimeout);
    // const { useToastProps, dismiss, status } = useToast<HTMLDivElement>({ timeout: timeout ?? defaultTimeout, politeness });


    return (
        <AriaToast<HTMLDivElement>
            index={index}
            timeout={ 10000000 ?? timeout ?? defaultTimeout}
            children={children}
            render={info => {
                const show = (info.toastReturn.showing);
                return (

                    <ToastDismissContext.Provider value={info.toastReturn.dismiss}>
                        <SlideFade show={show} slideTargetInline={1} animateOnMount={show} exitVisibility="removed">
                            <div {...useMergedProps(info.props, props, { class: clsx("toast show"/*, colorVariant && `text-bg-${colorVariant}`*/) })} >
                                <div class="d-flex">
                                    <div class="toast-body">
                                        {children}
                                    </div>
                                    <Button class="btn-close me-2 m-auto" aria-label="Dismiss alert" onPress={info.toastReturn.dismiss} />
                                </div>
                            </div>
                        </SlideFade>
                    </ToastDismissContext.Provider>
                )
            }}
        />
    )
}

function defaultErrorToToast(error: any) {
    return <Toast timeout={Infinity}>{error instanceof Error ? error.message : JSON.stringify(error)}</Toast>
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
export function ToastErrorBoundary({ errorToToast, children }: { errorToToast?: (error: any) => h.JSX.Element, children: ComponentChildren }) {
    const pushToast = usePushToast();
    const [error, resetError] = useErrorBoundary(error => void (pushToast((errorToToast ?? defaultErrorToToast)(error))));
    return <>{children}</>;
}

/*
export function ToastHeader({ children }: { children: ComponentChildren }) {
    return (
        <div class="toast-header">
            <div class="me-auto">
                {children}
            </div>
            <Button class="btn-close" aria-label="Close" />
        </div>
    )
}*/
