import { test as base, expect } from '@playwright/test';
import { App } from 'pages/app';
import path from 'path';


type MyFixtures = {
    app: App;
    loggedInApp: App;
}

const authFile = path.join(__dirname, 'playwright/.auth/user.json');

export const test = base.extend<MyFixtures>({
    app: async ({ page }, use) => {
        const app = new App(page);
        await use(app); 
    },

    loggedInApp: async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: authFile });
        const page = await context.newPage();
        const app = new App(page);

        await use(app);

        await context.close();
},
});

export {expect};
