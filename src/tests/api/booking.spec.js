import { test, expect } from '@playwright/test';
import apiClient from '../../utils/apiClient.js';

test('Create and retrieve a booking', async ({ baseURL }) => {
  const timestamp = Date.now();

  const payload = {
    firstname: `Test-${timestamp}`,
    lastname: 'Automation',
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: '2025-02-01',
      checkout: '2025-02-10',
    },
    additionalneeds: 'Breakfast',
  };

  const create = await apiClient.createBooking(payload, baseURL);
  expect(create.status).toBe(200);
  expect(create.body.bookingid).toBeDefined();

  const bookingId = create.body.bookingid;
  const get = await apiClient.getBooking(bookingId, baseURL);

  expect(get.status).toBe(200);

  expect(get.body.firstname).toBe(payload.firstname);
  expect(get.body.lastname).toBe(payload.lastname);
  expect(get.body.totalprice).toBe(payload.totalprice);
  expect(get.body.depositpaid).toBe(true);
  expect(get.body.bookingdates.checkin).toBe(payload.bookingdates.checkin);
  expect(get.body.bookingdates.checkout).toBe(payload.bookingdates.checkout);
});
