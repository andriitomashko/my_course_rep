import { Page, Locator } from '@playwright/test';
import { HeaderFragment } from 'fragments/header.fragment';

export class AccountPage {
    page: Page;
    header: HeaderFragment;
    favoritesButton: Locator;
    profileButton: Locator;
    invoiceButton: Locator;
    messagesButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.favoritesButton = this.page.getByTestId('nav-favorites');
        this.profileButton = this.page.getByTestId('nav-profile');
        this.invoiceButton = this.page.getByTestId('nav-invoices');
        this.messagesButton = this.page.getByTestId('nav-messages');
    }
}