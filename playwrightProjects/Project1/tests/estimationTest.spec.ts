import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { OrganizationPage } from './pages/OrganizationPage';
import { ConstructionsPage } from './pages/ConstructionsPage';
import { EstimatePage } from './pages/EstimatePage';

// Test credentials
const TEST_EMAIL = 'thuy.do@h2corporation.jp';
const TEST_PASSWORD = '@DoryDo8228#';
const CONSTRUCTION_NAME = 'Dory_Test';
const ESTIMATE_NAME = 'MLIT-(0)';

test('Function Test', async ({ browser }) => {
  const context = await browser.newContext({
    recordVideo: { dir: 'videos/' } // folder where clips will be saved
  });
  const newPage = await context.newPage();
  // Login
  await newPage.goto('https://es-web-qa.h2c-ai.dev/public/login');
  newPage.locator(':has-text("Login")');
  await newPage.getByText('Email Address').fill('thuy.do@h2corporation.jp');
  newPage.getByText('Password').fill('@DoryDo8228#');
  newPage.getByRole('button', { name: 'Login' }).click();
  // Go to target page 
  newPage.locator(':has-text("Organization")');
  await newPage.getByRole('button', { name: 'Go to organization' }).click();
  await newPage.getByRole('tab', { name: 'Constructions' }).click();
  
  await newPage.locator('tr:has-text("Dory_Test") button:has-text("Open")').click();
  await newPage.getByRole('tab', { name: 'Estimates' }).click();
  await newPage.locator('tr:has-text("MLIT-(0)") button:has-text("Open")').click();
  await newPage.getByRole('button', { name: 'Add equipment' }).click();
  await newPage.getByRole('button', { name: 'Select' }).click();
  await newPage.getByRole('button', { name: '配管' }).click();
  await newPage.getByRole('button', { name: 'ライニング管類' }).click();
  await newPage.getByRole('button', { name: 'SGP-VA' }).click();  
  await newPage.getByRole('button', { name: '塩ビライニング管-VA' }).click();
  // expect(newPage).toHaveScreenshot('selectedEquipment.png');
  
  // await expect(newPage.getByRole('dialog')).toHaveScreenshot();
  // await expect(newPage.getByRole('dialog')).toMatchAriaSnapshot();
  
  await inputValue(3,'VA 15A');
  await newPage.getByRole('textbox', { name: '0' }).nth(0).fill('1'); 
  await inputValue(4,'SP');
  await inputValue(5,'屋内多湿');
  // await inputValue(6,'御支給品');
  await newPage.getByRole('textbox', { name: 'Select' }).nth(6).click();
  await newPage.getByRole('option', { name: '御支給品' }).click();
  // await newPage.waitForTimeout(300);
  // await newPage.locator('tr:nth-child(6) > td:nth-child(19)').setChecked(true, { force: true });
  await newPage.locator('#mantine-aoswdrwns').click();
  // await newPage.getByRole('checkbox').nth(4).setChecked(true, { force: true });
  // await newPage.locator('tr:nth-child(6) > td:nth-child(19)').click();
  // await newPage.getByRole('button', { name: 'Confirm' }).click();
  // await newPage.getByRole('button').nth(2).click();
 
  // await newPage.waitForTimeout(300);
  await context.close();

  // Function to input values for equipment details
  async function inputValue(p0: number, p1: string) {
    await newPage.getByRole('textbox', { name: 'Select' }).nth(p0).click();
    await newPage.getByRole('option', { name: p1 }).click();
  }
});
