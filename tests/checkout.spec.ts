import { test, expect } from 'fixtures';
import { faker } from '@faker-js/faker'
import { testCC } from 'test-data/cc.data';

test('Checkout with the first product', async ({ loggedInApp }) => {
    //Home page
    await loggedInApp.page.goto('/');

    const firstProductName = await loggedInApp.homePage.getFirstProductName();
    const firstProductPrice = await loggedInApp.homePage.getFirstProductPrice();
    
    await loggedInApp.homePage.productCards.first().click();

    // Product page (checking name and price)
    // There is a formatting bug on the Product page: the price is returned without a "$" sign, which is why custom parsing methods are used here
    await expect(loggedInApp.page).toHaveURL(/product/);
    await expect(loggedInApp.productPage.productName).toHaveText(firstProductName);

    const productPagePrice = await loggedInApp.productPage.getProductPrice();
    expect(productPagePrice).toBe(firstProductPrice);

    await loggedInApp.productPage.addToCart.click();
    await loggedInApp.header.cartButton.click();

    //Cart Page
    await expect(loggedInApp.page).toHaveURL(/checkout/);
    await expect(loggedInApp.cartPage.productName).toHaveText(firstProductName);

    const cartProductPrice = await loggedInApp.cartPage.getProductPrice();
    expect(cartProductPrice).toBe(firstProductPrice);

    const cartTotalPrice = await loggedInApp.cartPage.getTotalPrice();
    expect(cartTotalPrice).toBe(firstProductPrice);

    const cartOverallPrice = await loggedInApp.cartPage.getCartPrice();
    expect(cartOverallPrice).toBe(firstProductPrice);

    await loggedInApp.cartPage.proceedCheckout.click();
    
    await expect(loggedInApp.cartPage.proceedToCheckoutStep2).toBeVisible();

    await loggedInApp.cartPage.proceedToCheckoutStep2.click();
    await loggedInApp.cartPage.country.selectOption('UA');
    await loggedInApp.cartPage.postalCode.fill(faker.location.zipCode());
    await loggedInApp.cartPage.houseNumber.fill(faker.location.buildingNumber());
    await loggedInApp.cartPage.street.fill(faker.location.street());
    await loggedInApp.cartPage.city.fill(faker.location.city());
    await loggedInApp.cartPage.state.fill(faker.location.state());
    await loggedInApp.cartPage.proceedToCheckoutStep3.click();

    await loggedInApp.cartPage.paymentMethod.selectOption('credit-card');
    await loggedInApp.cartPage.ccNumber.fill(testCC.number);
    await loggedInApp.cartPage.expirationDate.fill(testCC.expirationDate);
    await loggedInApp.cartPage.cvvCode.fill(testCC.cvvCode);
    await loggedInApp.cartPage.cardHolderName.fill(testCC.cardHolderName);
    await loggedInApp.cartPage.confirmButton.click();

    await expect(loggedInApp.cartPage.paymentSuccessMessage).toBeVisible();
});
