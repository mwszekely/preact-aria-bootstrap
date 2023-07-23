import { render } from "preact";
import { useSearchParamStateDeclarative } from "preact-prop-helpers";
import { useEffect, useRef } from "preact/hooks";
import { AllProviders } from "../../dist/index.js";
import { SharedFixtures } from "../fixtures/base.fixture.js";
import { TestBasesButton } from "../fixtures/button.stage.js";
import { TestBasesMenu } from "../fixtures/menu.stage.js";
import { TestItem, TestingConstants, fromStringBoolean, fromStringNumber } from "../util.js";



declare module globalThis {
    let installTestingHandler: <K extends keyof TestingConstants, K2 extends keyof TestingConstants[K]>(key: K, Key2: K2, func: TestingConstants[K][K2]) => void;
    let _TestingConstants: TestingConstants;
    let getTestingHandler: <K extends keyof TestingConstants, K2 extends keyof TestingConstants[K]>(key: K, Key2: K2) => TestingConstants[K][K2];

    // TODO: Rename run, both here and in Playwright.
    // This is here so that both sides can just call run and it just works,
    // but it should have a different name in that case.
    let run: SharedFixtures["run"];
}




globalThis.installTestingHandler = function installTestingHandler<K extends keyof TestingConstants, K2 extends keyof TestingConstants[K]>(key: K, Key2: K2, func: TestingConstants[K][K2]) {
    (globalThis)._TestingConstants ??= {} as any;
    (globalThis)._TestingConstants[key] ??= {} as any;
    (globalThis)._TestingConstants[key][Key2] = func;
};
globalThis.getTestingHandler = function getTestingHandler<K extends keyof TestingConstants, K2 extends keyof TestingConstants[K]>(key: K, Key2: K2) {
    (globalThis)._TestingConstants ??= {} as any;
    (globalThis)._TestingConstants[key] ??= {} as any;
    return (globalThis)._TestingConstants[key][Key2] ?? undefined!; // || (noop as never);
};
globalThis.run = (key, key2, ...args) => ((globalThis).getTestingHandler?.(key, key2) as Function | null)?.(...(args as any[]));

function noop() { }



declare module "preact-prop-helpers" {
    export interface SearchParamStates {
        "test-base": string;
        "test-bool": boolean | null;
        "sanity-check": number;
    }
}


function TestBasesSanityCheck() {

    let which = useRef(9);
    const [s, setS] = useSearchParamStateDeclarative({ key: "sanity-check", initialValue: 9, stringToValue: fromStringNumber, defaultReason: "replace" });

    console.assert(s == which.current);
    console.assert(new URL(window.location.toString()).searchParams.get("sanity-check") == (which.current as number | string));

    useEffect(() => {
        which.current = 10;
        setS(10);
    }, []);

    // Please, it's 2023, this should never ever fail, surely, please. (please)
    return (
        <>
            <div class="default">default</div>
            <div class="encoding">符号化テスト</div>
        </>
    )
}

const TestBases = {
    "sanity-check": <TestBasesSanityCheck />,
    "button": <TestBasesButton />,
    "menu": <TestBasesMenu />,
}

function TestsContainer() {
    const [bool, setBool, getBool] = useSearchParamStateDeclarative({ key: "test-bool", initialValue: null, stringToValue: fromStringBoolean });

    const [base, setBase, getBase] = useSearchParamStateDeclarative({ key: "test-base", initialValue: "", stringToValue: value => value });

    useEffect(() => {
        document.getElementById("focusable-first")?.focus?.();
    }, [])
    if (!base) {
        return (
            <>
                <p><strong>No test selected</strong>. View any of the available bases below:</p>
                <ul>{Object.entries(TestBases).map(([name, component]) => <li><code><a href={`?test-base=${name}`}>{name}</a></code></li>)}</ul>
                <button onClick={() => setBool(b => { debugger; return !b; })}>Currently {(bool ?? "null").toString()}</button>
            </>
        );
    }
    return (
        <>
            <input id="focusable-first" />
            <AllProviders targetAssertive="notif-assertive" targetPolite="notif-polite">
                <TestItem>
                    {Object.entries(TestBases).map(([name, component]) => {
                        if (name === base)
                            return component;
                        return null;
                    })}

                </TestItem>
            </AllProviders>
            <input id="focusable-last" />
        </>
    )
}



document.addEventListener("DOMContentLoaded", () => {

    render(<TestsContainer />, document.body);
})

