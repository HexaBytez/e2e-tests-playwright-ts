import { test } from '../../fixtures/authFixtures';

test.describe('Positive scenarios for menu items', () => {
  test.skip(({ isStandardUser }) => !isStandardUser, 'Test is only for standard_user');

  test.beforeEach(async ({ authForm }) => {
    await authForm.authorizationCheck();
  });

  test('menu items check', async ({ menuContainer }) => {
    await menuContainer.clickMenuBlock();
    await menuContainer.allItemsItem();
    await menuContainer.aboutItem();
    await menuContainer.logoutItem();
    await menuContainer.resetAppStateItem();
  });
});
