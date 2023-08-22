
import { EventType } from "preact-prop-helpers";
import { Button, Menu, MenuItem } from "../../dist/index.js";
import { TestItem } from "../util.js";

export interface MenuConstants {
    onMenuItem(closeMenu: ((e: EventType<any, any>) => void), index: number, e: EventType<any, any>): (void | Promise<void>);
    /*setDisabled(disabled: boolean): void;
    setDisabledType(type: "soft" | "hard"): void;
    setBadge(badge: Nullable<string>): void;
    setPressed(pressed: Nullable<boolean>): void;
    setFill(fill: Nullable<ButtonFills>): void;
    setSize(size: Nullable<ButtonSizes>): void;
    setTheme(theme: Nullable<ButtonThemes>): void;*/
}

export function TestBasesMenu() {

    return (
        <TestItem>
            <Menu anchor={<Button onPress={null}>Open Menu</Button>}>
                <MenuItem onPress={(async (closeMenu, e) => (await (getTestingHandler("Menu", "onMenuItem") ?? (async (closeMenu) => { await new Promise(resolve => setTimeout(resolve, 1000)); closeMenu(e); })))(closeMenu, 0, e))} index={0}>Item 0</MenuItem>
                <MenuItem onPress={(async (closeMenu, e) => (await (getTestingHandler("Menu", "onMenuItem") ?? (async (closeMenu) => { await new Promise(resolve => setTimeout(resolve, 1000)); closeMenu(e); })))(closeMenu, 1, e))} index={1}>Another Item (1)</MenuItem>
                <MenuItem onPress={(async (closeMenu, e) => (await (getTestingHandler("Menu", "onMenuItem") ?? (async (closeMenu) => { await new Promise(resolve => setTimeout(resolve, 1000)); closeMenu(e); })))(closeMenu, 2, e))} index={2} disabled>Disabled Item (2)</MenuItem>
                <MenuItem onPress={(async (closeMenu, e) => (await (getTestingHandler("Menu", "onMenuItem") ?? (async (closeMenu) => { await new Promise(resolve => setTimeout(resolve, 1000)); closeMenu(e); })))(closeMenu, 3, e))} index={3}>The next item is missing (3)</MenuItem>
                <MenuItem onPress={(async (closeMenu, e) => (await (getTestingHandler("Menu", "onMenuItem") ?? (async (closeMenu) => { await new Promise(resolve => setTimeout(resolve, 1000)); closeMenu(e); })))(closeMenu, 5, e))} index={5}>Final Item (5)</MenuItem>
            </Menu>
            <input type="text" value="I can take focus" />
        </TestItem>
    )
}