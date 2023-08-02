import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { createContext } from "preact";
import { Tab as AriaTab, TabPanel as AriaTabPanel, Tabs as AriaTabs } from "preact-aria-widgets";
import { returnZero, useMergedProps, useState, useTimeout } from "preact-prop-helpers";
import { SlideZoomFade, Swappable } from "preact-transition";
import { memo, useContext } from "preact/compat";
import { forwardElementRef, memoForwardRef } from "../utility/forward-element-ref.js";
import { KeyboardAssistIcon } from "../utility/keyboard-assist.js";
const OrientationContext = createContext("horizontal");
export const Tabs = memo(forwardElementRef(function Tabs({ orientation, label, localStorageKey, labelPosition, panels, tabs, propsPanelsContainer, propsTabsContainer, ...props }, ref) {
    orientation ??= "horizontal";
    labelPosition ??= "before";
    return (_jsx(OrientationContext.Provider, { value: orientation, children: _jsx(AriaTabs, { localStorageKey: localStorageKey, orientation: orientation, ariaLabel: labelPosition == "hidden" ? label : null, pageNavigationSize: 0, render: info => {
                const labelJsx = _jsx("label", { ...info.propsLabel, children: label });
                return (_jsxs("div", { ...useMergedProps({ class: clsx("tabs-container", orientation == "vertical" && "tabs-container-vertical") }, { ...props, ref }), children: [labelPosition == "before" && labelJsx, _jsx(KeyboardAssistIcon, { leftRight: orientation == "horizontal", upDown: orientation == "vertical", homeEnd: true, pageKeys: false, typeahead: true, typeaheadActive: info.typeaheadNavigationReturn.typeaheadStatus != "none", children: _jsx("ul", { ...useMergedProps(info.propsContainer, propsTabsContainer ?? {}, { className: clsx(`nav nav-tabs`, `typeahead-status-${info.typeaheadNavigationReturn.typeaheadStatus}`) }), children: tabs }) }), labelPosition == "after" && labelJsx, _jsx(Swappable, { children: _jsx("div", { ...useMergedProps({ class: "tab-panels-container" }, propsPanelsContainer ?? {}), children: panels }) })] }));
            } }) }));
}));
export const Tab = memo(forwardElementRef(function Tab({ index, getSortValue, children, ...props }, ref) {
    return (_jsx(AriaTab, { index: index, getSortValue: getSortValue || returnZero, render: info => {
            return (_jsx("li", { ...useMergedProps(props, { ref, className: `nav-item` }), children: _jsx("span", { ...useMergedProps(info.props, { className: clsx(`nav-link`, info.singleSelectionChildReturn.selected && "active") }), children: children }) }));
        } }));
}));
export const TabPanel = memo(forwardElementRef(function TabPanel({ index, children, ...props }, ref) {
    const orientation = useContext(OrientationContext);
    // Get the names of the properties on the transition that are correct for the `orientation` the parent uses.
    // (i.e. if make the transition slide on the X axis for "horizontal" and the Y axis for "vertical")
    const zeroValued = (orientation == "horizontal" ? "slideTargetBlock" : "slideTargetInline");
    const offsetted = (orientation == "horizontal" ? "slideTargetInline" : "slideTargetBlock");
    const originZero = (orientation == "horizontal" ? "zoomOriginBlock" : "zoomOriginInline");
    const originOffset = (orientation == "horizontal" ? "zoomOriginInline" : "zoomOriginBlock");
    return (_jsx(AriaTabPanel, { index: index, render: info => {
            // These use the 
            const transitionProps = {
                [zeroValued]: 0,
                [offsetted]: Math.sign(info.tabPanelReturn.visibleOffset ?? 0) * (1 / 24),
                [originZero]: 0,
                [originOffset]: 0.5
            };
            // IMPORTANT: exitVisibility is "removed" instead of "hidden"
            // because "hidden" can still cause a lot of layout stuff to happen on hidden tabs,
            // which is bad if one tab is heavier than others -- it'll still affect them even when closed.
            return (_jsx(SlideZoomFade, { ...{ "data-index": index }, exitVisibility: "removed", delayMountUntilShown: true, duration: 500, show: info.tabPanelReturn.visible, zoomMin: (11 / 12), ...transitionProps, children: _jsx("div", { ...useMergedProps(info.props, props, { ref, className: clsx("tab-panel scroll-shadows scroll-shadows-y") }), children: _jsx(TabPanelChildren, { visible: info.tabPanelReturn.visible || false, children: children }) }) }));
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
export const StructureTabs = memoForwardRef(function StructureTabs({ orientation, children, ...props }, ref) {
    return (_jsx("div", { ...useMergedProps({ class: clsx("tabs-container", orientation == "vertical" && "tabs-container-vertical") }, { ...props, ref }), children: children }));
});
export const StructureTabPanelsContainer = memoForwardRef(function StructureTabPanelsContainer({ orientation, children: panels, ...props }, ref) {
    return (_jsx(Swappable, { children: _jsx("div", { ...useMergedProps({ class: "tab-panels-container" }, { ...props, ref }), children: panels }) }));
});
export const StructureTabList = memoForwardRef(function StructureTabList({ orientation, typeaheadActive, labelPosition, childrenLabel: labelJsx, children: tabs, ...props }, ref) {
    return (_jsxs(_Fragment, { children: [labelPosition == "before" && labelJsx, _jsx(KeyboardAssistIcon, { leftRight: orientation == "horizontal", upDown: orientation == "vertical", homeEnd: true, pageKeys: false, typeahead: true, typeaheadActive: typeaheadActive, children: _jsx("ul", { ...useMergedProps({ className: clsx(`nav nav-tabs`) }, { ...props, ref }), children: tabs }) }), labelPosition == "after" && labelJsx] }));
});
//# sourceMappingURL=index.js.map