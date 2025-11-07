import { test as base, type Page, type TestInfo } from '@playwright/test';
import { authForm } from '../page/authForm';
import { menuContainer } from '../page/menuContainer';
import { addProduct } from '../page/addProduct';
import { shoppingContainer } from '../page/sContainer';
import users from '../tests/data/userData.json';

type UserCredentials = {
  username: string;
  password: string;
  errorMessage?: string;
};

type Fixtures = {
  credentials: UserCredentials;
  authForm: authForm;
  addProduct: addProduct;
  containerCheck: shoppingContainer;
  menuContainer: menuContainer;
  isStandardUser: boolean;
};

function getUserKey(testInfo: TestInfo): keyof typeof users {
  if (process.env.USER && process.env.USER in users) {
    return process.env.USER as keyof typeof users;
  }
  return 'standard';
}

function usePageObject<T>(Ctor: new (page: Page) => T) {
  return async ({ page }: { page: Page }, use: (po: T) => Promise<void>) => {
    await use(new Ctor(page));
  };
}

export const test = base.extend<Fixtures>({
  credentials: async ({}, use, testInfo) => {
    const userKey = getUserKey(testInfo);
    const selectedCredentials = users[userKey];
    if (!selectedCredentials) {
      throw new Error(`User "${userKey}" not found in userData.json`);
    }
    await use(selectedCredentials);
  },

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

  addProduct: usePageObject(addProduct),
  containerCheck: usePageObject(shoppingContainer),
  menuContainer: usePageObject(menuContainer),

  isStandardUser: ({ credentials }, use) => {
    use(credentials.username === 'standard_user');
  },
});
