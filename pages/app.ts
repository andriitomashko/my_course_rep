import { Page } from '@playwright/test';
import { HeaderFragment } from 'fragments/header.fragment';
import { LoginPage } from './login.page';
import { HomePage } from './home.page';
import { ProductPage } from './product.page';
import { AccountPage } from './account.page';
import { CartPage } from './cart.page';

export class App {
    page: Page; 
    header: HeaderFragment;
    loginPage: LoginPage;
    homePage: HomePage;
    productPage: ProductPage;
    accountPage: AccountPage;
    cartPage: CartPage;

    constructor (page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.loginPage = new LoginPage(page);
        this.homePage = new HomePage(page);
        this.productPage = new ProductPage(page);
        this.accountPage = new AccountPage(page);
        this.cartPage = new CartPage(page);
    }
}
