// page/authForm.ts
import { Page, Locator, expect } from '@playwright/test';

export class authForm {
  readonly page: Page;
  readonly userNameField: Locator;
  readonly passwordField: Locator;
  readonly loginButtonAuth: Locator;
  readonly errorField: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameField = page.locator('#user-name');
    this.passwordField = page.locator('#password');
    this.loginButtonAuth = page.locator('[data-test="login-button"]');
    this.errorField = page.locator('[data-test="error"]');
    this.errorMessage = page.locator('[data-test="error-button"]');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async usernameFieldFill(username: string) {
    await expect(this.userNameField).toBeVisible();
    await this.userNameField.fill(username);
  }

  async passwordFieldFill(password: string) {
    await expect(this.passwordField).toBeVisible();
    await this.passwordField.fill(password);
  }

  async loginButtonAuthForm() {
    await expect(this.loginButtonAuth).toBeVisible();
    await this.loginButtonAuth.click();
  }

  async authorizationCheck() {
    await this.loginButtonAuth.waitFor({ state: 'hidden' });
    await expect(this.page).toHaveURL(/.*inventory\.html/);
    await expect(this.page.locator('.inventory_list')).toBeVisible();
  }

  async exceptionAuth() {
    await expect(this.errorField).toBeVisible();
    await expect(this.errorField).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  }
}
