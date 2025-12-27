import { test, expect } from '@playwright/test';

test('X can win', async ({ page }) => {
  await page.goto('');
  await page.getByRole('link', { name: 'Projects' }).click();
  await page.getByRole('link', { name: 'See project' }).first().click();
  await page.getByRole('button', { name: 'X' }).first().click();
  await page.getByRole('button', { name: 'O' }).first().click();
  await page.getByRole('button', { name: 'X' }).nth(2).click();
  await page.getByRole('button', { name: 'O' }).nth(2).click();
  await page.getByRole('button', { name: 'X' }).nth(4).click();
  await expect(page.locator('h2')).toContainText('Winner: X');
});

test('O can win', async ({ page }) => {
  await page.goto('');
  await page.getByRole('link', { name: 'Projects' }).click();
  await page.getByRole('link', { name: 'See project' }).first().click();
  await page.getByRole('button', { name: 'X' }).first().click();
  await page.getByRole('button', { name: 'O' }).nth(1).click();
  await page.getByRole('button', { name: 'X' }).nth(1).click();
  await page.getByRole('button', { name: 'O' }).nth(2).click();
  await page.getByRole('button', { name: 'X' }).nth(3).click();
  await page.getByRole('button', { name: 'O' }).nth(3).click();
  await expect(page.locator('h2')).toContainText('Winner: O');
});

test('Draw can happen', async ({ page }) => {
  await page.goto('');
  await page.getByRole('link', { name: 'Projects' }).click();
  await page.getByRole('link', { name: 'See project' }).first().click();
  await page.getByRole('button', { name: 'X' }).nth(2).click();
  await page.getByRole('button', { name: 'O' }).nth(3).click();
  await page.getByRole('button', { name: 'X' }).nth(4).click();
  await page.getByRole('button', { name: 'O' }).nth(1).click();
  await page.getByRole('button', { name: 'X' }).nth(5).click();
  await page.getByRole('button', { name: 'O' }).nth(5).click();
  await page.getByRole('button', { name: 'X' }).first().click();
  await page.getByRole('button', { name: 'O' }).nth(1).click();
  await page.getByRole('button', { name: 'X' }).nth(3).click();
  await expect(page.locator('h2')).toContainText('Game Over!');
});