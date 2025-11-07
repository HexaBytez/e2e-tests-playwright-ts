import { Page, Locator, expect } from '@playwright/test';

export class addProduct {
  readonly page: Page;
  readonly productAddButton: Locator;
  readonly productRemoveButton: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly bikeLightAddButton: Locator;
  readonly bikeLightRemoveButton: Locator;
  readonly tShirtAddButton: Locator;
  readonly tShirtRemoveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productAddButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.bikeLightAddButton = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.bikeLightRemoveButton = page.locator('[data-test="remove-sauce-labs-bike-light"]');
    this.tShirtAddButton = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    this.tShirtRemoveButton = page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]')
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

  async addManyProducts() {
    await expect(this.productAddButton).toBeVisible();
    await expect(this.bikeLightAddButton).toBeVisible();
    await expect(this.tShirtAddButton).toBeVisible();
    await this.productAddButton.click();
    await this.bikeLightAddButton.click();
    await this.tShirtAddButton.click();
    await expect(this.productRemoveButton).toHaveText('Remove', { timeout: 5000 });
    await expect(this.bikeLightRemoveButton).toHaveText('Remove', { timeout: 5000 });
    await expect(this.tShirtRemoveButton).toHaveText('Remove', { timeout: 5000 });
  }
}
