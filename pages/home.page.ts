import { Page, Locator } from '@playwright/test';
import { HeaderFragment } from 'fragments/header.fragment';

export class HomePage {
    page: Page;
    header: HeaderFragment;
    productCards: Locator;
    sort: Locator;
    slider: Locator;
    searchInput: Locator;
    searchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.productCards = this.page.locator('.card');
        this.sort = this.page.getByTestId('sort');
        this.slider = this.page.getByLabel('ngx-slider');
        this.searchInput = this.page.getByTestId('search-query');
        this.searchButton = this.page.getByTestId('search-submit');
    }

    checkbox(name: string): Locator {
        return this.page.getByRole('checkbox', { name })
    }   
}
