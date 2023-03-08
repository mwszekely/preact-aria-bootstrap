import { jsx as _jsx } from "preact/jsx-runtime";
import { createContext } from "preact";
import { useEnsureStability, useState } from "preact-prop-helpers";
import { useContext, useEffect, useRef } from "preact/hooks";
const RenderCounterValueContext = createContext(null);
const RenderCounterSetterContext = createContext(null);
export function RenderCounterProvider({ children }) {
    const [DataTable, setDataTable] = useState(0);
    const [DataTableSection, setDataTableSection] = useState(0);
    const [DataTableRow, setDataTableRow] = useState(0);
    const [DataTableCell, setDataTableCell] = useState(0);
    const [Gridlist, setGridlist] = useState(0);
    const [GridlistSection, setGridlistSection] = useState(0);
    const [GridlistRow, setGridlistRow] = useState(0);
    const [GridlistCell, setGridlistCell] = useState(0);
    return (_jsx(RenderCounterSetterContext.Provider, { value: useRef({
            setDataTable,
            setDataTableSection,
            setDataTableRow,
            setDataTableCell,
            setGridlist,
            setGridlistSection,
            setGridlistRow,
            setGridlistCell,
        }).current, children: _jsx(RenderCounterValueContext.Provider, { value: {
                DataTable,
                DataTableSection,
                DataTableRow,
                DataTableCell,
                Gridlist,
                GridlistSection,
                GridlistRow,
                GridlistCell,
            }, children: children }) }));
}
export function useRenderCounters() {
    return useContext(RenderCounterValueContext);
}
export function useUpdateRenderCounter(key) {
    let setter;
    const context = useContext(RenderCounterSetterContext);
    // For performance purposes, we do this conditionally,
    // so this can't change, but I'm pretty sure that's how the diff algorithm remounts things anyway.
    useEnsureStability("useRenderContext", context);
    if (context) {
        //value = context[key];
        setter = context[`set${key}`];
        useEffect(() => {
            setter?.(s => ++s);
        });
    }
}
//# sourceMappingURL=render-counter.js.map