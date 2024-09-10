import { ComponentChildren, Ref, VNode } from "preact-prop-helpers";
import { CaptionedProps, GlobalAttributes, PaginatedProps } from "../utility/types.js";
import { TableCellProps, TableProps, TableRowProps, TableSectionProps } from "./table.js";
export interface DataTableProps extends TableProps {
    children?: ComponentChildren;
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
export declare const DataTable: ({ staggered, caption, captionPosition, bordered, dark, hover, striped, propsContainer, stripedColumns, variantBorder, variantSize, variantTheme, verticalAlign, children, paginationLabel, paginationLocation, paginationSize, ...props }: PaginatedProps<CaptionedProps<DataTableProps>>, ref?: Ref<HTMLTableElement>) => import("preact").h.JSX.Element;
interface DataTableSectionProps extends TableSectionProps {
    keyboardControlsDescription?: string;
    children: (VNode[] | VNode);
}
export interface DataTableHeadProps extends Omit<DataTableSectionProps, "location">, GlobalAttributes<HTMLTableSectionElement> {
    ref?: Ref<HTMLTableSectionElement>;
    children: VNode;
}
export interface DataTableBodyProps extends Omit<DataTableSectionProps, "location">, GlobalAttributes<HTMLTableSectionElement> {
    ref?: Ref<HTMLTableSectionElement>;
    children: VNode[];
}
export interface DataTableFootProps extends Omit<DataTableSectionProps, "location">, GlobalAttributes<HTMLTableSectionElement> {
    ref?: Ref<HTMLTableSectionElement>;
    children: VNode;
}
export declare const DataTableHead: (props: DataTableHeadProps, ref?: Ref<HTMLTableSectionElement>) => import("preact").h.JSX.Element;
export declare const DataTableBody: (props: DataTableBodyProps, ref?: Ref<HTMLTableSectionElement>) => import("preact").h.JSX.Element;
export declare const DataTableFoot: (props: DataTableFootProps, ref?: Ref<HTMLTableSectionElement>) => import("preact").h.JSX.Element;
export interface DataTableRowProps extends TableRowProps {
    row: number;
}
export declare const DataTableRow: ({ row, children, variantTheme, ...props }: DataTableRowProps, ref?: Ref<HTMLTableRowElement>) => import("preact").h.JSX.Element;
export declare const IsTableHeadContext: import("preact").Context<boolean>;
export declare const DataTableCell: ({ column, colSpan, children, value, unsortable, variantTheme, fillY, ...props }: DataTableCellProps, ref?: Ref<HTMLTableCellElement>) => import("preact").h.JSX.Element;
export {};
//# sourceMappingURL=data-table.d.ts.map