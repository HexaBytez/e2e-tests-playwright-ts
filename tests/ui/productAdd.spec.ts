import { test as base } from '@playwright/test';
import { authForm } from '../../page/aForm';
import { addProduct } from '../../page/addProduct';
import { shoppingContainer } from '../../page/sContainer';
import usersData from '../data/data.json';

type UserKey = keyof typeof usersData;

type UserCredentials = {
  username: string;
  password: string;
  errorMessage: string;
};

const userKey = (process.env.USER as UserKey) || 'standard';
const selectedCredentials = usersData[userKey];

if (!selectedCredentials) {
  throw new Error(`User "${userKey}" not found in users.json`);
}

const isStandardUser = selectedCredentials.username === 'standard_user';

const test = base.extend<{
  credentials: UserCredentials;
  authForm: authForm;
  addProduct: addProduct;
  containerCheck: shoppingContainer;
}>({
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

  addProduct: async ({ page }, use) => {
    await use(new addProduct(page));
  },

  containerCheck: async ({ page }, use) => {
    await use(new shoppingContainer(page));
  },
});

test.beforeEach(async ({ authForm }) => {
  if (isStandardUser) {
    await authForm.authorizationCheck();
  }
});

test.describe(isStandardUser ? 'Add product to container' : 'Skipped for non-standard users', () => {
  test.skip(!isStandardUser, 'Test is only for standard_user');

  test('add and remove product test', async ({ addProduct, containerCheck }) => {
    await addProduct.productAddButtonToContainer();
    await addProduct.goToCart();
    await containerCheck.checkaddedProduct();
    await addProduct.page.goBack();
    await addProduct.productRemoveButtonFromContainer();
    await addProduct.goToCart();
    await containerCheck.checkContainerIsEmpty();
  });
});
