import { clsx } from "clsx";
import { Gridlist, GridlistChild, GridlistRow, GridlistRows, ProgressWithHandler } from "preact-aria-widgets";
import { AsyncHandler, ComponentChildren, EventDetail, JSX, Nullable, PressEventReason, Ref, UsePaginatedChildReturnTypeSelf, UsePressParametersSelf, UseStaggeredChildReturnTypeSelf, UseTypeaheadNavigationReturnTypeSelf, VNode, createContext, forwardRef, memo, returnUndefined, useCallback, useContext, useMergedProps, usePress, useRefElement, useStableCallback, useState } from "preact-prop-helpers";
import { Fade } from "preact-transition";
import { ButtonThemes, useAutoAsyncHandler } from "../context.js";
import { Paginated } from "../pagination/index.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { KeyboardAssistIcon } from "../utility/keyboard-assist.js";
import { GlobalAttributes, LabelledProps, PaginatedProps } from "../utility/types.js";
import { useClonedElement } from "../utility/use-cloned-element.js";
//export { ListboxSingle, ListboxSingleItem, ListboxSingleItemProps, ListboxSingleProps } from "./listbox-single.js";


export interface ListProps extends GlobalAttributes<HTMLDivElement, "children"> {
    /**
     * Disables the entire list if set, allowing no selection or press events to occur.
     */
    disabled?: boolean;
    /**
     * Controls whether this list allows selection, and how many children can be selected.
     * 
     * * `"single"`: One child is selected with the `selectedIndex` prop.
     * * `"multi"`: Any number of children are selected on their individual `selected` props.
     * * `"off"`: Selection is disabled, implying this is a list of action items. 
     */
    selectionMode?: Nullable<"single" | "multi" | "off">;
    /**
     * When `selectionMode` is `"single"`, this is the index of the child that's currently selected.
     */
    selectedIndex?: number | null;
    /**
     * Delays rendering any given list item until the one before it renders. Recommended for long lists.
     */
    staggered?: boolean;
    /**
     * When `selectionMode` is `"single"`, this is called to change the selected index.
     */
    onSelectedIndexChange?: null | ((index: number | null) => (void | Promise<void>));

    children: VNode[];
}

export interface ListItemProps extends GlobalAttributes<HTMLDivElement, "children"> {
    /**
     * A unique integer for this child, relative to other children.
     */
    index: number;
    /**
     * The color of this list item's background
     */
    variantTheme?: ButtonThemes;
    /**
     * Disables this list item if set
     */
    disabled?: boolean;
    /**
     * **Multi-selection only**, i.e. if the parent List's `selectionMode` is `"multi"`.
     */
    selected?: boolean;
    /**
     * **Multi-selection only**, i.e. if the parent List's `selectionMode` is `"multi"`.
     */
    onSelectedChange?: null | ((selected: boolean) => (void | Promise<void>));
    /**
     * Optional child on the left side of the list item
     */
    iconStart?: ComponentChildren | null | undefined;
    /**
     * Optional child on the right side of the list item
     */
    iconEnd?: ComponentChildren | null | undefined;

    /**
     * A visual indicator in the corner of the list item. Read out alongside the main contents as one long string, so label it well.
     */
    badge?: VNode;

    loadingLabel?: string;

    /**
     * Optional. Only necessary if this is an "action-only" list; it's not needed for selection behavior.
     */
    onPress?: AsyncHandler<JSX.TargetedEvent<HTMLDivElement, Event>, void>;

    keyboardControlsDescription?: string;
}

const DefaultDisabled = createContext(false);
const TypeaheadStatus = createContext<UseTypeaheadNavigationReturnTypeSelf["typeaheadStatus"]>("none");

export const List = /* @__PURE__ */ memo(forwardRef((function List({ disabled, selectedIndex, selectionMode, onSelectedIndexChange, label, labelPosition, children, paginationLabel, paginationLocation, paginationSize, staggered, ...props }: PaginatedProps<LabelledProps<ListProps, never>>, ref?: Ref<any>) {

    labelPosition ??= "before";
    //const [focusedInner, setFocusedInner] = useState(false);
    //const { refElementReturn, propsStable } = useRefElement<HTMLDivElement>({ refElementParameters: {} })
    //const { hasCurrentFocusReturn } = useHasCurrentFocus<HTMLDivElement>({ hasCurrentFocusParameters: { onCurrentFocusedChanged: null, onCurrentFocusedInnerChanged }, refElementReturn })
    const [paginationStart, setPaginationStart] = useState<number | null>(paginationSize == null ? null : 0);
    const [paginationEnd, setPaginationEnd] = useState<number | null>(paginationSize ?? null);

    if (selectedIndex != null || onSelectedIndexChange != null) {
        console.assert(selectionMode == "single", `<List />: selectedIndex was specified even though selection is not enabled. Use the selectionMode prop to enable selection.`);
    }

    if (paginationSize)
        paginationLocation ||= "before";

    if (labelPosition == "hidden")
        console.assert(typeof label == "string", `<List />: When labelPosition is 'hidden', the label must be a string (as opposed to arbitrary JSX)`);

    return (
        <DefaultDisabled.Provider value={disabled ?? false}>
            <Gridlist<HTMLDivElement, HTMLDivElement, HTMLDivElement, HTMLLabelElement>
                initiallyTabbableColumn={1}
                singleSelectedIndex={selectedIndex ?? null}
                singleSelectionAriaPropName="aria-selected"
                onSingleSelectedIndexChange={useStableCallback(e => { debugger; onSelectedIndexChange?.(e[EventDetail].selectedIndex) })}
                paginationMin={paginationStart}
                paginationMax={paginationEnd}
                ariaLabel={labelPosition == "hidden" ? label as string : null}
                groupingType="without-groups"
                singleSelectionMode={selectionMode == "single" ? "activation" : "disabled"}
                multiSelectionMode={selectionMode == "multi" ? "activation" : "disabled"}

                render={info => {

                    const labelJsx = <label {...info.propsGridlistLabel}>{label}</label>
                    children ??= [];

                    return (
                        <TypeaheadStatus.Provider value={info.typeaheadNavigationReturn.typeaheadStatus}>
                            {labelPosition == "before" && labelJsx}
                            <Paginated childCount={children.length ?? 0} paginationLabel={paginationLabel} paginationLocation={paginationLocation} paginationSize={paginationSize} setPaginationEnd={setPaginationEnd} setPaginationStart={setPaginationStart}>
                                <div {...useMergedProps(props, info.propsGridlist, { ref, class: `list-group gridlist-group` })}>
                                    <GridlistRows
                                        children={children}
                                        paginationMin={paginationStart}
                                        paginationMax={paginationEnd}
                                        staggered={staggered || false}
                                        render={useCallback(infoRows => {
                                            return (
                                                <>{infoRows.rearrangeableChildrenReturn.children}</>
                                            )
                                        }, [])}
                                    />
                                </div>
                            </Paginated>
                            {labelPosition == "after" && labelJsx}
                        </TypeaheadStatus.Provider>
                    )
                }}

            />
        </DefaultDisabled.Provider>
    )
})))

const ListItemNonPaginated = /* @__PURE__ */ memo((function ListItemNonPaginated({ onPressSync, infoRowProps, hideBecausePaginated, hideBecauseStaggered, excludeSpace, onPress, loadingLabel, badge, disabled, iconEnd, iconStart, variantTheme, selected, keyboardControlsDescription, children, props, ref2 }:
    Pick<ListItemProps, "children" | "selected" | "badge" | "variantTheme" | "disabled" | "iconStart" | "iconEnd"> &
    Pick<UsePressParametersSelf<any>, "excludeSpace" | "onPressSync"> &
    Pick<UsePaginatedChildReturnTypeSelf, "hideBecausePaginated"> &
    Pick<UseStaggeredChildReturnTypeSelf, "hideBecauseStaggered"> &
    { onPress: AsyncHandler<JSX.TargetedEvent<HTMLDivElement, Event>, void> | undefined, loadingLabel: Nullable<string>, infoRowProps: JSX.HTMLAttributes<HTMLDivElement>, props: JSX.HTMLAttributes<HTMLDivElement>, ref2: Ref<HTMLDivElement>, keyboardControlsDescription?: string }) {

    return (<ProgressWithHandler<JSX.TargetedEvent<any, Event>, void, HTMLSpanElement, HTMLLabelElement>
        ariaLabel={loadingLabel ?? "Please wait while the operation completes."}
        asyncHandler={useAutoAsyncHandler(async (a: void, b: JSX.TargetedEvent<any, Event>) => {
            // TODO: How'd we end up with onPress (from the user) AND onPress (from selection)?
            // Should selection have taken care of that? Does it already? What if it's async?
            let p = onPress?.(a, b);
            onPressSync?.(b as PressEventReason<any>);
            if (p && typeof p == "object" && "then" in p)
                await p;
        })
        }
        capture={returnUndefined}

        tagProgressIndicator="span"
        render={progressInfo => {

            const { refElementReturn: { getElement }, refElementReturn, propsStable: p2 } = useRefElement<HTMLDivElement>({ refElementParameters: {} })
            const { pressReturn: { longPress, pressing }, props: p1 } = usePress<HTMLDivElement>({
                pressParameters: {
                    focusSelf: useCallback(() => {
                        return getElement()?.focus();
                    }, []),
                    allowRepeatPresses: null,
                    excludeEnter: null,
                    excludePointer: null,
                    longPressThreshold: null,
                    onPressingChange: null,
                    excludeSpace,
                    onPressSync: progressInfo.asyncHandlerReturn.syncHandler
                },
                refElementReturn
            });

            const show = !hideBecauseStaggered;
            const { propsProgressIndicator, propsProgressRegion } = progressInfo;
            const loadingJsx = (<Fade show={progressInfo.asyncHandlerReturn.pending} exitVisibility="removed"><span className="spinner-border spinner-border-sm text-secondary" {...propsProgressIndicator} /></Fade>)
            //const buttonClass = clsx(`btn position-relative`, variantDropdown && "dropdown-toggle", variantDropdown == "split" && "dropdown-toggle-split", variantSize && `btn-${variantSize}`, `btn${variantFill == "outline" ? "-outline" : ""}-${variantTheme || "primary"}`, pending && "pending", pressed && "pressed", disabled && "disabled", buttonInfo.pressReturn.pseudoActive && "active");
            const finalPropsForText = useMergedProps(p1, p2);
            const finalPropsForDiv = useMergedProps(
                infoRowProps,
                { ...props, ref: ref2 },
                {
                    className: clsx(
                        hideBecausePaginated ? "d-none" : "",
                        `gridlist-item`,
                        variantTheme && `list-group-item-${variantTheme}`,
                        hideBecausePaginated ? "d-none" : "",
                        !show && "gridlist-item-placeholder",
                        "list-group-item list-group-item-action",
                        !!iconStart && "list-group-item-with-icon-start",
                        !!iconEnd && "list-group-item-with-icon-end",
                        !!badge && "list-group-item-with-badge",
                        !!progressInfo.asyncHandlerReturn.pending && "list-group-item-with-pending",
                        disabled && "disabled",
                        (selected) && `active`
                    )
                }
            );
            const c = <>
                <ListItemStartEnd index={0} hidden={iconStart == null} children={iconStart} />
                <ListItemText onPress={progressInfo.asyncHandlerReturn.syncHandler} {...finalPropsForText}>{children}<span className="list-group-item-badge-and-spinner"><div>{badge}</div><div>{loadingJsx}</div></span></ListItemText>

                <ListItemStartEnd index={2} hidden={iconEnd == null} children={iconEnd} />
            </>

            const typeaheadStatus = useContext(TypeaheadStatus);

            if (!show)
                if (hideBecausePaginated)
                    return null!;
                else
                    return <div aria-busy="true" className="gridlist-item gridlist-item-placeholder"><span className={clsx(!show ? "opacity-100" : "opacity-0", "placeholder-glow")}><span className="placeholder w-100"></span></span></div>;


            return (
                <KeyboardAssistIcon
                    leftRight={(!!iconStart || !!iconEnd)}
                    upDown={true}
                    homeEnd={true}
                    pageKeys={true}
                    typeaheadStatus={typeaheadStatus}
                    activateSpace={typeaheadStatus == 'none'}
                    activateEnter={true}
                    description={keyboardControlsDescription ?? "Select a list item:"}>
                    <div
                        aria-busy={(!show)}
                        {...finalPropsForDiv}>

                        {show && c}
                    </div>
                </KeyboardAssistIcon>
            );

        }} />
    );
}))

export const ListItem = /* @__PURE__ */ memo(forwardElementRef((function ListItem({ index, keyboardControlsDescription, variantTheme, children, selected, disabled, iconEnd, iconStart, badge, onPress, loadingLabel, onSelectedChange, ...props }: ListItemProps, ref?: Ref<any>) {

    const defaultDisabled = useContext(DefaultDisabled);
    disabled ||= defaultDisabled;

    //let everShownPaginated = useRef(false);

    return (
        <GridlistRow<HTMLDivElement, HTMLDivElement>
            index={index}
            singleSelectionDisabled={disabled}
            noTypeahead={true}
            getText={useCallback((e: HTMLDivElement) => { return e?.querySelector(".gridlist-item-text")?.textContent || "" }, [])}

            render={infoRow => {

                const p2 = (props);
                const p3 = useMergedProps(infoRow.props, props);

                if (infoRow.paginatedChildReturn.hideBecausePaginated)
                    return <div {...p3} key="hide-because-paginated" />


                // TODO: Get a better placeholder system
                if (infoRow.hidden)
                    return <div {...p3} key="hide-because-staggered" className={`gridlist-item gridlist-item-placeholder list-group-item`} role="option" aria-busy="true" /> // Besides being a placeholder visually, this is orders of magnitude faster than null, for some reason?

                return <ListItemNonPaginated key="show"
                    keyboardControlsDescription={keyboardControlsDescription}
                    infoRowProps={infoRow.props}
                    excludeSpace={infoRow.pressParameters.excludeSpace}
                    onPressSync={infoRow.pressParameters.onPressSync}
                    onPress={onPress}
                    hideBecausePaginated={false}
                    hideBecauseStaggered={false}
                    loadingLabel={loadingLabel}
                    badge={badge}
                    children={children}
                    disabled={disabled}
                    iconEnd={iconEnd}
                    iconStart={iconStart}
                    selected={selected}
                    variantTheme={variantTheme}
                    props={p2}
                    ref2={ref!} />;
            }} />)
})));


const ListItemText = /* @__PURE__ */ memo(forwardElementRef((function ListItemText({ onPress, children, ...props }: JSX.HTMLAttributes<any> & { onPress: ((e: JSX.TargetedEvent<HTMLDivElement, Event>) => void) | null | undefined }, ref?: Ref<any>) {
    return (
        <GridlistChild<HTMLDivElement>
            index={1}
            onPressSync={onPress}
            render={infoCell => {

                return (
                    <div {...useMergedProps(infoCell.propsCell, infoCell.propsPress, infoCell.propsTabbable, props, { ref }, { class: clsx("gridlist-item-text") })}>
                        {children}
                    </div>
                );
            }}
        />
    )
})))

interface ListItemStartEndProps {
    index: 0 | 2;
    children?: ComponentChildren;
    hidden: boolean;
}

const ListItemStartEnd = /* @__PURE__ */ memo((function ListItemStartEnd({ hidden, index, children }: ListItemStartEndProps) {
    return (
        <GridlistChild<HTMLDivElement>
            index={index}
            untabbable={hidden}
            focusSelf={useStableCallback(e => {
                e.focus();
            })}
            render={infoCell => {
                const ret = (
                    <div className={clsx("list-group-item-icon", `list-group-item-icon-${index === 0 ? "start" : "end"}`)}>
                        {useClonedElement(children, useMergedProps(infoCell.propsCell, infoCell.propsTabbable), undefined)}
                    </div>
                )
                if (hidden)
                    return <>{null}</>;
                else
                    return ret;
            }}
        />
    )
}))
