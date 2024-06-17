import { ComponentChildren, JSX, Ref } from "preact-prop-helpers";
import { ButtonThemes } from "../context.js";
import { GlobalAttributes } from "../utility/types.js";
export interface TableProps extends GlobalAttributes<HTMLTableElement, "children" | "ref"> {
    variantTheme?: ButtonThemes;
    striped?: boolean;
    stripedColumns?: boolean;
    dark?: boolean;
    hover?: boolean;
    bordered?: boolean;
    variantBorder?: ButtonThemes;
    variantSize?: "sm" | "md" | "lg";
    verticalAlign?: "middle" | "bottom" | "top";
    /**
     * By default, all props and the ref are passed to the &lt;table> element.
     *
     * If you need to pass props to the &lt;div> that contains it, pass them here.
     */
    propsContainer?: null | undefined | JSX.HTMLAttributes<HTMLDivElement>;
}
export interface TableRowProps extends GlobalAttributes<HTMLTableRowElement, "children" | "ref"> {
    variantTheme?: ButtonThemes;
}
export interface TableCellProps extends GlobalAttributes<HTMLTableCellElement, "children" | "ref"> {
    variantTheme?: ButtonThemes;
    fillY?: boolean;
    tableHeadType: null | "sortable" | "unsortable";
}
export declare const Table: ({ propsContainer, dark, hover, striped, stripedColumns, variantBorder, bordered, variantSize, variantTheme, verticalAlign, ...props }: TableProps, ref?: Ref<HTMLTableElement>) => any;
export interface TableSectionProps extends GlobalAttributes<HTMLTableSectionElement, "children" | "ref"> {
    divider?: boolean;
    variantTheme?: ButtonThemes;
    children?: ComponentChildren;
    location: "head" | "body" | "foot";
}
export declare const TableSection: ({ location, divider, variantTheme, ...props }: TableSectionProps, ref?: Ref<HTMLTableSectionElement>) => any;
export declare const TableRow: ({ variantTheme, children, ...props }: TableRowProps, ref?: Ref<HTMLTableRowElement>) => any;
export declare const TableCell: ({ variantTheme, fillY, tableHeadType, children, ...props }: TableCellProps, ref?: Ref<HTMLTableCellElement>) => any;
//# sourceMappingURL=table.d.ts.map