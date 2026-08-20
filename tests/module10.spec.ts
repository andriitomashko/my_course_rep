import { test, expect } from '@playwright/test';
import { LoginPage } from 'pages/login.page';

test('Verify login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    test.skip(!!process.env.CI, 'Skip on CI');
    
    await page.goto('/auth/login');
    await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');
    
    await expect(page).toHaveURL('/account');
    await expect(page.getByTestId('page-title')).toBeVisible();
    await expect(page.getByTestId('nav-menu')).toHaveText('Jane Doe');
});
