import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { Listbox, ListboxItem } from "preact-aria-widgets";
import { EventDetail, returnZero, useMergedProps, useStableCallback, useState } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { Paginated } from "../pagination/index.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
/**
 * A listbox is a much simpler List.
 *
 * Unlike a List, there can't be any additional elements for each list item -- e.g. you can't have a "delete" button for each item in a listbox.
 *
 * @param param0
 * @returns
 */
export function ListboxSingle({ selectedIndex, onSelectedIndexChange, children, label, labelPosition, staggered, paginationLabel, paginationLocation, paginationSize }) {
    const [paginationMin, setPaginationMin] = useState(paginationSize == null ? null : 0);
    const [paginationMax, setPaginationMax] = useState(paginationSize);
    if (paginationSize)
        paginationLocation ||= "before";
    return (_jsx(Listbox, { singleSelectedIndex: selectedIndex, singleSelectionMode: "activation", onSingleSelectedIndexChange: useStableCallback((e) => { debugger; onSelectedIndexChange(e[EventDetail].selectedIndex, e); }), staggered: staggered, paginationMin: paginationMin, paginationMax: paginationMax, ariaLabel: labelPosition == "hidden" ? label : null, render: info => {
            const labelJsx = (_jsx("label", { ...info.propsListboxLabel, children: label }));
            return (_jsxs(_Fragment, { children: [labelPosition == 'before' && labelJsx, _jsx(Paginated, { paginationSize: paginationSize, childCount: info.paginatedChildrenReturn.childCount || 0, setPaginationEnd: setPaginationMax, setPaginationStart: setPaginationMin, paginationLabel: paginationLabel, paginationLocation: paginationLocation, children: _jsx("ol", { ...useMergedProps(info.propsListbox, { className: "list-group" }), children: children }) }), labelPosition == 'after' && labelJsx] }));
        } }));
}
export const ListboxSingleItem = memo(forwardElementRef(function ListboxSingleItem({ index, disabled, children, ...props }, ref) {
    return (_jsx(ListboxItem, { getSortValue: returnZero, index: index, multiSelected: undefined, singleSelectionDisabled: disabled, render: info => {
            if (info.staggeredChildReturn.hideBecauseStaggered)
                return _jsx("li", { class: "d-none" });
            if (info.paginatedChildReturn.hideBecausePaginated)
                return _jsx("li", { class: "d-none" });
            return (_jsx(ListboxSingleItemStatic, { ...useMergedProps(info.props, { ...props, ref }), disabled: disabled, selected: info.singleSelectionChildReturn.singleSelected, children: children }));
        } }));
}));
const ListboxSingleItemStatic = memo(forwardElementRef(function ListboxSingleItemStatic({ selected, children, disabled, ...props }, ref) {
    return _jsx("li", { ...useMergedProps({ ...props, ref }, { className: clsx("list-group-item list-group-item-action", selected && "active", disabled && "disabled") }), children: children });
}));
//# sourceMappingURL=listbox-single.js.map