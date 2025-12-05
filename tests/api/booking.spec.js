// tests/api/booking.spec.js
const { test, expect, request } = require('@playwright/test');

const BASE = 'https://restful-booker.herokuapp.com';

test.describe('Restful Booker API', () => {
    test('GET /booking returns array and 200', async () => {
        const api = await request.newContext();
        const res = await api.get(`${BASE}/booking`);
        expect(res.status()).toBe(200);

        const body = await res.json();
        expect(Array.isArray(body)).toBe(true);
        await api.dispose();
    });

    test('Create booking (POST) then get by id', async () => {
        const api = await request.newContext();
        const payload = {
            firstname: 'Eliana',
            lastname: 'Mendez',
            totalprice: 123,
            depositpaid: false,
            bookingdates: { checkin: "2025-01-01", checkout: "2025-02-01" },
            additionalneeds: 'Breakfast'
        };

        const post = await api.post(`${BASE}/booking`, {
            data: payload,
            headers: { 'Content-Type': 'application/json' }
        });
        expect(post.status()).toBe(200);
        const postBody = await post.json();
        expect(postBody).toHaveProperty('bookingid');

        const id = postBody.bookingid;
        const get = await api.get(`${BASE}/booking/${id}`);
        expect(get.status()).toBe(200);
        const getBody = await get.json();
        expect(getBody.firstname).toBe(payload.firstname);

        // optionally cleanup - restful-booker doesn't have DELETE without token (skip)
        await api.dispose();
    });
});