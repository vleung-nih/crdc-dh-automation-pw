import { BasePage } from '../base.page';
import { logger } from '../../utils/logger';

/**
 * Page object for the STS (https://sts.cancer.gov) homepage.
 * Stub locators — update when the actual page structure is available.
 * No assertions here; tests assert.
 */
export class StsHomePage extends BasePage {
  /** Main content area — adjust selector when STS page is available. */
  private readonly mainContent = this.page.getByRole('main');

  /** Primary heading — stub; replace with actual STS heading when known. */
  private readonly mainHeading = this.page.getByRole('heading', { level: 1 }).first();

  /**
   * Navigate to the STS homepage (root path).
   */
  async gotoHome(): Promise<void> {
    logger.info('Navigating to STS homepage');
    await this.goto('/', { waitUntil: 'domcontentloaded' });
  }

  /** Expose main content for visibility checks. */
  getMainContent() {
    return this.mainContent;
  }

  /** Expose main heading for title/visibility checks. */
  getMainHeading() {
    return this.mainHeading;
  }
}
