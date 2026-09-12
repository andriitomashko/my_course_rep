import { test, expect } from 'fixtures';
import { generateMockProducts } from 'test-data/mock-products.data';

const mockProducts = generateMockProducts(20);

test('Verify 20 products are displayed with mocked API response', async ({ app }) => {
    await app.page.route('**/products**', async (route) => {
        await route.fulfill({
            json: {
                current_page: 1,
                data: mockProducts,
                from: 1,
                last_page: 1,
                per_page: 20,
                to: 20,
                total: 20,
            },
        });
    });

    await app.page.goto('/');

    await expect(app.homePage.productCards).toHaveCount(20);
});
