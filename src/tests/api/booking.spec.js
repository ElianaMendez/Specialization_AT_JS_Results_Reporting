import { test, expect } from '@playwright/test';
import apiClient from '../../utils/apiClient.js';

test('Create and retrieve a booking', async ({ baseURL }) => {
    const payload = {
        firstname: "Eliana",
        lastname: "Mendez",
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: "2025-02-01",
            checkout: "2025-02-10"
        },
        additionalneeds: "Breakfast"
    };

    const create = await apiClient.createBooking(payload, baseURL);
    expect(create.status).toBe(200);
    expect(create.body.bookingid).toBeDefined();

    const bookingId = create.body.bookingid;
    const get = await apiClient.getBooking(bookingId, baseURL);

    expect(get.status).toBe(200);
    expect(get.body.firstname).toBe("Eliana");
});