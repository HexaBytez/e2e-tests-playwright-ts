import { Page, Locator, expect } from '@playwright/test';

export class shoppingContainer {
  readonly page: Page;
  readonly containerButton: Locator;
  readonly pageContainer: Locator;
  readonly containerQuantity: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.containerButton = page.locator('[id="shopping_cart_container"]');
    this.pageContainer = page.locator('[data-test="title"]')
    this.containerQuantity = page.locator('[data-test="item-quantity"]')
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]')
    this.checkoutButton = page.locator('[data-test="checkout"]')
}

  async redirectToContainer() {
    await expect(this.containerButton).toBeVisible();
    await this.containerButton.click();
    await await expect(this.pageContainer).toHaveText('Your Cart')
  }

  async checkButtonsOnConteiner() {
    await expect(this.continueShoppingButton).toBeVisible();
    await expect(this.checkoutButton).toBeVisible();
  }

  async checkContainerIsEmpty() {
    await expect(this.containerQuantity).toBeHidden();
  }
}