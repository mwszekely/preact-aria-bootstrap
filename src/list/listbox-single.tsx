import { clsx } from "clsx";
import { RenderableProps } from "preact";
import { Listbox, ListboxItem } from "preact-aria-widgets";
import { ElementProps, EventDetail, SelectedIndexChangeEvent, UseCompleteListNavigationParameters, returnZero, useMergedProps, useStableCallback, useState } from "preact-prop-helpers";
import { GlobalAttributes, LabelledProps, OmitStrong, PaginatedProps } from "../utility/types.js";
import { Paginated } from "../pagination/index.js";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility/forward-element-ref.js";

export interface ListboxSingleProps {
    selectedIndex: number | null;
    staggered?: boolean;
    onSelectedIndexChange: (nextIndex: number | null, event: SelectedIndexChangeEvent) => void;
}

export interface ListboxSingleItemProps extends GlobalAttributes<HTMLLIElement> {
    index: number;
    disabled?: boolean;
}

/**
 * A listbox is a much simpler List.
 * 
 * Unlike a List, there can't be any additional elements for each list item -- e.g. you can't have a "delete" button for each item in a listbox.
 * 
 * @param param0 
 * @returns 
 */
export function ListboxSingle({ selectedIndex, onSelectedIndexChange, children, label, labelPosition, staggered, paginationLabel, paginationLocation, paginationSize }: PaginatedProps<LabelledProps<RenderableProps<ListboxSingleProps>, never>>) {
    const [paginationMin, setPaginationMin] = useState(paginationSize == null ? null : 0);
    const [paginationMax, setPaginationMax] = useState(paginationSize);
    if (paginationSize)
        paginationLocation ||= "before";

    return (
        <Listbox<HTMLOListElement, HTMLLIElement, HTMLLabelElement>
            selectedIndex={selectedIndex}
            selectionLimit="single"
            onSelectedIndexChange={useStableCallback((e) => { onSelectedIndexChange(e[EventDetail].selectedIndex, e) })}
            staggered={staggered}
            paginationMin={paginationMin}
            paginationMax={paginationMax}

            ariaLabel={labelPosition == "hidden" ? label : null}
            render={info => {
                const labelJsx = (<label {...info.propsListboxLabel}>{label}</label>);
                return (
                    <>
                        {labelPosition == 'before' && labelJsx}

                        <Paginated paginationSize={paginationSize} childCount={info.paginatedChildrenReturn.childCount || 0} setPaginationEnd={setPaginationMax} setPaginationStart={setPaginationMin} paginationLabel={paginationLabel} paginationLocation={paginationLocation}  >
                            <ol {...useMergedProps(info.propsListbox, { className: "list-group" })}>
                                {children}
                            </ol>
                        </Paginated>
                        {labelPosition == 'after' && labelJsx}
                    </>
                )
            }}
        />
    );
}

export const ListboxSingleItem = memo(forwardElementRef(function ListboxSingleItem({ index, disabled, children, ...props }: RenderableProps<ListboxSingleItemProps>, ref) {
    return (
        <ListboxItem<HTMLLIElement>
            getSortValue={returnZero}
            index={index}
            selected={null}
            unselectable={disabled}
            render={info => {
                if (info.staggeredChildReturn.hideBecauseStaggered)
                    return <li class="d-none" />;
                if (info.paginatedChildReturn.hideBecausePaginated)
                    return <li class="d-none" />;

                return (
                    <ListboxSingleItemStatic {...useMergedProps(info.props, { ...props, ref }, info.propsPressStable)} disabled={disabled} selected={info.singleSelectionChildReturn.selected as boolean}>{children}</ListboxSingleItemStatic>
                )
            }}
        />
    )
}))

const ListboxSingleItemStatic = memo(forwardElementRef(function ListboxSingleItemStatic({ selected, children, disabled, ...props }: RenderableProps<OmitStrong<ElementProps<HTMLLIElement>, "selected"> & { selected: boolean }>, ref) {
    return <li {...useMergedProps({ ...props, ref }, { className: clsx("list-group-item list-group-item-action", selected && "active", disabled && "disabled") })}>{children}</li>
}));
