// tests/auth.test.ts
import { test as base } from '@playwright/test';
import { authForm } from '../page/aForm';
import users from '../tests/data.json';

type Fixtures = {
  authForm: authForm;
  credentials: { username: string; password: string; errorMessage?: string };
};

const test = base.extend<Fixtures>({
  credentials: [{ username: '', password: '', errorMessage: undefined }, { option: true }],

  authForm: async ({ page, credentials }, use) => {
    const form = new authForm(page);
    await form.login(credentials.username, credentials.password);
    await use(form);
    await page.context().clearCookies();
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  },
});

for (const [userKey, creds] of Object.entries(users)) {
  test.describe(`Tests for user "${userKey}"`, () => {
    test.use({ credentials: creds });

    if (userKey === 'standard') {
      test('successful authorization', async ({ authForm }) => {
        await authForm.authorizationCheck();
      });
    } else {
      test('negative authorization test', async ({ authForm, credentials }) => {
        const expectedError =
          credentials.errorMessage ||
          'Epic sadface: Username and password do not match any user in this service';
        await authForm.exceptionAuth(expectedError);
      });
    }
  });
}
