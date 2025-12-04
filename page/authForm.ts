// ../page/aForm.ts
import { Page, Locator, expect } from '@playwright/test';

export class authForm {
  readonly page: Page;
  readonly userNameField: Locator;
  readonly passwordField: Locator;
  readonly loginButtonAuth: Locator;
  readonly errorField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameField = page.locator('#user-name');
    this.passwordField = page.locator('#password');
    this.loginButtonAuth = page.locator('[data-test="login-button"]');
    this.errorField = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
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

  async login(username: string, password: string) {
    await this.goto();
    await this.usernameFieldFill(username);
    await this.passwordFieldFill(password);
    await this.loginButtonAuthForm();
  }

  async authorizationCheck() {
    await this.loginButtonAuth.waitFor({ state: 'hidden' });
    await expect(this.loginButtonAuth).toBeHidden();  //alternative check
    await expect(this.page).toHaveURL(/.*inventory\.html/);
    await expect(this.page.locator('.inventory_list')).toBeVisible();
  }

  async exceptionAuth(expectedMessage: string) {
    await expect(this.errorField).toBeVisible();
    await expect(this.errorField).toHaveText(expectedMessage);
  }
}

