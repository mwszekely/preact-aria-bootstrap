import { createElement as _createElement } from "preact";
import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import clsx from "clsx";
import { Table as AriaTable, TableBody as AriaTableBody, TableBodyRow as AriaTableBodyRow, TableCell as AriaTableCell, TableHead as AriaTableHead, TableHeadRow as AriaTableHeadRow } from "preact-aria-widgets";
import { createContext, memo, useContext, useMergedProps, useState } from "preact-prop-helpers";
import { Paginated } from "../pagination/index.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { Table, TableCell, TableRow } from "./table.js";
const IsTableHeadContext = createContext(false);
// Allow for nicer props (on the Table instead of the TableSection)
//const TableContext = createContext<{ paginationMin: number | null, paginationMax: number | null, staggered: boolean, setChildCount: (null) | ((c: number) => void) }>({ setChildCount: null, paginationMax: null, paginationMin: null, staggered: false });
export const DataTable = /* @__PURE__ */ memo(forwardElementRef(function DataTable({ staggered, caption, captionPosition, bordered, header, dark, hover, striped, propsContainer, stripedColumns, variantBorder, variantSize, variantTheme, verticalAlign, children, paginationLabel, paginationLocation, paginationSize, ...props }, ref) {
    staggered ||= false;
    const [paginationStart, setPaginationStart] = useState(paginationSize == null ? null : 0);
    const [paginationEnd, setPaginationEnd] = useState(paginationSize ?? null);
    if (caption == "hidden")
        console.assert(typeof caption == "string", `<DataTable />: When labelPosition is 'hidden', the label must be a string (as opposed to arbitrary JSX)`);
    return (
    //<TableContext.Provider value={useMemo(() => ({ setChildCount, paginationMax: paginationEnd, paginationMin: paginationStart, staggered: staggered! }), [setChildCount, paginationStart, paginationEnd, staggered])}>
    _jsx(AriaTable, { paginationMin: paginationStart, paginationMax: paginationEnd, 
        //staggered={staggered || false}
        ariaLabel: captionPosition == "hidden" ? caption : null, noTypeahead: true, singleSelectionMode: "activation", tagTable: "table", render: infoTable => {
            return (_jsxs(Paginated, { childCount: children.length ?? 0, paginationLabel: paginationLabel, paginationLocation: paginationLocation, paginationSize: paginationSize, setPaginationEnd: setPaginationEnd, setPaginationStart: setPaginationStart, children: [caption && captionPosition != "hidden" && _jsx("caption", { ...useMergedProps(infoTable.propsLabel, { className: clsx(captionPosition == "before" && "caption-top") }), children: caption }), _jsxs(Table, { bordered: bordered, dark: dark, hover: hover, propsContainer: propsContainer, striped: striped, stripedColumns: stripedColumns, variantBorder: variantBorder, variantSize: variantSize, variantTheme: variantTheme, verticalAlign: verticalAlign, ...useMergedProps(infoTable.propsTable, { className: "table" }, { ref, ...props }), children: [_jsx(IsTableHeadContext.Provider, { value: true, children: _jsx(AriaTableHead, { tagHead: "thead", render: infoHead => {
                                        return (_jsx("thead", { ...infoHead.props, children: header }));
                                    } }) }), _jsx(AriaTableBody, { tagTableSection: "tbody", paginationMin: paginationStart, paginationMax: paginationEnd, children: children, render: infoBody => {
                                    return (_jsx("tbody", { ...infoBody.propsTableSection, children: infoBody.rearrangeableChildrenReturn.children }));
                                } })] })] }));
        } })
    //</TableContext.Provider>
    );
}));
export const DataTableHeadRow = /* @__PURE__ */ memo(forwardElementRef(function DataTableHeadRow({ row, children }, ref) {
    return (_jsx(AriaTableHeadRow, { index: row, tagTableRow: "tr", render: info => {
            return (_jsx(TableRow, { ...info.props, ref: ref, children: children }));
        } }));
}));
const DataTableBodyRowNonPaginated = /* @__PURE__ */ memo(forwardElementRef(function DataTableBodyRowNonPaginated({ row, children, ...props }, ref) {
    return (_jsx(TableRow, { ...props, ref: ref, children: children }));
}));
export const DataTableBodyRow = /* @__PURE__ */ memo(forwardElementRef(function DataTableBodyRow({ row, children, ...props }, ref) {
    return (_jsx(AriaTableBodyRow, { index: row, tagTableRow: "tr", render: info => {
            const p3 = useMergedProps(props, info.props, { ref });
            if (info.hide) {
                if (info.paginatedChildReturn.hideBecausePaginated)
                    return _createElement("tr", { ...p3, key: "hide-because-paginated" });
                else //if (infoRow.staggeredChildReturn.hideBecauseStaggered)
                    return _createElement("tr", { ...p3, key: "hide-because-staggered", "aria-busy": "true" }); // Besides being a placeholder visually, this is orders of magnitude faster than null, for some reason?
            }
            else {
                return (_jsx(DataTableBodyRowNonPaginated, { row: row, ...p3, children: children }, "show"));
            }
        } }));
}));
export const DataTableCell = /* @__PURE__ */ memo(forwardElementRef(function DataTableBodyRow({ column, children, fillY, unsortable, variantTheme, colSpan, value, ...props }, ref) {
    const isHeadCell = useContext(IsTableHeadContext);
    children ??= `${value}`;
    return (_jsx(AriaTableCell, { index: column, tagTableCell: "td", focusSelf: e => { e.focus(); }, render: info => {
            const mergedProps = useMergedProps(props, info.propsCell, info.propsFocus, { ref });
            if (isHeadCell) {
                return (_jsx(TableCell, { tableHeadType: unsortable ? "unsortable" : "sortable", ...mergedProps, children: children }));
            }
            else {
                return (_jsx(TableCell, { tableHeadType: null, ...mergedProps, children: children }));
            }
        } }));
}));
//# sourceMappingURL=data-table.js.map