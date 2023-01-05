import { createContext, h, Ref } from "preact";

export const DisabledContext = createContext(false);
export const DefaultDisabledType = createContext("soft" as "soft" | "hard");

export type ButtonThemes = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";

