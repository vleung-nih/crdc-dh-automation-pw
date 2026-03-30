import { test as base } from '@playwright/test';
import { HomePage } from '../pages/crdc/home.page';

/**
 * Custom test fixtures. All test files should import { test, expect } from here
 * instead of from '@playwright/test' so they receive injected page objects.
 *
 * Add new page objects to the Fixtures type and the extend block as the
 * framework grows (e.g. loginPage, dashboardPage).
 */
type Fixtures = {
  homePage: HomePage;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export { expect } from '@playwright/test';
