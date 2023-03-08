import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { Tab as AriaTab, TabPanel as AriaTabPanel, Tabs as AriaTabs } from "preact-aria-widgets";
import { returnZero, useMergedProps, useState, useTimeout } from "preact-prop-helpers";
import { SlideZoomFade, Swappable } from "preact-transition";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { KeyboardAssistIcon } from "../utility/keyboard-assist.js";
export const Tabs = memo(forwardElementRef(function Tabs({ orientation, label, localStorageKey, labelPosition, panels, tabs, propsPanelsContainer, propsTabsContainer, ...props }, ref) {
    return (_jsx(AriaTabs, { localStorageKey: localStorageKey, orientation: orientation ?? "horizontal", ariaLabel: labelPosition == "hidden" ? label : null, pageNavigationSize: 0, render: info => {
            const labelJsx = _jsx("label", { ...info.propsLabel, children: label });
            return (_jsxs("div", { ...useMergedProps({ class: clsx("tabs-container", orientation == "vertical" && "tabs-container-vertical") }, { ...props, ref }), children: [labelPosition == "before" && labelJsx, _jsx(KeyboardAssistIcon, { leftRight: orientation == "horizontal", upDown: orientation == "vertical", homeEnd: true, pageKeys: false, typeahead: true, typeaheadActive: info.typeaheadNavigationReturn.typeaheadStatus != "none", children: _jsx("ul", { ...useMergedProps(info.propsContainer, propsTabsContainer ?? {}, { className: clsx(`nav nav-tabs`, `typeahead-status-${info.typeaheadNavigationReturn.typeaheadStatus}`) }), children: tabs }) }), labelPosition == "before" && labelJsx, _jsx(Swappable, { children: _jsx("div", { ...useMergedProps({ class: "tab-panels-container" }, propsPanelsContainer ?? {}), children: panels }) })] }));
        } }));
}));
export const Tab = memo(forwardElementRef(function Tab({ index, getSortValue, children, ...props }, ref) {
    return (_jsx(AriaTab, { index: index, getSortValue: getSortValue || returnZero, render: info => {
            return (_jsx("li", { ...useMergedProps(props, { ref, className: `nav-item` }), children: _jsx("span", { ...useMergedProps(info.props, { className: clsx(`nav-link`, info.singleSelectionChildReturn.selected && "active") }), children: children }) }));
        } }));
}));
export const TabPanel = memo(forwardElementRef(function TabPanel({ index, children, ...props }, ref) {
    return (_jsx(AriaTabPanel, { index: index, render: info => {
            // IMPORTANT: exitVisibility is "removed" instead of "hidden"
            // because "hidden" can still cause a lot of layout stuff to happen on hidden tabs,
            // which is bad if one tab is heavier than others -- it'll still affect them even when closed.
            return (_jsx(SlideZoomFade, { ...{ "data-index": index }, exitVisibility: "removed", delayMountUntilShown: true, duration: 500, show: info.tabPanelReturn.visible, slideTargetBlock: 0, slideTargetInline: Math.sign(info.tabPanelReturn.visibleOffset ?? 0) * (1 / 24), zoomMin: (11 / 12), zoomOriginBlock: 0, zoomOriginInline: 0.5, children: _jsx("div", { ...useMergedProps(info.props, props, { ref, className: clsx("tab-panel scroll-shadows scroll-shadows-y") }), children: _jsx(TabPanelChildren, { visible: info.tabPanelReturn.visible || false, children: children }) }) }));
        } }));
}));
const TabPanelChildren = memo(function TabPanelChildren({ children, visible }) {
    // It's more than likely that any given panel's children will be heavy to render,
    // but we *really* don't want that to block the transition animation
    // so we wait until just slightly after the transition starts to actually mount the children.
    const [delayedVisible, setDelayedVisible] = useState(false);
    useTimeout({
        callback: () => setDelayedVisible(true),
        timeout: 10,
        triggerIndex: visible,
    });
    return _jsx(_Fragment, { children: delayedVisible && children });
});
//# sourceMappingURL=index.js.map