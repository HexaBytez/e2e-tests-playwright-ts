import { Page, Locator, expect } from '@playwright/test';

export class addProduct {
  readonly page: Page;
  readonly productAddButton: Locator;
  readonly productRemoveButton: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productAddButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.productRemoveButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.cartBadge = page.locator('.shopping_cart_badge'); 
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async productAddButtonToContainer() {
    await expect(this.productAddButton).toBeVisible();
    await expect(this.productAddButton).toBeEnabled();
    await this.productAddButton.click();
    await expect(this.productRemoveButton).toBeVisible();
    await expect(this.productRemoveButton).toHaveText('Remove');
    await expect(this.cartBadge).toHaveText('1');
  }

  async productRemoveButtonFromContainer() {
    await expect(this.productRemoveButton).toBeVisible();
    await expect(this.productRemoveButton).toBeEnabled();
    await this.productRemoveButton.click();
    await expect(this.productAddButton).toBeVisible();
    await expect(this.productAddButton).toHaveText('Add to cart');
    await expect(this.cartBadge).toBeHidden();
  }

  async goToCart() {
    await expect(this.cartLink).toBeVisible();
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/\/cart\.html$/);
  }
}
