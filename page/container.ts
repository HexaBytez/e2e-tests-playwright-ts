import { Page, Locator, expect } from '@playwright/test';

export class shoppingContainer {
  readonly page: Page;
  readonly containerButton: Locator;
  readonly pageContainer: Locator;
  readonly containerQuantity: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly addedProduct:Locator;
  readonly qtyText: Locator;
  readonly descriptionText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.containerButton = page.locator('#shopping_cart_container');
    this.pageContainer = page.getByText('Your Cart', { exact:true });
    this.containerQuantity = page.locator('[data-test="item-quantity"]')
    this.continueShoppingButton = page.getByRole('button', { name: /Continue Shopping/i });
    this.checkoutButton = page.getByRole('button', { name: /Checkout/i } );
    this.addedProduct = page.locator('[data-test="inventory-item-name"]');
    this.qtyText = page.getByText('QTY');
    this.descriptionText = page.getByText('Description')
}

  async redirectToContainer() {
  await this.containerButton.waitFor({ state: 'visible', timeout: 10000 });
  await this.containerButton.click();
  await expect(this.pageContainer).toHaveText('Your Cart');
}

  async checkButtonsOnConteiner() {
    await expect(this.continueShoppingButton).toBeVisible();
    await expect(this.checkoutButton).toBeVisible();
  }

  async checkTextOnContainer() {
    await expect(this.qtyText).toBeVisible();
    await expect(this.descriptionText).toBeVisible();
  }

  async checkContainerIsEmpty() {
    await expect(this.containerQuantity).toBeHidden();
  }

  async checkaddedProduct() {
    await expect(this.addedProduct).toHaveText('Sauce Labs Backpack');
  }
}
