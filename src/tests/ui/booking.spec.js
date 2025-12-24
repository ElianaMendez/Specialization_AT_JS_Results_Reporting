import { test, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage.js';
import BookingPage from '../../pages/BookingPage.js';

test.describe('Booking Form – Validation Errors', () => {
  test('Should display all validation errors when submitting an empty booking form', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const bookingPage = new BookingPage(page);

    await homePage.open();
    await homePage.clickBookRoom();
    await bookingPage.waitForLoadState();
    await bookingPage.waitForBookingCard();
    await bookingPage.clickFirstReserveNow();
    await bookingPage.waitForPriceSummaryVisible();

    const fieldValues = await bookingPage.getFieldValues();
    expect(fieldValues).toEqual({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    });

    await bookingPage.clickSecondReserveNow();
    await bookingPage.waitForValidationErrors();

    const errors = await bookingPage.getValidationErrorMessages();
    expect(errors).toHaveLength(7);

    const expectedErrors = [
      'size must be between 11 and 21',
      'size must be between 3 and 30',
      'must not be empty',
      'size must be between 3 and 18',
      'Firstname should not be blank',
      'Lastname should not be blank',
    ];

    expectedErrors.forEach((expectedError) => {
      expect(errors).toContain(expectedError);
    });

    const mustNotBeEmptyCount = errors.filter((error) => error === 'must not be empty').length;
    expect(mustNotBeEmptyCount).toBe(2);
  });
});
