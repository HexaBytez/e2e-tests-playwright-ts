import { test as base, expect } from '@playwright/test';
import { authForm } from '../page/aForm';

type Fixtures = {
  authForm: authForm;
  credentials: { username: string; password: string };
};

const test = base.extend<Fixtures>({
  credentials: [{ username: '', password: '' }, { option: true }],

  // создаём новый экземпляр authForm для каждого теста
  authForm: async ({ page, credentials }, use) => {
    const form = new authForm(page);
    await form.goto();
    await form.usernameFieldFill(credentials.username);
    await form.passwordFieldFill(credentials.password);
    await form.loginButtonAuthForm();

    await use(form);
    await page.context().clearCookies();
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  },
});

test.describe('Positive Login', () => {
  test.use({
    credentials: { username: 'standard_user', password: 'secret_sauce' },
  });

  test('authorizationTest - valid login', async ({ authForm }) => {
    await authForm.authorizationCheck();
  });
});

test.describe('Negative Login', () => {
  test.use({
    credentials: { username: 'wrong_user', password: 'wrong_password' },
  });

  test('negativeScenarioFirst - invalid login', async ({ authForm }) => {
    await authForm.exceptionAuth();
  });
});
