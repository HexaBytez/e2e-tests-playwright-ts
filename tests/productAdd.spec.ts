import { test as base } from '@playwright/test';
import { authForm } from '../page/aForm';
import { addProduct } from '../page/addProduct';
import { shoppingContainer } from '../page/sContainer';
import users from '../tests/data.json';

type Fixtures = {
  credentials: { username: string; password: string };
  authForm: authForm;
  addProduct: addProduct;
  containerCheck: shoppingContainer;
};

const userKey = process.env.USER || 'standard';
const selectedCredentials = users[userKey];

if (!selectedCredentials) {
  throw new Error(`User "${userKey}" not found in users.json`);
}

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

  addProduct: async ({ page }, use) => {
    await use(new addProduct(page));
  },

  containerCheck: async ({ page }, use) => {
    await use(new shoppingContainer(page));
  },
});

test.beforeEach(async ({ authForm, credentials }) => {
  if (credentials.username === 'standard_user') {
    await authForm.authorizationCheck();
  }
});

if (selectedCredentials.username === 'standard_user') {
  test.describe('Add product to container', () => {
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
}
