import { test, expect } from 'fixtures';
import { testProducts } from 'test-data/products.data'

test('Verify user can add product to cart', async ({app}) => {
    await app.page.goto('/');
    await app.homePage.productByName(testProducts.slipJointPliers.name).click();

    await expect(app.page).toHaveURL(/product/);
    await expect(app.productPage.productName).toHaveText(testProducts.slipJointPliers.name);
    await expect(app.productPage.productPrice).toHaveText(testProducts.slipJointPliers.price);

    await app.productPage.addToCart.click();
    
    await expect(app.productPage.cartAlert).toBeVisible();
    await expect(app.productPage.cartAlert).toHaveText('Product added to shopping cart.');
    await expect(app.productPage.cartAlert).toBeHidden({ timeout: 8_000 });
    await expect(app.header.cartQuantity).toHaveText('1');

    await app.header.cartButton.click();
    
    await expect(app.page).toHaveURL(/checkout/);
    await expect(app.cartPage.cartRows).toHaveCount(1);
    await expect(app.cartPage.productName).toHaveText(testProducts.slipJointPliers.name);
    await expect(app.cartPage.proceedCheckout).toBeVisible();
});
