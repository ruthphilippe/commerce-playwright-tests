import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly shoppingCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.shoppingCart = page.locator('[data-test="shopping-cart-link"]');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.title).toHaveText('Products');
    await expect(this.shoppingCart).toBeVisible();
  }
}