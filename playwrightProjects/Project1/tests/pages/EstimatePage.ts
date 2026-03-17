import { BasePage } from './BasePage';
import { expect } from '@playwright/test';


const btn1 = 'Add new';
const btn1a = 'New category';
const btn1b = 'New under this category';
const btn1c = 'Select or enter category name';
const text1 = 'New Construction 1';
const btn1d = `+ Create "${text1}"`;
const btnConfirm = 'Confirm';
const btnEnter = 'Enter';
const btn2 = 'Add equipment';
const btn3 = 'Select';
/**
 * Estimate Page Object
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
  * Handles construction-related interactions
  */
  async addNewConstruction() {
    await this.clickButtonByName(btn1);
    await this.clickMenuItemByName(btn1a);
    await this.fillTextboxByRole(btn1c, text1);
    await this.clickOptionByName(btn1d);
    await this.clickButtonByName(btnConfirm);
    await this.page.keyboard.press(btnEnter);
  }

  /**
   * Take snapshot of the table
   */
  async takeTableSnapshot(fileName: string) {
    await this.page.waitForTimeout(1000); // Wait for UI to stabilize and animations to finish
    try {
      const table = this.page.getByRole('table').first();
      await table.screenshot({ path: fileName, timeout: 3000 });
    } catch {
      // Fallback to taking a screenshot of the entire page
      await this.page.screenshot({ path: fileName, fullPage: true });
    }
  }

  /**
   * Verify newly created construction is displayed in the table
   */
  async verifyConstructionInTable() {
    await expect(this.page.getByRole('row', { name: text1 }).first()).toBeVisible();
  }

  /**
   * Handles estimate and equipment-related interactions
   * Equipment List **
   * Click "Add equipment" button
   */
  async clickAddEquipment() {
    await this.clickButtonByName(btn2);
  }

  /** 
   * Click initial "Select" button to open equipment selection dialog
   */
  async clickSelect() {
    await this.clickButtonByName(btn3);
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
    insulation?: boolean;
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

    if (specs.insulation) {
      await this.page.getByRole('checkbox', { name: '保温' }).check();
    }
  }

  /**
   * Click nth row by text
   */
  async clickRowByText(text: string, index: number) {
    await this.page.getByRole('row').filter({ hasText: text }).nth(index).click();
  }

  /**
   * Click Add Estimate Table button
   */
  async clickAddEstimateTable() {
    await this.page.getByRole('button', { name: '見積表を追加' }).click();
  }

  /**
   * Select supply classification option in a row's combobox
   */
  async selectSupplyClassification(rowText: string, rowIndex: number, optionName: string) {
    const row = this.page.getByRole('row').filter({ hasText: rowText }).nth(rowIndex);
    await row.getByRole('combobox').nth(2).click();
    await this.page.getByRole('option', { name: optionName }).click();
  }

  /**
   * Click Add Detail Item button
   */
  async clickAddDetailItem() {
    await this.page.getByRole('button', { name: '明細項目を追加' }).click();
  }

  /**
   * Click Confirm button
   */
  async clickConfirmButton() {
    await this.page.getByRole('button', { name: '確認' }).click();
  }
}
