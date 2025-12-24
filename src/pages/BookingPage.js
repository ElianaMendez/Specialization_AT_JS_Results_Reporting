import BasePage from './BasePage.js';

export default class BookingPage extends BasePage {
    constructor(page) {
        super(page);

        this.firstNameInput = page.locator('input[aria-label="Firstname"]');
        this.lastNameInput = page.locator('input[aria-label="Lastname"]');
        this.emailInput = page.locator('input[aria-label="Email"]');
        this.phoneInput = page.locator('input[aria-label="Phone"]');
        this.firstReserveNowButton = page.locator('#doReservation');
        this.secondReserveNowButton = page.locator('button.btn.btn-primary.w-100.mb-3');
        this.bookingCardTitle = page.locator('h2.card-title');
        this.priceSummaryTitle = page.locator('h3', { hasText: 'Price Summary' });
        this.validationErrors = page.locator('text=/must not be empty|should not be blank|size must be between/i');
    }

    async clickFirstReserveNow() {
        await this.click(this.firstReserveNowButton);
    }

    async clickSecondReserveNow() {
        await this.click(this.secondReserveNowButton, { force: true });
    }

    async waitForBookingCard() {
        await this.bookingCardTitle.waitFor({ 
            state: 'visible',
            timeout: 60000        
        });
    }

    async waitForLoadState(){
        await this.page.waitForLoadState('domcontentloaded');
    }

    async waitForPriceSummaryVisible() {
        await this.priceSummaryTitle.waitFor({ state: 'visible' });
    }

    async waitForValidationErrors() {
        await this.validationErrors.first().waitFor({
            state: 'visible',
            timeout: 50000
        });
    }

    async getFieldValues() {
        return {
            firstName: await this.firstNameInput.inputValue(),
            lastName: await this.lastNameInput.inputValue(),
            email: await this.emailInput.inputValue(),
            phone: await this.phoneInput.inputValue()
        };
    }

    async getValidationErrorMessages() {
        const errors = await this.validationErrors.allTextContents();
        return errors.map(e => e.trim());
    }
}