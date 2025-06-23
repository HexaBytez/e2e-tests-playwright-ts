# e2e-auth-tests-playwright-ts
Автоматизированные E2E тесты с использованием Playwright и TypeScript.

## Описание 
Тесты написаны на Playwright с TypeScript с применением паттерна Page Object для удобства поддержки и масштабирования.

## Установка
Клонируйте репозиторий:

bash
git clone https://github.com/<your-username>/e2e-auth-tests-playwright-ts.git
cd e2e-auth-tests-playwright-ts

Установите зависимости:
npm install
Запустить все тесты:
npx playwright test

Запустить тесты с HTML-отчётом:
npx playwright test --reporter=html
Отчёт появится в папке playwright-report.

Следуйте типизации TypeScript и стандартам Playwright.

Полезные команды
npm install	Установить зависимости
npx playwright test	Запуск всех тестов
npx playwright test --debug	Запуск тестов в режиме отладки
npx playwright show-report	Просмотр отчёта