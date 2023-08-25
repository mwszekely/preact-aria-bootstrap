import { clsx } from "clsx";
import { createContext, h, Ref } from "preact";
import { Toolbar, ToolbarProps, useLabelSynthetic, UseToolbarParameters, UseToolbarReturnType, UseToolbarSubInfo } from "preact-aria-widgets";
import { EventDetail, Nullable, useAsync, useMergedProps, useState } from "preact-prop-helpers";
import { useMemo, useRef } from "preact/hooks";
import { ButtonThemes, DefaultButtonSize, DefaultButtonTheme, DisabledContext } from "../context.js";
import { KeyboardAssistIcon } from "../utility/keyboard-assist.js";
import { LabelledProps } from "../utility/types.js";
import { ButtonProps } from "./button-action.js";

export interface ButtonGroupProps extends Pick<h.JSX.HTMLAttributes<HTMLSpanElement>, "children" | "style" | "class" | "className"> {
    /**
     * Disables all buttons in the group together (buttons cannot individually override this)
     */
    disabled?: boolean;

    /**
     * When `selectionMode` is `"single"`, this is the index of the child that's currently selected.
     */
    selectedIndex?: number | null;

    /** Only valid when `selectionLimit` is `"single"` */
    onSelectedIndexChange?: null | ((index: number | null) => (void | Promise<void>));

    /**
     * The size of each button in this group (buttons cannot individually override this; it is the same for all buttons)
     */
    variantSize?: ButtonProps["variantSize"];

    /**
     * The default theme for each button in this group (if a button specifies its own theme, the individual button's theme takes priority)
     */
    variantTheme?: ButtonThemes;

    /**
     * Is this button group arranged horizontally (default) or vertically?
     */
    orientation?: ToolbarProps<HTMLSpanElement, HTMLButtonElement, HTMLLabelElement, any>["orientation"];

    /**
     * Controls whether this button group allows selection, and how many children can be selected.
     * 
     * * `"single"`: One child is selected with the `selectedIndex` prop.
     * * `"multi"`: Any number of children are selected on their individual `selected` props.
     * * `"off"`: Selection is disabled, implying this is a group of action buttons. 
     */
    selectionMode?: Nullable<"single" | "multi" | "off">;

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
export function ButtonGroup({ children, onSelectedIndexChange: onSelectedIndexChangeAsync, variantTheme, variantSize, orientation, label, labelPosition, separated, disabled, selectedIndex, selectionMode, ...props }: LabelledProps<ButtonGroupProps, "within">, ref?: Ref<HTMLSpanElement>) {
    labelPosition ??= "before";
    orientation ||= "horizontal";

    const imperativeHandle = useRef<UseToolbarReturnType<HTMLSpanElement, HTMLButtonElement, HTMLLabelElement, any>>(null);
    type OSSI = UseToolbarParameters<HTMLSpanElement, HTMLButtonElement, UseToolbarSubInfo<HTMLButtonElement>>["singleSelectionDeclarativeParameters"]["onSingleSelectedIndexChange"];
    const [capturedIndex, setCapturedIndex] = useState(null as number | null);
    const { syncHandler: onSelectedIndexChangeSync, pending } = useAsync<Parameters<NonNullable<OSSI>>, void | Promise<void>>(
        (e) => { return onSelectedIndexChangeAsync?.(e[EventDetail].selectedIndex); },
        {
            capture: (e) => { setCapturedIndex(e[EventDetail].selectedIndex); return [e]; },
            debounce: null,
            throttle: null,
        });

    const pendingIndex = (pending ? capturedIndex : null);

    const classBase = (separated ? "btn-toolbar" : "btn-group")

    return (
        <DefaultButtonSize.Provider value={variantSize ?? null}>
            <DefaultButtonTheme.Provider value={variantTheme ?? null}>
                <DisabledContext.Provider value={disabled ?? false}>
                    <ButtonGroupContext.Provider value={useMemo(() => ({ pendingIndex }), [pendingIndex])}>
                        <Toolbar<HTMLSpanElement, HTMLButtonElement, HTMLLabelElement>
                            onSingleSelectedIndexChange={(...e) => {
                                onSelectedIndexChangeSync(...e);
                            }}
                            imperativeHandle={imperativeHandle}
                            singleSelectionAriaPropName="aria-pressed"
                            singleSelectionMode={selectionMode == "single" ? "activation" : "disabled"}
                            multiSelectionMode={selectionMode == "multi"? "activation" : "disabled"}

                            role="toolbar"  // TODO: Was group, but that doesn't count as an application, I think?
                            pageNavigationSize={0}
                            orientation={orientation}
                            ariaLabel={labelPosition == 'hidden' ? label : null}
                            singleSelectedIndex={selectionMode == "single" ? (pendingIndex ?? selectedIndex) : undefined}
                            render={info => {
                                const visibleLabel = <label {...info.propsLabel}>{label}</label>
                                return (
                                    <>
                                        {labelPosition == "before" && visibleLabel}
                                        <KeyboardAssistIcon leftRight={orientation == "horizontal"} upDown={orientation == "vertical"} homeEnd={true} pageKeys={false} typeahead={true} typeaheadActive={info.typeaheadNavigationReturn.typeaheadStatus != 'none'}>
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
            </DefaultButtonTheme.Provider>
        </DefaultButtonSize.Provider>
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