
import { useStableCallback, useState } from "preact-prop-helpers";
import { Tooltip } from "../../index";
import { useCallback } from "preact/hooks"

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
   

    return (
        <>
            <Blurb />
            <Code />
            <div>This is text, <Tooltip tooltip="This is the tooltip content">and this is text that triggers a tooltip.</Tooltip></div>
            
        </>
    )
}

