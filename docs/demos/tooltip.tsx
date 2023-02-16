
import { useStableCallback, useState } from "preact-prop-helpers";
import { Checkbox, CheckboxGroupChild, Tooltip } from "../../index";
import { useCallback } from "preact/hooks"
import { memo } from "preact/compat";

export function Blurb() {
    return (
        <>
            <p><a href="https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/">In accordance with the ARIA guidelines for Tooltip patterns,</a> this widget supports the following:</p>
            <ul>
                <li>Whether using an actual <code>&lt;tooltip&gt;</code>, or something else like a <code>&lt;div&gt;</code>, the proper roles and event handlers will be applied.</li>
                <li>Tooltips can be toggled (pressed or unpressed).</li>
                <li>The tooltip responds to keyboard, mouse, touch, etc. events, regardless of the element used.
                    <ul>
                        <li>Double-clicks do not select text, but text is still selectable without it counting as a press/click</li>
                        <li>When Enter is pressed, the tooltip is immediately activated</li>
                        <li>When Space is pressed, the tooltip is activated once released</li>
                        <li>iOS Safari properly focuses the tooltip</li>
                    </ul>
                </li>
            </ul>
            <p><strong>Things <em>not</em> handled:</strong></p>
            <ul>
                <li>If your tooltip contains only an icon (or other non-descriptive content, etc.), you must provide an <code>aria-label</code> manually stating what happens when the tooltip is pressed.</li>
            </ul>
        </>
    )
}

export function Code() {
    return (<code>{`<Tooltip tag="tooltip">Tooltip</Tooltip>
    <Tooltip tag="div">Div</Tooltip>`}</code>)
}

export function Demo() {

    const [mounted, setMounted] = useState(false);

    return (
        <>
            <Blurb />
            <Code />
            <div>This is text, <Tooltip tooltip="This is the tooltip content">and this is text that triggers a tooltip.</Tooltip></div>
            {/*<div style={{ width: "15vw", height: "15vw", border: "2px dotted black", overflow: "scroll" }}>
                <div style={{ width: "50vw", height: "50vw", background: "rgba(0,0,128,0.125)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Tooltip tooltip="This is the tooltip content" forceOpen><div>Tooltip trigger</div></Tooltip>
                </div>
    </div>*/}
            <Checkbox checked={mounted} onValueChange={setMounted} label="Mount lots of tooltips" labelPosition="after" />
            <div style="border: 1px solid black; min-width: 100px; min-height: 100px;">
                {mounted && <LotsOfTooltips />}
            </div>

        </>
    )
}

const LotsOfTooltips = memo(function LotsOfTooltips() {
    return (
        <div>
            {Array.from(function*(){
                for (let i = 0; i < 1000; ++i) {
                    yield (<Tooltip tooltip={i.toString()}><span>{i}</span></Tooltip>)
                }
            }())}
        </div>
    )
})

