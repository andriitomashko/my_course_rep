import { faker } from '@faker-js/faker';

export type Product = {
    id: string;
    name: string;
    price: number;
    in_stock: boolean;
    co2_rating: string;
    product_image: {
        file_name: string;
        title: string;
    };
    category: {
        name: string;
        slug: string;
    };
    brand: {
        name: string;
    };
};

function createMockProduct(): Product {
    return {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.number.float({ min: 5, max: 100, fractionDigits: 2 }),
        in_stock: true,
        co2_rating: 'D',
        product_image: {
            file_name: 'placeholder.avif',
            title: faker.commerce.productName(),
        },
        category: {
            name: 'Hand Tools',
            slug: 'hand-tools',
        },
        brand: {
            name: faker.company.name(),
        },
    };
}

export function generateMockProducts(count: number): Product[] {
    return Array.from({ length: count }, () => createMockProduct());
}
