import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { useMergedProps, useState, useTimeout } from "preact-prop-helpers";
import { SlideZoomFade, Swappable } from "preact-transition";
import { memo } from "preact/compat";
import { memoForwardRef } from "../utility/forward-element-ref.js";
import { KeyboardAssistIcon } from "../utility/keyboard-assist.js";
export const StructureTabPanel = memoForwardRef(function StructureTabPanel({ orientation, visibleOffset, visible, children, ...props }, ref) {
    // Get the names of the properties on the transition that are correct for the `orientation` the parent uses.
    // (i.e. if make the transition slide on the X axis for "horizontal" and the Y axis for "vertical")
    const zeroValued = (orientation == "horizontal" ? "slideTargetBlock" : "slideTargetInline");
    const offsetted = (orientation == "horizontal" ? "slideTargetInline" : "slideTargetBlock");
    const originZero = (orientation == "horizontal" ? "zoomOriginBlock" : "zoomOriginInline");
    const originOffset = (orientation == "horizontal" ? "zoomOriginInline" : "zoomOriginBlock");
    const transitionProps = {
        [zeroValued]: 0,
        [offsetted]: Math.sign(visibleOffset ?? 0) * (1 / 24),
        [originZero]: 0,
        [originOffset]: 0.5
    };
    // IMPORTANT: exitVisibility is "removed" instead of "hidden"
    // because "hidden" can still cause a lot of layout stuff to happen on hidden tabs,
    // which is bad if one tab is heavier than others -- it'll still affect them even when closed.
    return (_jsx(SlideZoomFade, { exitVisibility: "removed", delayMountUntilShown: true, duration: 500, show: visible, zoomMin: (11 / 12), ...transitionProps, children: _jsx("div", { ...useMergedProps({ className: clsx("tab-panel scroll-shadows scroll-shadows-y") }, { ...props, ref }), children: _jsx(TabPanelChildren, { visible: visible, children: children }) }) }));
});
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
export const StructureTabList = memoForwardRef(function StructureTabList({ orientation, typeaheadStatus, labelPosition, childrenLabel: labelJsx, children: tabs, ...props }, ref) {
    let typeaheadActive = (typeaheadStatus && typeaheadStatus != 'none');
    return (_jsxs(_Fragment, { children: [labelPosition == "before" && labelJsx, _jsx(KeyboardAssistIcon, { leftRight: orientation == "horizontal", upDown: orientation == "vertical", homeEnd: true, pageKeys: false, typeahead: true, typeaheadActive: typeaheadActive, children: _jsx("ul", { ...useMergedProps({ className: clsx(`nav nav-tabs`, `typeahead-status-${typeaheadStatus}`) }, { ...props, ref }), children: tabs }) }), labelPosition == "after" && labelJsx] }));
});
//# sourceMappingURL=structure.js.map