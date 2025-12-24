import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 30000,

  reporter: [['list'], ['html', { outputFolder: 'test-results', open: 'never' }]],

  projects: [
    {
      name: 'ui-tests',
      testMatch: ['tests/ui/**/*.spec.js'],
      use: {
        headless: true,
        baseURL: 'https://automationintesting.online',
        viewport: { width: 1280, height: 720 },
        actionTimeout: 10000,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
      },
    },

    {
      name: 'api-tests',
      testMatch: ['tests/api/**/*.spec.js'],
      use: {
        baseURL: 'https://restful-booker.herokuapp.com',
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
        },
      },
    },
  ],
});
