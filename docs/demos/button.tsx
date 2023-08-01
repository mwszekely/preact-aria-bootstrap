
import { Heading } from "preact-aria-widgets";
import { useState } from "preact-prop-helpers";
import { useCallback } from "preact/hooks";
import { Badge, BootstrapIcon, Button as ButtonAction, ButtonGroup, ButtonThemes } from "../../dist/index.js";

export function Blurb() {
    return (
        <>
            <p><a href="https://www.w3.org/WAI/ARIA/apg/patterns/button/">In accordance with the ARIA guidelines for Button patterns,</a> this widget supports the following:</p>
            <ul>
                <li>Whether using an actual <code>&lt;button&gt;</code>, or something else like a <code>&lt;div&gt;</code>, the proper roles and event handlers will be applied.</li>
                <li>Buttons can be toggled (pressed or unpressed).</li>
                <li>The button responds to keyboard, mouse, touch, etc. events, regardless of the element used.
                    <ul>
                        <li>Double-clicks do not select text, but text is still selectable without it counting as a press/click</li>
                        <li>When Enter is pressed, the button is immediately activated</li>
                        <li>When Space is pressed, the button is activated once released</li>
                        <li>iOS Safari properly focuses the button</li>
                    </ul>
                </li>
            </ul>
            <p><strong>Things <em>not</em> handled:</strong></p>
            <ul>
                <li>If your button contains only an icon (or other non-descriptive content, etc.), you must provide an <code>aria-label</code> manually stating what happens when the button is pressed.</li>
            </ul>
        </>
    )
}

export function Code() {
    return (<code>{`<Button tag="button">Button</Button>
    <Button tag="div">Div</Button>`}</code>)
}

export function Demo() {
    const [variantTheme, setVariantTheme] = useState<ButtonThemes>("primary");
    const [pressCount, setPressCount] = useState(0);
    const [pressed, setPressed] = useState(false);
    const onPressSync = useCallback(async () => {
        setPressCount(c => ++c);
    }, [])
    const onPressAsync = useCallback(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000 + (3000 * Math.random())));
        onPressSync();
    }, []);


    const onToggleSync = useCallback(async (pressed: boolean | null) => {
        setPressed(pressed ?? false);
    }, [])
    const onToggleAsync = useCallback(async (pressed: boolean | null) => {
        await new Promise(resolve => setTimeout(resolve, 1000 + (3000 * Math.random())));
        onToggleSync(pressed);
    }, []);

    const [selectedIndex, setSelectedIndexSync] = useState(null as number | null);

    const setSelectedIndexAsync = useCallback(async (index: number | null) => {
        await new Promise(resolve => setTimeout(resolve, 1000 + (3000 * Math.random())));
        setSelectedIndexSync(index);
    }, [])

    return (
        <>
            <Heading heading="Button Props">
                <ul>
                    <li><code>variantTheme</code> controls the color of a the background/border (primary, secondary, success, etc.)</li>
                    <li><code>variantOutline</code> controls whether the style is filled (default) or outlined.</li>
                    <li><code>variantSize</code> Can be "sm", "md" (default), or "lg"</li>
                    <li><code>variantDropdown</code> Styles a button to have a dropdown menu icon</li>
                    <li><code>pressed</code> Can be <code>null</code> (default), but if a <code>boolean</code>, then this button is pressed. This shouldn't be used in single-select <code>ButtonGroups</code>, because that handles this prop for you.</li>
                    <li><code>onPress</code> <em><code>async</code> compatible.</em> Controls what happens when the button is clicked (or activated in others ways).</li>
                    <li><code>wrap</code> Allows the text of a button to wrap, which is disallowed by default</li>
                    <li><code>index</code> Only used if contained within a <code>ButtonGroup</code>, in which case this is the 0-based index of this child in that group.</li>
                </ul>
            </Heading>
            <Heading heading="ButtonGroup Props">
                <ul>
                    <li><code>orientation</code>: Whether this group is horizontal (default) or vertical. Affects both visuals and keyboard navigation</li>
                    <li><code>selectedIndex</code>: If non-<code>null</code>, this controls which button in the group is currently pressed. Mutually exclusive with giving a <code>Button</code> its own <code>pressed</code> prop.</li>
                    <li><code>onSelectedIndexChange</code>: When a <code>Button</code> is pressed, that request is sent here.</li>
                    <li><code>label</code>: Button groups must be labelled, even with a hidden one &mdash; this is will be placed in the label, and what will be announced to assistive technologies even if <code>labelPosition</code> is "hidden".</li>
                    <li><code>labelPosition</code>: Controls where <code>label</code> is placed relative to the checkbox itself. If "hidden", <code>label</code> <em>must</em> be a simple string.</li>
                </ul>
            </Heading>
            <Blurb />
            <Code />
            <div># of times pressed: {pressCount}</div>
            <ButtonAction variantTheme="secondary" onPress={onPressSync} badge={<Badge position="top-end">(sync)</Badge>}>Press me</ButtonAction>
            <ButtonAction variantTheme="info" onPress={onPressAsync} badge={<Badge position="top-end">(sync)</Badge>}>Press me</ButtonAction>
            <ButtonAction variantFill="outline" onPress={onPressSync}><BootstrapIcon label="Press me (icon demo)" icon="plus-circle" /></ButtonAction>
            <ButtonAction variantFill="fill" onPress={onPressSync} tooltip="Press me (w/ tooltip)"><BootstrapIcon label={null} icon="plus-circle" /></ButtonAction>
            <ButtonAction variantSize="sm" onPress={onPressAsync} disabled>Press me (disabled)</ButtonAction>
            <ButtonAction variantSize="lg" onPress={onToggleSync} pressed={pressed}>Toggle me (sync)</ButtonAction>
            <ButtonAction variantSize="md" onPress={onToggleAsync} pressed={pressed}>Toggle me (async)</ButtonAction>
            <ButtonGroup label="Multi-select button group example" orientation="horizontal" labelPosition="before">
                <MSB index={0} />
                <MSB index={1} />
                <MSB index={2} />
                <MSB index={3} />
            </ButtonGroup>
            <ButtonGroup label={`Single-select button group example (selected index: ${selectedIndex ?? "null"})`} selectedIndex={selectedIndex} onSelectedIndexChange={setSelectedIndexAsync} orientation="horizontal" labelPosition="before">
                <SSB index={0} />
                <SSB index={1} />
                <SSB index={2} />
                <SSB index={3} />
            </ButtonGroup>
        </>
    )
}

function MSB({ index }: { index: number }) {
    const [pressed, setPressed] = useState(false);

    const onToggleSync = useCallback(async (pressed: boolean | null) => {
        debugger;
        setPressed(!!pressed);
    }, [])
    const onToggleAsync = useCallback(async (pressed: boolean | null) => {
        await new Promise(resolve => setTimeout(resolve, 1000 + (3000 * Math.random())));
        onToggleSync(pressed);
    }, [])

    return <ButtonAction buttonGroupIndex={index} onPress={index % 2 == 0 ? onToggleAsync : onToggleSync} pressed={pressed}>Toggle me ({index % 2 == 0 ? "a" : ""}sync, #{index}, {pressed?.toString() || "null"})</ButtonAction>
}

function SSB({ index }: { index: number }) {

    /*const onToggleSync = useStableCallback((pressed: boolean | null) => {
        debugger;
        setSelectedIndexSync(pressed ? index : null);
    })
    const onToggleAsync = useStableCallback(async (pressed: boolean | null) => {
        //await new Promise(resolve => setTimeout(resolve, 1000 + (3000 * Math.random())));
        await setSelectedIndexAsync(pressed ? index : null);
        //onToggleSync(pressed);
    })*/

    return <ButtonAction buttonGroupIndex={index} onPress={null}>Toggle me</ButtonAction>
}
/*
function DemoButton({ tag, disabled }: { tag: string, disabled: boolean | "soft" | "hard" }) {
    const onPress = () => { alert("Button clicked") }

    return (
        <Button<HTMLButtonElement>
            disabled={disabled}
            tagButton={tag as any}
            onPress={onPress}
            render={info => (<button {...info.props}>{`${tag} ${disabled ? ` disabled (${disabled == "soft" ? "soft" : "hard"})` : ""}` }</button>)}
        />
    )
}*/