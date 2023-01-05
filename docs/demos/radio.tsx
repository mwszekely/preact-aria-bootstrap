
import { useStableCallback, useState } from "preact-prop-helpers";
import { Checkbox, Radio, RadioGroup } from "../../index";
import { useCallback } from "preact/hooks"

export function Blurb() {
    return (
        <>
            <ul>
                <li>As a composite component, standard keyboard navigation is supported</li>
                <li>Individual <code>Radio</code> components don't have a <code>checked</code> prop, instead the parent <code>RadioGroup</code> has a <code>value</code> prop</li>
                <li><code>onValueChange</code>: <em><code>async</code> compatible</em>. Called when a new radio button (different from one previously pressed) is pressed with its value.</li>
                <li><code>label</code>,<code>labelPosition</code>, and <code>inline</code> are identical to <code>Checkbox</code></li>
            </ul>
        </>
    )
}

export function Code() {
    return (<code>{`<Button tag="button">Button</Button>
    <Button tag="div">Div</Button>`}</code>)
}

const L = ["after", "before", "hidden", "tooltip"] as const;
type V = (typeof L)[number];

export function Demo() {

    const [value, setValue] = useState<V | null>(null);

    const setValueAsync = async (v: V) => {
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 3000));
        setValue(v);
    }

    return (
        <>
            <Blurb />
            <Code />
            <RadioGroup<V> name="radio-demo" labelPosition="before" label="Radio group demo" inline selectedValue={value} onValueChange={setValueAsync}>
                {(Array.from((function* () {
                    let i = 0;
                    for (const lp of L)
                        yield <Radio index={i++} value={lp} label={lp} labelPosition={lp} />
                })()))}
            </RadioGroup>
        </>
    )
}
