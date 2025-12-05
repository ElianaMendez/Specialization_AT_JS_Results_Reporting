// playwright.config.js
const { devices } = require('@playwright/test');

module.exports = {
    testDir: './tests',
    timeout: 30 * 1000,
    reporter: [
        // "list" acts as a spec-like reporter and prints readable results to console
        ['list'],
        // HTML reporter: output to playwright-report folder
        ['html', { outputFolder: 'playwright-report', open: 'never' }]
    ],
    use: {
        headless: true,
        actionTimeout: 5000,
        trace: 'on-first-retry'
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        }
    ]
};