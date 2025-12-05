// tests/ui/home.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Restful Booker UI', () => {
    test('landing page has header and can navigate to booking', async ({ page }) => {
        await page.goto('https://automationintesting.online/');
        await page.waitForLoadState('domcontentloaded');

        // Example assertions — adjust based on page UI
        await expect(page.locator('text=Home')).toBeVisible({ timeout: 5000 });
        // Capture screenshot for debug (optional)
        // await page.screenshot({ path: 'debug/home.png' });
    });
});