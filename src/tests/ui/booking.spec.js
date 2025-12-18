import { test, expect } from '@playwright/test';
import BookingPage from '../../pages/BookingPage.js';
import HomePage from '../../pages/HomePage.js';


test.describe('Booking Form Validation Tests', () => {

    test('Should display error messages when submitting empty form', async ({ page }) => {
        const bookingPage = new BookingPage(page);
        const homePage = new HomePage(page);

        await homePage.open();
        await homePage.clickBookRoomButton();
        await bookingPage.waitForCard();
        await bookingPage.clickFirstReservationNowButton();
        await bookingPage.waitPriceSummaryTitle();

        const areFieldsEmpty = await bookingPage.validateFieldsAreEmpty();
        expect(areFieldsEmpty).toBe(true);

        await bookingPage.clickSecondReservationNowButton();

        await bookingPage.validateErrorContainertoBeVisible();

        const errorMessagesValid = await bookingPage.validateErrorMessages();
        expect(errorMessagesValid).toBe(true);
    });   
});
