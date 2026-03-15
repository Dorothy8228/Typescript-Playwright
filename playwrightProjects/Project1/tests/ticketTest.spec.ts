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
    // recordVideo: { dir: 'videos/' } 
  });
  const newPage = await context.newPage();
  /** 
  * Flow: Login> Go to organization> Open construction> Go to estimates> Open estimate
  */
  const loginPage = new LoginPage(newPage);
  await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
  const organizationPage = new OrganizationPage(newPage);
  await organizationPage.goToOrganization();
  await organizationPage.navigateToConstructions();
  const constructionsPage = new ConstructionsPage(newPage);
  await constructionsPage.openConstruction('Dory_Test');
  await constructionsPage.navigateToEstimates();
  const estimatePage = new EstimatePage(newPage);
  await estimatePage.openEstimate('Verify Tickets');
  /** 
  * Flow: Construction > Estimates > Add new construction
  */
  // await newPage.pause();
  
  // Take snapshot before adding
  await estimatePage.takeTableSnapshot('snapshots/table-before-add.png');
  
  // 1. Add new construction
  await estimatePage.addNewConstruction();

  // 2. Verify newly created construction is displayed in the table
  await estimatePage.verifyConstructionInTable();

  // Take snapshot after adding and verifying
  await estimatePage.takeTableSnapshot('snapshots/table-after-add.png');

  // await estimatePage.clickAddEquipment();

  await context.close();
});