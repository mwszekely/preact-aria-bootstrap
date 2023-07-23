
import { Button, Menu, MenuItem } from "../../dist/index.js";
import { TestItem } from "../util.js";

export interface MenuConstants {
    onMenuItem(closeMenu: (() => void), index: number): (void | Promise<void>);
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