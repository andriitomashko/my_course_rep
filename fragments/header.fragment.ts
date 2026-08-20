import { Page, Locator } from '@playwright/test';
 

export class HeaderFragment {
    page: Page;
    logoButton: Locator;
    homeButton: Locator;
    categoriesButton: Locator;
    contactButton: Locator;
    myAccountButton:Locator;
    loginButton: Locator;
    languageButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoButton = this.page.locator('.navbar-brand');
        this.homeButton = this.page.getByTestId('nav-home');
        this.categoriesButton = this.page.getByTestId('nav-categories');
        this.contactButton = this.page.getByTestId('nav-contact');
        this.myAccountButton = this.page.getByTestId('nav-account');
        this.loginButton = this.page.getByTestId('nav-sign-in');
        this.languageButton = this.page.getByTestId('language-sel');
    }
}