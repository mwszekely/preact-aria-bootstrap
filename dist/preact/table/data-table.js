import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import clsx from "clsx";
import { Table as AriaTable, TableCell as AriaTableCell, TableRow as AriaTableRow, TableSection as AriaTableSection, TableRows } from "preact-aria-widgets/preact";
import { createContext, memo, useContext, useLayoutEffect, useMemo, useMergedProps, usePress, useRefElement, useStableGetter, useState } from "preact-prop-helpers/preact";
import { Fade } from "preact-transition/preact";
import { Paginated } from "../pagination/index.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { KeyboardAssistIcon } from "../utility/keyboard-assist.js";
import { useClonedElement } from "../utility/use-cloned-element.js";
import { Table, TableCell, TableRow, TableSection } from "./table.js";
// Allow for nicer props (on the Table instead of the TableSection)
const TableContext = createContext({ setChildCount: null, paginationMax: null, paginationMin: null, staggered: false });
export const DataTable = memo(forwardElementRef(function DataTable({ staggered, caption, captionPosition, bordered, dark, hover, striped, propsContainer, stripedColumns, variantBorder, variantSize, variantTheme, verticalAlign, children, paginationLabel, paginationLocation, paginationSize, ...props }, ref) {
    staggered ||= false;
    const [childCount, setChildCount] = useState(0);
    const [paginationStart, setPaginationStart] = useState(0);
    const [paginationEnd, setPaginationEnd] = useState(paginationSize ?? null);
    if (caption == "hidden")
        console.assert(typeof caption == "string");
    return (_jsx(TableContext.Provider, { value: useMemo(() => ({ setChildCount, paginationMax: paginationEnd, paginationMin: paginationStart, staggered: staggered }), [setChildCount, paginationStart, paginationEnd, staggered]), children: _jsx(AriaTable, { ariaLabel: captionPosition == "hidden" ? caption : null, singleSelectionMode: "activation", tagTable: "table", render: info => {
                return (_jsxs(Paginated, { childCount: childCount, setPaginationEnd: setPaginationEnd, setPaginationStart: setPaginationStart, paginationLabel: paginationLabel, paginationLocation: paginationLocation, paginationSize: paginationSize, children: [caption && captionPosition != "hidden" && _jsx("caption", { ...useMergedProps(info.propsLabel, { className: clsx(captionPosition == "before" && "caption-top") }), children: caption }), _jsx(Table, { bordered: bordered, dark: dark, hover: hover, propsContainer: propsContainer, striped: striped, stripedColumns: stripedColumns, variantBorder: variantBorder, variantSize: variantSize, variantTheme: variantTheme, verticalAlign: verticalAlign, ...useMergedProps(info.propsTable, { className: "table" }, { ref, ...props }), children: children })] }));
            } }) }));
}));
export const DataTableHead = memo(forwardElementRef(function DataTableHead(props, ref) { return (_jsx(DataTableSection, { ref: ref, location: "head", ...props })); }));
export const DataTableBody = memo(forwardElementRef(function DataTableBody(props, ref) { return (_jsx(DataTableSection, { ref: ref, location: "body", ...props })); }));
export const DataTableFoot = memo(forwardElementRef(function DataTableFoot(props, ref) { return (_jsx(DataTableSection, { ref: ref, location: "head", ...props })); }));
const DataTableSection = memo(forwardElementRef(function DataTableSection({ children, keyboardControlsDescription, location, variantTheme, divider, ...props }, ref) {
    const { paginationMax, paginationMin, staggered, setChildCount } = useContext(TableContext);
    return (_jsx(IsTableHeadContext.Provider, { value: location == "head", children: _jsx(AriaTableSection, { 
            //staggered={location == "body" && staggered}
            location: location, 
            //getIndex={vnode => vnode.props.row}
            tagTableSection: `t${location}`, paginationMin: location == "body" ? paginationMin : null, paginationMax: location == "body" ? paginationMax : null, render: info => {
                const childCount = Array.isArray(children) ? children.length : 1;
                useLayoutEffect(() => {
                    if (location == "body")
                        setChildCount?.(childCount);
                }, [location, setChildCount, childCount]);
                return (_jsx(KeyboardAssistIcon, { homeEnd: true, leftRight: true, upDown: location == "body", pageKeys: true, typeaheadStatus: info.typeaheadNavigationReturn.typeaheadStatus, activateEnter: false, activateSpace: false, description: keyboardControlsDescription ?? "Navigate the table:", children: _jsx(TableSection, { location: location, variantTheme: variantTheme, divider: divider, ...useMergedProps(info.propsTableSection, { ref, ...props }), children: useMemo(() => _jsx(DataTableRows, { children: Array.isArray(children) ? children : [children] }), [children]) }) }));
            } }) }));
}));
const DataTableRows = memo((function DataTableRows({ children }) {
    const { paginationMax, paginationMin, staggered, setChildCount } = useContext(TableContext);
    return (_jsx(TableRows, { paginationMax: paginationMax, paginationMin: paginationMin, staggered: staggered, children: children, render: info => {
            return _jsx(_Fragment, { children: info.rearrangeableChildrenReturn.children });
        } }));
}));
export const DataTableRow = memo(forwardElementRef(function DataTableRow({ row, children, variantTheme, ...props }, ref) {
    return (_jsx(AriaTableRow, { index: row, tagTableRow: "tr", render: info => {
            const hideBecauseStaggered = info.staggeredChildReturn.hideBecauseStaggered;
            const hideBecausePaginated = info.paginatedChildReturn.hideBecausePaginated;
            let tr = (_jsx(TableRow, { ...useMergedProps(info.props, { ref, ...props }, { className: hideBecausePaginated ? "d-none" : "" }), children: (info.hidden ? null : children) }));
            if (info.paginatedChildReturn.hideBecausePaginated) {
                return tr;
            }
            return (_jsx(Fade, { show: !info.hidden, animateOnMount: info.staggeredChildReturn.parentIsStaggered, delayMountUntilShown: true, children: tr }));
        } }));
}));
export const IsTableHeadContext = createContext(false);
export const DataTableCell = memo(forwardElementRef(function DataTableCell({ column, colSpan, children, value, unsortable, variantTheme, fillY, ...props }, ref) {
    const { refElementReturn, refElementReturn: { getElement }, propsStable } = useRefElement({ refElementParameters: {} });
    const [sortingByThisColumn, setSortingByThisColumn] = useState(false);
    const [sortDirection, setSortDirection] = useState(null);
    const isTableHead = useContext(IsTableHeadContext);
    const focusSelf = (e) => {
        const actualElement = getElement();
        actualElement?.focus();
        if (document.activeElement != actualElement)
            e?.focus();
    };
    return (_jsx(AriaTableCell, { index: column, tagTableCell: isTableHead ? "th" : "td", focusSelf: focusSelf, getSortValue: useStableGetter(value ?? children), colSpan: colSpan, render: info => {
            const { pressReturn, props: propsPress } = usePress({
                pressParameters: {
                    focusSelf,
                    allowRepeatPresses: null,
                    excludeEnter: null,
                    excludePointer: null,
                    longPressThreshold: null,
                    onPressingChange: null,
                    onPressSync: !isTableHead ? undefined : () => {
                        const { column, direction } = info.tableCellReturn.sortByThisColumn();
                        setSortingByThisColumn(true);
                        setSortDirection(direction);
                    },
                    ...info.pressParameters
                },
                refElementReturn
            });
            const p = useMergedProps(propsStable, propsPress, info.propsCell, { ref, ...props });
            children ??= value;
            children = useClonedElement(children, info.propsFocus, ref);
            return _jsx(TableCell, { ...p, tableHeadType: isTableHead ? (unsortable ? "unsortable" : "sortable") : null, fillY: fillY, variantTheme: variantTheme, children: children });
            /*if (isTableHead) {
                return (
                    <th className={clsx(fillY && "py-0")}>
                        <button className="sort-button" {...p as JSX.HTMLAttributes<any>}>
                            <span>{children}</span>
                            {sortDirection == null && <BootstrapIcon icon="filter" label={null} />}
                            {sortDirection == "ascending" && <BootstrapIcon icon="sort-down-alt" label={null} />}
                            {sortDirection == "descending" && <BootstrapIcon icon="sort-up" label={null} />}
                        </button>
                    </th>
                )
            }
            else {
                children ??= (value as string);
                children = useClonedElement(children, p, ref);
                return (
                    <td className={clsx(fillY && "py-0")}>{children}</td>
                )
            }*/
        } }));
}));
//# sourceMappingURL=data-table.js.map