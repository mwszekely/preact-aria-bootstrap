import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { createContext } from "preact";
import { Gridlist, GridlistChild, GridlistRow, ProgressWithHandler } from "preact-aria-widgets";
import { returnUndefined, returnZero, useHasCurrentFocus, useMergedProps, usePress, useRefElement, useStableCallback, useState } from "preact-prop-helpers";
import { Fade } from "preact-transition";
import { memo } from "preact/compat";
import { useCallback, useContext } from "preact/hooks";
import { Paginated } from "../pagination/index.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { KeyboardAssistIcon } from "../utility/keyboard-assist.js";
import { useUpdateRenderCounter } from "../utility/render-counter.js";
import { useClonedElement } from "../utility/use-cloned-element.js";
const DefaultDisabled = createContext(false);
export function List({ columns, disabled, selectedIndex, onSelectedIndexChange, label, labelPosition, children, paginationLabel, paginationLocation, paginationSize, staggered, ...props }) {
    const [focusedInner, setFocusedInner] = useState(false);
    const { refElementReturn, propsStable } = useRefElement({ refElementParameters: {} });
    const { hasCurrentFocusReturn } = useHasCurrentFocus({ hasCurrentFocusParameters: { onCurrentFocusedChanged: null, onCurrentFocusedInnerChanged: setFocusedInner }, refElementReturn });
    const [paginationStart, setPaginationStart] = useState(paginationSize == null ? null : 0);
    const [paginationEnd, setPaginationEnd] = useState(paginationSize ?? null);
    if (paginationSize)
        paginationLocation ||= "before";
    return (_jsx(DefaultDisabled.Provider, { value: disabled ?? false, children: _jsx(Gridlist, { selectedIndex: selectedIndex ?? null, onSelectedIndexChange: onSelectedIndexChange, paginationMin: paginationStart, paginationMax: paginationEnd, staggered: staggered || false, ariaLabel: labelPosition == "hidden" ? label : null, groupingType: "without-groups", selectionLimit: selectedIndex === undefined ? "multi" : "single", render: info => {
                useUpdateRenderCounter("Gridlist");
                const labelJsx = _jsx("label", { ...info.propsGridlistLabel, children: label });
                return (_jsxs(_Fragment, { children: [labelPosition == "before" && labelJsx, _jsx(Paginated, { childCount: info.paginatedChildrenReturn.childCount ?? 0, paginationLabel: paginationLabel, paginationLocation: paginationLocation, paginationSize: paginationSize, setPaginationEnd: setPaginationEnd, setPaginationStart: setPaginationStart, children: _jsx("div", { class: clsx(`list-group gridlist-group`), ...useMergedProps(props, propsStable, hasCurrentFocusReturn.propsStable, info.propsGridlist), children: children }) }), labelPosition == "after" && labelJsx] }));
            } }) }));
}
export const ListItem = memo(forwardElementRef(function ListItem({ index, variantTheme, getSortValue, children, selected, disabled, iconEnd, iconStart, badge, onPress, loadingLabel, onSelectedChange, ...props }, ref) {
    const defaultDisabled = useContext(DefaultDisabled);
    disabled ||= defaultDisabled;
    return (_jsx(ProgressWithHandler, { ariaLabel: loadingLabel ?? "Please wait while the operation completes.", asyncHandler: onPress ?? null, capture: returnUndefined, tagIndicator: "span", render: progressInfo => {
            return (_jsx(GridlistRow, { index: index, ariaPropName: "aria-selected", getSortValue: getSortValue ?? returnZero, disabled: disabled, noTypeahead: true, getText: useCallback((e) => { return e?.querySelector(".gridlist-item-text")?.textContent || ""; }, []), render: infoRow => {
                    useUpdateRenderCounter("GridlistRow");
                    const { refElementReturn: { getElement }, refElementReturn, propsStable: p2 } = useRefElement({ refElementParameters: {} });
                    const { pressReturn: { longPress, pressing }, props: p1 } = usePress({
                        pressParameters: {
                            focusSelf: useCallback(() => {
                                return getElement()?.focus();
                            }, []),
                            onPressSync: useStableCallback((e) => infoRow.singleSelectionChildReturn.setThisOneSelected(e)),
                            //...infoRow.pressParameters
                        },
                        refElementReturn
                    });
                    // For performance reasons, we stagger rendering each row's child
                    // It does take maybe 1.5 times as long, but you can still interact with the page while it's happening at least.
                    /*let timeout = (Math.floor(index / 100) * 500)
                    const [show, setShow] = useState(timeout == 0);
                    useTimeout({
                        timeout,
                        callback: () => setShow(true)
                    })*/
                    const show = !infoRow.staggeredChildReturn.hideBecauseStaggered;
                    const { propsIndicator, propsRegion } = progressInfo;
                    const loadingJsx = (_jsx(Fade, { show: progressInfo.asyncHandlerReturn.pending, children: _jsx("span", { class: "spinner-border spinner-border-sm text-secondary", ...propsIndicator }) }));
                    //const buttonClass = clsx(`btn position-relative`, variantDropdown && "dropdown-toggle", variantDropdown == "split" && "dropdown-toggle-split", variantSize && `btn-${variantSize}`, `btn${variantFill == "outline" ? "-outline" : ""}-${variantTheme || "primary"}`, pending && "pending", pressed && "pressed", disabled && "disabled", buttonInfo.pressReturn.pseudoActive && "active");
                    const finalPropsForText = useMergedProps(p1, p2);
                    const finalPropsForDiv = useMergedProps(infoRow.props, { ...props, ref }, {
                        className: clsx(`gridlist-item`, variantTheme && `list-group-item-${variantTheme}`, infoRow.paginatedChildReturn.isPaginated ? !infoRow.paginatedChildReturn.paginatedVisible && "d-none" : "", !show && "gridlist-item-placeholder", "list-group-item list-group-item-action", !!iconStart && "list-group-item-with-icon-start", !!iconEnd && "list-group-item-with-icon-end", !!badge && "list-group-item-with-badge", !!progressInfo.asyncHandlerReturn.pending && "list-group-item-with-pending", disabled && "disabled", (infoRow.singleSelectionChildReturn.selected || selected) && `active`)
                    });
                    const c = _jsxs(_Fragment, { children: [_jsx(ListItemStartEnd, { index: 0, hidden: iconStart == null, children: iconStart }), _jsxs(ListItemText, { onPress: progressInfo.asyncHandlerReturn.syncHandler, ...finalPropsForText, children: [_jsx("span", { children: children }), _jsxs("span", { class: "list-group-item-badge-and-spinner", children: [_jsx("div", { children: badge }), _jsx("div", { children: loadingJsx })] })] }), _jsx(ListItemStartEnd, { index: 2, hidden: iconEnd == null, children: iconEnd })] });
                    if (!show)
                        if (infoRow.paginatedChildReturn.isPaginated && !infoRow.paginatedChildReturn.paginatedVisible)
                            return null;
                        else
                            return _jsx("div", { "aria-busy": "true", class: "gridlist-item gridlist-item-placeholder", children: _jsx("span", { class: clsx(!show ? "opacity-100" : "opacity-0", "placeholder-glow"), children: _jsx("span", { class: "placeholder w-100" }) }) });
                    return (_jsx(KeyboardAssistIcon, { leftRight: (!!iconStart || !!iconEnd), upDown: true, homeEnd: true, pageKeys: true, typeahead: true, typeaheadActive: false, children: _jsx("div", { "aria-busy": (!show).toString(), ...finalPropsForDiv, children: show && c }) }));
                } }));
        } }));
}));
const ListItemText = memo(forwardElementRef(function ListItemText({ onPress, children, ...props }, ref) {
    return (_jsx(GridlistChild, { index: 1, onPressSync: onPress, render: infoCell => {
            useUpdateRenderCounter("GridlistCell");
            return (_jsx("div", { ...useMergedProps(infoCell.props, props, { ref }), class: clsx("gridlist-item-text"), children: children }));
        } }));
}));
const ListItemStartEnd = memo(function ListItemStartEnd({ hidden, index, children }) {
    return (_jsx(GridlistChild, { index: index, hidden: hidden, focusSelf: useStableCallback(e => {
            e.focus();
        }), render: info => {
            useUpdateRenderCounter("GridlistCell");
            const ret = (_jsx("div", { class: clsx("list-group-item-icon", `list-group-item-icon-${index === 0 ? "start" : "end"}`), children: useClonedElement(children, info.props, undefined) }));
            if (hidden)
                return _jsx(_Fragment, { children: null });
            else
                return ret;
        } }));
});
//# sourceMappingURL=index.js.map