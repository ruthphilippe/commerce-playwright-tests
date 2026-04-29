import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../fixtures/users';

test.describe('Authentication', () => {
    test('standard user can log in succesfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        
        await loginPage.open();
        await loginPage.login(users.standard.username, users.standard.password);

        await inventoryPage.expectLoaded();
    });

    test('locked out user sees an error message', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.login(users.lockedOut.username, users.lockedOut.password);

        await loginPage.expectLoginError('Sorry, this user has been locked out');
    });

    test('invalid user cannot log in', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.login(users.invalid.username, users.invalid.password);

        await loginPage.expectLoginError(
            'Username and password do not match any user in this service'
        );
    });

});