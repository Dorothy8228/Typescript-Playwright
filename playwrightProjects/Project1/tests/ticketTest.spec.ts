import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { OrganizationPage } from './pages/OrganizationPage';
import { ConstructionsPage } from './pages/ConstructionsPage';
import { EstimatePage } from './pages/EstimatePage';
// Test credentials
const TEST_EMAIL = 'thuy.do@h2corporation.jp';
const TEST_PASSWORD = '@DoryDo8228#';

test('Function Test', async ({ browser }) => {
  const context = await browser.newContext({
    // recordVideo: { dir: 'videos/' } // folder where clips will be saved
  });
  const newPage = await context.newPage();
  // Login
  const loginPage = new LoginPage(newPage);
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
  const organizationPage = new OrganizationPage(newPage);
    await organizationPage.goToOrganization();
    await organizationPage.navigateToConstructions();
  const constructionsPage = new ConstructionsPage(newPage);
    await constructionsPage.openConstruction('Dory_Test');
    await constructionsPage.navigateToEstimates();
  const estimatePage = new EstimatePage(newPage);
    await estimatePage.openEstimate('Test AI6-178');
    await estimatePage.clickAddEquipment();
  await context.close();

  // Function to input values for equipment details
//   async function inputValue(p0: number, p1: string) {
//     await newPage.getByRole('textbox', { name: 'Select' }).nth(p0).click();
//     await newPage.getByRole('option', { name: p1 }).click();
//   }
});