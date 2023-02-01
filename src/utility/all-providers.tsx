import { ComponentChildren } from "preact";
import { NotificationProviderContext, NotificationProviderProps, useNotificationProvider } from "preact-aria-widgets";
import { memo } from "preact/compat";
import { ToastErrorBoundary, ToastsProvider } from "../toasts";
import { KeyboardAssistProvider } from "./keyboard-assist";
import { RenderCounterProvider } from "./render-counter";


export const AllProviders = memo(({ children, targetAssertive, targetPolite, toastsVisibleCount }: { children: ComponentChildren, toastsVisibleCount?: number } & NotificationProviderProps) => {

    const { children: portalChildren, context } = useNotificationProvider({ targetAssertive, targetPolite })

    return (
        <RenderCounterProvider>
            <NotificationProviderContext.Provider value={context}>
                <ToastsProvider visibleCount={toastsVisibleCount ?? 4}>
                    <ToastErrorBoundary>
                        <KeyboardAssistProvider>
                            {children}
                            {portalChildren}
                        </KeyboardAssistProvider>
                    </ToastErrorBoundary>
                </ToastsProvider>
            </NotificationProviderContext.Provider>
        </RenderCounterProvider>
    );
})
