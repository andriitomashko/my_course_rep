import { test, expect } from '@playwright/test';

test('Verify successful login', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('nav-menu')).toHaveText('Bob Smith');
});
