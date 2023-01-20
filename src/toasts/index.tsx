import { cloneElement, ComponentChildren, createContext, Fragment, h } from "preact";
import { UseToastParameters, Toasts as AriaToasts, ToastsProps as AriaToastsProps, Toast as AriaToast, ToastInfo, ToastProps as AriaToastProps, defaultRenderPortal, ToastsContext } from "preact-aria-widgets";
import { generateRandomId, useMergedProps, useMutationObserver, useStableCallback, useState } from "preact-prop-helpers";
import { SlideFade } from "preact-transition";
import { useCallback, useContext, useEffect, useErrorBoundary, useLayoutEffect } from "preact/hooks";
import { Button } from "../button";
import { GlobalAttributes, usePortalId } from "../utility";
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
                    {children}
                    {portalChildren}
                </UpdateToastContext.Provider>
            </PushToastContext.Provider>
        </DefaultToastTimeout.Provider>
    )

    /*const [pushToast, setPushToast] = useState<PushToast | null>(null);
    const [updateToast, setUpdateToast] = useState<UpdateToast | null>(null);

    const pushToastStable = useStableCallback<NonNullable<typeof pushToast>>((toast) => {
        return pushToast?.(toast) ?? -1;
    });

    const updateToastStable = useStableCallback<NonNullable<typeof updateToast>>((index, toast) => {
        return updateToast?.(index, toast);
    });

    return (
        <>
            <DefaultToastTimeout.Provider value={defaultTimeout ?? Infinity}>
                <ToastsProviderHelper visibleCount={visibleCount} setPushToast={setPushToast} setUpdateToast={setUpdateToast} />
                {pushToast && updateToast &&
                    <PushToastContext.Provider value={pushToastStable}>
                        <UpdateToastContext.Provider value={updateToastStable}>
                            {children}
                        </UpdateToastContext.Provider>
                    </PushToastContext.Provider>
                }
            </DefaultToastTimeout.Provider>
        </>
    )*/
}

export function usePushToast() {
    const pushToast = useContext(PushToastContext);
    return pushToast;
}

export function useUpdateToast() {
    const updateToast = useContext(UpdateToastContext);
    return updateToast;
}

// Extracted to a separate component to avoid rerendering all non-toast children
/*function ToastsProviderHelper({ setPushToast, setUpdateToast, visibleCount }: { visibleCount: number; setPushToast: StateUpdater<PushToast | null>, setUpdateToast: StateUpdater<UpdateToast | null> }) {

    const [children, setChildren, getChildren] = useState<h.JSX.Element[]>([]);
    const pushToast: PushToast | null = useCallback((toast: h.JSX.Element) => {
        const randomKey = generateRandomId();
        let index = getChildren().length;
        setChildren(prev => ([...prev, cloneElement(toast, { key: randomKey, index })]));
        return index;
    }, []);

    const updateToast: UpdateToast | null = useCallback((index: number, toast: h.JSX.Element) => {
        const key = getChildren()[index]?.key;
        console.assert(key);
        if (key) {
            setChildren(prev => {
                let newChildren = prev.slice();
                newChildren.splice(index, 1, cloneElement(toast, { key: key as string, index }));
                return newChildren;
            });
            return index;
        }
    }, []);

    useLayoutEffect(() => { setPushToast(_ => pushToast); }, [pushToast]);
    useLayoutEffect(() => { setUpdateToast(_ => updateToast); }, [updateToast]);

    return (
        defaultRenderPortal({
            portalId: usePortalId("toast"),
            children: (
                <ToastsContainerChildrenContext.Provider value={children}>
                    <ToastsContainer maxVisible={visibleCount} />
                </ToastsContainerChildrenContext.Provider>)
        })
    )
}

const ToastsContainerChildrenContext = createContext<h.JSX.Element[]>([]);
function ToastsContainer({ maxVisible, ...props }: ToastsContainerProps) {
    const children = useContext(ToastsContainerChildrenContext);

    return (
        <AriaToasts<HTMLDivElement>
            visibleCount={maxVisible}

            render={info => {
                return (

                    <div {...(useMergedProps<HTMLDivElement>(info.props, props))}>
                        {children}
                    </div>
                )
            }} />
    )
}*/



//const UseToastContext = createContext<ToastsContext<ToastInfo>>(null!);
export interface ToastProps extends Pick<AriaToastProps<HTMLDivElement>, "politeness" | "index"> { children: ComponentChildren; timeout?: number; }
interface ToastsContainerProps extends GlobalAttributes<HTMLDivElement> {
    maxVisible: number;
}

const ToastDismissContext = createContext<() => void>(null!);
export function Toast({ timeout, politeness, children, ...p }: Omit<ToastProps, "index">) {
    const { index, ...props } = p as ToastProps;
    const defaultTimeout = useContext(DefaultToastTimeout);
    // const { useToastProps, dismiss, status } = useToast<HTMLDivElement>({ timeout: timeout ?? defaultTimeout, politeness });


    return (
        <AriaToast<HTMLDivElement>
            index={index}
            timeout={timeout ?? defaultTimeout}
            children={children}
            render={info => {
                const show = (info.toastReturn.showing);
                return (

                    <ToastDismissContext.Provider value={info.toastReturn.dismiss}>
                        <SlideFade show={show} slideTargetInline={1} animateOnMount={show} exitVisibility="removed">
                            <div {...useMergedProps(info.props, { class: clsx("toast show"/*, colorVariant && `text-bg-${colorVariant}`*/) })} >
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
