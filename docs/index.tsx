//import "preact/debug";

import { Ref, render } from "preact";
import { focus } from "preact-prop-helpers";
import { forwardRef, memo } from "preact/compat";
import { useCallback, useMemo, useState } from "preact/hooks";
import { Accordion, AccordionSection, AllProviders, Badge, BootstrapIcon, Button, Button as ButtonAction, DataTable, DataTableBody, DataTableCell, DataTableHead, DataTableRow, Dialog, List, ListItem, Menu, MenuItem, Offcanvas, Range, RangeThumb, Tab, TabPanel, Tabs, TextField, Toast, usePushToast } from "../dist/index.js";
import * as ButtonB from "./demos/button";
import * as Checkbox from "./demos/checkbox";
import * as Radio from "./demos/radio";
import * as TextFieldD from "./demos/text-field";
import * as Tooltip from "./demos/tooltip";


//(window as any)._generate_setState_stacks = true;


/*
let originalEvents = options.event;
options.event = (e, ...args) => {
    console.log("EH: ", e)
    return originalEvents?.(e, ...args) ?? e;
}*/

function ListDemo() {
    let [count, setCount] = useState(100 as number | null);
    let [paginationWindow, setPaginationWindow] = useState(10 as number | null);
    const [selectedIndex, setSelectedIndex] = useState(null as null | number);
    count ??= 0;
    if (typeof paginationWindow == 'number' && !isFinite(paginationWindow))
        paginationWindow = null;

    const ch = useMemo(() => (Array.from(function* () {
        for (let i = 0; i < (count ?? 0); ++i) {
            yield <ListDemoItem key={i} index={i} />
        }
    }())), [count]);

    return (<div>
        {/*<strong>(The gridlist demo is currently down for maintenance &mdash; please enjoy this listbox demo instead.)</strong>*/}
        <TextField type="number" value={count} onValueChange={setCount} label="# of children" labelPosition="floating" />
        <TextField type="number" value={paginationWindow} onValueChange={setPaginationWindow} label="Pagination window" labelPosition="floating" />
        <div>{selectedIndex}</div>
        <List staggered={true} paginationLocation={paginationWindow == null ? null : "before"} paginationSize={paginationWindow ?? null} paginationLabel="Choose the selected page of items to show" selectedIndex={selectedIndex} selectionMode="single" onSelectedIndexChange={setSelectedIndex} labelPosition="before" label="List (grid)">
            {ch}
        </List>
    </div>)
}

const ListDemoMenu = memo(forwardRef((props, ref: Ref<HTMLButtonElement>) => {
    return (
        <Menu ref={ref} {...props} anchor={<Button variantSize="sm" variantFill="fill" variantTheme="light" onPress={null}><BootstrapIcon icon="menu-app" label="Open dropdown menu" /></Button>}>
            {Array.from(function* () {
                for (let i = 0; i < 10; ++i) {
                    yield (
                        <MenuItem index={i} onPress={async (c) => {
                            await new Promise(resolve => setTimeout(resolve, 1000));
                            alert(`Menu item #${i} pressed. It will close the menu 1 second after this does`);
                            setTimeout(c, 1000);
                        }}>
                            Menu item #{i}
                        </MenuItem>
                    );
                }
            }())}
        </Menu>
    )
}))

const ListDemoButton = memo(forwardRef((props, ref: Ref<HTMLButtonElement>) => {
    return (
        <ButtonAction ref={ref} {...props} variantSize="sm" variantFill="fill" variantTheme="light" onPress={() => alert("Delete button clicked")}><BootstrapIcon icon="trash-fill" label="Delete" /></ButtonAction>
    )
}));

const ListDemoItem = memo(({ index: i }: { index: number }) => {
    /*return (
        <ListItem index={i}>List item #{i}</ListItem>
    )*/
    /* const [visible, setVisible] = useState(false);
     useTimeout({
         callback: () => setVisible(true),
         timeout: i * 10
     });
     if (!visible)
         return null;*/
    const ch = `List item #${i}`
    return (
        <ListItem
            index={i}
            onPress={useCallback(async () => { return new Promise<void>(resolve => setTimeout(resolve, 2000)) }, [])}
            badge={useMemo(() => <Badge variantTheme="info">10</Badge>, [])}
            iconStart={useMemo(() => (i % 100 == 0) ? <ListDemoMenu /> : null, [i])}
            iconEnd={useMemo(() => ((i & 0b10) == 0) ? <ListDemoButton /> : null, [i])}
            children={ch}
        />
    );
})

function MenuDemo() {
    const [selectedIndex, setSelectedIndex] = useState(null as null | number);
    return (
        <Menu selectedIndex={selectedIndex} anchor={<Button variantDropdown="joined" onPress={null}>Open Dropdown Menu</Button>} onSelectedIndexChange={setSelectedIndex}>
            {Array.from(function* () {
                for (let i = 0; i < 10; ++i) {
                    yield (
                        <MenuItem index={i} onPress={async () => { return new Promise(resolve => setTimeout(resolve, 2000)) }}>
                            Menu item #{i}
                        </MenuItem>
                    );
                }
            }())}
        </Menu>)
}

function DialogDemo() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} modal onClose={() => setOpen(false)} header={<span>Dialog title</span>} anchor={<ButtonAction onPress={() => setOpen(true)}>Open dialog</ButtonAction>}>
            <div>This is the dialog content</div>
        </Dialog>
    )
}

function OffcanvasDemo() {
    const [open, setOpen] = useState(false);

    return (
        <Offcanvas open={open} onClose={() => setOpen(false)} header={<span>Dialog title</span>} anchor={<ButtonAction onPress={() => setOpen(true)}>Open offcanvas</ButtonAction>}>
            <div>This is the offcanvas content</div>
        </Offcanvas>
    )
}

function SliderDemo() {
    const [value, setValue] = useState(0);

    return (
        <div>
            <p>Value: {value}</p>
            <p>This slider is continuous:</p>
            <Range onValueChange={setValue} value={value} min={0} max={10} step={1} snap="continuous">
                <RangeThumb index={0} label="Slider example #0" />
            </Range>

            <p>This slider is discrete:</p>
            <Range onValueChange={setValue} value={value} min={0} max={10} step={1} snap="discrete">
                <RangeThumb index={0} label="Slider example #0" />
            </Range>

            <p>This shows its values as <code>10<sup>value</sup></code>, instead of <code>value</code>:</p>
            <Range onValueChange={setValue} value={value} min={0} max={10} step={1} snap="continuous" getValueText={value => `${10 ** value}`} />
        </div>
    )
}

function ToastsDemo() {
    const pushToast = usePushToast();
    const [mountError, setMountError] = useState(false);

    return (
        <div>
            <Button onPress={() => { pushToast(<Toast timeout={2000}>This is a toast</Toast>) }}>Push toast</Button>
            <Button onPress={() => { setMountError(true); }}>Mount a component that errors</Button>
            <Button onPress={() => { throw new Error("Demo error was thrown") }}>onPress throws</Button>
            <Button onPress={async () => { await new Promise(resolve => setTimeout(resolve, 500)); throw new Error("Demo error was thrown") }}>onPress throws (async)</Button>
            {mountError && <ErrorComponent />}
        </div>
    )
}
function ErrorComponent() {
    throw new Error("Demo error was thrown")
    return <div>error?</div>
}

const RandomWords = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".split(" ");


function TableDemo() {
    let [count, setCount] = useState(100 as number | null);
    const [paginationWindow, setPaginationWindow] = useState(10 as number | null);
    count ??= 0;
    return (
        <div>
            <TextField type="number" value={count} onValueChange={setCount} label="# of children" labelPosition="floating" />
            <TextField type="number" value={paginationWindow} onValueChange={setPaginationWindow} label="Pagination window" labelPosition="floating" />
            <DataTable captionPosition="before" caption="Table demo" paginationSize={paginationWindow} paginationLocation="before">
                <DataTableHead>
                    <DataTableRow row={0}>
                        <DataTableCell column={0}>Numeric</DataTableCell>
                        <DataTableCell column={1}>String</DataTableCell>
                        <DataTableCell column={2}>Date</DataTableCell>
                        <DataTableCell column={3}>Input</DataTableCell>
                    </DataTableRow>
                </DataTableHead>
                <TableDemoBody count={count} />
            </DataTable>
        </div>
    )
}

const TableDemoBody = memo(({ count }: { count: number }) => {
    console.log("Table body demo rendered");
    const children = useMemo(() => Array.from(function* () {
        for (let i = 0; i < count; ++i) {
            yield <TableDemoRow key={i} row={i} />
        }
    }()), [count])
    return (
        <DataTableBody>{children}</DataTableBody>
    )
})

const baseDate = new Date();

const TableDemoRow = memo(function TableDemoRow({ row }: { row: number }) {
    const numeric = row;
    const word = RandomWords[row % RandomWords.length];
    const date = new Date(+baseDate + (1000 * 60 * 60 * 24 * (row ** 2)));
    const [value, setValue] = useState(0 as number | null);
    console.log("Table row demo rendered")
    return (
        <DataTableRow row={numeric}>
            <DataTableCell column={0} value={row} />
            <DataTableCell column={1} value={word} />
            <DataTableCell column={2} value={date}>{date.toLocaleString()}</DataTableCell>
            <DataTableCell column={3} fillY><TextField type="number" marginBottom={0} value={value} onValueChange={setValue} min={0} max={numeric} labelPosition="hidden" label="Numeric input within a table cell" /></DataTableCell>
        </DataTableRow>
    )
})



function AccordionDemo() {
    return (
        <Accordion>
            {Array.from(function* () {
                for (let i = 0; i < 5; ++i) {
                    yield <AccordionSection key={i} index={i} header={"Section #" + i}>Accordion body content for section #{i}</AccordionSection>;
                }
            }())}
        </Accordion>
    )
}

declare module 'preact-prop-helpers' {
    interface PersistentStates {
        "main-demo-page-selected-tab-index": number | null;
    }
}

const Component = () => {

    const [tabIndex, setTabIndex] = useState(0);

    let i0 = 0;
    let i1 = 0;

    return (<div>
        <AllProviders targetAssertive="aria-notifications-assertive" targetPolite="aria-notifications-polite">
            <Tabs
                localStorageKey="main-demo-page-selected-tab-index"
                label="Select the demo to view"
                labelPosition="hidden"
                orientation="horizontal"
                tabs={<>
                    <Tab index={i0++}>Button</Tab>
                    <Tab index={i0++}>Checkbox</Tab>
                    <Tab index={i0++}>Menu</Tab>
                    <Tab index={i0++}>Tooltip</Tab>
                    <Tab index={i0++}>Radio</Tab>
                    <Tab index={i0++}>Text field</Tab>
                    <Tab index={i0++}>Gridlist demo</Tab>
                    <Tab index={i0++}>Dialog</Tab>
                    <Tab index={i0++}>Slider</Tab>
                    <Tab index={i0++}>Toasts</Tab>
                    <Tab index={i0++}>Data Table</Tab>
                    <Tab index={i0++}>Accordion</Tab>
                    <Tab index={i0++}>Offcanvas</Tab>
                </>}
                panels={<>
                    <TabPanel index={i1++}><ButtonB.Demo /></TabPanel>
                    <TabPanel index={i1++}><Checkbox.Demo /></TabPanel>
                    <TabPanel index={i1++}><MenuDemo /></TabPanel>
                    <TabPanel index={i1++}><Tooltip.Demo /></TabPanel>
                    <TabPanel index={i1++}><Radio.Demo /></TabPanel>
                    <TabPanel index={i1++}><TextFieldD.Demo /></TabPanel>
                    <TabPanel index={i1++}><ListDemo /></TabPanel>
                    <TabPanel index={i1++}><DialogDemo /></TabPanel>
                    <TabPanel index={i1++}><SliderDemo /></TabPanel>
                    <TabPanel index={i1++}><ToastsDemo /></TabPanel>
                    <TabPanel index={i1++}><TableDemo /></TabPanel>
                    <TabPanel index={i1++}><AccordionDemo /></TabPanel>
                    <TabPanel index={i1++}><OffcanvasDemo /></TabPanel>
                </>}
            />
        </AllProviders>
    </div>
    )
}

requestAnimationFrame(() => {
    render(<Component />, document.getElementById("root")!);
})
