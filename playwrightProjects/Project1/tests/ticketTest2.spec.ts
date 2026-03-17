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
  await constructionsPage.openConstruction('(NOT delete) Dory-Test');
  await constructionsPage.navigateToEstimates();
  const estimatePage = new EstimatePage(newPage);
  await estimatePage.openEstimate('FBSheet(No.86②)');
  /** 
  * Flow: Add Equipment row
  */
  // 1.click to row 機械室 2nd
  await estimatePage.clickRowByText('機械室', 1);

  // 2.click to button 見積表を追加
  await estimatePage.clickAddEstimateTable();

  // 3.choose value [撤去 (工数計算有)] of dropdown 支給区分 of selected row
  await estimatePage.selectSupplyClassification('機械室', 1, '撤去 (工数計算有)');

  // 4.click button 明細項目を追加
  await estimatePage.clickAddDetailItem();

  // 5.add an equipment row
  await estimatePage.selectEquipmentFromDialog('3 配管', '6 ライニング管類', '2 SGP-VB', '1 塩ビライニング管-VB');
  
  await estimatePage.fillEquipmentDetails({
    specification: 'VB 50A',
    quantity: '123.5',
    material: '給水',
    environment: '屋内隠蔽',
    insulation: true
  });

  // 6.click button 確認
  await estimatePage.clickConfirmButton();

  // 7.take snapshot of table equipment
  await estimatePage.takeTableSnapshot('snapshots/table-equipment.png');

  await context.close();
});