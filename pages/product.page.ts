import { Page, Locator } from '@playwright/test';
import { HeaderFragment } from 'fragments/header.fragment';

export class ProductPage {
    page: Page;
    header: HeaderFragment;
    productName: Locator;
    productPrice: Locator;
    ratingBadge: Locator;
    quantityInput: Locator;
    quantityDecrease: Locator;
    quantityIncrease: Locator;
    addToCart: Locator;
    addToFavorites: Locator;
    compareButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.productName = this.page.getByTestId('product-name');
        this.productPrice = this.page.getByTestId('unit-price');
        this.ratingBadge = this.page.getByTestId('co2-rating-badge');
        this.quantityInput = this.page.getByTestId('quantity');
        this.quantityDecrease = this.page.getByTestId('decrease-quantity');
        this.quantityIncrease = this.page.getByTestId('increase-quantity');
        this.addToCart = this.page.getByTestId('add-to-cart');
        this.addToFavorites = this.page.getByTestId('add-to-favorites');
        this.compareButton = this.page.getByTestId('add-to-compare');
    }

    async increaseQuantity() {
        await this.quantityIncrease.click();
    }

    async decreaseQuantity() {
        await this.quantityDecrease.click();
    }
}
