import { test } from '../../fixtures/authFixtures';

test.describe('Add product to container', () => {
  test.skip(({ isStandardUser }) => !isStandardUser, 'Test is only for standard_user');

  test.beforeEach(async ({ authForm }) => {
    await authForm.authorizationCheck();
  });

  test('add and remove product test', async ({ addProduct, containerCheck }) => {

    await test.step('Add product to cart', async () => {
      await addProduct.productAddButtonToContainer();
      await addProduct.goToCart();
      await containerCheck.checkaddedProduct();
    });

    await test.step('Remove product from cart', async () => {
      await addProduct.page.goBack();
      await addProduct.productRemoveButtonFromContainer();
      await addProduct.goToCart();
      await containerCheck.checkContainerIsEmpty();
      
    });

    await test.step('Add many products to cart', async () => {
      await addProduct.page.goBack();
      await addProduct.addManyProducts()
      await addProduct.goToCart();
      await containerCheck.checkaddedProduct();
      await containerCheck.checkSecondProduct();
      await containerCheck.checkThirdProduct();
    });

  });
});
