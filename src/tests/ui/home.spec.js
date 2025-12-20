import { test, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage.js';
import { contactFormData } from '../../utils/dataBuilder.js';

test.describe('Home Page – Contact Form Functionality', () => {

    test('should successfully submit the contact form with valid data', async ({ page }) => {
        const homePage = new HomePage(page);
        const data = contactFormData();

        await homePage.open();
        await homePage.goToContactForm();
        await homePage.fillContactForm(data);
        await homePage.submitContactForm();

        await expect(homePage.contactFormSuccessAlert).toBeVisible();

        const successMessage = await homePage.getContactSuccessMessage();
        expect(successMessage).toContain('as soon as possible.');
    });
});