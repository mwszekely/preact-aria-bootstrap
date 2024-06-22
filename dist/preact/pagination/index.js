import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "preact/jsx-runtime";
import clsx from "clsx";
import { Toolbar, ToolbarChild } from "preact-aria-widgets";
import { EventDetail, memo, useCallback, useEffect, useMergedProps, usePress, useRef, useRefElement, useStableCallback, useState } from "preact-prop-helpers";
import { BootstrapIcon } from "../icon/index.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { KeyboardAssistIcon } from "../utility/keyboard-assist.js";
export function Pagination({ childCount, windowSize, onChange, labelPosition, label, keyboardControlsDescription }) {
    labelPosition ??= "before";
    const [page, setPage] = useState(0);
    useEffect(() => {
        const start = ((page + 0) * windowSize);
        const end = ((page + 1) * windowSize);
        onChange?.(start, end);
        return () => onChange(null, null);
    }, [page, windowSize]);
    if (labelPosition == 'hidden')
        console.assert(typeof label == "string", `<Pagination />: When labelPosition is 'hidden', the label must be a string (as opposed to arbitrary JSX)`);
    return (_jsx(Toolbar, { ariaLabel: labelPosition == "hidden" ? label : null, singleSelectionAriaPropName: "aria-current-page", singleSelectionMode: "activation", singleSelectedIndex: page, multiSelectionMode: "disabled", onSingleSelectedIndexChange: useStableCallback((event) => { setPage(event[EventDetail].selectedIndex || 0); }, []), orientation: "horizontal", render: info => {
            const labelJsx = _jsx("label", { ...info.propsLabel, children: label });
            return (_jsxs(_Fragment, { children: [labelPosition == "before" && labelJsx, _jsx(KeyboardAssistIcon, { leftRight: true, upDown: false, homeEnd: true, pageKeys: true, typeaheadStatus: 'none', activateSpace: true, activateEnter: true, description: keyboardControlsDescription ?? "Select a page:", children: _jsx("nav", { "aria-label": labelPosition == 'hidden' ? label : undefined, children: _jsx("ul", { ...useMergedProps(info.propsToolbar, { class: "pagination" }), children: _jsx(PaginationChildren, { childCount: childCount, windowSize: windowSize }) }) }) }), labelPosition == "after" && labelJsx] }));
        } }));
}
const PaginationChildren = /* @__PURE__ */ memo(({ childCount, windowSize }) => {
    const firstIndex = 0;
    const lastIndex = Math.ceil((childCount) / windowSize) - 1; // INCLUSIVE! Not exclusive as usual for ending points.
    const firstRef = useRef(null);
    const lastRef = useRef(null);
    const centerFirstRef = useRef(null);
    const centerLastRef = useRef(null);
    const onFocusFirst = useCallback(() => { centerFirstRef.current?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" }); }, []);
    const onFocusLast = useCallback(() => { centerLastRef.current?.scrollIntoView({ behavior: "smooth", inline: "end", block: "nearest" }); }, []);
    return (_jsxs(_Fragment, { children: [_jsx(PaginationButtonFirst, { index: firstIndex, onFocus: onFocusFirst }), _jsxs("span", { className: "pagination-center scroll-shadows scroll-shadows-x", children: [_jsx(PaginationButton, { index: firstIndex + 1, ref: centerFirstRef, children: firstIndex + 1 + 1 }, `first`), Array.from(function* () {
                        for (let page = firstIndex + 2; page <= lastIndex - 2; ++page) {
                            const start = ((page + 0) * windowSize);
                            const end = ((page + 1) * windowSize);
                            yield _jsx(PaginationButton, { index: page, children: page + 1 }, `${start}-${end}`);
                        }
                    }()), _jsx(PaginationButton, { index: lastIndex - 1, ref: centerLastRef, children: lastIndex - 1 + 1 }, `last`)] }), _jsx(PaginationButtonLast, { index: lastIndex, onFocus: onFocusLast })] }));
});
const PaginationButtonFirst = /* @__PURE__ */ memo(forwardElementRef(({ index, onFocus }, ref) => {
    return (_jsxs(PaginationButton, { index: index, onFocus: onFocus, ref: ref, children: [_jsx(BootstrapIcon, { icon: "chevron-bar-left", label: null }), " ", index + 1] }));
}));
const PaginationButtonLast = /* @__PURE__ */ memo(forwardElementRef(({ index, onFocus }, ref) => {
    return (_jsxs(PaginationButton, { index: index, onFocus: onFocus, ref: ref, children: [index + 1, " ", _jsx(BootstrapIcon, { icon: "chevron-bar-right", label: null })] }));
}));
const PaginationButton = /* @__PURE__ */ memo(forwardElementRef(function PaginationButton({ index, children, onFocus }, ref) {
    return (_jsx(ToolbarChild, { index: index, disabledProp: "disabled", render: info => {
            const { refElementReturn, propsStable } = useRefElement({ refElementParameters: {} });
            const focusSelf = useCallback((e) => { e.focus(); }, []);
            const { pressReturn, props: propsPress } = usePress({
                pressParameters: {
                    ...info.pressParameters,
                    allowRepeatPresses: false,
                    excludeEnter: null,
                    excludePointer: null,
                    longPressThreshold: null,
                    onPressingChange: null,
                    focusSelf
                },
                refElementReturn
            });
            // @ts-expect-error onfocusin is correct, not onFocusIn
            const p = useMergedProps(info.propsChild, info.propsTabbable, propsStable, propsPress, { class: "page-link", ref, onfocusin: onFocus || undefined });
            return (_jsx("li", { className: clsx("page-item", info.singleSelectionChildReturn.singleSelected && "active"), children: _jsx("button", { ...p, children: children }) }));
        } }));
}));
export const Paginated = /* @__PURE__ */ memo(function Paginated({ childCount, setPaginationEnd, setPaginationStart, paginationLabel, paginationLocation, paginationSize, children }) {
    const paginationJsx = _jsx(Pagination, { windowSize: paginationSize || 500, labelPosition: "hidden", label: paginationLabel, childCount: childCount, onChange: (start, end) => {
            setPaginationStart(start);
            setPaginationEnd(end);
        } });
    return (_jsxs(_Fragment, { children: [paginationSize && paginationLocation == "before" && paginationJsx, children, paginationSize && paginationLocation == "after" && paginationJsx] }));
});
//# sourceMappingURL=index.js.map