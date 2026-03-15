import type { Page } from '@playwright/test';
import { logger } from '../utils/logger';

/**
 * Base page object. All page classes extend this.
 * Provides shared page reference, navigation, and common helpers.
 * Pages navigate and interact; tests assert. No assertions in page objects.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /**
   * Navigate to a path relative to baseURL.
   * Logs navigation for debugging.
   * @param options.waitUntil - Default 'load'; use 'domcontentloaded' for faster navigation on heavy pages.
   */
  async goto(
    path: string,
    options?: { waitUntil?: 'load' | 'domcontentloaded' | 'commit' }
  ): Promise<void> {
    const waitUntil = options?.waitUntil ?? 'load';
    logger.info(`Navigating to "${path}"`, { waitUntil });
    await this.page.goto(path, { waitUntil });
  }

  /**
   * Wait for a specified network idle state.
   * Useful after actions that trigger multiple API calls.
   */
  async waitForNetworkIdle(timeout?: number): Promise<void> {
    logger.debug('Waiting for network idle');
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Scroll to the bottom of the page.
   * Useful for triggering lazy-loaded content or verifying footer elements.
   */
  async scrollToBottom(): Promise<void> {
    logger.debug('Scrolling to bottom of page');
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  /**
   * Get the current URL of the page.
   */
  getCurrentURL(): string {
    return this.page.url();
  }
}
