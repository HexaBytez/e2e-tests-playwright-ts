import { test, expect } from '@playwright/test';
import { authForm } from '../page/aForm'

test('myTestName', async ({ page }) => {
    const AuthForm = new authForm(page);
    await AuthForm.goto(),
    await AuthForm.usernameFieldFill();
    await AuthForm.passwordFieldFill();
    await AuthForm.loginButtonAuthForm(page);
});