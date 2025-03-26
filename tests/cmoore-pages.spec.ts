import { test, expect } from '@playwright/test';

test.use({
  storageState: 'cmoore-auth.json',
});

test('Logged in pages', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Add Project' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Filter' })).toBeVisible();
  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page.getByRole('heading', { name: 'Your Profile' })).toBeVisible();
  await expect(page.getByLabel('First Name')).toBeVisible();
  await page.getByRole('link', { name: 'Add Project' }).click();
  await expect(page.getByRole('heading', { name: 'Add Project' })).toBeVisible();
  await expect(
    page
      .locator('div')
      .filter({ hasText: /^Name$/ })
      .nth(1),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  await page.getByRole('link', { name: 'Filter' }).click();
});
