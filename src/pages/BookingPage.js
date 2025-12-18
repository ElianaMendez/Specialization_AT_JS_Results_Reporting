const BasePage = require('./BasePage');

class BookingPage extends BasePage {
    constructor(page) {
        super(page);

        this.firstNameInput = page.locator('input[aria-label="Firstname"]');
        this.lastNameInput = page.locator('input[aria-label="Lastname"]');
        this.emailInput = page.locator('input[aria-label="Email"]');
        this.phoneInput = page.locator('input[aria-label="Phone"]');
        this.firstReserveNowButton = page.locator('#doReservation');
        this.priceSummaryTitle = page.locator('//h3[contains(text(), "Price Summary")]');
        this.secondReserveNowButton = page.locator('button.btn.btn-primary.w-100.mb-3');
        this.bookingCard = page.locator('//h2[contains(@class, "card-title")]');
        this.errorMessageContainer = page.locator('div.alert.alert-danger');
        this.listErrorAlert = page.locator('div.alert.alert-danger li');
    }

    async waitForCard() {
        await this.waitForVisible(this.bookingCard);
    }

    async clickFirstReservationNowButton() {
        await this.click(this.firstReserveNowButton);
    }

    async waitPriceSummaryTitle() {
        await this.waitForVisible(this.priceSummaryTitle);
    }

    async clickSecondReservationNowButton() {
        await this.secondReserveNowButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.click(this.secondReserveNowButton);
    }

    async validateErrorContainertoBeVisible() {
        await this.waitForVisible(this.errorMessageContainer);
    }

    async validateFieldsAreEmpty() {
        const firstNameValue = await this.firstNameInput.inputValue();
        const lastNameValue = await this.lastNameInput.inputValue();
        const emailValue = await this.emailInput.inputValue();
        const phoneValue = await this.phoneInput.inputValue();

        return firstNameValue === '' &&
            lastNameValue === '' &&
            emailValue === '' &&
            phoneValue === '';
    }

    async validateErrorMessages() {
        await this.errorMessageContainer.waitFor({ state: 'visible', timeout: 10000 });

        const errorMessages = await this.listErrorAlert.allTextContents();
        const trimmedErrors = errorMessages.map(error => error.trim());

        console.log('=== ERROR VALIDATION ===');
        console.log(`Found ${trimmedErrors.length} errors:`, trimmedErrors);

        // Lista de errores únicos que deben aparecer
        const requiredUniqueErrors = [
            'size must be between 11 and 21',
            'size must be between 3 and 30',
            'must not be empty',
            'size must be between 3 and 18',
            'Firstname should not be blank',
            'Lastname should not be blank'
        ];

        // Verificar que tengamos 7 errores en total
        const hasCorrectCount = trimmedErrors.length === 7;

        // Verificar que cada error requerido aparezca al menos una vez
        const allRequiredErrorsPresent = requiredUniqueErrors.every(expectedError => {
            const found = trimmedErrors.includes(expectedError);
            if (!found) {
                console.log(`Missing error: "${expectedError}"`);
            }
            return found;
        });

        // Verificar que "must not be empty" aparezca exactamente 2 veces
        const mustNotBeEmptyCount = trimmedErrors.filter(e => e === 'must not be empty').length;
        const hasTwoMustNotBeEmpty = mustNotBeEmptyCount === 2;

        console.log('✓ Has 7 errors:', hasCorrectCount);
        console.log('✓ All required errors present:', allRequiredErrorsPresent);
        console.log('✓ "must not be empty" appears twice:', hasTwoMustNotBeEmpty);
        console.log('=== END VALIDATION ===');

        return hasCorrectCount && allRequiredErrorsPresent && hasTwoMustNotBeEmpty;
    }
}

module.exports = BookingPage;
