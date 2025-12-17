// src/tests/ui/home.spec.js
const { test, expect } = require('@playwright/test');
const HomePage = require('../../pages/HomePage');


test.describe('Home Page UI', () => {

    test('Contact form can be submitted', async ({ page }) => {
        const contactForm = new HomePage(page);
        const data = require('../../utils/dataBuilder').contactFormData();

        await contactForm.open();
        await contactForm.goToContactForm();
        await contactForm.fillContactForm(data);
        await contactForm.clikcSubmitContactFormButton();
        await contactForm.waitForAlertMessageAppears();

        const alertSuccess = await contactForm.getTextAlertSuccess();

        expect(alertSuccess).toContain('as soon as possible');
    });

 /*    test('DEBUG - Check contact form response', async ({ page }) => {
        const contactForm = new HomePage(page);
        const data = require('../../utils/dataBuilder').contactFormData();

        await contactForm.open();
        await contactForm.goToContactForm();
        await contactForm.fillContactForm(data);
        await contactForm.clikcSubmitContactFormButton();

        // Esperar un poco
        await page.waitForTimeout(3000);

        // Tomar screenshot
        await page.screenshot({ path: 'contact-form-after-submit.png', fullPage: true });

        // Ver todos los elementos con "soon"
        const allText = await page.locator('*').allTextContents();
        const withSoon = allText.filter(t => t.includes('soon'));
        console.log('Elements containing "soon":', withSoon);

        // Ver todos los alerts
        const alerts = await page.locator('div[class*="alert"], [role="alert"]').all();
        console.log(`Found ${alerts.length} alerts`);
        for (let i = 0; i < alerts.length; i++) {
            const text = await alerts[i].textContent();
            console.log(`Alert ${i}: ${text}`);
        }
    }); */
});

/*     test('Home loads and shows hotel name and rooms', async ({ page }) => {
        const home = new HomePage(page);
        await home.open();

        const hotelName = await home.getText(home.hotelName);
        expect(hotelName.length).toBeGreaterThan(0);

        const roomsCount = await pm.rooms.getRoomCount();
        expect(roomsCount).toBeGreaterThan(0);
    }); */