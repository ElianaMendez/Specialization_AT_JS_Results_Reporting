export default class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigate(path = '/') {
        await this.page.goto(path);
    }

    async click(locator, options = {}) {
        const {
            force = false,
            timeout = 20000
        } = options;

        await locator.scrollIntoViewIfNeeded();
        await locator.waitFor({ state: 'visible', timeout });
        await locator.click({ force });
    }

    async fill(locator, text, options = {}) {
        await locator.fill(text, options);
    }

    async getText(locator) {
        return (await locator.textContent())?.trim() || '';
    }
}