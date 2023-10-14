import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { clsx } from "clsx";
import { createContext } from "preact";
import { Tab as AriaTab, TabPanel as AriaTabPanel, Tabs as AriaTabs } from "preact-aria-widgets";
import { useMergedProps } from "preact-prop-helpers";
import { memo, useContext } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { StructureTabList, StructureTabPanel, StructureTabPanelsContainer, StructureTabs } from "./structure.js";
const OrientationContext = createContext("horizontal");
export const Tabs = memo(forwardElementRef(function Tabs({ keyboardControlsDescription, orientation, label, localStorageKey, labelPosition, panels, tabs, propsPanelsContainer, propsTabsContainer, ...props }, ref) {
    orientation ??= "horizontal";
    labelPosition ??= "before";
    return (_jsx(OrientationContext.Provider, { value: orientation, children: _jsx(AriaTabs, { localStorageKey: localStorageKey, orientation: orientation, ariaLabel: labelPosition == "hidden" ? label : null, pageNavigationSize: 0, render: info => {
                const labelJsx = _jsx("label", { ...info.propsLabel, children: label });
                return (_jsxs(StructureTabs, { orientation: orientation, ref: ref, ...props, children: [_jsx(StructureTabList, { ...info.propsContainer, childrenLabel: labelJsx, labelPosition: labelPosition, typeaheadStatus: info.typeaheadNavigationReturn.typeaheadStatus, orientation: orientation, keyboardControlsDescription: keyboardControlsDescription ?? "Move to a tab:", children: tabs }), _jsx(StructureTabPanelsContainer, { children: panels })] }));
            } }) }));
}));
export const Tab = memo(forwardElementRef(function Tab({ index, children, ...props }, ref) {
    return (_jsx(AriaTab, { index: index, render: info => {
            return (_jsx("li", { ...useMergedProps(props, { ref, className: `nav-item` }), children: _jsx("span", { ...useMergedProps(info.props, { className: clsx(`nav-link`, info.singleSelectionChildReturn.singleSelected && "active") }), children: children }) }));
        } }));
}));
export const TabPanel = memo(forwardElementRef(function TabPanel({ index, ...props }, ref) {
    const orientation = useContext(OrientationContext);
    return (_jsx(AriaTabPanel, { index: index, render: info => {
            return (_jsx(StructureTabPanel, { ref: ref, visible: info.tabPanelReturn.visible, visibleOffset: info.tabPanelReturn.visibleOffset || 0, orientation: orientation, ...useMergedProps(info.props, props) }));
        } }));
}));
//# sourceMappingURL=index.js.map