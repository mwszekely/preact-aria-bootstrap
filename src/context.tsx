import { createContext, useContext } from "preact-prop-helpers";
import { useCallback } from "preact/hooks";


export const AutoAsyncHandlers = createContext(false);

export function useAutoAsyncHandler<T extends (...args: any[]) => any>(syncOrAsyncHandler: T | null | undefined) {
    const autoAsync = useContext(AutoAsyncHandlers);
    return useCallback((...args: Parameters<T>): ReturnType<T> | Promise<ReturnType<T>> | void => {
        if (syncOrAsyncHandler) {
            if (autoAsync) {
                return new Promise(resolve => setTimeout(resolve, 10)).then(() => syncOrAsyncHandler(...args));
            }
            else {
                const ret = syncOrAsyncHandler(...args);
                return ret;
            }
        }
    }, [syncOrAsyncHandler, autoAsync]) as T;
}

export const DisabledContext = createContext(false);
export const DefaultDisabledType = createContext("soft" as "soft" | "hard");
export const DefaultButtonTheme = createContext<ButtonThemes | null>(null);
export const DefaultButtonSize = createContext<ButtonSizes | null>(null);

export type ButtonThemes = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
export type ButtonSizes = "sm" | "md" | "lg";
export type ButtonFills = "fill" | "outline";

