
import { Locator, expect } from "@playwright/test";
import { test as base } from "./shared.js"


declare global {
    interface Window {
        increment(): Promise<void>;
    }
}

export const test = base.extend<{ menu: { getCounter(): number; menuButton: Locator; defocusTarget: Locator; } }>({
    menu: async ({ page, shared: { locator } }, use) => {
        await page.goto("/tests/test-source/?test-base=menu");
        const menuButton = locator.locator("button");
        const defocusTarget = locator.locator("input");
        await page.keyboard.press("Tab");
        await expect(menuButton).toBeFocused();
        let counter = 0;
        const fixture = { getCounter() { return counter; }, menuButton, defocusTarget };
        page.exposeFunction("increment", () => counter += 1);
        use(fixture);
    },
});
