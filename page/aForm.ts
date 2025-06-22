import { Page, Locator, expect } from '@playwright/test';

export class authForm {
  readonly page: Page;
  readonly userNameField: Locator;
  readonly passwordField: Locator;
  readonly loginButtonAuth: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameField = page.locator('#user-name');
    this.passwordField = page.locator('#password');
    this.loginButtonAuth = page.locator('[data-test="login-button"]')
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async usernameFieldFill() {
    await expect(this.userNameField).toBeVisible();
    await this.userNameField.click();
    await this.userNameField.fill('standard_user')    
  }

  async passwordFieldFill() {
    await expect(this.passwordField).toBeVisible;
    await this.passwordField.click();
    await this.passwordField.fill('secret_sauce');
  }

  async loginButtonAuthForm(page) {
    await expect(this.loginButtonAuth).toBeVisible();
    await this.loginButtonAuth.click();
    await this.loginButtonAuth.waitFor({ state: 'hidden' });
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  }
}