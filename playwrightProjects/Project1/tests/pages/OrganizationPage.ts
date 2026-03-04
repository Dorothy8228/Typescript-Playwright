import { BasePage } from './BasePage';

/**
 * Organization Page Object
 * Handles organization-related interactions
 */
export class OrganizationPage extends BasePage {
  /**
   * Click "Go to organization" button
   */
  async goToOrganization() {
    await this.clickButtonByName('Go to organization');
  }

  /**
   * Navigate to Constructions tab
   */
  async navigateToConstructions() {
    await this.clickTabByName('Constructions');
  }
}
