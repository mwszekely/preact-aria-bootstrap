import { ComponentChildren } from "preact-prop-helpers/preact";
import { LabelledProps, PaginatedProps } from "../utility/types.js";
export declare function Pagination({ childCount, windowSize, onChange, labelPosition, label, keyboardControlsDescription }: LabelledProps<{
    keyboardControlsDescription?: string;
    childCount: number;
    windowSize: number;
    onChange: (start: number | null, end: number | null) => void;
}, never>): any;
export declare const Paginated: import("preact").FunctionComponent<PaginatedProps<{
    children?: ComponentChildren;
    childCount: number;
    setPaginationStart: (n: number | null) => void;
    setPaginationEnd: (n: number | null) => void;
}>>;
//# sourceMappingURL=index.d.ts.map