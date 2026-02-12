
import clsx from "clsx";
import { Table as AriaTable, TableBody as AriaTableBody, TableBodyRow as AriaTableBodyRow, TableCell as AriaTableCell, TableHead as AriaTableHead, TableHeadRow as AriaTableHeadRow } from "preact-aria-widgets";
import { ComponentChildren, JSX, Ref, createContext, memo, useContext, useMergedProps, useState } from "preact-prop-helpers";
import { Paginated } from "../pagination/index.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { CaptionedProps, PaginatedProps } from "../utility/types.js";
import { Table, TableCell, TableCellProps, TableProps, TableRow } from "./table.js";

export interface DataTableProps extends TableProps {
    children: JSX.Element[];
    staggered?: boolean;
    header?: ComponentChildren;
    // footer?: ComponentChildren;
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

//export interface DataTableHeadProps {
//    children?: ComponentChildren;
//}

//export interface DataTableBodyProps {
//    children: VNode[];
//}

export interface DataTableHeadRowProps {
    row: number;
    children?: ComponentChildren;
}

export interface DataTableBodyRowProps {
    row: number;
    children?: ComponentChildren;
}

const IsTableHeadContext = createContext(false);


// Allow for nicer props (on the Table instead of the TableSection)
//const TableContext = createContext<{ paginationMin: number | null, paginationMax: number | null, staggered: boolean, setChildCount: (null) | ((c: number) => void) }>({ setChildCount: null, paginationMax: null, paginationMin: null, staggered: false });

export const DataTable = /* @__PURE__ */ memo(forwardElementRef(function DataTable({ staggered, caption, captionPosition, bordered, header, dark, hover, striped, propsContainer, stripedColumns, variantBorder, variantSize, variantTheme, verticalAlign, children, paginationLabel, paginationLocation, paginationSize, ...props }: PaginatedProps<CaptionedProps<DataTableProps>>, ref?: Ref<HTMLTableElement>) {

    staggered ||= false;
    const [paginationStart, setPaginationStart] = useState<number | null>(paginationSize == null ? null : 0);
    const [paginationEnd, setPaginationEnd] = useState<number | null>(paginationSize ?? null);
    if (caption == "hidden")
        console.assert(typeof caption == "string", `<DataTable />: When labelPosition is 'hidden', the label must be a string (as opposed to arbitrary JSX)`);
    return (
        //<TableContext.Provider value={useMemo(() => ({ setChildCount, paginationMax: paginationEnd, paginationMin: paginationStart, staggered: staggered! }), [setChildCount, paginationStart, paginationEnd, staggered])}>
        <AriaTable<HTMLTableElement, HTMLTableRowElement, HTMLTableCaptionElement>
            paginationMin={paginationStart}
            paginationMax={paginationEnd}
            //staggered={staggered || false}
            ariaLabel={captionPosition == "hidden" ? caption as string : null}
            noTypeahead={true}  // TODO: Fix this? This should be doable

            singleSelectionMode="activation"
            tagTable="table"
            render={infoTable => {
                return (
                    <Paginated childCount={children.length ?? 0} paginationLabel={paginationLabel} paginationLocation={paginationLocation} paginationSize={paginationSize} setPaginationEnd={setPaginationEnd} setPaginationStart={setPaginationStart}>
                        {caption && captionPosition != "hidden" && <caption {...useMergedProps(infoTable.propsLabel, { className: clsx(captionPosition == "before" && "caption-top") })}>{caption}</caption>}
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
                            {...useMergedProps(infoTable.propsTable, { className: "table" }, { ref, ...props })}
                        >

                            <IsTableHeadContext.Provider value={true}>
                                <AriaTableHead<HTMLTableSectionElement>
                                    tagHead="thead"
                                    render={infoHead => {
                                        return (
                                            <thead {...infoHead.props}>
                                                {header}
                                            </thead>
                                        )
                                    }}
                                />
                            </IsTableHeadContext.Provider>
                            <AriaTableBody<HTMLTableSectionElement, HTMLTableRowElement>
                                tagTableSection="tbody"
                                paginationMin={paginationStart}
                                paginationMax={paginationEnd}
                                children={children}
                                render={infoBody => {
                                    return (
                                        <tbody {...infoBody.propsTableSection} >
                                            {infoBody.rearrangeableChildrenReturn.children}
                                        </tbody>
                                    );
                                }}
                            />
                        </Table>
                    </Paginated>
                )
            }}
        />
        //</TableContext.Provider>
    )
}));


export const DataTableHeadRow = /* @__PURE__ */ memo(forwardElementRef(function DataTableHeadRow({ row, children }: DataTableHeadRowProps, ref?: Ref<HTMLTableRowElement>) {
    return (
        <AriaTableHeadRow<HTMLTableRowElement, HTMLTableCellElement> index={row} tagTableRow="tr" render={info => {
            return (
                <TableRow {...info.props} ref={ref}>
                    {children}
                </TableRow>
            );
        }} />
    );
}));


const DataTableBodyRowNonPaginated = /* @__PURE__ */ memo(forwardElementRef(function DataTableBodyRowNonPaginated({ row, children, ...props }: DataTableBodyRowProps, ref?: Ref<HTMLTableRowElement>) {
    return (
        <TableRow {...props} ref={ref}>
            {children}
        </TableRow>
    );
}));

export const DataTableBodyRow = /* @__PURE__ */ memo(forwardElementRef(function DataTableBodyRow({ row, children, ...props }: DataTableBodyRowProps, ref?: Ref<HTMLTableRowElement>) {

    return (
        <AriaTableBodyRow<HTMLTableRowElement, HTMLTableCellElement> index={row} tagTableRow="tr" render={info => {
            const p3 = useMergedProps(props, info.props, { ref });
            if (info.hide) {
                if (info.paginatedChildReturn.hideBecausePaginated)
                    return <tr {...p3} key="hide-because-paginated" />
                else //if (infoRow.staggeredChildReturn.hideBecauseStaggered)
                    return <tr {...p3} key="hide-because-staggered" aria-busy="true" /> // Besides being a placeholder visually, this is orders of magnitude faster than null, for some reason?
            }
            else {
                return (<DataTableBodyRowNonPaginated key="show" row={row} {...p3} children={children} />);
            }
        }} />
    );
}));

export const DataTableCell = /* @__PURE__ */ memo(forwardElementRef(function DataTableBodyRow({ column, children, fillY, unsortable, variantTheme, colSpan, value, ...props }: DataTableCellProps, ref?: Ref<HTMLTableCellElement>) {
    const isHeadCell = useContext(IsTableHeadContext);
    children ??= `${value}`;

    return (
        <AriaTableCell<HTMLTableCellElement> 
        index={column} 
        tagTableCell="td" 
        focusSelf={e => { e.focus(); }}
        render={info => {
            const mergedProps = useMergedProps(props, info.propsCell, info.propsFocus, { ref })
            if (isHeadCell) {
                return (
                    <TableCell tableHeadType={unsortable ? "unsortable" : "sortable"} {...mergedProps}>
                        {children}
                    </TableCell>
                );
            }
            else {
                return (
                    <TableCell tableHeadType={null} {...mergedProps}>
                        {children}
                    </TableCell>
                );
            }
        }} />
    );
}));

/*
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
                }*\/

            }}
        />
    )
}))
*/
