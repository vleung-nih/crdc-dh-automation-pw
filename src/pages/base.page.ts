import type { Page } from '@playwright/test';

/**
 * Base page object. All page classes extend this.
 * Provides shared page reference; add common wait/scroll helpers here.
 * Pages navigate and interact; tests assert. No assertions in page objects.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /**
   * Navigate to a path relative to baseURL.
   */
  async goto(path: string): Promise<void> {
    await this.page.goto(path);
  }
}
