import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { createContext } from "preact";
import { generateRandomId, useGlobalHandler, useHasCurrentFocus, useMergedProps, usePersistentState, useRefElement, useState } from "preact-prop-helpers";
import { CollapseFade, SlideZoomFade } from "preact-transition";
import { memo } from "preact/compat";
import { useContext, useEffect, useLayoutEffect, useRef } from "preact/hooks";
import { forwardElementRef } from "./forward-element-ref.js";
import { useClonedElement } from "./use-cloned-element.js";
const Both = [false, true];
const KeyboardAssistContext = createContext(null);
export const KeyboardAssistIcon = forwardElementRef(function KeyboardAssistIcon({ leftRight, upDown, homeEnd, pageKeys, typeahead, children, typeaheadActive, leaveF2, textF10, ...props }, ref) {
    const { id: figureDescriptionId, addHomeEnd, addLeftRight, addPageKeys, addTypeahead, addUpDown, addLeaveF2, addTextF10, removeHomeEnd, removeLeftRight, removePageKeys, removeLeaveF2, removeTextF10, removeTypeahead, removeUpDown, setHasStartedTypeahead } = useContext(KeyboardAssistContext);
    const [randomId] = useState(() => generateRandomId());
    const [focusedInner, setFocusedInner] = useState(false);
    const { refElementReturn } = useRefElement({ refElementParameters: {} });
    const { hasCurrentFocusReturn } = useHasCurrentFocus({ hasCurrentFocusParameters: { onCurrentFocusedChanged: null, onCurrentFocusedInnerChanged: setFocusedInner }, refElementReturn });
    leftRight &&= focusedInner;
    upDown &&= focusedInner;
    homeEnd &&= focusedInner;
    pageKeys &&= focusedInner;
    typeahead &&= focusedInner;
    leaveF2 &&= focusedInner;
    textF10 &&= focusedInner;
    useEffect(() => {
        if (typeaheadActive)
            setHasStartedTypeahead();
    }, [typeaheadActive]);
    useEffect(() => {
        if (leftRight) {
            addLeftRight(randomId);
            return () => removeLeftRight(randomId);
        }
    }, [leftRight]);
    useEffect(() => {
        if (upDown) {
            addUpDown(randomId);
            return () => removeUpDown(randomId);
        }
    }, [upDown]);
    useEffect(() => {
        if (pageKeys) {
            addPageKeys(randomId);
            return () => removePageKeys(randomId);
        }
    }, [pageKeys]);
    useEffect(() => {
        if (homeEnd) {
            addHomeEnd(randomId);
            return () => removeHomeEnd(randomId);
        }
    }, [homeEnd]);
    useEffect(() => {
        if (typeahead) {
            addTypeahead(randomId);
            return () => removeTypeahead(randomId);
        }
    }, [typeahead]);
    useEffect(() => {
        if (focusedInner && leaveF2) {
            addLeaveF2(randomId);
            return () => removeLeaveF2(randomId);
        }
    }, [focusedInner]);
    useEffect(() => {
        if (focusedInner && textF10) {
            addTextF10(randomId);
            return () => removeTextF10(randomId);
        }
    }, [focusedInner]);
    return (_jsx(_Fragment, { children: useClonedElement(children, useMergedProps(refElementReturn.propsStable, hasCurrentFocusReturn.propsStable, props), ref) }));
});
export function KeyboardAssistProvider({ children }) {
    const [id] = useState(() => generateRandomId("keyboard-assist-"));
    const [leftRight2, setLeftRight] = useState(false);
    const [upDown2, setUpDown] = useState(false);
    const [homeEnd2, setHomeEnd] = useState(false);
    const [pageKeys2, setPageKeys] = useState(false);
    const [typeahead2, setTypeahead] = useState(false);
    const [leaveF22, setLeaveF2] = useState(false);
    const [textF102, setTextF10] = useState(false);
    const [leftRightDisplay, setLeftRightDisplay] = useState(false);
    const [upDownDisplay, setUpDownDisplay] = useState(false);
    const [homeEndDisplay, setHomeEndDisplay] = useState(false);
    const [pageKeysDisplay, setPageKeysDisplay] = useState(false);
    const [typeaheadDisplay, setTypeaheadDisplay] = useState(false);
    const [leaveF2Display, setLeaveF2Display] = useState(false);
    const [textF10Display, setTextF10Display] = useState(false);
    const leftRightSet = useRef(new Set());
    const upDownSet = useRef(new Set());
    const homeEndSet = useRef(new Set());
    const pageKeysSet = useRef(new Set());
    const typeaheadSet = useRef(new Set());
    const leaveF2Set = useRef(new Set());
    const textF10Set = useRef(new Set());
    const visible = (leftRight2 || upDown2 || homeEnd2 || pageKeys2 || typeahead2);
    useLayoutEffect(() => {
        const visible = (leftRight2 || upDown2 || homeEnd2 || pageKeys2 || typeahead2);
        if (visible) {
            setLeftRightDisplay(leftRight2);
            setUpDownDisplay(upDown2);
            setHomeEndDisplay(homeEnd2);
            setPageKeysDisplay(pageKeys2);
            setTypeaheadDisplay(typeahead2);
            setLeaveF2Display(leaveF22);
            setTextF10Display(textF102);
        }
    }, [leftRight2, upDown2, homeEnd2, pageKeys2, typeahead2, leaveF22, textF102]);
    // TODO: Mutation during render, but this is kinda intentional?
    /*if (visible) {
        lastVisibleSet.current.leftRight = leftRight;
        lastVisibleSet.current.upDown = upDown;
        lastVisibleSet.current.homeEnd = homeEnd;
        lastVisibleSet.current.pageKeys = pageKeys;
        lastVisibleSet.current.typeahead = typeahead;
    }*/
    const context = useRef({
        addHomeEnd: (id) => { homeEndSet.current.add(id); setHomeEnd(homeEndSet.current.size > 0); },
        addLeftRight: (id) => { leftRightSet.current.add(id); setLeftRight(leftRightSet.current.size > 0); },
        addPageKeys: (id) => { pageKeysSet.current.add(id); setPageKeys(pageKeysSet.current.size > 0); },
        addTypeahead: (id) => { typeaheadSet.current.add(id); setTypeahead(typeaheadSet.current.size > 0); },
        addUpDown: (id) => { upDownSet.current.add(id); setUpDown(upDownSet.current.size > 0); },
        addLeaveF2: (id) => { leaveF2Set.current.add(id); setLeaveF2(leaveF2Set.current.size > 0); },
        addTextF10: (id) => { textF10Set.current.add(id); setTextF10(textF10Set.current.size > 0); },
        removeHomeEnd: (id) => { homeEndSet.current.delete(id); setHomeEnd(homeEndSet.current.size > 0); },
        removeLeftRight: (id) => { leftRightSet.current.delete(id); setLeftRight(leftRightSet.current.size > 0); },
        removePageKeys: (id) => { pageKeysSet.current.delete(id); setPageKeys(pageKeysSet.current.size > 0); },
        removeTypeahead: (id) => { typeaheadSet.current.delete(id); setTypeahead(typeaheadSet.current.size > 0); },
        removeLeaveF2: (id) => { leaveF2Set.current.delete(id); setLeaveF2(leaveF2Set.current.size > 0); },
        removeTextF10: (id) => { textF10Set.current.delete(id); setTextF10(textF10Set.current.size > 0); },
        removeUpDown: (id) => { upDownSet.current.delete(id); setUpDown(upDownSet.current.size > 0); },
        setHasStartedTypeahead: () => setHeardTab(true),
        id: id
    });
    const [heardTab, setHeardTab] = useState(false);
    const stateKey = `keyboard-assist-lr_${leftRightDisplay.toString()}-ud_${upDownDisplay.toString()}-pg_${pageKeysDisplay.toString()}-he_${homeEndDisplay.toString()}-tp_${typeaheadDisplay.toString()}-tp_${leaveF22.toString()}-tp_${textF102.toString()}`;
    const [userHasHidden, setUserHasHidden, getUserHasHidden] = usePersistentState(stateKey, false);
    const [userHasHiddenAny, setUserHasHiddenAny] = usePersistentState("keyboard-assist-hidden-any", false);
    useGlobalHandler(document, "keydown", event => {
        if (event.key == "Tab") {
            setHeardTab(true);
        }
        if (visible) {
            if (event.key == "F7") {
                if (event.shiftKey) {
                    event.preventDefault();
                    event.stopPropagation();
                    setUserHasHidden(false);
                    /*debugger;
    
                    for (const lr of Both) {
                        for (const ud of Both) {
                            for (const pg of Both) {
                                for (const he of Both) {
                                    for (const tp of Both) {
                                        const key = `keyboard-assist-lr_${lr}-ud_${ud}-pg_${pg}-he_${he}-tp_${tp}` as const;
                                        const value = getFromLocalStorage(key);
                                        if (value)
                                            storeToLocalStorage(`keyboard-assist-lr_${lr}-ud_${ud}-pg_${pg}-he_${he}-tp_${tp}`, false);
                                    }
                                }
                            }
                        }
                    }*/
                }
                else if (!getUserHasHidden()) {
                    event.preventDefault();
                    event.stopPropagation();
                    setUserHasHidden(true);
                    setUserHasHiddenAny(true);
                }
            }
        }
    }, { capture: true });
    return (_jsxs(KeyboardAssistContext.Provider, { value: context.current, children: [_jsx(KeyboardAssistIconDisplay, { id: id, heardTab: heardTab, userHasHidden: userHasHidden, homeEnd: homeEndDisplay, leftRight: leftRightDisplay, upDown: upDownDisplay, pageKeys: pageKeysDisplay, typeahead: typeaheadDisplay, visible: visible, leaveF2: leaveF2Display, textF10: textF10Display }), children] }));
}
function KeyboardAssistIconDisplay({ heardTab, userHasHidden, leftRight, upDown, homeEnd, pageKeys, leaveF2, textF10, typeahead, visible, id }) {
    const labelParts = [
        leftRight && upDown ? "the arrow keys" : leftRight ? "the left and right arrow keys" : upDown ? "the up and down arrow keys" : null,
        pageKeys ? "the Page Up and Down keys" : null,
        homeEnd ? "the Home and End keys" : null,
        typeahead ? "typing to search by name" : null,
    ].filter(t => t != null);
    let label = "";
    for (let i = 0; i < labelParts.length; ++i) {
        if (i > 0) {
            if (labelParts.length == 2)
                label += " or ";
            else if (labelParts.length > 2) {
                if (i == labelParts.length - 1)
                    label += ", or ";
                else
                    label += ", ";
            }
        }
        label += labelParts[i];
    }
    label = `Navigate using ${label}. Press F7 to hide these instructions. Press Shift+F7 to show them again once hidden.`;
    const show = (heardTab && !userHasHidden && visible);
    return (_jsxs(_Fragment, { children: [_jsx("div", { id: id, class: "visually-hidden", children: label }), _jsx(SlideZoomFade, { show: show, zoomMin: 0.875, zoomOriginInline: 1, zoomOriginBlock: 1, slideTargetBlock: 0.125, slideTargetInline: 0.125, children: _jsxs("div", { class: "keyboard-assist-icon-container", role: "figure", "aria-labelledby": id, children: [_jsx("div", { class: "keyboard-assist-instructions", children: "Keyboard controls available:" }), _jsx(KeyboardAssistIconArrowKeys, { leftRight: leftRight, upDown: upDown }), _jsx(KeyboardAssistIconHomeEnd, { enabled: homeEnd }), _jsx(KeyboardAssistIconPageKeys, { enabled: pageKeys }), _jsx(KeyboardAssistIconTypeahead, { enabled: typeahead }), _jsx(KeyboardAssistIconLeaveF2, { enabled: leaveF2 || false }), _jsx(KeyboardAssistIconRichTextF10, { enabled: textF10 || false }), _jsxs("div", { class: "keyboard-assist-dismiss-message", children: ["Press ", _jsx("kbd", { children: "F7" }), " to dismiss these instructions.", _jsx("br", {}), "To show again, press ", _jsx("kbd", { children: "Shift+F7" }), "."] })] }) })] }));
}
const KeyboardAssistIconArrowKeys = memo(function KeyboardAssistIconArrowKeys({ leftRight, upDown }) {
    return (_jsxs("div", { class: "keyboard-assist-arrow-keys", children: [_jsx(KeyboardAssistIconKey, { enabled: upDown, className: "keyboard-assist-key-arrow-up", children: "\u2191" }), _jsx(KeyboardAssistIconKey, { enabled: leftRight, className: "keyboard-assist-key-arrow-left", children: "\u2190" }), _jsx(KeyboardAssistIconKey, { enabled: upDown, className: "keyboard-assist-key-arrow-down", children: "\u2193" }), _jsx(KeyboardAssistIconKey, { enabled: leftRight, className: "keyboard-assist-key-arrow-right", children: "\u2192" })] }));
});
const KeyboardAssistIconPageKeys = memo(function KeyboardAssistIconPageKeys({ enabled }) {
    return (_jsxs("div", { class: "keyboard-assist-page-keys", children: [_jsx(KeyboardAssistIconKey, { enabled: enabled, className: "keyboard-assist-key-page-up", children: "Pg Up" }), _jsx(KeyboardAssistIconKey, { enabled: enabled, className: "keyboard-assist-key-page-down", children: "Pg Dn" })] }));
});
const KeyboardAssistIconHomeEnd = memo(function KeyboardAssistIconHomeEnd({ enabled }) {
    return (_jsxs("div", { class: "keyboard-assist-home-end", children: [_jsx(KeyboardAssistIconKey, { enabled: enabled, className: "keyboard-assist-key-home", children: "Home" }), _jsx(KeyboardAssistIconKey, { enabled: enabled, className: "keyboard-assist-key-end", children: "End" })] }));
});
const KeyboardAssistIconTypeahead = memo(function KeyboardAssistIconTypeahead({ enabled }) {
    return (_jsx(CollapseFade, { show: enabled, exitVisibility: "hidden", children: _jsx("div", { class: "keyboard-assist-typeahead", children: _jsx("div", { className: "keyboard-assist-typeahead-message", children: "(or start typing to search)" }) }) }));
});
const KeyboardAssistIconLeaveF2 = memo(function KeyboardAssistIconLeaveF2({ enabled }) {
    return (_jsx(CollapseFade, { show: enabled, exitVisibility: "hidden", children: _jsx("div", { class: "keyboard-assist-leave-f2", children: _jsxs("div", { className: "keyboard-assist-leave-f2-message", children: ["Press ", _jsx("kbd", { children: "F2" }), " to return"] }) }) }));
});
const KeyboardAssistIconRichTextF10 = memo(function KeyboardAssistIconRichTextF10({ enabled }) {
    return (_jsx(CollapseFade, { show: enabled, exitVisibility: "hidden", children: _jsx("div", { class: "keyboard-assist-rich-text-f10", children: _jsxs("div", { className: "keyboard-assist-rich-text-f10-message", children: ["Press ", _jsx("kbd", { children: "Alt+F10" }), " to focus the toolbar"] }) }) }));
});
const KeyboardAssistIconKey = memo(function KeyboardAssistIconKey({ children, className, enabled }) {
    return (_jsx("div", { class: "keyboard-assist-key " + className + (!enabled ? " keyboard-assist-key-disabled" : ""), children: children }));
});
function KeyboardAssistIcon2() {
    const P = 5;
    const K = 100;
    const R = 5;
    const A = K / 5;
    const A_L_X = P * 1 + K * 0.5;
    const A_UD_X = P * 2 + K * 1.5;
    const A_R_X = P * 3 + K * 2.5;
    const A_U_Y = P * 1 + K * 0.5;
    const A_LDR_Y = P * 2 + K * 1.5;
    const A_SX = 1.2;
    const FS = K / 4;
    const W_HOME = K * 0.75;
    const W_END = K * 0.45;
    const W_PAGE = K * 0.6;
    const W_UP = K * 0.3333;
    const W_DOWN = K * 0.66666;
    const H_OFFSET = K * 0.25;
    const Y_HOME = K * 0.3333;
    const Y_END = Y_HOME;
    const Y_PAGE = K * 0.3;
    const H_PAGE = K * 0.4;
    return (_jsxs("svg", { width: P * 6 + K * 5, height: P * 3 + K * 2, class: "keyboard-assist", children: [_jsx("rect", { x: P * 2 + K * 1, y: P * 1 + K * 0, width: K, height: K, rx: R, ry: R, fill: "black" }), _jsx("rect", { x: P * 1 + K * 0, y: P * 2 + K * 1, width: K, height: K, rx: R, ry: R, fill: "black" }), _jsx("rect", { x: P * 2 + K * 1, y: P * 2 + K * 1, width: K, height: K, rx: R, ry: R, fill: "black" }), _jsx("rect", { x: P * 3 + K * 2, y: P * 2 + K * 1, width: K, height: K, rx: R, ry: R, fill: "black" }), _jsx("rect", { x: P * 4 + K * 3, y: P * 1 + K * 0, width: K, height: K, rx: R, ry: R, fill: "black" }), _jsx("rect", { x: P * 4 + K * 3, y: P * 2 + K * 1, width: K, height: K, rx: R, ry: R, fill: "black" }), _jsx("rect", { x: P * 5 + K * 4, y: P * 1 + K * 0, width: K, height: K, rx: R, ry: R, fill: "black" }), _jsx("rect", { x: P * 5 + K * 4, y: P * 2 + K * 1, width: K, height: K, rx: R, ry: R, fill: "black" }), _jsx("polygon", { points: `${A_L_X - A / A_SX},${A_LDR_Y} ${A_L_X + A / A_SX},${A_LDR_Y - A / A_SX} ${A_L_X + A / A_SX},${A_LDR_Y + A / A_SX}`, fill: "white" }), _jsx("polygon", { points: `${A_R_X + A / A_SX},${A_LDR_Y} ${A_R_X - A / A_SX},${A_LDR_Y - A / A_SX} ${A_R_X - A / A_SX},${A_LDR_Y + A / A_SX}`, fill: "white" }), _jsx("polygon", { points: `${A_UD_X},${A_U_Y - A / A_SX} ${A_UD_X - A},${A_U_Y + A / A_SX} ${A_UD_X + A},${A_U_Y + A / A_SX}`, fill: "white" }), _jsx("polygon", { points: `${A_UD_X},${A_LDR_Y + A / A_SX} ${A_UD_X - A},${A_LDR_Y - A / A_SX} ${A_UD_X + A},${A_LDR_Y - A / A_SX}`, fill: "white" }), _jsx("text", { y: H_OFFSET + P * 1 + K * 0 + Y_HOME, fill: "white", style: { fontSize: `${FS}px`, textAlign: "center" }, children: _jsx("tspan", { x: P * 4 + K * 3 + (K - W_HOME) / 2, children: "Home" }) }), _jsx("text", { y: H_OFFSET + P * 2 + K * 1 + Y_END, fill: "white", style: { fontSize: `${FS}px`, textAlign: "center" }, children: _jsx("tspan", { x: P * 4 + K * 3 + (K - W_END) / 2, children: "End" }) }), _jsxs("text", { y: P * 1 + K * 0 + 8 + Y_PAGE, fill: "white", style: { fontSize: `${FS}px`, textAlign: "center" }, children: [_jsx("tspan", { x: P * 5 + K * 4 + (K - W_PAGE) / 2, children: "Page" }), _jsx("tspan", { x: P * 5 + K * 4 + (K - W_UP) / 2, dy: H_PAGE, children: "Up" })] }), _jsxs("text", { y: P * 2 + K * 1 + 8 + Y_PAGE, fill: "white", style: { fontSize: `${FS}px`, textAlign: "center" }, children: [_jsx("tspan", { x: P * 5 + K * 4 + (K - W_PAGE) / 2, children: "Page" }), _jsx("tspan", { x: P * 5 + K * 4 + (K - W_DOWN) / 2, dy: H_PAGE, children: "Down" })] })] }));
}
//# sourceMappingURL=keyboard-assist.js.map