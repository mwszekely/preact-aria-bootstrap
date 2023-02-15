import clsx from "clsx";
import { createContext, h, Ref } from "preact";
import { Toolbar, ToolbarProps, useLabelSynthetic, UseToolbarParameters, UseToolbarReturnType, UseToolbarSubInfo } from "preact-aria-widgets";
import { useAsync, useHasCurrentFocus, useMergedProps, useRefElement, useState } from "preact-prop-helpers";
import { useMemo, useRef } from "preact/hooks";
import { DisabledContext } from "../context";
import { KeyboardAssistIcon } from "../utility/keyboard-assist";
import { LabelledProps } from "../utility/types";
import { ButtonProps } from "./button-action";

export interface ButtonGroupProps extends Pick<h.JSX.HTMLAttributes<HTMLSpanElement>, "children" | "style" | "class" | "className"> {
    disabled?: boolean;
    selectedIndex?: number | null;
    onSelectedIndexChange?: null | ((index: number | null) => (void | Promise<void>));
    variantSize?: ButtonProps<any>["variantSize"];
    orientation?: ToolbarProps<HTMLSpanElement, HTMLButtonElement, HTMLLabelElement, any>["orientation"];

    /**
     * When true, each button in the group will have a gap between them and each have their own borders,
     * as opposed to all being connected.
     * 
     * All other behavior remains the same. The group's class will be `btn-toolbar` instead of `btn-group`
     */
    separated?: boolean;
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
export function ButtonGroup({ children, onSelectedIndexChange: onSelectedIndexChangeAsync, variantSize, orientation, label, labelPosition, separated, disabled, selectedIndex, ...props }: LabelledProps<ButtonGroupProps, "within">, ref?: Ref<HTMLSpanElement>) {
    const imperativeHandle = useRef<UseToolbarReturnType<HTMLSpanElement, HTMLButtonElement, HTMLLabelElement, any>>(null);
    type OSSI = UseToolbarParameters<HTMLSpanElement, HTMLButtonElement, UseToolbarSubInfo<HTMLButtonElement>>["toolbarParameters"]["onSelectedIndexChange"];
    const [capturedIndex, setCapturedIndex] = useState(null as number | null);
    const { syncHandler: onSelectedIndexChangeSync, pending } = useAsync<Parameters<NonNullable<OSSI>>, void | Promise<void>>(
        (e) => { return onSelectedIndexChangeAsync?.(e); },
        {
            capture: (e, r) => { setCapturedIndex(e); return [e, r]; }
        });

    const pendingIndex = (pending ? capturedIndex : null);

    const classBase = (separated? "btn-toolbar" : "btn-group")

    return (

        <DisabledContext.Provider value={disabled ?? false}>
            <ButtonGroupContext.Provider value={useMemo(() => ({ pendingIndex }), [pendingIndex])}>
                <Toolbar<HTMLSpanElement, HTMLButtonElement, HTMLLabelElement>
                    onSelectedIndexChange={onSelectedIndexChangeSync}
                    ref={imperativeHandle}
                    role="toolbar"  // TODO: Was group, but that doesn't count as an application, I think?
                    pageNavigationSize={0}
                    orientation={orientation || "horizontal"}
                    ariaLabel={labelPosition == 'hidden' ? label : null}
                    selectedIndex={pendingIndex ?? selectedIndex}
                    render={info => {
                        const visibleLabel = <label {...info.propsLabel}>{label}</label>
                        return (
                            <>
                                {labelPosition == "before" && visibleLabel}
                                <KeyboardAssistIcon leftRight={orientation == "horizontal"} upDown={orientation == "vertical"} homeEnd={true} pageKeys={false} typeahead={false} typeaheadActive={false}>
                                    <span {...useMergedProps({ className: clsx(classBase, variantSize && `btn-group-${variantSize}`, orientation == "vertical" && `${classBase}-vertical`) }, info.propsToolbar, props, { ref })}>
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