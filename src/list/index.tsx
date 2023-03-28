import { clsx } from "clsx";
import { ComponentChildren, createContext, h, Ref, VNode } from "preact";
import { Gridlist, GridlistCellInfo, GridlistChild, GridlistRow, GridlistRowInfo, ProgressWithHandler, UseGridlistRowReturnType, UseProgressWithHandlerReturnType } from "preact-aria-widgets";
import { AsyncHandler, returnUndefined, returnZero, useHasCurrentFocus, useMergedProps, usePress, useRefElement, useStableCallback, useState } from "preact-prop-helpers";
import { Fade } from "preact-transition";
import { memo } from "preact/compat";
import { useCallback, useContext, useRef } from "preact/hooks";
import { ButtonThemes } from "../context.js";
import { Paginated } from "../pagination/index.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { KeyboardAssistIcon } from "../utility/keyboard-assist.js";
import { useUpdateRenderCounter } from "../utility/render-counter.js";
import { GlobalAttributes, LabelledProps, PaginatedProps } from "../utility/types.js";
import { useClonedElement } from "../utility/use-cloned-element.js";

export interface ListProps extends GlobalAttributes<HTMLDivElement, "children"> {
    /** Used to determine if left/right arrow key navigation is shown as an option */
    columns?: number;
    disabled?: boolean;
    selectedIndex?: number | null;
    staggered?: boolean;
    onSelectedIndexChange?: null | ((index: number | null) => (void | Promise<void>));
}

export interface ListItemProps extends GlobalAttributes<HTMLDivElement, "children"> {
    index: number;
    variantTheme?: ButtonThemes;
    disabled?: boolean;
    selected?: boolean;
    iconStart?: ComponentChildren | null | undefined;
    iconEnd?: ComponentChildren | null | undefined;
    onSelectedChange?: null | ((selected: boolean) => (void | Promise<void>));
    getSortValue?: () => unknown;
    badge?: VNode;

    loadingLabel?: string;
    onPress?: AsyncHandler<h.JSX.TargetedEvent<HTMLDivElement, Event>, void>
}

const DefaultDisabled = createContext(false);

export function List({ columns, disabled, selectedIndex, onSelectedIndexChange, label, labelPosition, children, paginationLabel, paginationLocation, paginationSize, staggered, ...props }: PaginatedProps<LabelledProps<ListProps, never>>) {

    const [focusedInner, setFocusedInner] = useState(false);
    const { refElementReturn, propsStable } = useRefElement<HTMLDivElement>({ refElementParameters: {} })
    const { hasCurrentFocusReturn } = useHasCurrentFocus<HTMLDivElement>({ hasCurrentFocusParameters: { onCurrentFocusedChanged: null, onCurrentFocusedInnerChanged: setFocusedInner }, refElementReturn })
    const [paginationStart, setPaginationStart] = useState<number | null>(paginationSize == null ? null : 0);
    const [paginationEnd, setPaginationEnd] = useState<number | null>(paginationSize ?? null);

    if (paginationSize)
        paginationLocation ||= "before";

    return (
        <DefaultDisabled.Provider value={disabled ?? false}>
            <Gridlist<HTMLDivElement, HTMLDivElement, HTMLDivElement, HTMLLabelElement>
                selectedIndex={selectedIndex ?? null}
                onSelectedIndexChange={onSelectedIndexChange}
                paginationMin={paginationStart}
                paginationMax={paginationEnd}
                staggered={staggered || false}
                ariaLabel={labelPosition == "hidden" ? label : null}
                groupingType="without-groups"
                selectionLimit={selectedIndex === undefined ? "multi" : "single"}
                render={info => {

                    useUpdateRenderCounter("Gridlist");

                    const labelJsx = <label {...info.propsGridlistLabel}>{label}</label>

                    return (
                        <>
                            {labelPosition == "before" && labelJsx}
                            <Paginated childCount={info.paginatedChildrenReturn.childCount ?? 0} paginationLabel={paginationLabel} paginationLocation={paginationLocation} paginationSize={paginationSize} setPaginationEnd={setPaginationEnd} setPaginationStart={setPaginationStart}>

                                <div class={clsx(`list-group gridlist-group`)} {...useMergedProps(props, propsStable, hasCurrentFocusReturn.propsStable, info.propsGridlist)}>{children}</div>

                            </Paginated>
                            {labelPosition == "after" && labelJsx}
                        </>
                    )
                }}

            />
        </DefaultDisabled.Provider>
    )
}

const ListItemNonPaginated = memo(({ infoRow, progressInfo, badge, disabled, iconEnd, iconStart, variantTheme, selected, children, props, ref2 }: Pick<ListItemProps, "children" | "selected" | "badge" | "variantTheme" | "disabled" | "iconStart" | "iconEnd"> & { props: h.JSX.HTMLAttributes<HTMLDivElement>, ref2: Ref<HTMLDivElement>, progressInfo: UseProgressWithHandlerReturnType<any, any, HTMLSpanElement, HTMLLabelElement>, infoRow: UseGridlistRowReturnType<HTMLDivElement, HTMLDivElement, GridlistRowInfo<HTMLDivElement, HTMLDivElement>, GridlistCellInfo<HTMLDivElement>> }) => {
    useUpdateRenderCounter("GridlistRow");
    const { refElementReturn: { getElement }, refElementReturn, propsStable: p2 } = useRefElement<HTMLDivElement>({ refElementParameters: {} })
    const { pressReturn: { longPress, pressing }, props: p1 } = usePress<HTMLDivElement>({
        pressParameters: {
            focusSelf: useCallback(() => {
                return getElement()?.focus();
            }, []),
            onPressSync: useStableCallback((e) => infoRow.singleSelectionChildReturn.setThisOneSelected(e)),
            //...infoRow.pressParameters
        },
        refElementReturn
    });

    const show = !infoRow.staggeredChildReturn.hideBecauseStaggered;
    const { propsIndicator, propsRegion } = progressInfo;
    const loadingJsx = (<Fade show={progressInfo.asyncHandlerReturn.pending} exitVisibility="removed"><span class="spinner-border spinner-border-sm text-secondary" {...propsIndicator} /></Fade>)
    //const buttonClass = clsx(`btn position-relative`, variantDropdown && "dropdown-toggle", variantDropdown == "split" && "dropdown-toggle-split", variantSize && `btn-${variantSize}`, `btn${variantFill == "outline" ? "-outline" : ""}-${variantTheme || "primary"}`, pending && "pending", pressed && "pressed", disabled && "disabled", buttonInfo.pressReturn.pseudoActive && "active");
    const finalPropsForText = useMergedProps(p1, p2);
    const finalPropsForDiv = useMergedProps(
        infoRow.props,
        { ...props, ref: ref2 },
        {
            className: clsx(
                infoRow.paginatedChildReturn.hideBecausePaginated? "d-none" : "",
                `gridlist-item`,
                variantTheme && `list-group-item-${variantTheme}`,
                infoRow.paginatedChildReturn.isPaginated ? !infoRow.paginatedChildReturn.paginatedVisible && "d-none" : "",
                !show && "gridlist-item-placeholder",
                "list-group-item list-group-item-action",
                !!iconStart && "list-group-item-with-icon-start",
                !!iconEnd && "list-group-item-with-icon-end",
                !!badge && "list-group-item-with-badge",
                !!progressInfo.asyncHandlerReturn.pending && "list-group-item-with-pending",
                disabled && "disabled",
                (infoRow.singleSelectionChildReturn.selected || selected) && `active`
            )
        }
    );
    const c = <>
        <ListItemStartEnd index={0} hidden={iconStart == null} children={iconStart} />
        <ListItemText onPress={progressInfo.asyncHandlerReturn.syncHandler} {...finalPropsForText}><span>{children}</span><span class="list-group-item-badge-and-spinner"><div>{badge}</div><div>{loadingJsx}</div></span></ListItemText>

        <ListItemStartEnd index={2} hidden={iconEnd == null} children={iconEnd} />
    </>


    if (!show)
        if (infoRow.paginatedChildReturn.isPaginated && !infoRow.paginatedChildReturn.paginatedVisible)
            return null!;
        else
            return <div aria-busy="true" class="gridlist-item gridlist-item-placeholder"><span class={clsx(!show ? "opacity-100" : "opacity-0", "placeholder-glow")}><span class="placeholder w-100"></span></span></div>;


    return (
        <KeyboardAssistIcon leftRight={(!!iconStart || !!iconEnd)} upDown={true} homeEnd={true} pageKeys={true} typeahead={true} typeaheadActive={false}>
            <div
                aria-busy={(!show).toString()}
                {...finalPropsForDiv}>

                {show && c}
            </div>
        </KeyboardAssistIcon>
    );
})

export const ListItem = memo(forwardElementRef(function ListItem({ index, variantTheme, getSortValue, children, selected, disabled, iconEnd, iconStart, badge, onPress, loadingLabel, onSelectedChange, ...props }: ListItemProps, ref?: Ref<any>) {

    const defaultDisabled = useContext(DefaultDisabled);
    disabled ||= defaultDisabled;

    let everShownPaginated = useRef(false);

    return (
        <ProgressWithHandler<h.JSX.TargetedEvent<any, Event>, void, HTMLSpanElement, HTMLLabelElement>
            ariaLabel={loadingLabel ?? "Please wait while the operation completes."}
            asyncHandler={onPress ?? null}
            capture={returnUndefined}

            tagIndicator="span"
            render={progressInfo => {
                return (
                    <GridlistRow<HTMLDivElement, HTMLDivElement>
                        index={index}
                        ariaPropName="aria-selected"
                        getSortValue={getSortValue ?? returnZero}
                        disabled={disabled}
                        noTypeahead={true}
                        getText={useCallback((e: HTMLDivElement) => { return e?.querySelector(".gridlist-item-text")?.textContent || "" }, [])}

                        render={infoRow => {


                            if (infoRow.paginatedChildReturn.hideBecausePaginated && everShownPaginated.current == false)
                                return <div key="hide-because-paginated" />

                            everShownPaginated.current = true;

                            // TODO: Get a better placeholder system
                            if (infoRow.staggeredChildReturn.hideBecauseStaggered)
                                return <div key="hide-because-staggered" class={`gridlist-item gridlist-item-placeholder list-group-item`} role="option" aria-busy="true" /> // Besides being a placeholder visually, this is orders of magnitude faster than null, for some reason?

                            return <ListItemNonPaginated key="show" infoRow={infoRow} progressInfo={progressInfo} badge={badge} children={children} disabled={disabled} iconEnd={iconEnd} iconStart={iconStart} selected={selected} variantTheme={variantTheme} props={props} ref2={ref!} />;
                        }} />)
            }}
        />
    )
}))

const ListItemText = memo(forwardElementRef(function ListItemText({ onPress, children, ...props }: h.JSX.HTMLAttributes<any> & { onPress: ((e: h.JSX.TargetedEvent<HTMLDivElement, Event>) => void) | null | undefined }, ref?: Ref<any>) {
    return (
        <GridlistChild<HTMLDivElement>
            index={1}
            onPressSync={onPress}
            render={infoCell => {
                useUpdateRenderCounter("GridlistCell");
                return (
                    <div {...useMergedProps(infoCell.props, props, { ref })} class={clsx("gridlist-item-text")}>
                        {children}
                    </div>
                );
            }}
        />
    )
}))

interface ListItemStartEndProps {
    index: 0 | 2;
    children: ComponentChildren;
    hidden: boolean;
}

const ListItemStartEnd = memo(function ListItemStartEnd({ hidden, index, children }: ListItemStartEndProps) {
    return (
        <GridlistChild<HTMLDivElement>
            index={index}
            hidden={hidden}
            focusSelf={useStableCallback(e => {
                e.focus();
            })}
            render={info => {
                useUpdateRenderCounter("GridlistCell");
                const ret = (
                    <div class={clsx("list-group-item-icon", `list-group-item-icon-${index === 0 ? "start" : "end"}`)}>
                        {useClonedElement(children, info.props, undefined)}
                    </div>
                )
                if (hidden)
                    return <>{null}</>;
                else
                    return ret;
            }}
        />
    )
})
