
import { Locator } from "@playwright/test";
import { test as base } from "./base.fixture.js";


export const test = base.extend<{ button: { button: Locator; } }>({
    button: async ({ page, shared: { locator } }, use) => {
        const button = locator.locator("button");
        await page.goto("/tests/stage/?test-base=button");
        const fixture = { button };
        use(fixture);
    },
});
