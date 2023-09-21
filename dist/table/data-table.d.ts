import { ComponentChildren } from "preact";
import { TableCellProps, TableProps } from "./table.js";
export interface DataTableProps extends TableProps {
    children: ComponentChildren;
    staggered?: boolean;
}
export interface DataTableCellProps extends Omit<TableCellProps, "tableHeadType"> {
    /**
     * Generally text sets this to false, and inputs with their own padding set this to true.
     */
    fillY?: boolean;
    /**
     * This overrides `children`; if both are provided, `children` are displayed but `value` is used as the sort value.
     */
    value?: unknown;
    column: number;
    colSpan?: number;
    /** If omitted `value` is used as the `children`, so at least one of them must be provided */
    children?: ComponentChildren;
    unsortable?: boolean;
}
//# sourceMappingURL=data-table.d.ts.map