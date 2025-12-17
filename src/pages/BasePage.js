class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigate(path = '/') {
        await this.page.goto(path);
    }

    async click(locator) {
        await locator.click();
    }

    async fill(locator, text) {
        await locator.fill(text);
    }

    async getText(locator) {
        return (await locator.textContent()) || '';
    }

    async waitForVisible(locator, options = { timeout: 5000 }) {
        await locator.waitFor({ state: 'visible', ...options });
    }

    async waitForHidden(locator, options = { timeout: 5000 }) {
        await locator.waitFor({ state: 'hidden', ...options });
    }
}

module.exports = BasePage;