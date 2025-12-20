import BasePage from './BasePage.js';

export default class HomePage extends BasePage {

    constructor(page) {
        super(page);

        this.nameContactInput = page.locator('#name');
        this.emailContactInput = page.locator('#email');
        this.phoneContactInput = page.locator('#phone');
        this.subjectContactInput = page.locator('#subject');
        this.messageContactInput = page.locator('#description');
        this.submitContactButton = page.locator('//button[@class = "btn btn-primary"]');
        this.roomCards = page.locator('.room-card');
        this.bookRoomButton = page.locator('a[href^="/reservation"]').first();
        this.contactFormSuccess = page.locator('(//div[@class="card-body p-4"])[2]');
        this.contactFormSuccessAlert = page.locator('//p[contains(text(), "as soon as possible.")]');

    }

    async open() {
        await this.navigate('/');
    }

    async goToContactForm() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.nameContactInput.scrollIntoViewIfNeeded();
    }

    async fillContactForm({ name, email, phone, subject, message }) {
        await this.fill(this.nameContactInput, name);
        await this.fill(this.emailContactInput, email);
        await this.fill(this.phoneContactInput, phone);
        await this.fill(this.subjectContactInput, subject);
        await this.fill(this.messageContactInput, message);
    }

    async submitContactForm() {
        await this.click(this.submitContactButton);
    }

    async getContactSuccessMessage() {
        return await this.getText(this.contactFormSuccessAlert);
    }

    async clickBookRoom() {
        await this.roomCards.first().waitFor({ timeout: 50000 });
        await this.click(this.bookRoomButton);
    }

    async waitForSuccessMessageApears() {
        await this.contactFormSuccess.waitFor({ timeout: 30000 });
    }
}