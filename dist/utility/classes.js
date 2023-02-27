/**
 * Autocomplete access to the most common Bootstrap utility classes.
 *
 * Not necessary to use by any means -- just a reminder about what can be used when.
 */
export const UtilityClasses = {
    position: {
        relative: 'position-relative',
        static: 'position-static',
        absolute: 'position-absolute',
        fixed: 'position-fixed',
        sticky: 'position-sticky',
    },
    display: {
        none: 'd-none',
        flex: 'd-flex',
        inlineFlex: 'd-inline-flex',
        inline: 'd-inline',
        inlineBlock: 'd-inline-block',
        block: 'd-block',
        grid: 'd-grid',
        table: 'd-table',
        tableRow: 'd-table-row',
        tableCell: 'd-table-cell'
    },
    flex: {
        parent: {
            direction: {
                row: 'flex-row',
                rowReverse: 'flex-row-reverse',
                column: 'flex-column',
                columnReverse: 'flex-column-reverse',
            },
            justify: {
                start: 'justify-content-start',
                end: 'justify-content-end',
                center: 'justify-content-center',
                between: 'justify-content-between',
                around: 'justify-content-around',
                evenly: 'justify-content-evenly',
            },
            align: {
                start: 'align-items-start',
                end: 'align-items-end',
                center: 'align-items-center',
                baseline: 'align-items-baseline',
                stretch: 'align-items-stretch ',
            },
        },
        children: {
            align: {
                start: 'align-self-start',
                end: 'align-self-end',
                center: 'align-self-center',
                baseline: 'align-self-baseline',
                stretch: 'align-self-stretch ',
            },
            wrap: {
                wrap: 'flex-wrap',
                nowrap: 'flex-nowrap',
                wrapReverse: 'flex-wrap-reverse'
            }
        },
    },
    userSelect: {
        all: 'user-select-all',
        auto: 'user-select-auto',
        none: 'user-select-none'
    },
    pointerEvents: {
        none: 'pe-none',
        auto: 'pe-auto'
    },
    overflow: {
        auto: 'overflow-auto',
        hidden: 'overflow-hidden',
        visible: 'overflow-visible',
        scroll: 'overflow-scroll',
    },
    text: {
        align: {
            start: 'text-start',
            center: 'text-center',
            end: 'text-end',
        },
        wrapping: {
            wrap: 'text-wrap',
            nowrap: 'text-nowrap',
            break: 'text-break',
            truncate: 'text-truncate'
        },
        transform: {
            uppercase: 'text-uppercase',
            lowercase: 'text-lowercase',
            capitalize: 'text-capitalize'
        },
        decoration: {
            none: 'text-decoration-none',
            underline: 'text-decoration-underline',
            lineThrough: 'text-decoration-line-through'
        }
    }
};
//# sourceMappingURL=classes.js.map