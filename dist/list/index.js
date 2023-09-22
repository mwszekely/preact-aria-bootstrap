import { createElement as _createElement } from "preact";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { createContext } from "preact";
import { Gridlist, GridlistChild, GridlistRow, GridlistRows, ProgressWithHandler } from "preact-aria-widgets";
import { EventDetail, monitored, returnUndefined, useMergedProps, usePress, useRefElement, useStableCallback, useState } from "preact-prop-helpers";
import { Fade } from "preact-transition";
import { forwardRef, memo } from "preact/compat";
import { useCallback, useContext } from "preact/hooks";
import { Paginated } from "../pagination/index.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { KeyboardAssistIcon } from "../utility/keyboard-assist.js";
import { useClonedElement } from "../utility/use-cloned-element.js";
const DefaultDisabled = createContext(false);
const TypeaheadStatus = createContext("none");
export const List = memo(forwardRef(monitored(function List({ disabled, selectedIndex, selectionMode, onSelectedIndexChange, label, labelPosition, children, paginationLabel, paginationLocation, paginationSize, staggered, ...props }, ref) {
    labelPosition ??= "before";
    //const [focusedInner, setFocusedInner] = useState(false);
    //const { refElementReturn, propsStable } = useRefElement<HTMLDivElement>({ refElementParameters: {} })
    //const { hasCurrentFocusReturn } = useHasCurrentFocus<HTMLDivElement>({ hasCurrentFocusParameters: { onCurrentFocusedChanged: null, onCurrentFocusedInnerChanged }, refElementReturn })
    const [paginationStart, setPaginationStart] = useState(paginationSize == null ? null : 0);
    const [paginationEnd, setPaginationEnd] = useState(paginationSize ?? null);
    if (selectedIndex != null || onSelectedIndexChange != null) {
        console.assert(selectionMode == "single", `selectedIndex was specified even though selection is not enabled. Use the selectionMode prop to enable selection.`);
    }
    if (paginationSize)
        paginationLocation ||= "before";
    return (_jsx(DefaultDisabled.Provider, { value: disabled ?? false, children: _jsx(Gridlist, { initiallyTabbableColumn: 1, singleSelectedIndex: selectedIndex ?? null, singleSelectionAriaPropName: "aria-selected", onSingleSelectedIndexChange: useStableCallback(e => { onSelectedIndexChange?.(e[EventDetail].selectedIndex); }), paginationMin: paginationStart, paginationMax: paginationEnd, ariaLabel: labelPosition == "hidden" ? label : null, groupingType: "without-groups", singleSelectionMode: selectionMode == "single" ? "activation" : "disabled", multiSelectionMode: selectionMode == "multi" ? "activation" : "disabled", render: info => {
                const labelJsx = _jsx("label", { ...info.propsGridlistLabel, children: label });
                return (_jsxs(TypeaheadStatus.Provider, { value: info.typeaheadNavigationReturn.typeaheadStatus, children: [labelPosition == "before" && labelJsx, _jsx(Paginated, { childCount: children.length ?? 0, paginationLabel: paginationLabel, paginationLocation: paginationLocation, paginationSize: paginationSize, setPaginationEnd: setPaginationEnd, setPaginationStart: setPaginationStart, children: _jsx("div", { ...useMergedProps(props, info.propsGridlist, { ref, class: `list-group gridlist-group` }), children: _jsx(GridlistRows, { children: children, paginationMin: paginationStart, paginationMax: paginationEnd, staggered: staggered || false, render: useCallback(infoRows => {
                                        return (_jsx(_Fragment, { children: infoRows.rearrangeableChildrenReturn.children }));
                                    }, []) }) }) }), labelPosition == "after" && labelJsx] }));
            } }) }));
})));
const ListItemNonPaginated = memo(monitored(function ListItemNonPaginated({ infoRowProps, hideBecausePaginated, hideBecauseStaggered, excludeSpace, onPress, loadingLabel, badge, disabled, iconEnd, iconStart, variantTheme, selected, keyboardControlsDescription, children, props, ref2 }) {
    return (_jsx(ProgressWithHandler, { ariaLabel: loadingLabel ?? "Please wait while the operation completes.", asyncHandler: onPress ?? null, capture: returnUndefined, tagProgressIndicator: "span", render: progressInfo => {
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
                    excludeSpace,
                    onPressSync: progressInfo.asyncHandlerReturn.syncHandler
                },
                refElementReturn
            });
            const show = !hideBecauseStaggered;
            const { propsProgressIndicator, propsProgressRegion } = progressInfo;
            const loadingJsx = (_jsx(Fade, { show: progressInfo.asyncHandlerReturn.pending, exitVisibility: "removed", children: _jsx("span", { class: "spinner-border spinner-border-sm text-secondary", ...propsProgressIndicator }) }));
            //const buttonClass = clsx(`btn position-relative`, variantDropdown && "dropdown-toggle", variantDropdown == "split" && "dropdown-toggle-split", variantSize && `btn-${variantSize}`, `btn${variantFill == "outline" ? "-outline" : ""}-${variantTheme || "primary"}`, pending && "pending", pressed && "pressed", disabled && "disabled", buttonInfo.pressReturn.pseudoActive && "active");
            const finalPropsForText = useMergedProps(p1, p2);
            const finalPropsForDiv = useMergedProps(infoRowProps, { ...props, ref: ref2 }, {
                className: clsx(hideBecausePaginated ? "d-none" : "", `gridlist-item`, variantTheme && `list-group-item-${variantTheme}`, hideBecausePaginated ? "d-none" : "", !show && "gridlist-item-placeholder", "list-group-item list-group-item-action", !!iconStart && "list-group-item-with-icon-start", !!iconEnd && "list-group-item-with-icon-end", !!badge && "list-group-item-with-badge", !!progressInfo.asyncHandlerReturn.pending && "list-group-item-with-pending", disabled && "disabled", (selected) && `active`)
            });
            const c = _jsxs(_Fragment, { children: [_jsx(ListItemStartEnd, { index: 0, hidden: iconStart == null, children: iconStart }), _jsxs(ListItemText, { onPress: progressInfo.asyncHandlerReturn.syncHandler, ...finalPropsForText, children: [children, _jsxs("span", { class: "list-group-item-badge-and-spinner", children: [_jsx("div", { children: badge }), _jsx("div", { children: loadingJsx })] })] }), _jsx(ListItemStartEnd, { index: 2, hidden: iconEnd == null, children: iconEnd })] });
            const typeaheadStatus = useContext(TypeaheadStatus);
            if (!show)
                if (hideBecausePaginated)
                    return null;
                else
                    return _jsx("div", { "aria-busy": "true", class: "gridlist-item gridlist-item-placeholder", children: _jsx("span", { class: clsx(!show ? "opacity-100" : "opacity-0", "placeholder-glow"), children: _jsx("span", { class: "placeholder w-100" }) }) });
            return (_jsx(KeyboardAssistIcon, { leftRight: (!!iconStart || !!iconEnd), upDown: true, homeEnd: true, pageKeys: true, typeaheadStatus: typeaheadStatus, activateSpace: typeaheadStatus == 'none', activateEnter: true, description: keyboardControlsDescription ?? "Select a list item:", children: _jsx("div", { "aria-busy": (!show), ...finalPropsForDiv, children: show && c }) }));
        } }));
}));
export const ListItem = memo(forwardElementRef(monitored(function ListItem({ index, keyboardControlsDescription, variantTheme, children, selected, disabled, iconEnd, iconStart, badge, onPress, loadingLabel, onSelectedChange, ...props }, ref) {
    const defaultDisabled = useContext(DefaultDisabled);
    disabled ||= defaultDisabled;
    //let everShownPaginated = useRef(false);
    return (_jsx(GridlistRow, { index: index, singleSelectionDisabled: disabled, noTypeahead: true, getText: useCallback((e) => { return e?.querySelector(".gridlist-item-text")?.textContent || ""; }, []), render: infoRow => {
            const p2 = (props);
            const p3 = useMergedProps(infoRow.props, props);
            if (infoRow.paginatedChildReturn.hideBecausePaginated)
                return _createElement("div", { ...p3, key: "hide-because-paginated" });
            // TODO: Get a better placeholder system
            if (infoRow.hidden)
                return _createElement("div", { ...p3, key: "hide-because-staggered", class: `gridlist-item gridlist-item-placeholder list-group-item`, role: "option", "aria-busy": "true" }); // Besides being a placeholder visually, this is orders of magnitude faster than null, for some reason?
            return _jsx(ListItemNonPaginated, { keyboardControlsDescription: keyboardControlsDescription, infoRowProps: infoRow.props, excludeSpace: infoRow.pressParameters.excludeSpace, onPressSync: infoRow.pressParameters.onPressSync, hideBecausePaginated: false, hideBecauseStaggered: false, loadingLabel: loadingLabel, onPress: onPress, badge: badge, children: children, disabled: disabled, iconEnd: iconEnd, iconStart: iconStart, selected: selected, variantTheme: variantTheme, props: p2, ref2: ref }, "show");
        } }));
})));
const ListItemText = memo(forwardElementRef(monitored(function ListItemText({ onPress, children, ...props }, ref) {
    return (_jsx(GridlistChild, { index: 1, onPressSync: onPress, render: infoCell => {
            return (_jsx("div", { ...useMergedProps(infoCell.propsCell, infoCell.propsPress, infoCell.propsTabbable, props, { ref }, { class: clsx("gridlist-item-text") }), children: children }));
        } }));
})));
const ListItemStartEnd = memo(monitored(function ListItemStartEnd({ hidden, index, children }) {
    return (_jsx(GridlistChild, { index: index, untabbable: hidden, focusSelf: useStableCallback(e => {
            e.focus();
        }), render: infoCell => {
            const ret = (_jsx("div", { class: clsx("list-group-item-icon", `list-group-item-icon-${index === 0 ? "start" : "end"}`), children: useClonedElement(children, useMergedProps(infoCell.propsCell, infoCell.propsTabbable), undefined) }));
            if (hidden)
                return _jsx(_Fragment, { children: null });
            else
                return ret;
        } }));
}));
//# sourceMappingURL=index.js.map