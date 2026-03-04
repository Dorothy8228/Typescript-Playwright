import { BasePage } from './BasePage';

/**
 * Constructions Page Object
 * Handles constructions listing and selection
 */
export class ConstructionsPage extends BasePage {
  /**
   * Open a construction by name
   */
  async openConstruction(constructionName: string) {
    const selector = `tr:has-text("${constructionName}") button:has-text("Open")`;
    await this.page.locator(selector).click();
  }

  /**
   * Navigate to Estimates tab
   */
  async navigateToEstimates() {
    await this.clickTabByName('Estimates');
  }
}
