
import clsx from "clsx";
import { Table as AriaTable, TableCell as AriaTableCell, TableRow as AriaTableRow, TableSection as AriaTableSection, TableRows } from "preact-aria-widgets";
import { ComponentChildren, Ref, VNode, createContext, memo, useContext, useLayoutEffect, useMemo, useMergedProps, usePress, useRefElement, useStableGetter, useState } from "preact-prop-helpers";
import { Fade } from "preact-transition";
import { Paginated } from "../pagination/index.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { KeyboardAssistIcon } from "../utility/keyboard-assist.js";
import { CaptionedProps, GlobalAttributes, PaginatedProps } from "../utility/types.js";
import { useClonedElement } from "../utility/use-cloned-element.js";
import { Table, TableCell, TableCellProps, TableProps, TableRow, TableRowProps, TableSection, TableSectionProps } from "./table.js";

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

// Allow for nicer props (on the Table instead of the TableSection)
const TableContext = createContext<{ paginationMin: number | null, paginationMax: number | null, staggered: boolean, setChildCount: (null) | ((c: number) => void) }>({ setChildCount: null, paginationMax: null, paginationMin: null, staggered: false });

export const DataTable = memo(forwardElementRef(function DataTable({ staggered, caption, captionPosition, bordered, dark, hover, striped, propsContainer, stripedColumns, variantBorder, variantSize, variantTheme, verticalAlign, children, paginationLabel, paginationLocation, paginationSize, ...props }: PaginatedProps<CaptionedProps<DataTableProps>>, ref?: Ref<HTMLTableElement>) {

    staggered ||= false;
    const [childCount, setChildCount] = useState(0);
    const [paginationStart, setPaginationStart] = useState<number | null>(0);
    const [paginationEnd, setPaginationEnd] = useState<number | null>(paginationSize ?? null);
    if (caption == "hidden")
        console.assert(typeof caption == "string", `<DataTable />: When labelPosition is 'hidden', the label must be a string (as opposed to arbitrary JSX)`);
    return (
        <TableContext.Provider value={useMemo(() => ({ setChildCount, paginationMax: paginationEnd, paginationMin: paginationStart, staggered: staggered! }), [setChildCount, paginationStart, paginationEnd, staggered])}>
            <AriaTable<HTMLTableElement, HTMLTableCaptionElement>
                ariaLabel={captionPosition == "hidden" ? caption as string : null}

                singleSelectionMode="activation"
                tagTable="table"
                render={info => {

                    return (
                        <Paginated
                            childCount={childCount}
                            setPaginationEnd={setPaginationEnd}
                            setPaginationStart={setPaginationStart}
                            paginationLabel={paginationLabel}
                            paginationLocation={paginationLocation}
                            paginationSize={paginationSize}>

                            {caption && captionPosition != "hidden" && <caption {...useMergedProps(info.propsLabel, { className: clsx(captionPosition == "before" && "caption-top") })}>{caption}</caption>}
                            <Table
                                bordered={bordered}
                                dark={dark}
                                hover={hover}
                                propsContainer={propsContainer}
                                striped={striped}
                                stripedColumns={stripedColumns}
                                variantBorder={variantBorder}
                                variantSize={variantSize}
                                variantTheme={variantTheme}
                                verticalAlign={verticalAlign}
                                {...useMergedProps(info.propsTable, { className: "table" }, { ref, ...props })}
                            >
                                {children}
                            </Table>
                        </Paginated>
                    )
                }}
            />
        </TableContext.Provider>
    )
}))

interface DataTableSectionProps extends TableSectionProps {
    keyboardControlsDescription?: string;
    children: (VNode[] | VNode);
}


export interface DataTableHeadProps extends Omit<DataTableSectionProps, "location">, GlobalAttributes<HTMLTableSectionElement> { ref?: Ref<HTMLTableSectionElement>; children: VNode; }
export interface DataTableBodyProps extends Omit<DataTableSectionProps, "location">, GlobalAttributes<HTMLTableSectionElement> { ref?: Ref<HTMLTableSectionElement>; children: VNode[]; }
export interface DataTableFootProps extends Omit<DataTableSectionProps, "location">, GlobalAttributes<HTMLTableSectionElement> { ref?: Ref<HTMLTableSectionElement>; children: VNode; }

export const DataTableHead = memo(forwardElementRef(function DataTableHead(props: DataTableHeadProps, ref?: Ref<HTMLTableSectionElement>) { return (<DataTableSection ref={ref} location="head" {...props} />) }));
export const DataTableBody = memo(forwardElementRef(function DataTableBody(props: DataTableBodyProps, ref?: Ref<HTMLTableSectionElement>) { return (<DataTableSection ref={ref} location="body" {...props} />) }));
export const DataTableFoot = memo(forwardElementRef(function DataTableFoot(props: DataTableFootProps, ref?: Ref<HTMLTableSectionElement>) { return (<DataTableSection ref={ref} location="head" {...props} />) }));


const DataTableSection = memo(forwardElementRef(function DataTableSection({ children, keyboardControlsDescription, location, variantTheme, divider, ...props }: DataTableSectionProps, ref?: Ref<HTMLTableSectionElement>) {
    const { paginationMax, paginationMin, staggered, setChildCount } = useContext(TableContext);
    return (
        <IsTableHeadContext.Provider value={location == "head"}>
            <AriaTableSection<HTMLTableSectionElement, HTMLTableRowElement>
                //staggered={location == "body" && staggered}
                location={location}
                //getIndex={vnode => vnode.props.row}
                tagTableSection={`t${location}` as "thead"}
                paginationMin={location == "body" ? paginationMin : null}
                paginationMax={location == "body" ? paginationMax : null}
                render={info => {
                    const childCount = Array.isArray(children) ? children.length : 1;
                    useLayoutEffect(() => {
                        if (location == "body")
                            setChildCount?.(childCount);
                    }, [location, setChildCount, childCount])
                    return (
                        <KeyboardAssistIcon
                            homeEnd={true}
                            leftRight={true}
                            upDown={location == "body"}
                            pageKeys={true}
                            typeaheadStatus={info.typeaheadNavigationReturn.typeaheadStatus}
                            activateEnter={false}
                            activateSpace={false}
                            description={keyboardControlsDescription ?? "Navigate the table:"}>
                            <TableSection location={location} variantTheme={variantTheme} divider={divider} {...useMergedProps(info.propsTableSection, { ref, ...props })}>{useMemo(() => <DataTableRows children={Array.isArray(children) ? children : [children]} />, [children])}</TableSection>
                        </KeyboardAssistIcon>
                    );
                }}
            />
        </IsTableHeadContext.Provider>
    )
}))

export interface DataTableRowProps extends TableRowProps {
    row: number;
}

const DataTableRows = memo((function DataTableRows({ children }: { children: VNode[] }) {
    const { paginationMax, paginationMin, staggered, setChildCount } = useContext(TableContext);
    return (
        <TableRows
            paginationMax={paginationMax}
            paginationMin={paginationMin}
            staggered={staggered}
            children={children}
            render={info => {
                return <>{info.rearrangeableChildrenReturn.children}</>;
            }}

        />
    )
}))

export const DataTableRow = memo(forwardElementRef(function DataTableRow({ row, children, variantTheme, ...props }: DataTableRowProps, ref?: Ref<HTMLTableRowElement>) {
    return (
        <AriaTableRow<HTMLTableRowElement, HTMLTableCellElement>
            index={row}
            tagTableRow="tr"
            render={info => {
                const hideBecauseStaggered = info.staggeredChildReturn.hideBecauseStaggered;
                const hideBecausePaginated = info.paginatedChildReturn.hideBecausePaginated;

                let tr = (
                    <TableRow {...useMergedProps(info.props, { ref, ...props }, { className: hideBecausePaginated ? "d-none" : "" })}>
                        {(info.hidden? null : children)}
                    </TableRow>
                );
                if (info.paginatedChildReturn.hideBecausePaginated) {
                    return tr;
                }

                return (
                    <Fade show={!info.hidden} animateOnMount={info.staggeredChildReturn.parentIsStaggered} delayMountUntilShown={true}>
                        {tr}
                    </Fade>
                )
            }}
        />
    )
}))

export const IsTableHeadContext = createContext(false);

export const DataTableCell = memo(forwardElementRef(function DataTableCell({ column, colSpan, children, value, unsortable, variantTheme, fillY, ...props }: DataTableCellProps, ref?: Ref<HTMLTableCellElement>) {
    const { refElementReturn, refElementReturn: { getElement }, propsStable } = useRefElement<HTMLTableCellElement>({ refElementParameters: {} });
    const [sortingByThisColumn, setSortingByThisColumn] = useState(false);
    const [sortDirection, setSortDirection] = useState(null as null | "ascending" | "descending");
    const isTableHead = useContext(IsTableHeadContext);

    const focusSelf = (e: HTMLElement) => {
        const actualElement = getElement();
        actualElement?.focus();
        if (document.activeElement != actualElement)
            e?.focus();
    };

    return (
        <AriaTableCell<HTMLTableCellElement>
            index={column}
            tagTableCell={isTableHead ? "th" : "td"}
            focusSelf={focusSelf}
            getSortValue={useStableGetter(value ?? children)}
            colSpan={colSpan}
            render={info => {

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
                            setSortDirection(direction)
                        },
                        ...info.pressParameters
                    },
                    refElementReturn
                })

                const p = useMergedProps<any>(propsStable, propsPress, info.propsCell, { ref, ...props });
                children ??= (value as string);
                children = useClonedElement(children, info.propsFocus, ref)
                return <TableCell {...p} tableHeadType={isTableHead ? (unsortable ? "unsortable" : "sortable") : null} fillY={fillY} variantTheme={variantTheme}>{children}</TableCell>
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

            }}
        />
    )
}))

