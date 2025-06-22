# e2e-auth-tests-playwright-ts
Автоматизированные E2E тесты для авторизации с использованием Playwright и TypeScript.

---

## Описание
Этот репозиторий содержит набор тестов, покрывающих сценарии авторизации веб-приложения.  
Тесты написаны на Playwright с TypeScript с применением паттерна Page Object для удобства поддержки и масштабирования.
---

## Структура проекта
e2e-auth-tests-playwright-ts/
├── pages/ # Page Object классы
├── tests/ # Тестовые сценарии
├── playwright.config.ts # Конфигурация Playwright
├── package.json # Зависимости и скрипты
├── tsconfig.json # Настройки TypeScript
└── README.md # Документация
---

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

Помещайте новые тесты в папку tests.

Используйте паттерн Page Object — создавайте страницы в папке pages.

Следуйте типизации TypeScript и стандартам Playwright.

Требования
Node.js >= 16
npm >= 7

Полезные команды
npm install	Установить зависимости
npx playwright test	Запуск всех тестов
npx playwright test --debug	Запуск тестов в режиме отладки
npx playwright show-report	Просмотр отчёта