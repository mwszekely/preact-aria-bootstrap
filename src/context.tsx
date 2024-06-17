import { createContext } from "preact-prop-helpers";

export const DisabledContext = createContext(false);
export const DefaultDisabledType = createContext("soft" as "soft" | "hard");
export const DefaultButtonTheme = createContext<ButtonThemes | null>(null);
export const DefaultButtonSize = createContext<ButtonSizes | null>(null);

export type ButtonThemes = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
export type ButtonSizes = "sm" | "md" | "lg";
export type ButtonFills = "fill" | "outline";

