# e2e-auth-tests-playwright-ts
Автоматизированные E2E тесты для сценариев тестирования демо проекта saucedemo.com с использованием Playwright и TypeScript.

# Описание
Выполнение e2e тестов демо приложения saucedemo.com.

## Установка
Клонируйте репозиторий:
bash

git clone https://github.com/<your-username>/e2e-tests-playwright-ts.git
cd e2e-auth-tests-playwright-ts


## Установите зависимости
npm install

## Установить Playwright
npx playwright install

## Запуск тестов:
npx playwright test - запуск всех тестов

npx playwright test --headed - Запуск тестов с отображением браузера

npx playwright test --debug - Запуск тестов в режиме отладки

## Запуск тестов в GitHub Acnions
Тесты автоматически запускаются при создании сборки pull request.
Также тесты можно запустить вручную на странице Actions вашего репозитория.

Отчеты автоматически формируются в html и Allure

## Структура проекта
├── tests/                # Каталог с тестами

├── page/                 # Каталог с Page Object — объектами страниц

├── playwright.config.ts  # Конфигурационный файл Playwright

├── package.json          # Управление зависимостями и скриптами

└── README.md             # Документация проекта

## Полезные команды

| Команда                                       | Описание                                         |
| --------------------------------------------- | ------------------------------------------------ |
| `npx playwright test`                         | Запуск всех тестов                               |
| `npx playwright test --headed`                | Запуск тестов с видимым браузером                |
| `npx playwright test --debug`                 | Запуск тестов в режиме отладки                   |
| `npx playwright test --project=chromium`      | Запуск тестов только в Chromium                  |
| `npx playwright test --project=firefox`       | Запуск тестов только в Firefox                   |
| `npx playwright test --project=webkit`        | Запуск тестов только в WebKit                    |
| `npx playwright test --grep "название_теста"` | Запуск тестов с фильтром по названию или тегу    |
| `npx playwright test --retries=2`             | Повторный запуск неудачных тестов до 2 раз       |
| `npx playwright show-report`                  | Просмотр HTML-отчёта после тестов                |
| `npx playwright install`                      | Установка браузеров Playwright                   |
| `npx playwright codegen <url>`                | Генерация кода теста на лету при работе с сайтом |
