import { test, expect } from '@playwright/test';
import { HeaderFragment } from 'fragments/header.fragment';
import { testUser } from 'test-data/users.data';


test('Verify successful login', async ({ page }) => {
    const header = new HeaderFragment(page);
    await page.goto('/');

    await expect(header.navigationMenu).toHaveText(testUser.name);
});
