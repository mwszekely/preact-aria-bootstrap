import { ComponentChildren } from "preact";
import { LabelledProps, PaginatedProps } from "../utility/types.js";
export declare function Pagination({ childCount, windowSize, onChange, labelPosition, label }: LabelledProps<{
    childCount: number;
    windowSize: number;
    onChange: (start: number | null, end: number | null) => void;
}, never>): import("preact").JSX.Element;
export declare const Paginated: import("preact").FunctionComponent<PaginatedProps<{
    children: ComponentChildren;
    childCount: number;
    setPaginationStart: (n: number | null) => void;
    setPaginationEnd: (n: number | null) => void;
}>>;
//# sourceMappingURL=index.d.ts.map