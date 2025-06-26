import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Репортеры — обычный лист в консоли + allure
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

  // Глобальные timeout
  timeout: 30 * 1000,

  // Настройки браузеров, можно добавить другие проекты
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
  ],

  // Твой базовый тест с фикстурами (пример)
  // Можно вынести в отдельный файл и импортировать сюда
  // Ниже пример, как можно добавить фикстуры прямо тут (если хочешь)
  // Но лучше в отдельном файле, как у тебя

  // Пример настройки фикстур (если нужно)
  // fixtures: {
  //   authForm: ...,
  //   credentials: ...,
  //   addProduct: ...,
  //   containerCheck: ...,
  // },

  // Дополнительные настройки можно добавить сюда
});
