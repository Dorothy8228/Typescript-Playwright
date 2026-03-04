import { Page } from '@playwright/test';

/**
 * Base Page class that contains common methods for all pages
 */
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   */
  async goto(url: string) {
    await this.page.goto(url);
  }

  /**
   * Click a button by its role and name
   */
  async clickButtonByName(name: string) {
    await this.page.getByRole('button', { name }).click();
  }

  /**
   * Click a tab by its role and name
   */
  async clickTabByName(name: string) {
    await this.page.getByRole('tab', { name }).click();
  }

  /**
   * Fill a textbox by its role and name
   */
  async fillTextboxByName(name: string, value: string) {
    await this.page.getByText(name).fill(value);
  }

  /**
   * Wait for a specific timeout
   */
  async waitForTimeout(ms: number) {
    await this.page.waitForTimeout(ms);
  }
}
