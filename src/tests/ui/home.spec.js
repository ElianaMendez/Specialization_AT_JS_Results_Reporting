import { test, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage.js';
import { contactFormData } from '../../utils/dataBuilder.js';


test.describe('Home Page UI', () => {

    test('Contact form can be submitted', async ({ page }) => {
        const contactForm = new HomePage(page);
        const data = contactFormData();

        await contactForm.open();
        await contactForm.goToContactForm();
        await contactForm.fillContactForm(data);
        await contactForm.clikcSubmitContactFormButton();
        await contactForm.waitForAlertMessageAppears();

        const alertSuccess = await contactForm.getTextAlertSuccess();

        expect(alertSuccess).toContain('as soon as possible');
    });
});