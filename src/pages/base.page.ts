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
   * @param options.waitUntil - Default 'load'; use 'domcontentloaded' for faster navigation on heavy pages.
   */
  async goto(
    path: string,
    options?: { waitUntil?: 'load' | 'domcontentloaded' | 'commit' }
  ): Promise<void> {
    await this.page.goto(path, {
      waitUntil: options?.waitUntil ?? 'load',
    });
  }
}
