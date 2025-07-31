import { test } from '../../fixtures/authFixtures';
import usersData from '../data/userData.json';

type UserKey = keyof typeof usersData;
type UserCredentials = {
  username: string;
  password: string;
  errorMessage?: string;
};

for (const [userKey, credentials] of Object.entries(usersData)) {
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
