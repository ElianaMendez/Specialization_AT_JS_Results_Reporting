import { defineConfig } from '@playwright/test';

export default defineConfig({
    timeout: 30000,

    projects: [
        {
            name: 'ui-tests',
            use: {
                headless: true,
                baseURL: 'https://automationintesting.online',
                viewport: { width: 1280, height: 720 },
                actionTimeout: 10000,
                screenshot: 'only-on-failure',
                video: 'retain-on-failure',
                trace: 'on-first-retry'
            },
            testMatch: ['tests/ui/**/*.spec.js']
        },

        {
            name: 'api-tests',
            use: {
                baseURL: 'https://restful-booker.herokuapp.com',
                extraHTTPHeaders: {
                    'Content-Type': 'application/json'
                }
            },
            testMatch: ['tests/api/**/*.spec.js']
        }
    ],
});