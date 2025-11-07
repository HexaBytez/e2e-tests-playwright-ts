import { test } from '../../fixtures/authFixtures';

test.describe('Positive scenarios for menu items', () => {
  test.skip(({ isStandardUser }) => !isStandardUser, 'Test is only for standard_user');

  test.beforeEach(async ({ authForm }) => {
    await authForm.authorizationCheck();
  });

  test('container page checks', async ({ containerCheck }) => {
    await containerCheck.redirectToContainer();
    await containerCheck.checkContainerIsEmpty();
    await containerCheck.checkButtonsOnConteiner();
    await containerCheck.checkTextOnContainer();
  });
});
