import { Page, Locator } from '@playwright/test';
import { HeaderFragment } from 'fragments/header.fragment';

export class CartPage {
    page: Page;
    header: HeaderFragment;
    productName: Locator;
    quantityInput: Locator;
    productPrice: Locator;
    totalPrice: Locator;
    cartPrice: Locator;
    cartRows: Locator;
    continueShopping: Locator;
    proceedCheckout: Locator;
    proceedToCheckoutStep2: Locator;
    country: Locator;
    postalCode: Locator;
    houseNumber: Locator;
    street: Locator;
    city: Locator;
    state: Locator;
    proceedToCheckoutStep3: Locator;
    paymentMethod: Locator;
    confirmButton: Locator;
    ccNumber: Locator;
    expirationDate: Locator;
    cvvCode: Locator;
    cardHolderName: Locator;
    paymentSuccessMessage: Locator;

    constructor (page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.productName = this.page.getByTestId('product-title');
        this.quantityInput = this.page.getByTestId('product-quantity');
        this.productPrice = this.page.getByTestId('product-price');
        this.totalPrice = this.page.getByTestId('line-price');
        this.cartPrice = this.page.getByTestId('cart-total');
        this.cartRows = this.page.locator('tbody tr');
        this.continueShopping = this.page.getByTestId('continue-shopping');
        this.proceedCheckout = this.page.getByTestId('proceed-1');
        this.proceedToCheckoutStep2 = this.page.getByTestId('proceed-2');
        this.country = this.page.getByTestId('country');
        this.postalCode = this.page.getByTestId('postal_code');
        this.houseNumber = this.page.getByTestId('house_number');
        this.street = this.page.getByTestId('street');
        this.city = this.page.getByTestId('city');
        this.state = this.page.getByTestId('state');
        this.proceedToCheckoutStep3 = this.page.getByTestId('proceed-3');
        this.paymentMethod = this.page.getByTestId('payment-method');
        this.confirmButton = this.page.getByTestId('finish');
        this.ccNumber = this.page.getByTestId('credit_card_number');
        this.expirationDate = this.page.getByTestId('expiration_date');
        this.cvvCode = this.page.getByTestId('cvv');
        this.cardHolderName = this.page.getByTestId('card_holder_name');
        this.paymentSuccessMessage = this.page.getByTestId('payment-success-message');
    }

    async deleteProductByName(productName: string): Promise<void> {
        const targetRow = this.cartRows.filter({ hasText: productName });
        await targetRow.locator('.btn-danger').click();
    }

    async getProductPrice(): Promise<number> {
        const rawPrice = await this.productPrice.innerText();
        return parseFloat(rawPrice.replace('$', ''));
    }

    async getTotalPrice(): Promise<number> {
        const rawPrice = await this.totalPrice.innerText();
        return parseFloat(rawPrice.replace('$', ''));
    }

    async getCartPrice(): Promise<number> {
        const rawPrice = await this.cartPrice.innerText();
        return parseFloat(rawPrice.replace('$', ''));
    }
}
