/**
 * STS (https://sts.cancer.gov) homepage stub tests.
 * Run: npm run test:sts (or npx playwright test --project=sts-homepage).
 * Base URL comes from PROJECT=sts and TEST_ENV (prod | qa | stage) or BASE_URL override.
 * Uses StsHomePage page object; no shared fixture — project provides baseURL.
 * These are stub tests; replace with real assertions when STS is available.
 */
import { test, expect } from '../../src/fixtures/test.fixture';
import { StsHomePage } from '../../src/pages/sts/sts-home.page';

test.describe('STS Homepage', () => {
  test.beforeEach(async ({ page }) => {
    const stsHome = new StsHomePage(page);
    await stsHome.gotoHome();
  });

  /**
   * Stub: Asserts the page loads and returns a valid response.
   * Replace with real title/heading checks when STS is up.
   */
  test('should load STS and return HTTP 200', async ({ page }) => {
    const response = await page.goto('/');
    expect(response, 'Expected a valid HTTP response from STS baseURL').not.toBeNull();
    expect(response!.status(), 'Expected HTTP 200 from STS').toBe(200);
  });

  /**
   * Stub: Asserts the document has a non-empty title.
   * Replace with expected STS title when known.
   */
  test('should have a non-empty document title', async ({ page }) => {
    await page.goto('/');
    const title = await page.title();
    expect(title.length, 'Page title should not be empty').toBeGreaterThan(0);
  });

  /**
   * Stub: Asserts the page has a main landmark (or similar).
   * Update selector and assertion when STS structure is known.
   */
  test('should have main content area', async ({ page }) => {
    const stsHome = new StsHomePage(page);
    await expect(stsHome.getMainContent()).toBeVisible({ timeout: 15_000 });
  });
});
