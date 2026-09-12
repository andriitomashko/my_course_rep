import { test, expect } from 'fixtures';
import { testUser } from 'test-data/users.data';


test('Verify successful login', async ({ loggedInApp }) => {
    await loggedInApp.page.goto('/');

    await expect(loggedInApp.header.navigationMenu).toHaveText(testUser.name);
});
