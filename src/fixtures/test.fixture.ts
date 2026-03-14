import { test as base } from '@playwright/test';

/**
 * Custom test fixture. Extend this to inject shared dependencies (e.g. config, page objects).
 * Use for authenticated context or pre-wired page factories when needed.
 */
export const test = base.extend<Record<string, unknown>>({
  // Add custom fixtures here, e.g. authenticatedPage, config
});

export { expect } from '@playwright/test';
