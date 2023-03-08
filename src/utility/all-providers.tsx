import { ComponentChildren } from "preact";
import { NotificationProviderContext, NotificationProviderProps, useNotificationProvider } from "preact-aria-widgets";
import { memo } from "preact/compat";
import { ToastErrorBoundary, ToastsProvider } from "../toasts/index.js";
import { KeyboardAssistProvider } from "./keyboard-assist.js";
import { RenderCounterProvider } from "./render-counter.js";
import { ExclusiveTransitionProvider } from "preact-transition"

export const AllProviders = memo(({ children, targetAssertive, targetPolite, toastsVisibleCount }: { children: ComponentChildren, toastsVisibleCount?: number } & NotificationProviderProps) => {

    const { children: portalChildren, context } = useNotificationProvider({ targetAssertive, targetPolite })

    return (
        <RenderCounterProvider>
            <NotificationProviderContext.Provider value={context}>
                <ToastsProvider visibleCount={toastsVisibleCount ?? 4}>
                    <ToastErrorBoundary>
                        <ExclusiveTransitionProvider exclusivityKey="tooltip">
                            <KeyboardAssistProvider>
                                {children}
                                {portalChildren}
                            </KeyboardAssistProvider>
                        </ExclusiveTransitionProvider>
                    </ToastErrorBoundary>
                </ToastsProvider>
            </NotificationProviderContext.Provider>
        </RenderCounterProvider>
    );
})
