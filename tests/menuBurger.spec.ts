import { test as base } from '@playwright/test';
import { authForm } from '../page/aForm';
import { menuContainer } from '../page/menuContainer';
import users from '../tests/data.json';

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
  containerMenu: menuContainer;
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

  containerMenu: async ({ page }, use) => {
    await use(new menuContainer(page));
  },
});

if (selectedCredentials.username === 'standard_user') {
  test.describe('Positive scenarios for menu items', () => {
    test.beforeEach(async ({ authForm }) => {
      await authForm.authorizationCheck();
    });

    test('menu items check', async ({ containerMenu }) => {
      await containerMenu.clickMenuBlock();
      await containerMenu.allItemsItem();
      await containerMenu.aboutItem();
      await containerMenu.logoutItem();
      await containerMenu.resetAppStateItem();
    });
  });
}
