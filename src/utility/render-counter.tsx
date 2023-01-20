import { ComponentChildren, createContext } from "preact";
import { useEnsureStability, useState } from "preact-prop-helpers";
import { StateUpdater, useContext, useEffect, useRef } from "preact/hooks";

export type RenderCounterTypes = "DataTable" | "DataTableSection" | "DataTableRow" | "DataTableCell"| "Gridlist" | "GridlistSection" | "GridlistRow" | "GridlistCell";

const RenderCounterValueContext = createContext<null | (Record<RenderCounterTypes, number>)>(null);
const RenderCounterSetterContext = createContext<null | (Record<`set${RenderCounterTypes}`, StateUpdater<number>>)>(null);

export function RenderCounterProvider({ children }: { children: ComponentChildren }) {
    const [DataTable, setDataTable] = useState(0);
    const [DataTableSection, setDataTableSection] = useState(0);
    const [DataTableRow, setDataTableRow] = useState(0);
    const [DataTableCell, setDataTableCell] = useState(0);
    const [Gridlist, setGridlist] = useState(0);
    const [GridlistSection, setGridlistSection] = useState(0);
    const [GridlistRow, setGridlistRow] = useState(0);
    const [GridlistCell, setGridlistCell] = useState(0);
    return (
        <RenderCounterSetterContext.Provider value={useRef({
            setDataTable,
            setDataTableSection,
            setDataTableRow,
            setDataTableCell,
            setGridlist,
            setGridlistSection,
            setGridlistRow,
            setGridlistCell,

            
        }).current}>
            <RenderCounterValueContext.Provider value={{
                DataTable,
                DataTableSection,
                DataTableRow,
                DataTableCell,
                Gridlist,
                GridlistSection,
                GridlistRow,
                GridlistCell,
            }}>
                {children}
            </RenderCounterValueContext.Provider>
        </RenderCounterSetterContext.Provider>
    )
}

export function useRenderCounters() {
    return useContext(RenderCounterValueContext);
}

export function useUpdateRenderCounter(key: RenderCounterTypes) {
    let setter: StateUpdater<number> | undefined;
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

