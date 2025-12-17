/* const BasePage = require('./BasePage');

class ContactPage extends BasePage {
    constructor(page) {
        super(page);

        this.name = page.locator('#name');
        this.email = page.locator('#email');
        this.phone = page.locator('#phone');
        this.subject = page.locator('#subject');
        this.message = page.locator('#description');
        this.submit = page.locator('#submitContact');
        this.success = page.locator('.contact .alert-success');
    }

    async open() {
        await this.navigate('/');
        await this.waitForVisible(this.name);
    }

    async submitContact(data = {}) {
        const { name, email, phone, subject, message } = data;
        await this.type(this.name, name);
        await this.type(this.email, email);
        await this.type(this.phone, phone);
        await this.type(this.subject, subject);
        await this.type(this.message, message);
        await this.click(this.submit);
    }
}

module.exports = ContactPage; */