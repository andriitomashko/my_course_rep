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
    }

    async deleteProductByName(productName: string): Promise<void> {
        const targetRow = this.cartRows.filter({ hasText: productName });
        await targetRow.locator('.btn-danger').click();
    }
}
