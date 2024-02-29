
import { useState } from "preact-prop-helpers";
import { useCallback } from "preact/hooks";
import { Checkbox, CheckboxGroup, CheckboxGroupChild, InputGroup } from "../../dist/preact/index.js";

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
            <p>In addition, Checkbox Groups are supported. These are separate from normal <code>Checkbox</code> components (e.g. <code>CheckboxGroup</code> and <code>CheckboxGroupChild</code>), but take largely the same props, with the addition of the list navigation-related props used in things like Lists.</p>
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
            <Checkbox checked={checked} onValueChange={setCheckedSync} label="Sync checkbox" labelPosition="after" />
            <Checkbox checked={checked} onValueChange={setCheckedAsync} label="Async checkbox" labelPosition="after" />
            <Checkbox checked={checked} tristate onValueChange={setCheckedAsync} label="Async tristate checkbox" labelPosition="after" />
            <InputGroup>
                <Checkbox checked={checked} onValueChange={setCheckedSync} label="Input group" labelPosition="after" />
                <Checkbox checked={checked} onValueChange={setCheckedSync} label="Input group (tooltip)" labelPosition="tooltip" />
            </InputGroup>

            <p>In the following Checkbox Group Demo, each checkbox takes a random amount of time to update its value, including when the reason is because of the parent checkbox.</p>
            <CheckboxGroup orientation="vertical" label="Checkbox Group parent" labelPosition="after">
                {Array.from(function* () {
                    for (let i = 0; i < 10; ++i) {
                        yield <DemoGroupChild index={i} key={i} />
                    }
                }())}
            </CheckboxGroup>

        </>
    )
}

function DemoGroupChild({ index: i }: { index: number }) {
    const [checked, setChecked] = useState(false);
    return (
        <CheckboxGroupChild index={i} labelPosition="after" label={`Child #${i}`} checked={checked} onValueChange={async (c) => { await new Promise(resolve => setTimeout(resolve, 750 + (Math.random() * 750))); setChecked(c) }} />
    )
}