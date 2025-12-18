// src/tests/ui/booking.spec.js
/* const { test, expect } = require('@playwright/test');
const dataBuilder = require('../../utils/dataBuilder');

test.describe('Booking flow using baseURL', () => {

    test('Book first room end-to-end', async ({ page }) => {
        const pm = new PageManager(page);
        const booking = dataBuilder.bookingData();

        // This uses baseURL automatically → baseURL + '/'
        await pm.home.open();

        // Click the first room’s booking button
        await pm.home.bookRoomByIndex(0);

        // Complete booking modal
        await pm.booking.completeBooking(
            booking.firstname,
            booking.lastname,
            booking.email,
            booking.phone
        );

        // Validate success
        await expect(pm.booking.successAlert).toBeVisible();
    }); */

const { test, expect } = require('@playwright/test');
const BookingPage = require('../../pages/BookingPage');
const HomePage = require('../../pages/HomePage');

test.describe('Booking Form Validation Tests', () => {

    test('Should display error messages when submitting empty form', async ({ page }) => {
        const bookingPage = new BookingPage(page);
        const homePage = new HomePage(page);

        await homePage.open();
        await homePage.clickSecondRoom();
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
