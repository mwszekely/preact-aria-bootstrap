
import { useStableCallback, useState } from "preact-prop-helpers";
import { Checkbox } from "../../index";
import { useCallback } from "preact/hooks"

export function Blurb() {
    return (
        <>
            <ul>
                <li><code>checked</code>: Can be a <code>boolean</code> or the string "mixed".</li>
                <li><code>onValueChange</code>: <em><code>async</code> compatible</em>. Called when the user has requested to change the checkbox state.</li>
                <li><code>label</code>: What will be placed in the label, and what will be announced to assistive technologies even if <code>labelPosition</code> is "hidden".</li>
                <li><code>labelPosition</code>: Controls where <code>label</code> is placed relative to the checkbox itself. If "hidden", <code>label</code> <em>must</em> be a simple string. "tooltip" is valid here as well.</li>
                <li><code>inline</code>: By default, checkboxes are <code>display: block</code>.</li>
            </ul>
            <p>Buttons-as-checkboxes are not currently supported, but toggle buttons are.</p>
        </>
    )
}

export function Code() {
    return (<code>{`<Button tag="button">Button</Button>
    <Button tag="div">Div</Button>`}</code>)
}

export function Demo() {
    
    const [checked, setCheckedSync] = useState(false as boolean | "mixed");

    const setCheckedAsync = useCallback(async (checked: boolean | "mixed") => {
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 3000));
        setCheckedSync(checked);
    }, [])

    return (
        <>
            <Blurb />
            <Code />
            <Checkbox checked={checked}  onValueChange={setCheckedSync} label="Sync checkbox" labelPosition="after" />
            <Checkbox checked={checked} onValueChange={setCheckedAsync} label="Async checkbox" labelPosition="after" />
            <Checkbox checked={checked} tristate onValueChange={setCheckedAsync} label="Async tristate checkbox" labelPosition="after" />
            {/*<DemoButton disabled={false} tag="button" />
            <DemoButton disabled="soft" tag="button" />
            <DemoButton disabled="hard" tag="button" />
            <DemoButton disabled={false} tag="div" />
            <DemoButton disabled="soft" tag="div" />
            <DemoButton disabled="hard" tag="div" />
            <Button<HTMLButtonElement>
                exclude={undefined}
                tagButton="button"
                pressed={pressed}
                onPress={e => setPressed(e[EventDetail].pressed ?? false)}
                render={info => (<button {...info.props}>{`Toggle button (${pressed ? "pressed" : "unpressed"})`}</button>)}
    />*/}
        </>
    )
}
