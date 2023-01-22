
import { useStableCallback, useState } from "preact-prop-helpers";
import { BootstrapIcon, DocumentField, InputGroup, RichTextField, RichTextView, TextField } from "../../index";
import { useCallback } from "preact/hooks"
import { Temporal } from "@js-temporal/polyfill";

export function Blurb() {
    return (
        <>

            <ul>
                <li><code>onValueChange</code>: <em><code>async</code> compatible</em>. Called with a type appropriate to the input't <code>type</code>:
                    <ul>
                        <li><code>text</code>: <code>string</code></li>
                        <li><code>number</code>: <code>number</code></li>
                        <li><code>bigint</code>: <code>bigint</code></li>
                        <li><code>datetime-local</code>: <code>Temporal.Instant</code></li>
                        <li><code>date</code>: <code>Temporal.PlainDate</code></li>
                        <li><code>time</code>: <code>Temporal.PlainTime</code></li>
                    </ul>
                </li>
                <li>Text fields can automatically be given a width that corresponds to their type, especially with date/time types, and optionally with number types.</li>

                <li>Whether using an actual <code>&lt;textfield&gt;</code>, or something else like a <code>&lt;div&gt;</code>, the proper roles and event handlers will be applied.</li>
                <li>TextFields can be toggled (pressed or unpressed).</li>
                <li>The textfield responds to keyboard, mouse, touch, etc. events, regardless of the element used.
                    <ul>
                        <li>Double-clicks do not select text, but text is still selectable without it counting as a press/click</li>
                        <li>When Enter is pressed, the textfield is immediately activated</li>
                        <li>When Space is pressed, the textfield is activated once released</li>
                        <li>iOS Safari properly focuses the textfield</li>
                    </ul>
                </li>
            </ul>

        </>
    )
}

export function Code() {
    return (<code>{`<TextField tag="textfield">TextField</TextField>
    <TextField tag="div">Div</TextField>`}</code>)
}

export function Demo() {
    const [text, setTextSync] = useState("initial text");
    const [richText, setRichTextSync] = useState("<p>initial text</p>");
    const [number, setNumberSync] = useState<number | null>(5);
    const [dateTime, setDateTimeSync] = useState<Temporal.Instant | null>(Temporal.Instant.fromEpochMilliseconds(+new Date()));
    const [date, setDateSync] = useState<Temporal.PlainDate | null>(null);
    const [time, setTimeSync] = useState<Temporal.PlainTime | null>(null);
    const setTextAsync = useStableCallback(async (value: string | null) => {
        await new Promise(resolve => setTimeout(resolve, 1000 + (3000 * Math.random())));
        setTextSync(value ?? "");
    });
    const setRichTextAsync = useStableCallback(async (value: string | null) => {
        await new Promise(resolve => setTimeout(resolve, 1000 + (3000 * Math.random())));
        setRichTextSync(value ?? "");
    });
    const setNumberAsync = useStableCallback(async (value: number | null) => {
        await new Promise(resolve => setTimeout(resolve, 1000 + (3000 * Math.random())));
        setNumberSync(value);
    });
    const setDateTimeAsync = useStableCallback(async (value: Temporal.Instant | null) => {
        await new Promise(resolve => setTimeout(resolve, 1000 + (3000 * Math.random())));
        setDateTimeSync(value);
    });
    const setDateAsync = useStableCallback(async (value: Temporal.PlainDate | null) => {
        await new Promise(resolve => setTimeout(resolve, 1000 + (3000 * Math.random())));
        setDateSync(value);
    });
    const setTimeAsync = useStableCallback(async (value: Temporal.PlainTime | null) => {
        await new Promise(resolve => setTimeout(resolve, 1000 + (3000 * Math.random())));
        setTimeSync(value);
    });

    return (
        <>
            <Blurb />
            <Code />
            <div>Text: {text}, Number: {number}</div>
            <TextField label="Text field" iconStart={<BootstrapIcon icon="plus-circle" label={null} />} labelPosition="floating" onValueChange={setTextAsync} value={text} type="text" />
            <TextField label="Number field" iconEnd={<BootstrapIcon icon="pencil-fill" label={null} />} labelPosition="before" onValueChange={setNumberAsync} value={number} type="number" min={0} max={100} digitDisplay={3} />
            <InputGroup><TextField label="Datetime field" labelPosition="before" onValueChange={setDateTimeAsync} value={dateTime} type="datetime-local" /></InputGroup>
            <TextField label="Date field" labelPosition="before" onValueChange={setDateAsync} value={date} type="date" />
            <TextField label="Time field" labelPosition="before" onValueChange={setTimeAsync} value={time} type="time" />
            <TextField label="Time field (seconds)" labelPosition="before" onValueChange={setTimeAsync} value={time} type="time" seconds />
            <RichTextField valueHtml={richText} onValueChange={setRichTextAsync} />
            <pre><code>{richText}</code></pre>
            <div><RichTextView valueHtml={richText} /></div>
            <DocumentField valueHtml={richText} onValueChange={setRichTextAsync} />
        </>
    )
}
