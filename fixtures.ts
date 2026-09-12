import { test as base, expect } from '@playwright/test';
import { App } from 'pages/app';
import { testUser } from 'test-data/users.data';

type MyFixtures = {
    app: App;
    loggedInApp: App;
}

type LoginResponse = {
    access_token: string;
};

export const test = base.extend<MyFixtures>({
    app: async ({ page }, use) => {
        const app = new App(page);
        await use(app);
    },

    loggedInApp: async ({ browser, request }, use) => {
        const response = await request.post('https://api.practicesoftwaretesting.com/users/login', {
            data: {
                email: testUser.email,
                password: testUser.password,
            },
        });

        const responseBody = await response.json() as LoginResponse;
        const token = responseBody.access_token;

        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('/');
        await page.evaluate((token) => {
            localStorage.setItem('auth-token', token);
        }, token);

        await page.reload();
        await page.waitForLoadState('networkidle');

        const app = new App(page);

        await use(app);
        await context.close();
    },
});

export { expect };
