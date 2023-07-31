import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { createContext } from "preact";
import { Gridlist, GridlistChild, GridlistRow, ProgressWithHandler } from "preact-aria-widgets";
import { EventDetail, returnUndefined, useHasCurrentFocus, useMergedProps, usePress, useRefElement, useStableCallback, useState } from "preact-prop-helpers";
import { Fade } from "preact-transition";
import { memo } from "preact/compat";
import { useCallback, useContext, useRef } from "preact/hooks";
import { Paginated } from "../pagination/index.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { KeyboardAssistIcon } from "../utility/keyboard-assist.js";
import { useUpdateRenderCounter } from "../utility/render-counter.js";
import { useClonedElement } from "../utility/use-cloned-element.js";
export { ListboxSingle, ListboxSingleItem } from "./listbox-single.js";
const DefaultDisabled = createContext(false);
export function List({ columns, disabled, selectedIndex, onSelectedIndexChange, label, labelPosition, children, paginationLabel, paginationLocation, paginationSize, staggered, ...props }) {
    labelPosition ??= "before";
    const [focusedInner, setFocusedInner] = useState(false);
    const { refElementReturn, propsStable } = useRefElement({ refElementParameters: {} });
    const { hasCurrentFocusReturn } = useHasCurrentFocus({ hasCurrentFocusParameters: { onCurrentFocusedChanged: null, onCurrentFocusedInnerChanged: setFocusedInner }, refElementReturn });
    const [paginationStart, setPaginationStart] = useState(paginationSize == null ? null : 0);
    const [paginationEnd, setPaginationEnd] = useState(paginationSize ?? null);
    if (paginationSize)
        paginationLocation ||= "before";
    return (_jsx(DefaultDisabled.Provider, { value: disabled ?? false, children: _jsx(Gridlist, { selectedIndex: selectedIndex ?? null, ariaPropName: "aria-selected", onSelectedIndexChange: useStableCallback(e => onSelectedIndexChange?.(e[EventDetail].selectedIndex)), paginationMin: paginationStart, paginationMax: paginationEnd, staggered: staggered || false, ariaLabel: labelPosition == "hidden" ? label : null, groupingType: "without-groups", selectionLimit: selectedIndex === undefined ? "multi" : "single", render: info => {
                useUpdateRenderCounter("Gridlist");
                const labelJsx = _jsx("label", { ...info.propsGridlistLabel, children: label });
                return (_jsxs(_Fragment, { children: [labelPosition == "before" && labelJsx, _jsx(Paginated, { childCount: info.paginatedChildrenReturn.childCount ?? 0, paginationLabel: paginationLabel, paginationLocation: paginationLocation, paginationSize: paginationSize, setPaginationEnd: setPaginationEnd, setPaginationStart: setPaginationStart, children: _jsx("div", { ...useMergedProps(props, propsStable, hasCurrentFocusReturn.propsStable, info.propsGridlist, { class: `list-group gridlist-group` }), children: children }) }), labelPosition == "after" && labelJsx] }));
            } }) }));
}
const ListItemNonPaginated = memo(({ infoRow, progressInfo, badge, disabled, iconEnd, iconStart, variantTheme, selected, children, props, ref2 }) => {
    useUpdateRenderCounter("GridlistRow");
    const { refElementReturn: { getElement }, refElementReturn, propsStable: p2 } = useRefElement({ refElementParameters: {} });
    const { pressReturn: { longPress, pressing }, props: p1 } = usePress({
        pressParameters: {
            focusSelf: useCallback(() => {
                return getElement()?.focus();
            }, []),
            allowRepeatPresses: null,
            excludeEnter: null,
            excludePointer: null,
            longPressThreshold: null,
            onPressingChange: null,
            ...infoRow.pressParameters
        },
        refElementReturn
    });
    const show = !infoRow.staggeredChildReturn.hideBecauseStaggered;
    const { propsProgressIndicator, propsProgressRegion } = progressInfo;
    const loadingJsx = (_jsx(Fade, { show: progressInfo.asyncHandlerReturn.pending, exitVisibility: "removed", children: _jsx("span", { class: "spinner-border spinner-border-sm text-secondary", ...propsProgressIndicator }) }));
    //const buttonClass = clsx(`btn position-relative`, variantDropdown && "dropdown-toggle", variantDropdown == "split" && "dropdown-toggle-split", variantSize && `btn-${variantSize}`, `btn${variantFill == "outline" ? "-outline" : ""}-${variantTheme || "primary"}`, pending && "pending", pressed && "pressed", disabled && "disabled", buttonInfo.pressReturn.pseudoActive && "active");
    const finalPropsForText = useMergedProps(p1, p2);
    const finalPropsForDiv = useMergedProps(infoRow.props, { ...props, ref: ref2 }, {
        className: clsx(infoRow.paginatedChildReturn.hideBecausePaginated ? "d-none" : "", `gridlist-item`, variantTheme && `list-group-item-${variantTheme}`, infoRow.paginatedChildReturn.hideBecausePaginated ? "d-none" : "", !show && "gridlist-item-placeholder", "list-group-item list-group-item-action", !!iconStart && "list-group-item-with-icon-start", !!iconEnd && "list-group-item-with-icon-end", !!badge && "list-group-item-with-badge", !!progressInfo.asyncHandlerReturn.pending && "list-group-item-with-pending", disabled && "disabled", (infoRow.singleSelectionChildReturn.selected || selected) && `active`)
    });
    const c = _jsxs(_Fragment, { children: [_jsx(ListItemStartEnd, { index: 0, hidden: iconStart == null, children: iconStart }), _jsxs(ListItemText, { onPress: progressInfo.asyncHandlerReturn.syncHandler, ...finalPropsForText, children: [_jsx("span", { children: children }), _jsxs("span", { class: "list-group-item-badge-and-spinner", children: [_jsx("div", { children: badge }), _jsx("div", { children: loadingJsx })] })] }), _jsx(ListItemStartEnd, { index: 2, hidden: iconEnd == null, children: iconEnd })] });
    if (!show)
        if (infoRow.paginatedChildReturn.hideBecausePaginated)
            return null;
        else
            return _jsx("div", { "aria-busy": "true", class: "gridlist-item gridlist-item-placeholder", children: _jsx("span", { class: clsx(!show ? "opacity-100" : "opacity-0", "placeholder-glow"), children: _jsx("span", { class: "placeholder w-100" }) }) });
    return (_jsx(KeyboardAssistIcon, { leftRight: (!!iconStart || !!iconEnd), upDown: true, homeEnd: true, pageKeys: true, typeahead: true, typeaheadActive: false, children: _jsx("div", { "aria-busy": (!show), ...finalPropsForDiv, children: show && c }) }));
});
export const ListItem = memo(forwardElementRef(function ListItem({ index, variantTheme, getSortValue, children, selected, disabled, iconEnd, iconStart, badge, onPress, loadingLabel, onSelectedChange, ...props }, ref) {
    const defaultDisabled = useContext(DefaultDisabled);
    disabled ||= defaultDisabled;
    let everShownPaginated = useRef(false);
    return (_jsx(ProgressWithHandler, { ariaLabel: loadingLabel ?? "Please wait while the operation completes.", asyncHandler: onPress ?? null, capture: returnUndefined, tagProgressIndicator: "span", render: progressInfo => {
            return (_jsx(GridlistRow, { index: index, unselectable: disabled, noTypeahead: true, getText: useCallback((e) => { return e?.querySelector(".gridlist-item-text")?.textContent || ""; }, []), render: infoRow => {
                    if (infoRow.paginatedChildReturn.hideBecausePaginated && everShownPaginated.current == false)
                        return _jsx("div", {}, "hide-because-paginated");
                    everShownPaginated.current = true;
                    // TODO: Get a better placeholder system
                    if (infoRow.staggeredChildReturn.hideBecauseStaggered)
                        return _jsx("div", { class: `gridlist-item gridlist-item-placeholder list-group-item`, role: "option", "aria-busy": "true" }, "hide-because-staggered"); // Besides being a placeholder visually, this is orders of magnitude faster than null, for some reason?
                    return _jsx(ListItemNonPaginated, { infoRow: infoRow, progressInfo: progressInfo, badge: badge, children: children, disabled: disabled, iconEnd: iconEnd, iconStart: iconStart, selected: selected, variantTheme: variantTheme, props: props, ref2: ref }, "show");
                } }));
        } }));
}));
const ListItemText = memo(forwardElementRef(function ListItemText({ onPress, children, ...props }, ref) {
    return (_jsx(GridlistChild, { index: 1, onPressSync: onPress, render: infoCell => {
            useUpdateRenderCounter("GridlistCell");
            return (_jsx("div", { ...useMergedProps(infoCell.propsCell, infoCell.propsPress, infoCell.propsTabbable, props, { ref }, { class: clsx("gridlist-item-text") }), children: children }));
        } }));
}));
const ListItemStartEnd = memo(function ListItemStartEnd({ hidden, index, children }) {
    return (_jsx(GridlistChild, { index: index, untabbable: hidden, focusSelf: useStableCallback(e => {
            e.focus();
        }), render: infoCell => {
            useUpdateRenderCounter("GridlistCell");
            const ret = (_jsx("div", { class: clsx("list-group-item-icon", `list-group-item-icon-${index === 0 ? "start" : "end"}`), children: useClonedElement(children, useMergedProps(infoCell.propsCell, infoCell.propsTabbable), undefined) }));
            if (hidden)
                return _jsx(_Fragment, { children: null });
            else
                return ret;
        } }));
});
//# sourceMappingURL=index.js.map