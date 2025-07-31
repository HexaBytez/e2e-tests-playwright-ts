import { test as base } from '@playwright/test';
import { authForm } from '../../page/aForm';
import { shoppingContainer } from '../../page/sContainer';
import users from '../data/data.json';

type UserType = 'standard' | 'locked' | 'wrong';

type UserCredentials = {
  username: string;
  password: string;
  errorMessage: string;
};

const userKey = (process.env.USER as UserType) || 'standard';
const selectedCredentials: UserCredentials = users[userKey];

if (!selectedCredentials) {
  throw new Error(`User "${userKey}" not found in users.json`);
}

type Fixtures = {
  credentials: { username: string; password: string };
  authForm: authForm;
  containerCheck: shoppingContainer;
};

const test = base.extend<Fixtures>({
  credentials: [selectedCredentials, { option: true }],

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

  containerCheck: async ({ page }, use) => {
    await use(new shoppingContainer(page));
  },
});

if (selectedCredentials.username === 'standard_user') {
  test.describe('Positive scenarios', () => {
    test.beforeEach(async ({ authForm }) => {
      await authForm.authorizationCheck();
    });

    test('container page checks', async ({ containerCheck }) => {
      await containerCheck.redirectToContainer();
      await containerCheck.checkContainerIsEmpty();
      await containerCheck.checkButtonsOnConteiner();
    });
  });
}
