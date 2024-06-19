import { createContext, useContext } from "preact-prop-helpers";
import { useCallback } from "preact/hooks";
export const AutoAsyncHandlers = createContext(false);
export function useAutoAsyncHandler(syncOrAsyncHandler) {
    const autoAsync = useContext(AutoAsyncHandlers);
    return useCallback((...args) => {
        if (syncOrAsyncHandler) {
            if (autoAsync) {
                return new Promise(resolve => setTimeout(resolve, 10)).then(() => syncOrAsyncHandler(...args));
            }
            else {
                const ret = syncOrAsyncHandler(...args);
                return ret;
            }
        }
    }, [syncOrAsyncHandler, autoAsync]);
}
export const DisabledContext = createContext(false);
export const DefaultDisabledType = createContext("soft");
export const DefaultButtonTheme = createContext(null);
export const DefaultButtonSize = createContext(null);
//# sourceMappingURL=context.js.map