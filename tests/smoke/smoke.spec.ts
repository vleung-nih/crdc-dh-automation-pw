/**
 * Smoke suite: critical path checks. Run on every commit.
 * Each test is independent and uses baseURL from config.
 */
import { test, expect } from '@playwright/test';

test.describe('Smoke', () => {
  test('should load application when navigating to base URL', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Playwright/);
  });
});
