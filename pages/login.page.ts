import { Page, Locator } from '@playwright/test';
import { HeaderFragment } from 'fragments/header.fragment';

export class LoginPage {
    page: Page;
    header: HeaderFragment;
    emailField: Locator;
    passwordField: Locator;
    loginButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.emailField = page.getByTestId('email');
        this.passwordField = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-submit');

    }
    
    async performLogin(email: string, password: string): Promise<void> {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    };
};