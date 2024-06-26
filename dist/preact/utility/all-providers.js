import { jsxs as _jsxs, jsx as _jsx } from "preact/jsx-runtime";
import { NotificationProviderContext, useNotificationProvider } from "preact-aria-widgets";
import { memo } from "preact-prop-helpers";
import { ExclusiveTransitionProvider } from "preact-transition";
import { ToastErrorBoundary, ToastsProvider } from "../toasts/index.js";
import { KeyboardAssistProvider } from "./keyboard-assist.js";
export const AllProviders = /* @__PURE__ */ memo(({ children, targetAssertive, targetPolite, toastsVisibleCount }) => {
    const { children: portalChildren, context } = useNotificationProvider({ targetAssertive, targetPolite });
    return (_jsx(NotificationProviderContext.Provider, { value: context, children: _jsx(ToastsProvider, { visibleCount: toastsVisibleCount ?? 4, children: _jsx(ToastErrorBoundary, { children: _jsx(ExclusiveTransitionProvider, { exclusivityKey: "tooltip", children: _jsxs(KeyboardAssistProvider, { children: [children, portalChildren] }) }) }) }) }));
});
//# sourceMappingURL=all-providers.js.map