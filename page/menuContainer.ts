import {Locator, expect, Page} from '@playwright/test';

export class menuContainer {
    readonly page: Page;
    readonly menuButton: Locator;
    readonly menuBmWrap: Locator;
    readonly allItemsButton: Locator;
    readonly aboutItemButton: Locator;
    readonly logoutItemButton: Locator;
    readonly resetStateItembutton: Locator;


    constructor(page: Page) {
    this.page = page;
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.menuBmWrap = page.locator('.bm-menu-wrap')
    this.allItemsButton = page.getByText('All Items')
    this.aboutItemButton = page.getByText('About')
    this.logoutItemButton = page.getByText('Logout')
    this.resetStateItembutton = page.getByText('Reset App State')
  }

  async clickMenuBlock() {
    await expect(this.menuButton).toBeVisible();
    await this.menuButton.click();
    await expect(this.menuBmWrap).toHaveAttribute('aria-hidden', 'false');
  }

  async allItemsItem() {
    await expect(this.allItemsButton).toBeVisible();
    //await this.allItemsButton.click();
  }

  async aboutItem() {
    await expect(this.aboutItemButton).toBeVisible();
  }

  async logoutItem() {
    await expect(this.logoutItemButton).toBeVisible();
  }

  async resetAppStateItem() {
    await expect(this.resetStateItembutton).toBeVisible();
  }
}