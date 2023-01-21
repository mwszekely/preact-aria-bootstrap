import clsx from "clsx";
import { Paginated, Pagination } from "../pagination";
import { ComponentChildren, h, Ref, VNode } from "preact";
import { Gridlist, GridlistChild, GridlistRow } from "preact-aria-widgets";
import { findFirstTabbable, returnZero, useHasCurrentFocus, useMergedProps, usePress, useRefElement, useStableCallback, useState, useTimeout } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useCallback, useEffect } from "preact/hooks"
import { forwardElementRef } from "../utility/forward-element-ref";
import { KeyboardAssistIcon } from "../utility/keyboard-assist";
import { useUpdateRenderCounter } from "../utility/render-counter";
import { GlobalAttributes, PaginatedProps, LabelledProps } from "../utility/types";
import { useClonedElement } from "../utility/use-cloned-element";

export interface ListProps extends GlobalAttributes<HTMLDivElement, "children"> {
    disabled?: boolean;
    selectedIndex?: number | null;
    onSelectedIndexChange?: null | ((index: number | null) => (void | Promise<void>));
}

export interface ListItemProps extends GlobalAttributes<HTMLDivElement, "children"> {
    index: number;
    disabled?: boolean;
    selected?: boolean;
    iconStart?: ComponentChildren | null | undefined;
    iconEnd?: ComponentChildren | null | undefined;
    onSelectedChange?: null | ((selected: boolean) => (void | Promise<void>));
    getSortValue?: () => unknown;
}

export function List({ disabled, selectedIndex, onSelectedIndexChange, label, labelPosition, children, paginationLabel, paginationLocation, paginationSize, ...props }: PaginatedProps<LabelledProps<ListProps, never>>) {

    const [focusedInner, setFocusedInner] = useState(false);
    const { refElementReturn } = useRefElement<HTMLDivElement>({ refElementParameters: {} })
    const { hasCurrentFocusReturn } = useHasCurrentFocus<HTMLDivElement>({ hasCurrentFocusParameters: { onCurrentFocusedChanged: null, onCurrentFocusedInnerChanged: setFocusedInner }, refElementReturn })
    //const WINDOW_SIZE = 20;
    const [paginationStart, setPaginationStart] = useState<number | null>(0);
    const [paginationEnd, setPaginationEnd] = useState<number | null>(paginationSize ?? null);

    

    if (paginationSize)
        paginationLocation ||= "before";

    return (
        <Gridlist<HTMLDivElement, HTMLDivElement, HTMLDivElement, HTMLLabelElement>
            selectedIndex={selectedIndex ?? null}
            onSelectedIndexChange={onSelectedIndexChange}
            paginationMin={paginationStart}
            paginationMax={paginationEnd}
            staggered={true}
            ariaLabel={labelPosition == "hidden" ? label : null}
            groupingType="without-groups"
            selectionLimit={selectedIndex === undefined ? "multi" : "single"}
            render={info => {

                useUpdateRenderCounter("Gridlist");

                return (
                    <Paginated childCount={info.paginatedChildrenReturn.childCount ?? 0} paginationLabel={paginationLabel} paginationLocation={paginationLocation} paginationSize={paginationSize} setPaginationEnd={setPaginationEnd} setPaginationStart={setPaginationStart}>
                        <KeyboardAssistIcon leftRight={true} upDown={true} homeEnd={true} pageKeys={true} typeahead={false} typeaheadActive={false}>
                            <div class={clsx(`list-group gridlist-group`)} {...useMergedProps(props, refElementReturn.propsStable, hasCurrentFocusReturn.propsStable, info.propsGridlist)}>{children}</div>
                        </KeyboardAssistIcon>
                    </Paginated>
                )
            }}

        />
    )
}

export const ListItem = memo(forwardElementRef(function ListItem({ index, getSortValue, children, selected, disabled, iconEnd, iconStart, onSelectedChange, ...props }: ListItemProps, ref?: Ref<any>) {
   

    return (
        <GridlistRow<HTMLDivElement, HTMLDivElement>
            index={index}
            ariaPropName="aria-selected"
            getSortValue={getSortValue ?? returnZero}
            render={infoRow => {
                useUpdateRenderCounter("GridlistRow");
                const { refElementReturn: { propsStable: p2, getElement }, refElementReturn } = useRefElement<HTMLDivElement>({ refElementParameters: {} })
                const { pressReturn: { longPress, propsUnstable: p1, pseudoActive } } = usePress<HTMLDivElement>({
                    pressParameters: {
                        focusSelf: useCallback(() => {
                            return getElement()?.focus();
                        }, []),
                        onPressSync: useStableCallback((e) => infoRow.rowAsChildOfGridReturn.singleSelectionChildReturn.setThisOneSelected(e)),
                        ...infoRow.rowAsChildOfGridReturn.pressParameters
                    },
                    refElementReturn
                });

                // For performance reasons, we stagger rendering each row's child
                // It does take maybe 1.5 times as long, but you can still interact with the page while it's happening at least.
                /*let timeout = (Math.floor(index / 100) * 500)
                const [show, setShow] = useState(timeout == 0);
                useTimeout({
                    timeout,
                    callback: () => setShow(true)
                })*/
                const c = <>
                    <ListItemStartEnd index={0} hidden={iconStart == null} children={iconStart} />
                    <ListItemText {...useMergedProps(p1, p2)}>{children}</ListItemText>
                    <ListItemStartEnd index={2} hidden={iconEnd == null} children={iconEnd} />
                </>
                const show = infoRow.rowAsChildOfGridReturn.staggeredChildReturn.isStaggered ? infoRow.rowAsChildOfGridReturn.staggeredChildReturn.staggeredVisible : true;
                if (!show)
                    if (infoRow.rowAsChildOfGridReturn.paginatedChildReturn.isPaginated && !infoRow.rowAsChildOfGridReturn.paginatedChildReturn.paginatedVisible)
                        return null!;
                    else
                        return <div aria-busy="true" class="gridlist-item gridlist-item-placeholder"><span class={clsx(!show ? "opacity-100" : "opacity-0", "placeholder-glow")}><span class="placeholder w-100"></span></span></div>;

                return (
                    <div aria-busy={(!show).toString()} class={clsx(
                        `gridlist-item`,
                        infoRow.rowAsChildOfGridReturn.paginatedChildReturn.isPaginated ? !infoRow.rowAsChildOfGridReturn.paginatedChildReturn.paginatedVisible && "d-none" : "",
                        !show && "gridlist-item-placeholder",
                        "list-group-item list-group-item-action",
                        !!iconStart && "list-group-item-with-icon-start",
                        !!iconEnd && "list-group-item-with-icon-end",
                        disabled && "disabled",
                        (infoRow.rowAsChildOfGridReturn.singleSelectionChildReturn.selected || selected) && `active`
                    )} {...useMergedProps(infoRow.props, { ...props, ref })}>

                        {show && c}
                    </div>
                )
            }}
        />
    )
}))

const ListItemText = memo(forwardElementRef(function ListItemText({ children, ...props }: h.JSX.HTMLAttributes<any>, ref?: Ref<any>) {
    return (
        <GridlistChild<HTMLDivElement>
            index={1}
            render={infoCell => {
                useUpdateRenderCounter("GridlistCell");
                return (
                    <div {...useMergedProps(infoCell.props, props, { ref })} class={clsx("gridlist-item-text")}>
                        {children}
                    </div>
                )
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
