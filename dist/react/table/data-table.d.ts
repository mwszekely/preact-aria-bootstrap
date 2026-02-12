import { ComponentChildren, JSX, Ref } from "preact-prop-helpers";
import { CaptionedProps, PaginatedProps } from "../utility/types.js";
import { TableCellProps, TableProps } from "./table.js";
export interface DataTableProps extends TableProps {
    children: JSX.Element[];
    staggered?: boolean;
    header?: ComponentChildren;
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
export interface DataTableHeadRowProps {
    row: number;
    children?: ComponentChildren;
}
export interface DataTableBodyRowProps {
    row: number;
    children?: ComponentChildren;
}
export declare const DataTable: ({ staggered, caption, captionPosition, bordered, header, dark, hover, striped, propsContainer, stripedColumns, variantBorder, variantSize, variantTheme, verticalAlign, children, paginationLabel, paginationLocation, paginationSize, ...props }: PaginatedProps<CaptionedProps<DataTableProps>>, ref?: Ref<HTMLTableElement>) => any;
export declare const DataTableHeadRow: ({ row, children }: DataTableHeadRowProps, ref?: Ref<HTMLTableRowElement>) => any;
export declare const DataTableBodyRow: ({ row, children, ...props }: DataTableBodyRowProps, ref?: Ref<HTMLTableRowElement>) => any;
export declare const DataTableCell: ({ column, children, fillY, unsortable, variantTheme, colSpan, value, ...props }: DataTableCellProps, ref?: Ref<HTMLTableCellElement>) => any;
//# sourceMappingURL=data-table.d.ts.map