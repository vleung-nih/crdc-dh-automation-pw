/**
 * Placeholder UI spec. Organize UI tests by feature under tests/ui/.
 * Use page objects from src/pages/; assert in tests, not in pages.
 */
import { test, expect } from '@playwright/test';

test.describe('Example UI', () => {
  test('should have docs link when on homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /docs/i })).toBeVisible();
  });
});
