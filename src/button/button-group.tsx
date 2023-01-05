import { DisabledContext } from "../context";
import { ComponentChildren, createContext, h, Ref } from "preact";
import { ProgressWithHandler, Toolbar, ToolbarChild, ToolbarProps, useLabelSynthetic, UseToolbarParameters, UseToolbarReturnType, UseToolbarSubInfo } from "preact-aria-widgets";
import { useAsync, useAsyncHandler, useHasCurrentFocus, useMergedProps, useRefElement, useState } from "preact-prop-helpers";
import { useContext, useMemo, useRef } from "preact/hooks";
import { KeyboardAssistIcon, LabelledProps } from "../utility";

export interface ButtonGroupProps extends Pick<h.JSX.HTMLAttributes<HTMLSpanElement>, "children" | "style" | "class" | "className">, Pick<ToolbarProps<HTMLSpanElement, HTMLButtonElement, HTMLLabelElement, any>, "orientation"> {
    disabled?: boolean;
    selectedIndex?: number | null;
    onSelectedIndexChange?: null | ((index: number | null) => (void | Promise<void>));
}



export interface ButtonGroupChildProps {
    /**
     * If contained within a ButtonGroup, this **must** be present and be the numeric index of the control.
     */
    buttonGroupIndex: number;

    /**
     * For multi-select groups, indicates this button is one of the selected ones.
     * 
     * For single-select groups, prefer the `selectedIndex` prop.
     */
    pressed: boolean | null;
}
export interface ButtonGroupContext { pendingIndex: number | null }
export const ButtonGroupContext = createContext<ButtonGroupContext | null>(null);
export function ButtonGroup({ children, onSelectedIndexChange: onSelectedIndexChangeAsync, orientation, label, labelPosition, disabled, selectedIndex, ...props }: LabelledProps<ButtonGroupProps, "within">, ref?: Ref<HTMLSpanElement>) {
    const imperativeHandle = useRef<UseToolbarReturnType<HTMLSpanElement, HTMLButtonElement, HTMLLabelElement, any>>(null);
    type OSSI = UseToolbarParameters<HTMLSpanElement, HTMLButtonElement, UseToolbarSubInfo<HTMLButtonElement>>["toolbarParameters"]["onSelectedIndexChange"];
    const [capturedIndex, setCapturedIndex] = useState(null as number | null);
    const { syncHandler: onSelectedIndexChangeSync, pending } = useAsync<Parameters<NonNullable<OSSI>>, void | Promise<void>>(
        (e) => { return onSelectedIndexChangeAsync?.(e); },
        {
            capture: (e, r) => { debugger; setCapturedIndex(e); return [e, r]; }
        });

    const pendingIndex = (pending ? capturedIndex : null);
    const [focusedInner, setFocusedInner] = useState(false);
    const { refElementReturn } = useRefElement<HTMLSpanElement>({ refElementParameters: {} })
    const { hasCurrentFocusReturn } = useHasCurrentFocus<HTMLSpanElement>({ hasCurrentFocusParameters: { onCurrentFocusedChanged: null, onCurrentFocusedInnerChanged: setFocusedInner }, refElementReturn })

    return (
        <DisabledContext.Provider value={disabled ?? false}>
            <ButtonGroupContext.Provider value={useMemo(() => ({ pendingIndex }), [pendingIndex])}>
                <Toolbar<HTMLSpanElement, HTMLButtonElement, HTMLLabelElement>
                    onSelectedIndexChange={onSelectedIndexChangeSync}
                    ref={imperativeHandle}
                    role="group"
                    pageNavigationSize={0}
                    orientation={orientation}
                    ariaLabel={labelPosition == 'hidden' ? label : null}
                    selectedIndex={pendingIndex ?? selectedIndex}
                    render={info => {
                        const visibleLabel = <label {...info.propsLabel}>{label}</label>
                        return (
                            <>
                                {labelPosition == "before" && visibleLabel}
                                <KeyboardAssistIcon leftRight={orientation == "horizontal"} upDown={orientation == "vertical"} homeEnd={true} pageKeys={false} typeahead={false} typeaheadActive={false}>
                                    <span {...useMergedProps({ className: "btn-group" }, refElementReturn.propsStable, hasCurrentFocusReturn.propsStable, info.propsToolbar, props, { ref })}>
                                        {labelPosition == "within" && visibleLabel}
                                        {children}
                                    </span>
                                </KeyboardAssistIcon>
                                {labelPosition == "after" && visibleLabel}
                            </>
                        )
                    }} />
            </ButtonGroupContext.Provider>
        </DisabledContext.Provider>
    )
}

export function ButtonGroupGroup({ label, labelPosition, children, ...props }: LabelledProps<Pick<h.JSX.HTMLAttributes<HTMLSpanElement>, "class" | "className" | "style" | "children">, "within">, ref?: Ref<HTMLSpanElement>) {
    const { propsInput, propsLabel } = useLabelSynthetic<HTMLSpanElement, HTMLLabelElement>({
        labelParameters: { ariaLabel: labelPosition == "hidden" ? label : null, onLabelClick: null },
        randomIdInputParameters: { prefix: "bggg-" },
        randomIdLabelParameters: { prefix: "bggi-" }
    });

    const labelJsx = <label {...propsLabel}>{children}</label>;

    return (
        <>
            {labelPosition == "before" && labelJsx}
            <span {...useMergedProps({ className: "btn-toolbar", role: "toolbar", ref }, props, propsInput)}>
                {labelPosition == "within" && labelJsx}
                {children}
            </span>
            {labelPosition == "after" && labelJsx}
        </>
    );
}

/*

<Button<HTMLButtonElement> render={info => {
                return (
                    <button {...info}></button>
                )
            }} />

*/