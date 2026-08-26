import { test, expect } from '@playwright/test';
import { HeaderFragment } from 'fragments/header.fragment';
import { CartPage } from 'pages/cart.page';
import { HomePage } from 'pages/home.page';
import { ProductPage } from 'pages/product.page';

test('Verify user can add product to cart', async ({page}) => {
    const headerFragment = new HeaderFragment(page);
    const cartPage = new CartPage(page);
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await page.goto('/');
    await homePage.productCards.filter({ hasText: 'Slip Joint Pliers'}).click();

    await expect(page).toHaveURL(/product/);
    await expect(productPage.productName).toHaveText('Slip Joint Pliers');
    await expect(productPage.productPrice).toHaveText('9.17');

    await productPage.addToCart.click();
    
    await expect(productPage.cartAlert).toBeVisible();
    await expect(productPage.cartAlert).toHaveText('Product added to shopping cart.');
    await expect(productPage.cartAlert).toBeHidden( {timeout: 8_000 });
    await expect(headerFragment.cartQuantity).toHaveText('1');

    await headerFragment.cartButton.click();
    
    await expect(page).toHaveURL(/checkout/);
    await expect(cartPage.cartRows).toHaveCount(1);
    await expect(cartPage.productName).toHaveText('Slip Joint Pliers');
    await expect(cartPage.proceedCheckout).toBeVisible();
});
