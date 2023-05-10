import { RenderableProps, render } from "preact";
import { useSearchParams } from "preact-hash-router";
import { Inputs, StateUpdater, useCallback, useEffect, useRef, useState } from "preact/hooks";
import { AllProviders, Badge, Button, DefaultDisabledType, Menu, MenuItem } from "../../dist/index.js";
import type { TestingConstants } from "../fixtures/shared.js";
import { useForceUpdate, useTimeout } from "preact-prop-helpers"
import { ButtonSizes } from "../../dist/context.js";
import { ButtonProps } from "../../dist/button/button-action.js";

declare global {
    let installTestingHandler: (typeof globalThis)["installTestingHandler"];
    let _TestingConstants: TestingConstants;
    let getTestingHandler: (typeof globalThis)["getTestingHandler"];
}

declare module globalThis {
    let installTestingHandler: <K extends keyof TestingConstants, K2 extends keyof TestingConstants[K]>(key: K, Key2: K2, func: TestingConstants[K][K2]) => void;
    let _TestingConstants: TestingConstants;
    let getTestingHandler: <K extends keyof TestingConstants, K2 extends keyof TestingConstants[K]>(key: K, Key2: K2) => TestingConstants[K][K2];
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

function noop() { }

function TestItem({ children }: RenderableProps<{  }>) {
    return (
        <AllProviders targetAssertive="notif-assertive" targetPolite="notif-polite">
                {children}
        </AllProviders>
    )
}

/**
 * A special version of `useState` whose `setState` returns a promise that resolves a bit after the function finishes rendering.
 * 
 * By calling this from Playwright (via `run`), a component's state can be changed and then inspected afterwards.
 * @param initialState 
 * @returns 
 */
function useTestSyncState2<S>(initialState: S | (() => S)): [S, (...args: Parameters<StateUpdater<S>>) => Promise<ReturnType<StateUpdater<S>>>] {
    let resolveRef = useRef<(() => void) | null>(null);
    let promiseRef = useRef<Promise<void> | null>(null);
    const [value, setValue] = useState<S>(initialState);
    const forceUpdate = useForceUpdate();

    // Explicitly wait until we've had a chance to draw (i.e. all component children have also rendered) with useEffect
    useEffect(() => {
        // Also wait for a short moment afterwards just in case there's more settling that needs to be done
        let handle = setTimeout(() => { resolveRef.current?.(); resolveRef.current = promiseRef.current = null; }, 50);
        return () => clearTimeout(handle);
    });

    return [value, useCallback(async (...args: Parameters<StateUpdater<S>>) => {
        setValue(...args);
        forceUpdate();  // TODO: It's either this, or resolve the promise immediately (if the value hasn't changed)
        return promiseRef.current ??= new Promise<void>(resolve => { resolveRef.current = resolve; })
    }, [])]
}

function useTestSyncState<K extends keyof TestingConstants, K2 extends keyof TestingConstants[K]>(key: K, key2: K2, initialState: TestingConstants[K][K2] extends (...args: any[]) => any ? Parameters<TestingConstants[K][K2]>[0] : never) {
    type S = TestingConstants[K][K2] extends (...args: any[]) => any ? Parameters<TestingConstants[K][K2]>[0] : never;
    const [value, setValue] = useTestSyncState2<S>(initialState);
    installTestingHandler(key, key2, setValue as TestingConstants[K][K2]);
    return value;
}

function TestBasesButton() {
    const disabledType = useTestSyncState("Button", "setDisabledType", "soft");
    const disabled = useTestSyncState("Button", "setDisabled", false);
    const badge = useTestSyncState("Button", "setBadge", undefined);
    const pressed = useTestSyncState("Button", "setPressed", undefined);
    const fill = useTestSyncState("Button", "setFill", undefined);
    const size = useTestSyncState("Button", "setSize", undefined);
    const theme = useTestSyncState("Button", "setTheme", undefined);
    return (
        <TestItem>
            <DefaultDisabledType.Provider value={disabledType}>
                <Button
                    disabled={disabled}
                    badge={badge == null ? undefined : <Badge>{badge}</Badge>}
                    pressed={pressed}
                    variantSize={size}
                    variantFill={fill}
                    variantTheme={theme}

                    onPress={(event) => { return getTestingHandler("Button", "onPress")?.(event) }}
                >Async Button 2</Button>
                <input type="text" value="I can take focus" />
            </DefaultDisabledType.Provider>
        </TestItem>
    )
}

function TestBasesMenu() {
    return (
        <TestItem>
            <Menu anchor={<Button onPress={null}>Open Menu</Button>}>
                <MenuItem onPress={(async (closeMenu, ...rest) => await (getTestingHandler("Menu", "onMenuItem") ?? (async (closeMenu) => { await new Promise(resolve => setTimeout(resolve, 1000)); closeMenu(); }))(closeMenu, ...rest, 0))} index={0}>Item 0</MenuItem>
                <MenuItem onPress={(async (closeMenu, ...rest) => await (getTestingHandler("Menu", "onMenuItem") ?? (async (closeMenu) => { await new Promise(resolve => setTimeout(resolve, 1000)); closeMenu(); }))(closeMenu, ...rest, 1))} index={1}>Another Item (1)</MenuItem>
                <MenuItem onPress={(async (closeMenu, ...rest) => await (getTestingHandler("Menu", "onMenuItem") ?? (async (closeMenu) => { await new Promise(resolve => setTimeout(resolve, 1000)); closeMenu(); }))(closeMenu, ...rest, 2))} index={2} disabled>Disabled Item (2)</MenuItem>
                <MenuItem onPress={(async (closeMenu, ...rest) => await (getTestingHandler("Menu", "onMenuItem") ?? (async (closeMenu) => { await new Promise(resolve => setTimeout(resolve, 1000)); closeMenu(); }))(closeMenu, ...rest, 3))} index={3}>The next item is missing (3)</MenuItem>
                <MenuItem onPress={(async (closeMenu, ...rest) => await (getTestingHandler("Menu", "onMenuItem") ?? (async (closeMenu) => { await new Promise(resolve => setTimeout(resolve, 1000)); closeMenu(); }))(closeMenu, ...rest, 5))} index={5}>Final Item (5)</MenuItem>
            </Menu>
            <input type="text" value="I can take focus" />
        </TestItem>
    )
}

function TestBasesSanityCheck() {
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
    const [getBase, setBase] = useSearchParams("test-base", "string");
    const base = getBase();

    if (!base) {
        return (
            <>
                <p><strong>No test selected</strong>. View any of the available bases below:</p>
                <ul>{Object.entries(TestBases).map(([name, component]) => <li><code><a href={`?test-base=${name}`}>{name}</a></code></li>)}</ul>
            </>
        );
    }
    return (
        <div class="tests-container">
            {Object.entries(TestBases).map(([name, component]) => {
                if (name === base)
                    return component;
                return null;
            })}
        </div>
    )
}

document.addEventListener("DOMContentLoaded", () => {

    render(<TestsContainer />, document.body);
})

