import { test, expect } from 'fixtures';

test('Verify user can view product details', async ({ app }) => {

    await app.page.goto('/');
    await app.homePage.selectProduct('Combination Pliers');

    await expect(app.page).toHaveURL(/product/);
    await expect(app.productPage.productName).toHaveText('Combination Pliers');
    await expect(app.productPage.productPrice).toHaveText('14.15');
    await expect(app.productPage.addToCart).toBeVisible();
    await expect(app.productPage.addToFavorites).toBeVisible();
});
