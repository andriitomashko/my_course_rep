import { test, expect } from '@playwright/test';
import { HomePage } from 'pages/home.page';

enum HandTools {
    Hammer = 'Hammer',
    HandSaw = 'Hand Saw',
    Wrench = 'Wrench',
    Screwdriver = 'Screwdriver',
    Pliers = 'Pliers',
    Chisels = 'Chisels',
    Measures = 'Measures',
}

enum PowerTools {
    Grinder = 'Grinder',
    Sander = 'Sander',
    Saw = 'Saw',
    Drill = 'Drill',
}

enum Other {
    ToolBelts = 'Tool Belts',
    StorageSolutions = 'Storage Solutions',
    Workbench = 'Workbench',
    SafetyGear = 'Safety Gear',
    Fasteners = 'Fasteners',
}

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
    await page.waitForTimeout(1000);

    const actualNames = await homePage.productName.allInnerTexts();    
    const expectedNames = sortOrder === 'asc' 
        ? [...actualNames].sort() 
        : [...actualNames].sort().reverse();

    expect(actualNames).toEqual(expectedNames);
    });
})

priceSortOptions.forEach(({ name, sortOrder, }) => {

    test(`Verify user can perform sorting by ${name}`, async ({page}) => {
        const homePage = new HomePage(page);

        await page.goto('/');
        await homePage.sort.selectOption({ label: name });
        await page.waitForTimeout(1000);


        const rawPrices = await homePage.productPrice.allInnerTexts();
        const actualPrices = rawPrices.map(price => parseFloat(price.replace('$', '')))
        const expectedPrices = sortOrder === 'asc'
            ? [...actualPrices].sort((a, b) => a - b)
            : [...actualPrices].sort((a, b) => b - a)

        expect(actualPrices).toEqual(expectedPrices);
    })
})

test('Verify the displayed products contain Sander in their names', async ({page}) => {
    const homePage = new HomePage(page);

    await page.goto('/');
    await page.getByLabel(PowerTools.Sander).check();
    await page.waitForTimeout(1000);

    
    const actualNames = await homePage.productName.allInnerTexts();

    expect(actualNames.length).toBeGreaterThan(0);

    for (const name of actualNames) {
        expect(name).toContain(PowerTools.Sander);
    }
})

