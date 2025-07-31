import { test as base } from '@playwright/test';
import { authForm } from '../../page/aForm';
import usersData from '../data/data.json';

type UserKey = keyof typeof usersData;
type UserCredentials = {
  username: string;
  password: string;
  errorMessage?: string;
};

const test = base.extend<{
  authForm: authForm;
  credentials: UserCredentials;
}>({
  credentials: [{ username: '', password: '' }, { option: true }],

  authForm: async ({ page, credentials }, use) => {
    const form = new authForm(page);
    await test.step('Login with credentials', async () => {
      await form.login(credentials.username, credentials.password);
    });
    await use(form);
    await page.context().clearCookies();
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  },
});

for (const [userKey, credentials] of Object.entries(usersData) as [UserKey, UserCredentials][]) {
  const isStandardUser = credentials.username === 'standard_user';

  test.describe(`Tests for user "${userKey}"`, () => {
    test.use({ credentials });

    if (isStandardUser) {
      test('successful authorization', async ({ authForm }) => {
        await test.step('Check successful authorization', async () => {
          await authForm.authorizationCheck();
        });
      });
    } else {
      test('negative authorization test', async ({ authForm, credentials }) => {
        const expectedError =
          credentials.errorMessage ??
          'Epic sadface: Username and password do not match any user in this service';

        await test.step('Check authorization failure message', async () => {
          await authForm.exceptionAuth(expectedError);
        });
      });
    }
  });
}
