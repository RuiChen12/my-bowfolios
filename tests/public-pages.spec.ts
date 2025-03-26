import { test, expect } from '@playwright/test';

test('Public pages', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('link', { name: 'BowfoliosBowfolios' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Profiles' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Projects' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Interests' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await page.getByRole('heading', { name: 'Welcome to Bowfolios' }).click();
  await page.getByRole('link', { name: 'Profiles' }).click();
  await expect(page.locator('#profilesPage')).toContainText('Carleton Moore');
  await page.getByRole('link', { name: 'Projects' }).click();
  await expect(page.locator('#projectsPage')).toContainText('RadGrad');
  await page.getByRole('link', { name: 'Interests' }).click();
  await expect(page.locator('#interestsPage')).toContainText('Climate Change');
});
