# e2e-auth-tests-playwright-ts
E2E тесты для сценариев тестирования для демо проекта на saucedemo.com

# Описание
Выполнение e2e тестов демо приложения saucedemo.com.

## Установка
Скопировать репозиторий:

git clone https://github.com/<username>/e2e-tests-playwright-ts.git
cd e2e-auth-tests-playwright-ts

## Установить зависимости
npm install

## Установить Playwright
npx playwright install

## Запуск тестов:
npx playwright test - запуск всех тестов
npx playwright test --headed - Запуск тестов с браузером
npx playwright test --debug - Запуск тестов в режиме отладки

## Запуск тестов в GitHub Acnions
Тесты автоматически запускаются при создании сборки pull request.
Также тесты можно запустить вручную на странице Actions вашего репозитория.

Отчеты автоматически формируются в html и Allure

## Структура тестов
tests/                # Каталог с тестами
page/                 # Каталог с Page Object - объектами страниц
playwright.config.ts  # Конфигурационный файл Playwright
package.json          # Управление зависимостями и скриптами
README.md             # Документация

## Основные команды

| Команда                                                      | Описание                                         |
| ------------------------------------------------------------ | ------------------------------------------------ |
| `npx playwright install`                                     | Установка браузеров Playwright                   |
| `npx playwright test`                                        | Запуск всех тестов                               |
| `npx playwright test --ui`                                   | Запуск всех тестов в UI mode                     |
| `npx playwright test tests/ui/authForm.spec.ts`              | Запуск определенного теста                       |
| `npx playwright test --headed`                               | Запуск тестов с видимым браузером                |
| `npx playwright test --debug`                                | Запуск тестов в режиме отладки                   |
| `npx playwright test --project=chromium`                     | Запуск тестов только в Chromium                  |
| `npx playwright test --project=firefox`                      | Запуск тестов только в Firefox                   |
| `npx playwright test --project=webkit`                       | Запуск тестов только в WebKit                    |
| `npx playwright test --grep "название_теста"`                | Запуск тестов с фильтром по названию или тегу    |
| `npx playwright test --retries=2`                            | Повторный запуск неудачных тестов до 2 раз       |
| `npx playwright show-report`                                 | Просмотр HTML-отчёта после тестов                |
| `npx playwright test api/api.spec.ts`                        | Запуск выборочных тестов                         |
| `npx allure generate allure-results --clean -o allure-report`| Очистить паку с отчетами                         |
| `npx allure open allure-report`                              | Открыть репорт после выполнения тестов           |
