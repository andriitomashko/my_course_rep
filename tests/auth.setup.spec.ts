import { test, expect } from '@playwright/test';
import { LoginPage } from 'pages/login.page';
import { AccountPage } from 'pages/account.page';
import { HeaderFragment } from 'fragments/header.fragment';
import { testUser } from 'test-data/users.data'
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('Successful login to receive session', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);
    const header = new HeaderFragment(page);
    // test.skip(!!process.env.CI, 'Skip on CI');

    await page.goto('/auth/login');
    await loginPage.performLogin(testUser.email, testUser.password);
    
    await expect(page).toHaveURL('/account');
    await expect(accountPage.pageTitle).toBeVisible()
    await expect(header.navigationMenu).toHaveText(testUser.name)

    await page.context().storageState({ path: authFile });
});
