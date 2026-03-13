import { test, expect } from '@playwright/test';

test('should load the home page', async ({ page }) => {
  await page.goto('/');

  // Check if the title is present
  await expect(page.getByText('My Personal AI Job Application Tracker')).toBeVisible();
});

test('should add a new job application', async ({ page }) => {
  await page.goto('/');

  // Fill in the form
  await page.getByPlaceholder('company').fill('Test Company');
  await page.getByPlaceholder('role').fill('Test Role');

  // Submit the form
  await page.getByRole('button', { name: 'Add Application' }).click();

  // Check if the application appears in the list
  await expect(page.getByText('Test Company - Test Role - Applied')).toBeVisible();

  // Check the total count
  await expect(page.getByText('Total Applications: 1')).toBeVisible();
});

test('should add multiple applications', async ({ page }) => {
  await page.goto('/');

  // Add first application
  await page.getByPlaceholder('company').fill('Company 1');
  await page.getByPlaceholder('role').fill('Role 1');
  await page.getByRole('button', { name: 'Add Application' }).click();

  // Add second application
  await page.getByPlaceholder('company').fill('Company 2');
  await page.getByPlaceholder('role').fill('Role 2');
  await page.getByRole('button', { name: 'Add Application' }).click();

  // Check both applications are in the list (in reverse order)
  await expect(page.getByText('Company 2 - Role 2 - Applied')).toBeVisible();
  await expect(page.getByText('Company 1 - Role 1 - Applied')).toBeVisible();

  // Check the total count
  await expect(page.getByText('Total Applications: 2')).toBeVisible();
});