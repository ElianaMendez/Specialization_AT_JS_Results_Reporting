const BasePage = require('./BasePage');

class HomePage extends BasePage {

    constructor(page) {
        super(page);

        this.nameContactInput = page.locator('#name');
        this.emailContactInput = page.locator('#email');
        this.phoneContactInput = page.locator('#phone');
        this.subjectContactInput = page.locator('#subject');
        this.messageContactInput = page.locator('#description');
        this.submitButton = page.locator("button[class='btn btn-primary']");
        this.secondBookRoomButton = page.locator('//a[contains(@href,"/reservation/2")]');
        this.contactMenuLink = page.locator('//a[contains(@href,"/#contact")]');
        this.contactFormSuccessAlert = page.locator('p').filter({ hasText: /as soon as possible/i });
    }

    async open() {
        await this.navigate('/');
    }

    async clickSecondRoom() {
        await this.click(this.secondBookRoomButton);
    }

    async goToContactForm() {
        await this.click(this.contactMenuLink);
    }

    async fillContactForm(data) {
        await this.fill(this.nameContactInput, data.name);
        await this.fill(this.emailContactInput, data.email);
        await this.fill(this.phoneContactInput, data.phone);
        await this.fill(this.subjectContactInput, data.subject);
        await this.fill(this.messageContactInput, data.message);
    }

    async clikcSubmitContactFormButton() {
        await this.click(this.submitButton);
    }

    async waitForAlertMessageAppears() {
        await this.waitForVisible(this.contactFormSuccessAlert, { timeout: 10000 });
    }

    async getTextAlertSuccess() {
        return await this.getText(this.contactFormSuccessAlert);
    }

    async clickBookRoomButton() {
        await this.click(this.secondBookRoomButton);
    }
}

module.exports = HomePage;