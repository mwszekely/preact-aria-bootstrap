import { ComponentChildren } from "preact";
export type RenderCounterTypes = "DataTable" | "DataTableSection" | "DataTableRow" | "DataTableCell" | "Gridlist" | "GridlistSection" | "GridlistRow" | "GridlistCell";
export declare function RenderCounterProvider({ children }: {
    children: ComponentChildren;
}): import("preact").JSX.Element;
export declare function useRenderCounters(): Record<RenderCounterTypes, number> | null;
export declare function useUpdateRenderCounter(key: RenderCounterTypes): void;
//# sourceMappingURL=render-counter.d.ts.map