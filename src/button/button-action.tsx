import { clsx } from "clsx";
import { ComponentChildren, h, Ref, VNode } from "preact";
import { Button as AriaButton, EventDetail, Progress, TargetedButtonPressEvent, ToolbarChild } from "preact-aria-widgets";
import { Nullable, returnFalse, useAsyncHandler, UseAsyncHandlerParameters, useMergedProps } from "preact-prop-helpers";
import { Fade } from "preact-transition";
import { memo } from "preact/compat";
import { useContext } from "preact/hooks";
import { ButtonFills, ButtonSizes, ButtonThemes, DefaultButtonSize, DefaultButtonTheme, DefaultDisabledType, DisabledContext } from "../context.js";
import { Tooltip, TooltipProps } from "../tooltip/index.js";
import { forwardElementRef, memoForwardRef } from "../utility/forward-element-ref.js";
import { GlobalAttributes } from "../utility/types.js";
import { ButtonGroupChildProps, ButtonGroupContext } from "./button-group.js";


export interface ButtonProps extends
    GlobalAttributes<HTMLButtonElement, "children" | "ref">,
    Partial<ButtonGroupChildProps>,
    Partial<Pick<UseAsyncHandlerParameters<any, any>, "debounce" | "throttle">> {

    disabled?: boolean;

    loadingLabel?: string;

    tooltip?: ComponentChildren;

    tooltipPlacement?: TooltipProps["placement"];

    onPress: null | ((pressed: boolean | null, event: TargetedButtonPressEvent<HTMLButtonElement>) => (void | Promise<void>));

    badge?: Nullable<VNode>;

    variantTheme?: Nullable<ButtonThemes>;
    variantFill?: Nullable<ButtonFills>;
    variantSize?: Nullable<ButtonSizes>;

    /**
     * Generally only used as part of a menu button
     */
    variantDropdown?: Nullable<"split" | "joined">;

    /**
     * If outside of a `ButtonGroup`, effectively acts like a checkbox.
     * 
     * If inside of a `ButtonGroup`, used for multi-selection. Prefer `selectedIndex` for single-selection.
     * 
     */
    pressed?: Nullable<boolean>;
}

export const Button = memoForwardRef(function Button({ tooltip, buttonGroupIndex, children, tooltipPlacement, badge, pressed: standaloneOrMultiSelectPressed, disabled: userDisabled, onPress: onPressAsync, variantDropdown, variantFill, variantSize, loadingLabel, throttle, debounce, variantTheme, ...props }: ButtonProps, ref: Ref<HTMLButtonElement>) {
    //Tag ??= "button" as never;

    let defaultTheme = useContext(DefaultButtonTheme);
    let defaultSize = useContext(DefaultButtonSize);
    variantTheme ??= defaultTheme ?? undefined;
    variantSize ??= defaultSize ?? undefined;

    const { currentCapture, pending: individualPending, syncHandler, callCount } = useAsyncHandler({
        asyncHandler: onPressAsync,
        capture: (e) => e[EventDetail].pressed ?? null,
        debounce,
        throttle
    });

    // A button can look pressed for multiple reasons:
    // * The user has specified the button is pressed.
    // * This button is contained in a single-select widget, and that widget is telling this button that it is the selected one among all its siblings.
    // * The onPress handler is an async handler that sets the button to pressed/unpressed, in which case we show it in that state until the handler completes.
    const buttonGroupInfo = useContext(ButtonGroupContext);
    const { pendingIndex } = (buttonGroupInfo ?? {});
    //const isThePressedOne = ((pendingIndex == null ? (individualPending ? currentCapture : standaloneOrMultiSelectPressed) : (pendingIndex === buttonGroupIndex)) ?? null);
    //const singleSelectPending = pendingIndex != null && isThePressedOne;


    let isPendingForMultiSelect: boolean | null = null;
    let isPendingForSingleSelect: boolean | null = null;
    let isPressedForMultiSelect: boolean | null = null;
    let isPressedForSingleSelect: boolean | null = null;    // This one we won't know until we render ToolbarChild

    if (individualPending) {
        isPendingForMultiSelect = true;
    }
    if (pendingIndex != null && pendingIndex == buttonGroupIndex) {
        isPendingForSingleSelect = true;
    }

    if (individualPending)
        isPressedForMultiSelect = currentCapture ?? null;
    else
        isPressedForMultiSelect = standaloneOrMultiSelectPressed ?? null;


    //let isPressed = null;





    const defaultDisabled = useContext(DisabledContext);
    const disabledType = useContext(DefaultDisabledType);
    //const pending = ((individualPending || singleSelectPending) ?? false);



    children = <>{children}{badge}</>


    if (buttonGroupInfo == null) {
        //variantSize ??= "md";
        let pending = individualPending;
        let disabled = userDisabled;
        disabled ||= defaultDisabled;
        //disabled ||= (pendingIndex != null);
        disabled ||= pending;
        const d = disabled ? disabledType : false;

        let isPressed = (isPressedForMultiSelect) ?? null;
        return (
            <ButtonStructure
                ref={ref}
                //Tag={(Tag) as never}
                tooltip={tooltip}
                disabled={d}
                pending={pending}
                children={children}
                tooltipPlacement={tooltipPlacement}
                callCount={callCount}
                loadingLabel={loadingLabel ?? null}
                variantTheme={variantTheme ?? "primary"}
                variantSize={variantSize}
                variantDropdown={variantDropdown || null}
                pressed={isPressed}
                onPress={syncHandler ?? null}
                excludeSpace={returnFalse}
                otherProps={props}
                variantFill={variantFill ?? null}
            />
        )
    }
    else {

        return (
            <ToolbarChild<HTMLButtonElement>
                index={buttonGroupIndex ?? 0}
                disabledProp="disabled"
                render={toolbarChildInfo => {


                    //let pending = (toolbarChildInfo.multiSelectionChildReturn? isPendingForMultiSelect : selectionLimit == 'single'? isPendingForSingleSelect : individualPending) || false;

                    let pending = (toolbarChildInfo.singleSelectionChildReturn.singleSelectionMode != "disabled" ? isPendingForSingleSelect :
                        toolbarChildInfo.multiSelectionChildReturn.multiSelectionMode != "disabled" ? isPendingForMultiSelect :
                            individualPending) || false;

                    let disabled = userDisabled;
                    disabled ||= defaultDisabled;
                    //disabled ||= (pendingIndex != null);
                    disabled ||= pending;
                    const d = disabled ? disabledType : false;


                    isPressedForSingleSelect = (toolbarChildInfo.singleSelectionChildReturn.singleSelected);

                    let isPressed = toolbarChildInfo.singleSelectionChildReturn.singleSelected || toolbarChildInfo.multiSelectionChildReturn.multiSelected;

                    return (<ButtonStructure
                        ref={ref}
                        //Tag={(Tag) as never}
                        tooltip={tooltip}
                        disabled={d}
                        pending={pending}
                        children={children}
                        tooltipPlacement={tooltipPlacement}
                        loadingLabel={loadingLabel ?? null}
                        variantTheme={variantTheme ?? "primary"}
                        variantFill={variantFill ?? null}
                        variantSize={variantSize ?? "md"}
                        variantDropdown={variantDropdown || null}
                        pressed={isPressed}
                        callCount={callCount}
                        excludeSpace={toolbarChildInfo.pressParameters.excludeSpace || returnFalse}
                        onPress={(e) => {
                            toolbarChildInfo.pressParameters.onPressSync?.(e);
                            return syncHandler?.(e);
                        }}
                        otherProps={useMergedProps(props, toolbarChildInfo.propsChild, toolbarChildInfo.propsTabbable)}
                    />);
                }}
            />
        )
    }
})

/**
 * A "raw" button -- just the markup.
 */
const ButtonStructure = memo(forwardElementRef(function ButtonStructure({ excludeSpace, tooltip, disabled, onPress, pressed, loadingLabel, otherProps, tooltipPlacement, pending, variantDropdown, variantTheme, variantFill, variantSize, children, callCount }: { excludeSpace: () => boolean, ref: Ref<HTMLButtonElement> | undefined, callCount: number, variantDropdown: "joined" | "split" | null; variantSize: "sm" | "md" | "lg" | undefined; variantFill: "fill" | "outline" | null; tooltip: ComponentChildren | undefined, children: ComponentChildren, variantTheme: ButtonThemes, pending: boolean, loadingLabel: string | null, disabled: boolean | "soft" | "hard", tooltipPlacement: TooltipProps["placement"], pressed: null | boolean, onPress: null | ((e: TargetedButtonPressEvent<HTMLButtonElement>) => void), otherProps: h.JSX.HTMLAttributes<HTMLButtonElement> }, ref?: Ref<HTMLButtonElement>) {
    return (
        <AriaButton<HTMLButtonElement>
            tagButton="button"
            disabled={disabled}
            onPressSync={onPress}
            pressed={pressed}
            excludeSpace={excludeSpace}
            render={buttonInfo => {
                return (
                    <Progress<HTMLSpanElement, HTMLLabelElement>
                        ariaLabel={loadingLabel ?? "Please wait while the operation completes."}
                        value={pending ? "indeterminate" : "disabled"}

                        tagProgressIndicator="span"
                        render={progressInfo => {
                            const { propsProgressIndicator, propsProgressRegion } = progressInfo;
                            const loadingJsx = (<Fade show={pending} exitVisibility="removed"><span class="spinner-border" {...propsProgressIndicator} /></Fade>)
                            if (pressed != null)
                                variantFill ??= (pressed ? "fill" : "outline");

                            const buttonClass = clsx(`btn position-relative`, variantDropdown && "dropdown-toggle", variantDropdown == "split" && "dropdown-toggle-split", variantSize && `btn-${variantSize}`, `btn${variantFill == "outline" ? "-outline" : ""}-${variantTheme || "primary"}`, pending && "pending", pressed && "pressed", disabled && "disabled", buttonInfo.pressReturn.pressing && "active");

                            //const ret = (h(Tag as never, useMergedProps<E>(otherProps, buttonInfo.props, { className: buttonClass, ref }), children, loadingJsx))
                            const ret = <StructureButtonButton {...useMergedProps<any>(otherProps, buttonInfo.props, { className: buttonClass, ref })}>{children}{loadingJsx}</StructureButtonButton>
                            if (tooltip) {
                                return <Tooltip forward alignMode="element" semanticType="label" absolutePositioning={true} placement={tooltipPlacement || "top"} tooltip={tooltip}>{ret}</Tooltip>
                            }
                            else {
                                return ret;
                            }
                        }}
                    />
                );
            }}
        />
    )
}))

export interface StructureButtonProps extends GlobalAttributes<HTMLButtonElement, "children"> {

}

export interface StructureButtonProgressIndicatorProps extends GlobalAttributes<HTMLProgressElement> { }
export interface StructureButtonProgressLabelProps extends GlobalAttributes<HTMLLabelElement, "children"> { }

const StructureButtonButton = memoForwardRef(function ButtonStructure({ children, ...props }: StructureButtonProps, ref: Ref<HTMLButtonElement>) {
    return (
        <button {...useMergedProps({ class: "btn" }, { ...props, ref })}>{children}</button>
    )
})

const StructureButtonProgressLabel = memoForwardRef(function StructureButtonProgress({ children, ...props }: StructureButtonProgressLabelProps, ref: Ref<HTMLLabelElement>) {
    return (
        <label {...useMergedProps({ class: "btn-progress-label" }, { ...props, ref })}>{children}</label>
    )
})

const StructureButtonProgressIndicator = memoForwardRef(function StructureButtonProgress({ ...props }: StructureButtonProgressIndicatorProps, ref: Ref<HTMLProgressElement>) {
    return (
        <progress {...useMergedProps({ class: "btn-progress-indicator" }, { ...props, ref })} />
    )
})
