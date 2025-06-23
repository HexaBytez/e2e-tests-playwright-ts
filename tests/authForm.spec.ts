import { test as base, expect } from '@playwright/test';
import { authForm } from '../page/aForm';

const test = base.extend<{
  credentials: { username: string; password: string };
}>({
  credentials: [{ username: '', password: '' }, { option: true }],
});

let AuthForm: authForm;

test.beforeEach(async ({ page, credentials }) => {
  AuthForm = new authForm(page);
  await AuthForm.goto();
  await AuthForm.usernameFieldFill(credentials.username);
  await AuthForm.passwordFieldFill(credentials.password);
  await AuthForm.loginButtonAuthForm();
});

test.describe('Positive Login', () => {
  test.use({
    credentials: { username: 'standard_user', password: 'secret_sauce' },
  });

  test('authorizationTest - valid login', async () => {
    await AuthForm.authorizationCheck();
  });
});

test.describe('Negative Login', () => {
  test.use({
    credentials: { username: 'wrong_user', password: 'wrong_password' },
  });

  test('negativeScenarioFirst - invalid login', async () => {
    await AuthForm.exceptionAuth();
  });
});
