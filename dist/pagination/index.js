import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "preact/jsx-runtime";
import { Toolbar, ToolbarChild } from "preact-aria-widgets";
import { EventDetail, useMergedProps, usePress, useRefElement, useStableCallback, useStableGetter, useState } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useCallback, useEffect, useRef } from "preact/hooks";
import { BootstrapIcon } from "../icon/index.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
export function Pagination({ childCount, windowSize, onChange, labelPosition, label }) {
    labelPosition ??= "before";
    const [page, setPage] = useState(0);
    useEffect(() => {
        const start = ((page + 0) * windowSize);
        const end = ((page + 1) * windowSize);
        onChange?.(start, end);
        return () => onChange(null, null);
    }, [page, windowSize]);
    return (_jsx(Toolbar, { ariaLabel: labelPosition == "hidden" ? label : null, ariaPropName: "aria-current-page", selectionMode: "activation", selectedIndex: page, onSelectedIndexChange: useStableCallback((event) => { setPage(event[EventDetail].selectedIndex || 0); }, []), orientation: "horizontal", render: info => {
            const labelJsx = _jsx("label", { ...info.propsLabel, children: label });
            return (_jsxs(_Fragment, { children: [labelPosition == "before" && labelJsx, _jsx("nav", { "aria-label": labelPosition == 'hidden' ? label : undefined, children: _jsx("ul", { ...useMergedProps(info.propsToolbar, { class: "pagination" }), children: _jsx(PaginationChildren, { childCount: childCount, windowSize: windowSize }) }) }), labelPosition == "after" && labelJsx] }));
        } }));
}
const PaginationChildren = memo(({ childCount, windowSize }) => {
    const firstIndex = 0;
    const lastIndex = Math.ceil((childCount + 0.000001) / windowSize - 1) - 1;
    const firstRef = useRef(null);
    const lastRef = useRef(null);
    const centerFirstRef = useRef(null);
    const centerLastRef = useRef(null);
    return (_jsxs(_Fragment, { children: [_jsx(PaginationButtonFirst, { index: firstIndex, onFocus: useCallback(() => { centerFirstRef.current?.scrollIntoView({ behavior: "smooth" }); }, []) }), _jsx("span", { class: "pagination-center scroll-shadows scroll-shadows-x", children: Array.from(function* () {
                    for (let page = 1; page < lastIndex - 1; ++page) {
                        const start = ((page + 0) * windowSize);
                        const end = ((page + 1) * windowSize);
                        yield _jsx(PaginationButton, { index: page, ref: page == 1 ? centerFirstRef : page == (lastIndex - 1 - 1) ? centerLastRef : undefined, children: page + 1 }, `${start}-${end}`);
                    }
                }()) }), _jsx(PaginationButtonLast, { index: lastIndex, onFocus: useCallback(() => { centerLastRef.current?.scrollIntoView({ behavior: "smooth" }); }, []) })] }));
});
const PaginationButtonFirst = memo(forwardElementRef(({ index, onFocus }, ref) => {
    return (_jsxs(PaginationButton, { index: index, onFocus: onFocus, ref: ref, children: [_jsx(BootstrapIcon, { icon: "chevron-bar-left", label: null }), " First"] }));
}));
const PaginationButtonLast = memo(forwardElementRef(({ index, onFocus }, ref) => {
    return (_jsxs(PaginationButton, { index: index, onFocus: onFocus, ref: ref, children: ["Last ", _jsx(BootstrapIcon, { icon: "chevron-bar-right", label: null })] }));
}));
const PaginationButton = memo(forwardElementRef(function PaginationButton({ index, children, onFocus }, ref) {
    return (_jsx(ToolbarChild, { index: index, disabledProp: "disabled", getSortValue: useStableGetter(index), render: info => {
            const { refElementReturn, propsStable } = useRefElement({ refElementParameters: {} });
            const { pressReturn, props: propsPress } = usePress({
                pressParameters: {
                    ...info.pressParameters,
                    allowRepeatPresses: false,
                    excludeEnter: null,
                    excludePointer: null,
                    longPressThreshold: null,
                    onPressingChange: null,
                    focusSelf: useCallback((e) => { e.focus(); }, [])
                }, refElementReturn
            });
            return (_jsx("li", { class: "page-item", children: _jsx("button", { ...useMergedProps(info.propsChild, info.propsTabbable, propsStable, propsPress, { class: "page-link", ref, onfocusin: onFocus || undefined }, {}), children: children }) }));
        } }));
}));
export const Paginated = memo(function Paginated({ childCount, setPaginationEnd, setPaginationStart, paginationLabel, paginationLocation, paginationSize, children }) {
    const paginationJsx = _jsx(Pagination, { windowSize: paginationSize || 500, labelPosition: "hidden", label: paginationLabel, childCount: childCount, onChange: (start, end) => {
            setPaginationStart(start);
            setPaginationEnd(end);
        } });
    return (_jsxs(_Fragment, { children: [paginationSize && paginationLocation == "before" && paginationJsx, children, paginationSize && paginationLocation == "after" && paginationJsx] }));
});
//# sourceMappingURL=index.js.map