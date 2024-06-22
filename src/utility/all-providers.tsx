import { NotificationProviderContext, NotificationProviderProps, useNotificationProvider } from "preact-aria-widgets";
import { ComponentChildren, memo } from "preact-prop-helpers";
import { ExclusiveTransitionProvider } from "preact-transition";
import { ToastErrorBoundary, ToastsProvider } from "../toasts/index.js";
import { KeyboardAssistProvider } from "./keyboard-assist.js";

export const AllProviders = /* @__PURE__ */ memo(({ children, targetAssertive, targetPolite, toastsVisibleCount }: { children?: ComponentChildren, toastsVisibleCount?: number } & NotificationProviderProps) => {

    const { children: portalChildren, context } = useNotificationProvider({ targetAssertive, targetPolite })

    return (
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
    );
})
