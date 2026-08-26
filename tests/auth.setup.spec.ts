import { test, expect } from '@playwright/test';
import { LoginPage } from 'pages/login.page';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('Successful login to receive session', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // test.skip(!!process.env.CI, 'Skip on CI');

    await page.goto('/auth/login');
    await loginPage.performLogin('customer3@practicesoftwaretesting.com', 'pass123');
    
    await expect(page).toHaveURL('/account');
    await expect(page.getByTestId('page-title')).toBeVisible();
    await expect(page.getByTestId('nav-menu')).toHaveText('Bob Smith');

    await page.context().storageState({ path: authFile });
});
