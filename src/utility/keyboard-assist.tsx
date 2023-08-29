import { ComponentChild, ComponentChildren, createContext, Ref, VNode } from "preact";
import { generateRandomId, useGlobalHandler, useHasCurrentFocus, useMergedProps, usePersistentState, useRefElement, useStableCallback, useState } from "preact-prop-helpers";
import { UseTypeaheadNavigationReturnTypeSelf } from "preact-prop-helpers/react";
import { CollapseFade, SlideZoomFade } from "preact-transition";
import { memo } from "preact/compat";
import { useContext, useEffect, useLayoutEffect, useRef } from "preact/hooks";
import { forwardElementRef } from "./forward-element-ref.js";
import { useClonedElement } from "./use-cloned-element.js";

type Test = `keyboard-assist-lr_${boolean}-ud_${boolean}-pg_${boolean}-he_${boolean}-tp_${boolean}`;

declare module 'preact-prop-helpers' {
    interface PersistentStates extends Record<Test, boolean> {
        "keyboard-assist-hidden-any": boolean;
    }
}

const Both = [false, true] as const;

export interface KeyboardAssistIconProps {
    visible: boolean,
    description: string,
    leftRight: boolean,
    upDown: boolean,
    pageKeys: boolean,
    homeEnd: boolean,
    //typeahead: boolean,
    leaveF2?: boolean;
    textF10?: boolean;
    activateEnter: boolean;
    activateSpace: boolean;
    typeaheadStatus: TypeaheadStatus | null;
}
interface KeyboardAssistContext {
    addLeftRight(id: string): void;
    addUpDown(id: string): void;
    addHomeEnd(id: string): void;
    addPageKeys(id: string): void;
    addLeaveF2(id: string): void;
    addTextF10(id: string): void;
    addActivateEnter(id: string): void;
    addActivateSpace(id: string): void;

    setDescription(desc: string): void;
    setTypeaheadStatus(status: TypeaheadStatus | null): void;

    removeLeftRight(id: string): void;
    removeUpDown(id: string): void;
    removeHomeEnd(id: string): void;
    removePageKeys(id: string): void;
    //removeTypeahead(id: string): void;
    removeLeaveF2(id: string): void;
    removeTextF10(id: string): void;
    removeActivateEnter(id: string): void;
    removeActivateSpace(id: string): void;

    // Any time a child renders with a typeahead, call this to show the instructions (if applicable)
    //setHasStartedTypeahead(): void;

    id: string;
}
type TypeaheadStatus = UseTypeaheadNavigationReturnTypeSelf["typeaheadStatus"];

const KeyboardAssistContext = createContext<null | KeyboardAssistContext>(null);
export const KeyboardAssistIcon = forwardElementRef(function KeyboardAssistIcon({ description, activateEnter, activateSpace, leftRight, upDown, homeEnd, pageKeys, children, typeaheadStatus, leaveF2, textF10, ...props }: Omit<KeyboardAssistIconProps, "visible"> & { children: VNode, typeaheadStatus: TypeaheadStatus | null; }, ref?: Ref<any>) {
    const {
        id: figureDescriptionId,
        addHomeEnd,
        setDescription,
        addActivateEnter,
        removeActivateEnter,
        addActivateSpace,
        removeActivateSpace,
        addLeftRight,
        addPageKeys,
        addUpDown,
        addLeaveF2,
        addTextF10,
        removeHomeEnd,
        removeLeftRight,
        removePageKeys,
        removeLeaveF2,
        removeTextF10,
        removeUpDown,
        setTypeaheadStatus
    } = useContext(KeyboardAssistContext)!;

    const [randomId] = useState(() => generateRandomId());
    const [focusedInner, setFocusedInner] = useState(false);
    const { refElementReturn, propsStable } = useRefElement<any>({ refElementParameters: {} });
    const { hasCurrentFocusReturn } = useHasCurrentFocus<any>({
        hasCurrentFocusParameters: {
            onCurrentFocusedChanged: null,
            onCurrentFocusedInnerChanged: useStableCallback((focused) => {
                setFocusedInner(focused);
                if (focused)
                    setDescription(description);
            })
        },
        refElementReturn
    });

    leftRight &&= focusedInner;
    upDown &&= focusedInner;
    homeEnd &&= focusedInner;
    pageKeys &&= focusedInner;
    leaveF2 &&= focusedInner;
    textF10 &&= focusedInner;
    activateEnter &&= focusedInner;
    activateSpace &&= focusedInner;

    useEffect(() => {
        if (activateEnter) {
            addActivateEnter(randomId);
            return () => removeActivateEnter(randomId);
        }
    }, [activateEnter])

    useEffect(() => {
        if (activateSpace) {
            addActivateSpace(randomId);
            return () => removeActivateSpace(randomId);
        }
    }, [activateSpace])

    useEffect(() => {
        setTypeaheadStatus(typeaheadStatus);
        return () => setTypeaheadStatus(null);

    }, [typeaheadStatus])

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

    /*useEffect(() => {
        if (typeahead) {
            addTypeahead(randomId);
            return () => removeTypeahead(randomId);
        }
    }, [typeahead]);*/

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

    return (
        <>
            {/* 
            TODO: Should we place a "dummy" icon here? This would be for assistive technologies, but is that relevant when primarily using the keyboard?
            <div class="visually-hidden" role="figure" aria-describedby={figureDescriptionId}></div> 

            Also: if this is used, e.g., in a tbody, then inserting a dummy icon there won't work!
            */}
            {useClonedElement(children, useMergedProps(propsStable, hasCurrentFocusReturn.propsStable, props), ref)}
        </>
    );
})

export function KeyboardAssistProvider({ children }: { children: ComponentChildren }) {
    const [id] = useState(() => generateRandomId("keyboard-assist-"));
    const [leftRight2, setLeftRight] = useState(false);
    const [upDown2, setUpDown] = useState(false);
    const [homeEnd2, setHomeEnd] = useState(false);
    const [pageKeys2, setPageKeys] = useState(false);
    const [typeahead2, setTypeahead] = useState(false);
    const [leaveF22, setLeaveF2] = useState(false);
    const [textF102, setTextF10] = useState(false);
    const [activateEnter, setActivateEnter] = useState(false);
    const [activateSpace, setActivateSpace] = useState(false);
    const [typeaheadStatus, setTypeaheadStatus] = useState<TypeaheadStatus | null>(null);

    const [leftRightDisplay, setLeftRightDisplay] = useState(false);
    const [upDownDisplay, setUpDownDisplay] = useState(false);
    const [homeEndDisplay, setHomeEndDisplay] = useState(false);
    const [pageKeysDisplay, setPageKeysDisplay] = useState(false);
    //const [typeaheadDisplay, setTypeaheadDisplay] = useState(false);
    const [leaveF2Display, setLeaveF2Display] = useState(false);
    const [textF10Display, setTextF10Display] = useState(false);

    const leftRightSet = useRef<Set<string>>(new Set<string>());
    const upDownSet = useRef<Set<string>>(new Set<string>());
    const homeEndSet = useRef<Set<string>>(new Set<string>());
    const pageKeysSet = useRef<Set<string>>(new Set<string>());
    //const typeaheadSet = useRef<Set<string>>(new Set<string>());
    const leaveF2Set = useRef<Set<string>>(new Set<string>());
    const textF10Set = useRef<Set<string>>(new Set<string>());
    const activateEnterSet = useRef<Set<string>>(new Set<string>());
    const activateSpaceSet = useRef<Set<string>>(new Set<string>());

    const visible = (leftRight2 || upDown2 || homeEnd2 || pageKeys2 || typeahead2);

    const typeaheadDisplay = (typeaheadStatus != null);

    useLayoutEffect(() => {
        const visible = (leftRight2 || upDown2 || homeEnd2 || pageKeys2 || typeahead2);
        if (visible) {
            setLeftRightDisplay(leftRight2);
            setUpDownDisplay(upDown2);
            setHomeEndDisplay(homeEnd2);
            setPageKeysDisplay(pageKeys2);
            //setTypeaheadDisplay(typeahead2);
            setLeaveF2Display(leaveF22);
            setTextF10Display(textF102);
        }
    }, [leftRight2, upDown2, homeEnd2, pageKeys2, typeahead2, leaveF22, textF102])


    // TODO: Mutation during render, but this is kinda intentional?
    /*if (visible) {
        lastVisibleSet.current.leftRight = leftRight;
        lastVisibleSet.current.upDown = upDown;
        lastVisibleSet.current.homeEnd = homeEnd;
        lastVisibleSet.current.pageKeys = pageKeys;
        lastVisibleSet.current.typeahead = typeahead;
    }*/

    const context = useRef<KeyboardAssistContext>({
        addHomeEnd: (id) => { homeEndSet.current.add(id); setHomeEnd(homeEndSet.current.size > 0) },
        addLeftRight: (id) => { leftRightSet.current.add(id); setLeftRight(leftRightSet.current.size > 0) },
        addPageKeys: (id) => { pageKeysSet.current.add(id); setPageKeys(pageKeysSet.current.size > 0) },
        setTypeaheadStatus: (status) => { setTypeaheadStatus(status); setHeardTab(true); },
        addUpDown: (id) => { upDownSet.current.add(id); setUpDown(upDownSet.current.size > 0) },
        addLeaveF2: (id) => { leaveF2Set.current.add(id); setLeaveF2(leaveF2Set.current.size > 0) },
        addTextF10: (id) => { textF10Set.current.add(id); setTextF10(textF10Set.current.size > 0) },
        addActivateSpace: id => { activateSpaceSet.current.add(id); setActivateSpace(activateSpaceSet.current.size > 0); },
        addActivateEnter: id => { activateEnterSet.current.add(id); setActivateEnter(activateEnterSet.current.size > 0); },
        removeLeftRight: (id) => { leftRightSet.current.delete(id); setLeftRight(leftRightSet.current.size > 0) },
        removeUpDown: (id) => { upDownSet.current.delete(id); setUpDown(upDownSet.current.size > 0) },
        removeHomeEnd: (id) => { homeEndSet.current.delete(id); setHomeEnd(homeEndSet.current.size > 0) },
        removePageKeys: (id) => { pageKeysSet.current.delete(id); setPageKeys(pageKeysSet.current.size > 0) },
        removeLeaveF2: (id) => { leaveF2Set.current.delete(id); setLeaveF2(leaveF2Set.current.size > 0) },
        removeTextF10: (id) => { textF10Set.current.delete(id); setTextF10(textF10Set.current.size > 0) },
        removeActivateSpace: id => { activateSpaceSet.current.delete(id); setActivateSpace(activateSpaceSet.current.size > 0); },
        removeActivateEnter: id => { activateEnterSet.current.delete(id); setActivateEnter(activateEnterSet.current.size > 0); },
        setDescription: desc => setDescription(desc),
        id: id
    });

    const [description, setDescription] = useState("Keyboard controls available:");

    const [heardTab, setHeardTab] = useState(false);
    const stateKey = `keyboard-assist-lr_${leftRightDisplay.toString()}-ud_${upDownDisplay.toString()}-pg_${pageKeysDisplay.toString()}-he_${homeEndDisplay.toString()}-tp_${typeaheadDisplay.toString()}-tp_${leaveF22.toString()}-tp_${textF102.toString()}`;
    const [userHasHidden, setUserHasHidden, getUserHasHidden] = usePersistentState(stateKey as "keyboard-assist-lr_false-ud_false-pg_false-he_false-tp_false", false);
    const [userHasHiddenAny, setUserHasHiddenAny] = usePersistentState("keyboard-assist-hidden-any", false);

    //const [currentDescription, setCurrentDescription] = useState("Keyboard controls available:");

    useGlobalHandler(document, "keydown", event => {
        if ((event as KeyboardEvent).key == "Tab") {
            setHeardTab(true);
        }
        if (visible) {
            if ((event as KeyboardEvent).key == "F7") {
                if ((event as KeyboardEvent).shiftKey) {
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

    return (
        <KeyboardAssistContext.Provider value={context.current}>
            <KeyboardAssistIconDisplay
                id={id}
                description={description}
                heardTab={heardTab}
                userHasHidden={userHasHidden}
                homeEnd={homeEndDisplay}
                leftRight={leftRightDisplay}
                upDown={upDownDisplay}
                pageKeys={pageKeysDisplay}
                visible={visible}
                leaveF2={leaveF2Display}
                textF10={textF10Display}
                activateEnter={activateEnter}
                activateSpace={activateSpace}
                typeaheadStatus={typeaheadStatus}
            />
            {children}
        </KeyboardAssistContext.Provider>
    )
}

function KeyboardAssistIconDisplay({ heardTab, description, userHasHidden, leftRight, upDown, homeEnd, pageKeys, leaveF2, textF10, visible, activateEnter, activateSpace, id, typeaheadStatus }: KeyboardAssistIconProps & { id: string, heardTab: boolean, userHasHidden: boolean }) {

    let selectable = (activateEnter || activateSpace);

    const labelParts = ([
        leftRight && upDown ? "the arrow keys" : leftRight ? "the left and right arrow keys" : upDown ? "the up and down arrow keys" : null,
        pageKeys ? "the Page Up and Down keys" : null,
        homeEnd ? "the Home and End keys" : null,
        typeaheadStatus != null ? "typing to search by name" : null,
    ].filter(t => t != null) as string[]);
    /*let label = "";
    for (let i = 0; i < labelParts.length; ++i) {
        if (i > 0) {
            if (labelParts.length == 2)
                label += " or ";
            else if (labelParts.length > 2) {
                if (i == labelParts.length - 1)
                    label += ", or "
                else
                    label += ", "
            }
        }
        label += labelParts[i];
    }*/

    //let selectableLabel = selectable ? (activateEnter ? activateSpace ? "Enter or Space" : "Enter" : "Space") : "";

    //label = `Navigate using ${label}. ${selectable ? `Select with ${selectableLabel}. ` : ""}Press F7 to hide these instructions. Press Shift+F7 to show them again once hidden.`;

    const show = (heardTab && !userHasHidden && visible);

    return (
        <>
            <SlideZoomFade show={show} zoomMin={0.875} zoomOriginInline={1} zoomOriginBlock={1} slideTargetBlock={0.125} slideTargetInline={0.125}>
                <div class="keyboard-assist-icon-container" role="figure" aria-labelledby={id}>
                    <div id={id} class="keyboard-assist-instructions">{description}</div>
                    <KeyboardAssistIconArrowKeys leftRight={leftRight} upDown={upDown} />
                    <KeyboardAssistIconHomeEnd enabled={homeEnd} />
                    <KeyboardAssistIconPageKeys enabled={pageKeys} />
                    <KeyboardAssistIconTypeahead typeaheadStatus={typeaheadStatus} />
                    <KeyboardAssistIconSelectable enter={activateEnter || false} space={activateSpace || false} />
                    <KeyboardAssistIconLeaveF2 enabled={leaveF2 || false} />
                    <KeyboardAssistIconRichTextF10 enabled={textF10 || false} />
                    <div class="keyboard-assist-dismiss-message">Press <kbd>F7</kbd> to dismiss these instructions.<br />To show again, press <kbd>Shift+F7</kbd>.</div>
                </div>
            </SlideZoomFade>
        </>
    )
}

const KeyboardAssistIconArrowKeys = memo(function KeyboardAssistIconArrowKeys({ leftRight, upDown }: { leftRight: boolean, upDown: boolean }) {
    return (
        <div class="keyboard-assist-arrow-keys">
            <KeyboardAssistIconKey enabled={upDown} className="keyboard-assist-key-arrow-up">↑</KeyboardAssistIconKey>
            <KeyboardAssistIconKey enabled={leftRight} className="keyboard-assist-key-arrow-left">←</KeyboardAssistIconKey>
            <KeyboardAssistIconKey enabled={upDown} className="keyboard-assist-key-arrow-down">↓</KeyboardAssistIconKey>
            <KeyboardAssistIconKey enabled={leftRight} className="keyboard-assist-key-arrow-right">→</KeyboardAssistIconKey>
        </div>
    )
})

const KeyboardAssistIconPageKeys = memo(function KeyboardAssistIconPageKeys({ enabled }: { enabled: boolean }) {
    return (
        <div class="keyboard-assist-page-keys">
            <KeyboardAssistIconKey enabled={enabled} className="keyboard-assist-key-page-up">Pg Up</KeyboardAssistIconKey>
            <KeyboardAssistIconKey enabled={enabled} className="keyboard-assist-key-page-down">Pg Dn</KeyboardAssistIconKey>
        </div>
    )
})

const KeyboardAssistIconHomeEnd = memo(function KeyboardAssistIconHomeEnd({ enabled }: { enabled: boolean }) {
    return (
        <div class="keyboard-assist-home-end">
            <KeyboardAssistIconKey enabled={enabled} className="keyboard-assist-key-home">Home</KeyboardAssistIconKey>
            <KeyboardAssistIconKey enabled={enabled} className="keyboard-assist-key-end">End</KeyboardAssistIconKey>
        </div>
    )
})

const KeyboardAssistIconSelectable = memo(function KeyboardAssistIconTypeahead({ enter, space }: { enter: boolean, space: boolean }) {
    let selectableLabel = (enter ? space ? "Enter or Space" : "Enter" : space ? "Space" : "");
    const visible: boolean = enter || space || false;

    // TODO: modification during render to ensure that it's not jumpy when transitioning in/out
    let selectableLabelRef = useRef<string>(selectableLabel);
    if (visible)
        selectableLabelRef.current = selectableLabel;

    return (
        <CollapseFade show={visible} exitVisibility="hidden">
            <div class="keyboard-assist-selectable">
                <div className="keyboard-assist-selectable-message">Select with {selectableLabelRef.current}</div>
            </div>
        </CollapseFade>
    )
})

const KeyboardAssistIconTypeahead = memo(function KeyboardAssistIconTypeahead({ typeaheadStatus }: { typeaheadStatus: TypeaheadStatus | null }) {

    return (
        <CollapseFade show={typeaheadStatus != null} exitVisibility="hidden">
            <div class="keyboard-assist-typeahead">
                <div className="keyboard-assist-typeahead-message">{typeaheadStatus == 'none' ? "Start typing to search" : typeaheadStatus == 'valid' ? "Keep typing to continue" : "No result found"}</div>
            </div>
        </CollapseFade>
    )
})

const KeyboardAssistIconLeaveF2 = memo(function KeyboardAssistIconLeaveF2({ enabled }: { enabled: boolean }) {

    return (
        <CollapseFade show={enabled} exitVisibility="hidden">
            <div class="keyboard-assist-leave-f2">
                <div className="keyboard-assist-leave-f2-message">Press <kbd>F2</kbd> to return</div>
            </div>
        </CollapseFade>
    )
})

const KeyboardAssistIconRichTextF10 = memo(function KeyboardAssistIconRichTextF10({ enabled }: { enabled: boolean }) {

    return (
        <CollapseFade show={enabled} exitVisibility="hidden">
            <div class="keyboard-assist-rich-text-f10">
                <div className="keyboard-assist-rich-text-f10-message">Press <kbd>Alt+F10</kbd> to focus the toolbar</div>
            </div>
        </CollapseFade>
    )
})

const KeyboardAssistIconKey = memo(function KeyboardAssistIconKey({ children, className, enabled }: { children: ComponentChild, className: string, enabled: boolean }) {
    return (<div class={"keyboard-assist-key " + className + (!enabled ? " keyboard-assist-key-disabled" : "")}>{children}</div>)
})

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
    return (
        <svg width={P * 6 + K * 5} height={P * 3 + K * 2} class="keyboard-assist">

            <rect x={P * 2 + K * 1} y={P * 1 + K * 0} width={K} height={K} rx={R} ry={R} fill="black" />
            <rect x={P * 1 + K * 0} y={P * 2 + K * 1} width={K} height={K} rx={R} ry={R} fill="black" />
            <rect x={P * 2 + K * 1} y={P * 2 + K * 1} width={K} height={K} rx={R} ry={R} fill="black" />
            <rect x={P * 3 + K * 2} y={P * 2 + K * 1} width={K} height={K} rx={R} ry={R} fill="black" />


            <rect x={P * 4 + K * 3} y={P * 1 + K * 0} width={K} height={K} rx={R} ry={R} fill="black" />
            <rect x={P * 4 + K * 3} y={P * 2 + K * 1} width={K} height={K} rx={R} ry={R} fill="black" />
            <rect x={P * 5 + K * 4} y={P * 1 + K * 0} width={K} height={K} rx={R} ry={R} fill="black" />
            <rect x={P * 5 + K * 4} y={P * 2 + K * 1} width={K} height={K} rx={R} ry={R} fill="black" />

            <polygon points={`${A_L_X - A / A_SX},${A_LDR_Y} ${A_L_X + A / A_SX},${A_LDR_Y - A / A_SX} ${A_L_X + A / A_SX},${A_LDR_Y + A / A_SX}`} fill="white" />
            <polygon points={`${A_R_X + A / A_SX},${A_LDR_Y} ${A_R_X - A / A_SX},${A_LDR_Y - A / A_SX} ${A_R_X - A / A_SX},${A_LDR_Y + A / A_SX}`} fill="white" />

            <polygon points={`${A_UD_X},${A_U_Y - A / A_SX} ${A_UD_X - A},${A_U_Y + A / A_SX} ${A_UD_X + A},${A_U_Y + A / A_SX}`} fill="white" />
            <polygon points={`${A_UD_X},${A_LDR_Y + A / A_SX} ${A_UD_X - A},${A_LDR_Y - A / A_SX} ${A_UD_X + A},${A_LDR_Y - A / A_SX}`} fill="white" />

            <text y={H_OFFSET + P * 1 + K * 0 + Y_HOME} fill="white" style={{ fontSize: `${FS}px`, textAlign: "center" }}><tspan x={P * 4 + K * 3 + (K - W_HOME) / 2}>Home</tspan></text>
            <text y={H_OFFSET + P * 2 + K * 1 + Y_END} fill="white" style={{ fontSize: `${FS}px`, textAlign: "center" }}><tspan x={P * 4 + K * 3 + (K - W_END) / 2}>End</tspan></text>

            <text y={P * 1 + K * 0 + 8 + Y_PAGE} fill="white" style={{ fontSize: `${FS}px`, textAlign: "center" }}><tspan x={P * 5 + K * 4 + (K - W_PAGE) / 2}>Page</tspan><tspan x={P * 5 + K * 4 + (K - W_UP) / 2} dy={H_PAGE}>Up</tspan></text>
            <text y={P * 2 + K * 1 + 8 + Y_PAGE} fill="white" style={{ fontSize: `${FS}px`, textAlign: "center" }}><tspan x={P * 5 + K * 4 + (K - W_PAGE) / 2}>Page</tspan><tspan x={P * 5 + K * 4 + (K - W_DOWN) / 2} dy={H_PAGE}>Down</tspan></text>

        </svg>
    )
}