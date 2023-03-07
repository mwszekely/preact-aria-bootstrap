import { clsx } from "clsx";
import { ComponentChildren, h, Ref, VNode } from "preact";
import { Button as AriaButton, ButtonPressEvent, ElementToTag, EventDetail, Progress, ToolbarChild } from "preact-aria-widgets";
import { returnZero, useAsyncHandler, UseAsyncHandlerParameters, useMergedProps } from "preact-prop-helpers";
import { Fade } from "preact-transition";
import { memo } from "preact/compat";
import { useContext } from "preact/hooks";
import { ButtonThemes, DefaultDisabledType, DisabledContext } from "../context.js";
import { Tooltip, TooltipProps } from "../tooltip/index.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { ButtonGroupChildProps, ButtonGroupContext } from "./button-group.js";

export interface ButtonProps<E extends HTMLElement> extends Pick<h.JSX.HTMLAttributes<E>, "children" | "style" | "class" | "className">, Partial<ButtonGroupChildProps>, Pick<UseAsyncHandlerParameters<any, any>, "debounce" | "throttle"> {
    ref?: Ref<E>;

    disabled?: boolean;

    loadingLabel?: string;

    tooltip?: ComponentChildren;

    tooltipPlacement?: TooltipProps["placement"];

    onPress: null | ((pressed: boolean | null, event: ButtonPressEvent<E>) => (void | Promise<void>));

    tag?: ElementToTag<E>;

    badge?: VNode;

    variantTheme?: ButtonThemes;
    variantFill?: "fill" | "outline";
    variantSize?: "sm" | "md" | "lg";

    /**
     * Generally only used as part of a menu button
     */
    variantDropdown?: "split" | "joined";

    /**
     * If outside of a `ButtonGroup`, effectively acts like a checkbox.
     * 
     * If inside of a `ButtonGroup`, used for multi-selection. Prefer `selectedIndex` for single-selection.
     * 
     */
    pressed?: boolean;
}

export const Button = memo(forwardElementRef(function Button<E extends HTMLElement>({ tag: Tag, tooltip, buttonGroupIndex, children, tooltipPlacement, badge, pressed: standaloneOrMultiSelectPressed, disabled: userDisabled, onPress: onPressAsync, variantDropdown, variantFill, variantSize, loadingLabel, throttle, debounce, variantTheme, ...props }: ButtonProps<E>, ref?: Ref<E>) {
    Tag ??= "button" as never;

    const { currentCapture, pending: individualPending, syncHandler, callCount } = useAsyncHandler({
        asyncHandler: onPressAsync,
        capture: (e) => e[EventDetail].pressed,
        debounce,
        throttle
    });

    // A button can look pressed for multiple reasons:
    // * The user has specified the button is pressed.
    // * This button is contained in a single-select widget, and that widget is telling this button that it is the selected one among all its siblings.
    // * The onPress handler is an async handler that sets the button to pressed/unpressed, in which case we show it in that state until the handler completes.
    const buttonGroupInfo = useContext(ButtonGroupContext);
    const { pendingIndex } = (buttonGroupInfo ?? {});
    const isThePressedOne = ((pendingIndex == null ? (individualPending ? currentCapture : standaloneOrMultiSelectPressed) : (pendingIndex === buttonGroupIndex)) ?? null);
    const singleSelectPending = pendingIndex != null && isThePressedOne;
    const defaultDisabled = useContext(DisabledContext);
    const disabledType = useContext(DefaultDisabledType);
    const pending = ((individualPending || singleSelectPending) ?? false);
    //variantSize ??= "md";
    let disabled = userDisabled;
    disabled ||= defaultDisabled;
    //disabled ||= (pendingIndex != null);
    disabled ||= pending;
    const d = disabled ? disabledType : false;

    children = <>{children}{badge}</>


    if (buttonGroupInfo == null) {
        return (
            <ButtonStructure<E>
                ref={ref}
                Tag={(Tag) as never}
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
                pressed={isThePressedOne}
                onPress={syncHandler ?? null}
                otherProps={props}
                variantFill={variantFill ?? null}
            />
        )
    }
    else {
        return (
            <ToolbarChild<E>
                index={buttonGroupIndex ?? 0}
                ariaPropName="aria-pressed"
                selectionMode="disabled"
                getSortValue={returnZero}
                render={toolbarChildInfo => {
                    return (<ButtonStructure<E>
                        ref={ref}
                        Tag={(Tag) as never}
                        tooltip={tooltip}
                        disabled={d}
                        pending={pending}
                        children={children}
                        tooltipPlacement={tooltipPlacement}
                        loadingLabel={loadingLabel ?? null}
                        variantTheme={variantTheme ?? "primary"}
                        variantFill={variantFill ?? null}
                        variantSize={variantSize}
                        variantDropdown={variantDropdown || null}
                        pressed={toolbarChildInfo.singleSelectionChildReturn.selected || isThePressedOne}
                        callCount={callCount}
                        onPress={(e) => {
                            toolbarChildInfo.singleSelectionChildReturn.setThisOneSelected(e);
                            return syncHandler?.(e);
                        }}
                        otherProps={useMergedProps(props, toolbarChildInfo.props)}
                    />);
                }}
            />
        )
    }
}))

/**
 * A "raw" button -- just the markup.
 */
const ButtonStructure = memo(forwardElementRef(function ButtonStructure<E extends Element>({ Tag, tooltip, disabled, onPress, pressed, loadingLabel, otherProps, tooltipPlacement, pending, variantDropdown, variantTheme, variantFill, variantSize, children, callCount }: { ref: Ref<E> | undefined, callCount: number, variantDropdown: "joined" | "split" | null; variantSize: "sm" | "md" | "lg" | undefined; variantFill: "fill" | "outline" | null; tooltip: ComponentChildren | undefined, children: ComponentChildren, variantTheme: ButtonThemes, pending: boolean, loadingLabel: string | null, Tag: string, disabled: boolean | "soft" | "hard", tooltipPlacement: TooltipProps["placement"], pressed: null | boolean, onPress: null | ((e: ButtonPressEvent<E>) => void), otherProps: h.JSX.HTMLAttributes<E> }, ref?: Ref<E>) {
    return (
        <AriaButton<E>
            tagButton={(Tag) as never}
            disabled={disabled}
            onPress={onPress}
            pressed={pressed}
            render={buttonInfo => {
                return (
                    <Progress<HTMLSpanElement, HTMLLabelElement>
                        ariaLabel={loadingLabel ?? "Please wait while the operation completes."}
                        value={pending ? "indeterminate" : "disabled"}

                        tagIndicator="span"
                        render={progressInfo => {
                            const { propsIndicator, propsRegion } = progressInfo;
                            const loadingJsx = (<Fade show={pending}><span class="spinner-border" {...propsIndicator} /></Fade>)
                            if (pressed !== null)
                                variantFill ??= (pressed ? "fill" : "outline");

                            const buttonClass = clsx(`btn position-relative`, variantDropdown && "dropdown-toggle", variantDropdown == "split" && "dropdown-toggle-split", variantSize && `btn-${variantSize}`, `btn${variantFill == "outline" ? "-outline" : ""}-${variantTheme || "primary"}`, pending && "pending", pressed && "pressed", disabled && "disabled", buttonInfo.pressReturn.pressing && "active");

                            const ret = (h(Tag as never, useMergedProps<E>(otherProps, buttonInfo.props, { className: buttonClass, ref }), children, loadingJsx))
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
