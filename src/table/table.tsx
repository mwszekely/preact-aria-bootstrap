
import { clsx } from "clsx";
import { ComponentChildren, JSX, Ref, memo, useEnsureStability, useMergedProps } from "preact-prop-helpers/preact";
import { ButtonThemes } from "../context.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { GlobalAttributes } from "../utility/types.js";
import { useClonedElement } from "../utility/use-cloned-element.js";


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

export const Table = memo(forwardElementRef(function Table({ propsContainer, dark, hover, striped, stripedColumns, variantBorder, bordered, variantSize, variantTheme, verticalAlign, ...props }: TableProps, ref?: Ref<HTMLTableElement>) {


    return (
        <div {...useMergedProps({ class: clsx("table-container", "table-responsive") }, propsContainer || {})}>
            <table {...useMergedProps({
                class: clsx(
                    "table",
                    striped && "table-striped",
                    stripedColumns && "table-striped-columns",
                    hover && "table-hover",
                    dark && "table-dark",
                    variantTheme && `table-${variantTheme}`,
                    variantSize && `table-${variantSize}`,
                    verticalAlign && `align-${verticalAlign}`,
                    bordered && `table-bordered`,
                    variantBorder && `border-${variantBorder}`,
                ),
                ref
            }, props)} />
        </div>
    )
}))


export interface TableSectionProps extends GlobalAttributes<HTMLTableSectionElement, "children" | "ref"> {
    divider?: boolean;
    variantTheme?: ButtonThemes;
    children?: ComponentChildren;
    location: "head" | "body" | "foot";
}

export const TableSection = memo(forwardElementRef(function TableSection({ location, divider, variantTheme, ...props }: TableSectionProps, ref?: Ref<HTMLTableSectionElement>) {
    const TS = (location == "head" ? "thead" : location == "foot" ? "tfoot" : "tbody");
    return (
        <TS {...useMergedProps(props, { ref, className: clsx(variantTheme && `table-${variantTheme}`) })} />
    )
}))

export const TableRow = memo(forwardElementRef(function TableRow({ variantTheme, children, ...props }: TableRowProps, ref?: Ref<HTMLTableRowElement>) {
    //useWhatCausedRender("TableRow", { props: { ...props, children, variantTheme, ref }, state: {} })
    return (
        <tr {...useMergedProps({ ref, className: clsx(variantTheme && `table-${variantTheme}`) }, props)}>{children}</tr>
    )
}))

export const TableCell = memo(forwardElementRef(function TableCell({ variantTheme, fillY, tableHeadType, children, ...props }: TableCellProps, ref?: Ref<HTMLTableCellElement>) {
    useEnsureStability("TableCell", !!tableHeadType);
    props = useMergedProps({ ref, className: clsx(variantTheme && `table-${variantTheme}`) }, props);
    if (tableHeadType) {
        const thPropsIfSortable = { className: clsx(fillY && "py-0") };
        const thPropsIfUnsortable = useMergedProps(props, thPropsIfSortable);
        const buttonPropsIfUnsortable = { className: "sort-button" }
        const buttonPropsIfSortable = useMergedProps<HTMLButtonElement>(props as any, buttonPropsIfUnsortable);
        return (
            <th {...(tableHeadType == "unsortable" ? thPropsIfUnsortable : thPropsIfSortable)}>
                {
                    tableHeadType == "unsortable" ?
                        children :
                        <button {...buttonPropsIfSortable}><span>{children}</span></button>}
            </th>
        )
    }
    else {
        children = useClonedElement(children, props, ref);
        return (
            <td className={clsx(fillY && "py-0")}>{children}</td>
        )
    }

}))

//const IsTableHeadContext = createContext(false);
