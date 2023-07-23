import { expect } from '@playwright/test';
import { test } from "./menu.fixture.js";

test('Opens when button clicked', async ({ page, menu: { menuButton }, shared: { install, run, locator } }) => {
    await menuButton.click();
    await expect(page.locator("[role=menuitem]").first()).toBeVisible();
});

test('Menu items can be pressed', async ({ page, menu: { menuButton }, shared: { getCounter, install, run, locator } }) => {
    await install("Menu", "onMenuItem", async (closeMenu, index) => { 
       await new Promise(resolve => setTimeout(resolve, 500));  
       await window.increment(); 
       if (index == 0)
        closeMenu(); 
    });

    await menuButton.click();
    await expect(page.locator("[role=menu]")).toBeVisible();
    await page.locator("[role=menuitem]").nth(1).click();
    await expect(page.locator("[role=menuitem]").nth(1), "Clicking an async menu item should disable it").toBeDisabled();
    await new Promise(resolve => setTimeout(resolve, 500));
    await expect(page.locator("[role=menuitem]").nth(1), "The menu should not close itself when closeMenu is not called").toBeVisible();
    expect(getCounter()).toBe(1);

    await page.locator("[role=menuitem]").first().click();
    await expect(page.locator("[role=menuitem]").first(), "Clicking an async menu item should disable it").toBeDisabled();
    await new Promise(resolve => setTimeout(resolve, 500));
    await expect(page.locator("[role=menuitem]").first(), "The menu should close itself when closeMenu is called").not.toBeVisible();
    expect(getCounter()).toBe(2);
});

test('Down arrow opens menu', async ({ page, menu: { menuButton }, shared: { install, run, locator } }) => {
    await menuButton.focus();
    await page.keyboard.press("ArrowDown");
    await expect(page.locator("[role=menuitem]").first()).toBeVisible();
});

test('Escape closes menu', async ({ page, menu: { menuButton }, shared: { install, run, locator } }) => {
    await menuButton.click();
    await expect(page.locator("[role=menuitem]").first()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(page.locator("[role=menu]")).not.toBeVisible();
});

// TODO: Is there a way to test a screen reader?
test('Losing focus closes menu', async ({ page, menu: { menuButton }, shared: { focusableFirst, install, run, locator } }) => {

    await menuButton.click();
    await expect(page.locator(":focus")).toHaveAttribute("role", "menuitem");
    await focusableFirst.click();
    await expect(page.locator("[role=menuitem]").first(), "The menu should not be visible when clicking a focusable element").not.toBeVisible();
    await expect(focusableFirst, "Focus must remain on the element that gained focus").toBeFocused();

    await menuButton.click();
    await expect(page.locator(":focus")).toHaveAttribute("role", "menuitem");
    await page.locator("body").click();
    await expect(page.locator("[role=menuitem]").first(), "The menu should not be visible when clicking the body").not.toBeVisible();
    await expect(page.locator("button"), "Focus must be restored to the menu opener").toBeFocused();
});


test('Focus enters/leaves properly', async ({ page, menu: { menuButton }, shared: { install, run, locator } }) => {
    await install("Menu", "onMenuItem", async (index) => { await new Promise(resolve => setTimeout(resolve, 750)); await window.increment(); });
    await menuButton.click();
    await expect(page.locator(":focus")).toHaveAttribute("role", "menuitem");
});

test('Keyboard navigation works as expected', async ({ page, menu: { menuButton }, shared: { install, run, locator } }) => {
    await page.keyboard.down("ArrowDown")
    await expect(page.locator("[role=menuitem]").nth(0), "The 0-th menu item should be focused by default").toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(page.locator("[role=menuitem]").nth(1), "Pressing down should focus the 1-th element").toBeFocused();
    await new Promise(resolve => setTimeout(resolve, 20));    // Wait for the typeahead to timeout
    await page.keyboard.press("ArrowDown");
    await expect(page.locator("[role=menuitem]").nth(2), "The 2-th element is disabled, but can still be focused").toBeFocused();
    await page.keyboard.press("End");
    await expect(page.locator("[role=menuitem]").last(), "Pressing End should focus the final element").toBeFocused();
    await page.keyboard.press("ArrowUp");
    await expect(page.locator("[role=menuitem]").nth(3), "The 4-th item is missing, so pressing up should focus the 3-th element").toBeFocused();
    await page.keyboard.press("Home");
    await expect(page.locator("[role=menuitem]").first(), "Pressing home should focus the first element").toBeFocused();
    await page.keyboard.type("Another Item (1)");
    await expect(page.locator("[role=menuitem]").nth(1), "Typeahead navigation should work, even for parentheses").toBeFocused();
    await new Promise(resolve => setTimeout(resolve, 1550));    // Wait for the typeahead to timeout
    await page.keyboard.type("Disabled Item");
    await expect.soft(page.locator("[role=menuitem]").nth(2), "Typeahead should work for disabled items, I guess").toBeFocused();
});