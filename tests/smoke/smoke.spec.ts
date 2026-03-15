/**
 * Smoke suite: critical path checks. Run on every commit.
 * Each test is independent and uses baseURL from config.
 * These tests should complete quickly and validate that the application is reachable.
 */
import { test, expect } from '../../src/fixtures/test.fixture';

test.describe('Smoke', () => {
  test('should load application and return HTTP 200', async ({ page }) => {
    const response = await page.goto('/');
    expect(response, 'Expected a valid HTTP response from baseURL').not.toBeNull();
    expect(response!.status(), 'Expected HTTP 200 from baseURL').toBe(200);
  });

  test('should have a non-empty document title', async ({ page }) => {
    await page.goto('/');
    const title = await page.title();
    expect(title.length, 'Page title should not be empty').toBeGreaterThan(0);
  });
});
