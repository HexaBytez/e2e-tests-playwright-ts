import { test } from '../../fixtures/authFixtures';

test.describe('Add product to container', () => {
  test.skip(({ isStandardUser }) => !isStandardUser, 'Test is only for standard_user');

  test.beforeEach(async ({ authForm }) => {
    await authForm.authorizationCheck();
  });

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
