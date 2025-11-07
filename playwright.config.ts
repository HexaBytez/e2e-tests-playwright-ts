import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  
  testDir: './tests',

  reporter: [
    ['list'],
    ['allure-playwright', {
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: false,
      attachments: true,
    }],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],

  timeout: 60000,
  //retries: 2,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // {
    //   name: 'mobile-chrome',  
    //   use: { ...devices['Pixel 8'] },
    // },
  ],
});
