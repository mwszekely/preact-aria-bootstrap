import { expect } from '@playwright/test';
import { test } from "./button.fixture.js";



test('Clicking fires `press` events', async ({ page, button: { button }, shared: { getCounter, install, run, locator } }) => {

    // Set the button's press handler to wait for 1 second, 
    // then increment our counter
    await install("Button", "onPress", async (e) => { await new Promise(resolve => setTimeout(resolve, 750)); await window.increment?.(); });

    expect(getCounter(), "We haven't clicked the button, so the counter should still be 0").toBe(0);
    await button.click();
    await new Promise(resolve => setTimeout(resolve, 250));
    expect(getCounter()).toBe(0);
    await new Promise(resolve => setTimeout(resolve, 750));
    expect(getCounter()).toBe(1);


    await install("Button", "onPress", async (e) => { await window.increment?.(); });
    await button.click();
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(getCounter()).toBe(2);
});


test('Disabled during an async press', async ({ page, button: {button }, shared: { getCounter,  install, run, locator } }) => {

    // When clicking a button with a sync handler, it should not become disabled in any way.
    await install("Button", "onPress", (e) => {  });
    await button.click();
    await new Promise(resolve => setTimeout(resolve, 250));
    await expect(button).not.toBeDisabled();

    // When clicking a button with an async handler, it should become disabled in the way specified by the user.
    await run("Button", "setDisabledType", "hard");
    await install("Button", "onPress", (e) => { return new Promise(resolve => setTimeout(resolve, 3000)) });
    await button.click();
    await new Promise(resolve => setTimeout(resolve, 250));
    await expect(button).toHaveAttribute("disabled", /.*/);
    await expect(button).not.toHaveAttribute("aria-disabled", /.*/);

    await expect(button).not.toHaveAttribute("disabled", /.*/);
    await expect(button).not.toHaveAttribute("aria-disabled", /.*/);

    await run("Button", "setDisabledType", "soft");
    await install("Button", "onPress", (e) => { return new Promise(resolve => setTimeout(resolve, 3000)) });
    await button.click();
    await new Promise(resolve => setTimeout(resolve, 250));
    await expect(button).toHaveAttribute("aria-disabled", /.*/);
    await expect(button).not.toHaveAttribute("disabled", /.*/);

    await expect(button).not.toHaveAttribute("aria-disabled", /.*/);
    await expect(button).not.toHaveAttribute("disabled", /.*/);
});



test('While disabled cannot be pressed', async ({ page, button: { button }, shared: { getCounter, install, locator, run } }) => {

    const types = ["hard", "soft"] as const;

    for (const type of types) {
        await run("Button", "setDisabled", true);
        await run("Button", "setDisabledType", type);
        await expect(getCounter()).toBe(0);
        await install("Button", "onPress", (e) => { window.increment(); });
        await button.dispatchEvent('click');
        await new Promise(resolve => setTimeout(resolve, 50));
        await expect(button).toBeDisabled();
        await expect(getCounter()).toBe(0);
    }
});

test('All press event types work', async ({ page, button: { button }, shared: { getCounter, run, install, locator } }) => {
    await install("Button", "onPress", () => { window.increment(); });

    let c = 0;

    await expect(getCounter()).toBe(c);     // Sanity check
    await button.click();
    await expect(getCounter()).toBe(++c);   // Clicked -- counter should change immediately

    // The button should be focused now, so we can use keyboard controls.
    await expect(button).toBeFocused();
    await page.keyboard.down("Enter");
    await expect(getCounter()).toBe(++c);   // Counter should change on keydown for Enter
    await page.keyboard.up("Enter");
    await expect(getCounter()).toBe(c);
    await page.keyboard.down("Space");
    await expect(getCounter()).toBe(c);     // Counter should change on keyup for Space
    await page.keyboard.up("Space");
    await expect(getCounter()).toBe(++c);
});


