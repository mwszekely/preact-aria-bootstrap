import { jsx as _jsx } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { memo, useEnsureStability, useMergedProps } from "preact-prop-helpers/preact";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { useClonedElement } from "../utility/use-cloned-element.js";
export const Table = memo(forwardElementRef(function Table({ propsContainer, dark, hover, striped, stripedColumns, variantBorder, bordered, variantSize, variantTheme, verticalAlign, ...props }, ref) {
    return (_jsx("div", { ...useMergedProps({ class: clsx("table-container", "table-responsive") }, propsContainer || {}), children: _jsx("table", { ...useMergedProps({
                class: clsx("table", striped && "table-striped", stripedColumns && "table-striped-columns", hover && "table-hover", dark && "table-dark", variantTheme && `table-${variantTheme}`, variantSize && `table-${variantSize}`, verticalAlign && `align-${verticalAlign}`, bordered && `table-bordered`, variantBorder && `border-${variantBorder}`),
                ref
            }, props) }) }));
}));
export const TableSection = memo(forwardElementRef(function TableSection({ location, divider, variantTheme, ...props }, ref) {
    const TS = (location == "head" ? "thead" : location == "foot" ? "tfoot" : "tbody");
    return (_jsx(TS, { ...useMergedProps(props, { ref, className: clsx(variantTheme && `table-${variantTheme}`) }) }));
}));
export const TableRow = memo(forwardElementRef(function TableRow({ variantTheme, children, ...props }, ref) {
    //useWhatCausedRender("TableRow", { props: { ...props, children, variantTheme, ref }, state: {} })
    return (_jsx("tr", { ...useMergedProps({ ref, className: clsx(variantTheme && `table-${variantTheme}`) }, props), children: children }));
}));
export const TableCell = memo(forwardElementRef(function TableCell({ variantTheme, fillY, tableHeadType, children, ...props }, ref) {
    useEnsureStability("TableCell", !!tableHeadType);
    props = useMergedProps({ ref, className: clsx(variantTheme && `table-${variantTheme}`) }, props);
    if (tableHeadType) {
        const thPropsIfSortable = { className: clsx(fillY && "py-0") };
        const thPropsIfUnsortable = useMergedProps(props, thPropsIfSortable);
        const buttonPropsIfUnsortable = { className: "sort-button" };
        const buttonPropsIfSortable = useMergedProps(props, buttonPropsIfUnsortable);
        return (_jsx("th", { ...(tableHeadType == "unsortable" ? thPropsIfUnsortable : thPropsIfSortable), children: tableHeadType == "unsortable" ?
                children :
                _jsx("button", { ...buttonPropsIfSortable, children: _jsx("span", { children: children }) }) }));
    }
    else {
        children = useClonedElement(children, props, ref);
        return (_jsx("td", { className: clsx(fillY && "py-0"), children: children }));
    }
}));
//# sourceMappingURL=table.js.map