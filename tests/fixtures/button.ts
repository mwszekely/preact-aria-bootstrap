
import { Locator } from "@playwright/test";
import { test as base } from "./shared.js"


declare global {
    interface Window {
        increment(): Promise<void>;
    }
}

export const test = base.extend<{ button: { getCounter(): number; button: Locator; } }>({
    button: async ({ page, shared: { locator } }, use) => {
        const button = locator.locator("button");
        await page.goto("/tests/test-source/?test-base=button");
        let counter = 0;
        const fixture = { getCounter() { return counter; }, button };
        page.exposeFunction("increment", () => counter += 1);
        use(fixture);
    },
});
