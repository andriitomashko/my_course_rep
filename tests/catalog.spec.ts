import { test, expect } from '@playwright/test';
import { HomePage } from 'pages/home.page';
import { PowerTools } from 'test-data/categories.enum';

const nameSortOptions = [
    { name: 'Name (A - Z)', sortOrder: 'asc' },
    { name: 'Name (Z - A)', sortOrder: 'desc' },
    // { name: 'CO₂ Rating (A - E)', sortOrder: 'asc' },
    // { name: 'CO₂ Rating (E - A)', sortOrder: 'desc' },
];

const priceSortOptions = [
    { name: 'Price (High - Low)', sortOrder: 'desc' },
    { name: 'Price (Low - High)', sortOrder: 'asc' },
];


nameSortOptions.forEach(({ name, sortOrder }) => {

    test(`Verify user can perform sorting by ${name}`, async ({page}) => {
    const homePage = new HomePage(page);

    await page.goto('/');
    await homePage.sort.selectOption({ label: name });

    await expect(async () => {
        const actualNames = await homePage.getProductNames();
        const expectedNames = sortOrder === 'asc' 
            ? [...actualNames].sort() 
            : [...actualNames].sort().reverse();

        expect(actualNames).toEqual(expectedNames);
    }).toPass();
    });
})

priceSortOptions.forEach(({ name, sortOrder }) => {

    test(`Verify user can perform sorting by ${name}`, async ({page}) => {
        const homePage = new HomePage(page);

        await page.goto('/');
        await homePage.sort.selectOption({ label: name });

        await expect(async () => {
            const actualPrices = await homePage.getProductPrices();
            const expectedPrices = sortOrder === 'asc'
                ? [...actualPrices].sort((a, b) => a - b)
                : [...actualPrices].sort((a, b) => b - a)

            expect(actualPrices).toEqual(expectedPrices);
        }).toPass();
    })
})

test('Verify the displayed products contain Sander in their names', async ({page}) => {
    const homePage = new HomePage(page);

    await page.goto('/');
    await homePage.checkbox(PowerTools.Sander).check();

    await expect(async () => {
        const actualNames = await homePage.getProductNames();

        expect(actualNames.length).toBeGreaterThan(0);

        for (const name of actualNames) {
            expect(name).toContain(PowerTools.Sander);
        }
    }).toPass();
})