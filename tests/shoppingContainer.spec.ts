import { test as base , expect } from '@playwright/test';
import { authForm } from '../page/aForm';
import { shoppingContainer } from '../page/sContainer'


const test = base.extend<{
    credentials: { username: string; password: string };
}>({
    credentials: [{ username: '', password: '' }, { option: true }],
});

let AuthForm: authForm;
let ContainerCheck: shoppingContainer;

test.beforeEach(async ({ page, credentials }) => {
    AuthForm = new authForm(page);
    ContainerCheck = new shoppingContainer(page);

    await AuthForm.goto();
    await AuthForm.usernameFieldFill(credentials.username);
    await AuthForm.passwordFieldFill(credentials.password);
    await AuthForm.loginButtonAuthForm();
    
});

test.describe('Positive Login', () => {
  test.use({
    credentials: { username: 'standard_user', password: 'secret_sauce' },
  });

  test('authorizationTest - valid login', async () => {
    await AuthForm.authorizationCheck();
  });
  test('container test', async ({ page }) => {
    ContainerCheck = new shoppingContainer(page);

    await ContainerCheck.redirectToContainer();
    await ContainerCheck.checkContainerIsEmpty();
    await ContainerCheck.checkButtonsOnConteiner();
})
});

