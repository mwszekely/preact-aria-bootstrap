
import { Locator, expect } from "@playwright/test";
import { test as base } from "./base.fixture.js";



export const test = base.extend<{ menu: { menuButton: Locator; defocusTarget: Locator; } }>({
    menu: async ({ page, shared: { locator } }, use) => {
        await page.goto("/tests/stage/?test-base=menu");
        const menuButton = locator.locator("button");
        const defocusTarget = locator.locator("input");
        await page.keyboard.press("Tab");
        await expect(menuButton).toBeFocused();
        const fixture = {  menuButton, defocusTarget };
        use(fixture);
    },
});
