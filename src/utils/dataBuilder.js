module.exports = {
    bookingData() {
        return {
            firstname: "Eliana",
            lastname: "Mendez",
            email: `qa${Date.now()}@test.com`,
            phone: "123456789"
        }
    },

    contactFormData() {
        return {
            name: "Eliana",
            email: `contact${Date.now()}@test.com`,
            phone: "01234567890",
            subject: "Testing Playwright",
            message: "This is an automated test message."
        }
    }
};