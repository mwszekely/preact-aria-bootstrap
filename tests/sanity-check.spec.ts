import { expect } from '@playwright/test';
import { test } from "./fixtures/shared.js"

test('Sanity checks', async ({ page, shared: {  } }) => {
    console.log("TEST");

    await page.goto("/tests/test-source/?test-base=sanity-check");

    await expect(page).toHaveTitle("Unit Testing");
    
    await page.on('console', (msg) => {
        if (msg && msg.text) {
            let contents = (typeof msg.text == "function"? msg.text() : msg.text) as string;
            if (msg.type() != "error")
                return;
            console[msg.type() == "error"? "error" : "log"](contents);
        } else {
            console.log('PAGE LOG:', msg);
        }
    });

    const locator = page.locator(".tests-container");
    await expect(locator.locator(".default")).toContainText("default");
    await expect(locator.locator(".encoding")).toContainText("符号化テスト");
});
