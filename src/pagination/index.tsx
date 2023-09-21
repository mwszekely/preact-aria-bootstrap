import { ComponentChildren, Ref } from "preact";
import { Toolbar, ToolbarChild } from "preact-aria-widgets";
import { EventDetail, useMergedProps, usePress, useRefElement, useStableCallback, useState } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useCallback, useEffect, useRef } from "preact/hooks";
import { BootstrapIcon } from "../icon/index.js";
import { forwardElementRef } from "../utility/forward-element-ref.js";
import { KeyboardAssistIcon } from "../utility/keyboard-assist.js";
import { LabelledProps, PaginatedProps } from "../utility/types.js";

export function Pagination({ childCount, windowSize, onChange, labelPosition, label, keyboardControlsDescription }: LabelledProps<{ keyboardControlsDescription?: string, childCount: number, windowSize: number, onChange: (start: number | null, end: number | null) => void }, never>) {

    labelPosition ??= "before";
    const [page, setPage] = useState(0);

    useEffect(() => {
        const start = ((page + 0) * windowSize);
        const end = ((page + 1) * windowSize);
        onChange?.(start, end);
        return () => onChange(null, null);
    }, [page, windowSize])

    return (
        <Toolbar<HTMLUListElement, HTMLButtonElement, HTMLLabelElement>
            ariaLabel={labelPosition == "hidden" ? label : null}
            singleSelectionAriaPropName="aria-current-page"
            singleSelectionMode="activation"
            singleSelectedIndex={page}
            multiSelectionMode="disabled"
            onSingleSelectedIndexChange={useStableCallback((event) => { setPage(event[EventDetail].selectedIndex || 0); }, [])}
            orientation="horizontal"
            render={info => {
                const labelJsx = <label {...info.propsLabel}>{label}</label>
                return (
                    <>
                        {labelPosition == "before" && labelJsx}
                        <KeyboardAssistIcon
                            leftRight={true}
                            upDown={false}
                            homeEnd={true}
                            pageKeys={true}
                            typeaheadStatus={'none'}
                            activateSpace={true}
                            activateEnter={true}
                            description={keyboardControlsDescription ?? "Select a page:"}>
                            <nav aria-label={labelPosition == 'hidden' ? label : undefined}>
                                <ul {...useMergedProps(info.propsToolbar, { class: "pagination" })}>
                                    <PaginationChildren childCount={childCount} windowSize={windowSize} />
                                </ul>
                            </nav>
                        </KeyboardAssistIcon>
                        {labelPosition == "after" && labelJsx}
                    </>
                )
            }} />
    )
}

const PaginationChildren = memo(({ childCount, windowSize }: { windowSize: number, childCount: number }) => {
    const firstIndex = 0;
    const lastIndex = Math.ceil((childCount) / windowSize) - 1; // INCLUSIVE! Not exclusive as usual for ending points.

    const firstRef = useRef<HTMLButtonElement>(null);
    const lastRef = useRef<HTMLButtonElement>(null);
    const centerFirstRef = useRef<HTMLButtonElement>(null);
    const centerLastRef = useRef<HTMLButtonElement>(null);
    const onFocusFirst = useCallback(() => { centerFirstRef.current?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" }) }, []);
    const onFocusLast = useCallback(() => { centerLastRef.current?.scrollIntoView({ behavior: "smooth", inline: "end", block: "nearest" }) }, []);

    return (
        <>
            <PaginationButtonFirst index={firstIndex} onFocus={onFocusFirst} />
            <span class="pagination-center scroll-shadows scroll-shadows-x">
                <PaginationButton key={`first`} index={firstIndex + 1} ref={centerFirstRef}>{firstIndex + 1 + 1}</PaginationButton>
                {Array.from(function* () {
                    for (let page = firstIndex + 2; page <= lastIndex - 2; ++page) {
                        const start = ((page + 0) * windowSize);
                        const end = ((page + 1) * windowSize);
                        yield <PaginationButton key={`${start}-${end}`} index={page}>{page + 1}</PaginationButton>
                    }
                }())}
                <PaginationButton key={`last`} index={lastIndex - 1} ref={centerLastRef}>{lastIndex - 1 + 1}</PaginationButton>
            </span>
            <PaginationButtonLast index={lastIndex} onFocus={onFocusLast} />
        </>
    )
})

const PaginationButtonFirst = memo(forwardElementRef(({ index, onFocus }: { index: number, onFocus: () => void }, ref?: Ref<HTMLButtonElement>) => {
    return (<PaginationButton index={index} onFocus={onFocus} ref={ref}><BootstrapIcon icon="chevron-bar-left" label={null} /> {index + 1}</PaginationButton>)
}))
const PaginationButtonLast = memo(forwardElementRef(({ index, onFocus }: { index: number, onFocus: () => void }, ref?: Ref<HTMLButtonElement>) => {
    return (<PaginationButton index={index} onFocus={onFocus} ref={ref}>{index + 1} <BootstrapIcon icon="chevron-bar-right" label={null} /></PaginationButton>)
}))

const PaginationButton = memo(forwardElementRef(function PaginationButton({ index, children, onFocus }: { index: number, children: ComponentChildren, ref?: Ref<HTMLButtonElement>, onFocus?: null | (() => void) }, ref?: Ref<HTMLButtonElement>) {

    return (
        <ToolbarChild<HTMLButtonElement>
            index={index}
            disabledProp="disabled"

            render={info => {
                const { refElementReturn, propsStable } = useRefElement<HTMLButtonElement>({ refElementParameters: {} });
                const focusSelf = useCallback((e: HTMLButtonElement) => { e.focus(); }, []);
                const { pressReturn, props: propsPress } = usePress<HTMLButtonElement>({
                    pressParameters: {
                        ...info.pressParameters,
                        allowRepeatPresses: false,
                        excludeEnter: null,
                        excludePointer: null,
                        longPressThreshold: null,
                        onPressingChange: null,
                        focusSelf
                    },
                    refElementReturn
                })

                const p = useMergedProps(info.propsChild, info.propsTabbable, propsStable, propsPress, { class: "page-link", ref, onfocusin: onFocus || undefined });
                return (
                    <li class="page-item">
                        <button {...p}>{children}</button>
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
