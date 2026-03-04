import { BasePage } from './BasePage';

/**
 * Estimate Page Object
 * Handles estimate and equipment-related interactions
 */
export class EstimatePage extends BasePage {
  /**
   * Open an estimate by name
   */
  async openEstimate(estimateName: string) {
    const selector = `tr:has-text("${estimateName}") button:has-text("Open")`;
    await this.page.locator(selector).click();
  }

  /**
   * Click "Add equipment" button
   */
  async clickAddEquipment() {
    await this.clickButtonByName('Add equipment');
  }

  /**
   * Click initial "Select" button to open equipment selection dialog
   */
  async clickSelect() {
    await this.clickButtonByName('Select');
  }

  /**
   * Select equipment category by name
   */
  async selectCategory(categoryName: string) {
    await this.clickButtonByName(categoryName);
  }

  /**
   * Select equipment subcategory by name
   */
  async selectSubcategory(subcategoryName: string) {
    await this.clickButtonByName(subcategoryName);
  }

  /**
   * Select equipment type by name
   */
  async selectEquipmentType(typeName: string) {
    await this.clickButtonByName(typeName);
  }

  /**
   * Select equipment model by name
   */
  async selectEquipmentModel(modelName: string) {
    await this.clickButtonByName(modelName);
  }

  /**
   * Input text value in a textbox at specific index
   */
  async inputValueByIndex(index: number, value: string) {
    await this.page.getByRole('textbox', { name: 'Select' }).nth(index).click();
    await this.page.getByRole('option', { name: value }).click();
  }

  /**
   * Fill quantity field (textbox with name '0')
   */
  async fillQuantity(quantity: string) {
    await this.page.getByRole('textbox', { name: '0' }).nth(0).fill(quantity);
  }

  /**
   * Select checkbox by ID (with possible force option)
   */
  async clickCheckboxById(elementId: string) {
    await this.page.locator(`#${elementId}`).click();
  }

  /**
   * Complete equipment selection workflow
   * Navigates through categories and selects equipment type and model
   */
  async selectEquipmentFromDialog(
    category: string,
    subcategory: string,
    equipmentType: string,
    model: string
  ) {
    await this.selectCategory(category);
    await this.selectSubcategory(subcategory);
    await this.selectEquipmentType(equipmentType);
    await this.selectEquipmentModel(model);
  }

  /**
   * Fill all equipment details
   */
  async fillEquipmentDetails(specs: {
    specification?: string;
    quantity?: string;
    material?: string;
    environment?: string;
    suppliedGoods?: string;
  }) {
    let index = 3;

    if (specs.specification) {
      await this.inputValueByIndex(index++, specs.specification);
    }

    if (specs.quantity) {
      await this.fillQuantity(specs.quantity);
    }

    if (specs.material) {
      await this.inputValueByIndex(index++, specs.material);
    }

    if (specs.environment) {
      await this.inputValueByIndex(index++, specs.environment);
    }

    if (specs.suppliedGoods) {
      await this.page.getByRole('textbox', { name: 'Select' }).nth(6).click();
      await this.page.getByRole('option', { name: specs.suppliedGoods }).click();
    }
  }
}
