import { ComponentChildren, Ref } from "preact";
import { Toolbar, ToolbarChild } from "preact-aria-widgets";
import { useMergedProps, usePress, useRefElement, useStableGetter, useState } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useCallback, useEffect, useRef } from "preact/hooks";
import { BootstrapIcon } from "../icon/index.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { LabelledProps, PaginatedProps } from "../utility/types.js";

export function Pagination({ childCount, windowSize, onChange, labelPosition, label }: LabelledProps<{ childCount: number, windowSize: number, onChange: (start: number | null, end: number | null) => void }, never>) {
    const [page, setPage] = useState(0);

    useEffect(() => {
        const start = ((page + 0) * windowSize);
        const end = ((page + 1) * windowSize);
        onChange?.(start, end);
        return () => onChange(null, null);
    }, [page, windowSize])

    return (
        <Toolbar<HTMLElement, HTMLButtonElement, HTMLLabelElement>
            ariaLabel={labelPosition == "hidden" ? label : null}
            selectedIndex={page}
            onSelectedIndexChange={useCallback((page: number | null) => { setPage(page || 0); }, [])}
            orientation="horizontal"
            render={info => {
                const labelJsx = <label {...info.propsLabel}>{label}</label>
                return (
                    <>
                        {labelPosition == "before" && labelJsx}
                        <nav {...info.propsToolbar}>
                            <ul class="pagination">
                                <PaginationChildren childCount={childCount} windowSize={windowSize} />
                            </ul>
                        </nav>
                        {labelPosition == "after" && labelJsx}
                    </>
                )
            }}
        />
    )
}

const PaginationChildren = memo(({ childCount, windowSize }: { windowSize: number, childCount: number }) => {
    const firstIndex = 0;
    const lastIndex = Math.ceil((childCount + 0.000001) / windowSize - 1) - 1;

    const firstRef = useRef<HTMLButtonElement>(null);
    const lastRef = useRef<HTMLButtonElement>(null);
    const centerFirstRef = useRef<HTMLButtonElement>(null);
    const centerLastRef = useRef<HTMLButtonElement>(null);

    return (
        <>
            <PaginationButtonFirst index={firstIndex} onFocus={useCallback(() => { centerFirstRef.current?.scrollIntoView({ behavior: "smooth" }) }, [])} />

            <span class="pagination-center scroll-shadows scroll-shadows-x">
                {Array.from(function* () {
                    for (let page = 1; page < lastIndex - 1; ++page) {
                        const start = ((page + 0) * windowSize);
                        const end = ((page + 1) * windowSize);
                        yield <PaginationButton key={`${start}-${end}`} index={page} ref={page == 1 ? centerFirstRef : page == (lastIndex - 1 - 1) ? centerLastRef : undefined}>{page + 1}</PaginationButton>
                    }
                }())}
            </span>
            <PaginationButtonLast index={lastIndex} onFocus={useCallback(() => { centerLastRef.current?.scrollIntoView({ behavior: "smooth" }) }, [])} />
        </>
    )
})

const PaginationButtonFirst = memo(forwardElementRef(({ index, onFocus }: { index: number, onFocus: () => void }, ref?: Ref<HTMLButtonElement>) => {
    return (<PaginationButton index={index} onFocus={onFocus} ref={ref}><BootstrapIcon icon="chevron-bar-left" label={null} /> First</PaginationButton>)
}))
const PaginationButtonLast = memo(forwardElementRef(({ index, onFocus }: { index: number, onFocus: () => void }, ref?: Ref<HTMLButtonElement>) => {
    return (<PaginationButton index={index} onFocus={onFocus} ref={ref}>Last <BootstrapIcon icon="chevron-bar-right" label={null} /></PaginationButton>)
}))

const PaginationButton = memo(forwardElementRef(function PaginationButton({ index, children, onFocus }: { index: number, children: ComponentChildren, ref?: Ref<HTMLButtonElement>, onFocus?: null | (() => void) }, ref?: Ref<HTMLButtonElement>) {
    return (
        <ToolbarChild<HTMLButtonElement>
            index={index}
            ariaPropName="aria-current-page"
            getSortValue={useStableGetter(index)}
            selectionMode="focus"

            render={info => {
                const { refElementReturn, propsStable } = useRefElement<HTMLButtonElement>({ refElementParameters: {} })
                const { pressReturn, props: propsPress } = usePress<HTMLButtonElement>({ pressParameters: { onPressSync: null, focusSelf: useCallback((e) => { e.focus(); }, []), ...info.pressParameters }, refElementReturn })
                return (
                    <li class="page-item">
                        <button {...useMergedProps(info.props, propsStable, propsPress, { class: "page-link", ref, onfocusin: onFocus || undefined }, {})}>{children}</button>
                    </li>
                )
            }}

        />
    )
}));



export const Paginated = memo(function Paginated({ childCount, setPaginationEnd, setPaginationStart, paginationLabel, paginationLocation, paginationSize, children }: PaginatedProps<{ children: ComponentChildren; childCount: number, setPaginationStart: (n: number | null) => void, setPaginationEnd: (n: number | null) => void }>) {

    const paginationJsx = <Pagination
        windowSize={paginationSize || 500}
        labelPosition="hidden"
        label={paginationLabel!}
        childCount={childCount}
        onChange={(start, end) => {
            setPaginationStart(start);
            setPaginationEnd(end);
        }}
    />;

    return (
        <>
            {paginationSize && paginationLocation == "before" && paginationJsx}
            {children}
            {paginationSize && paginationLocation == "after" && paginationJsx}
        </>
    )
})
