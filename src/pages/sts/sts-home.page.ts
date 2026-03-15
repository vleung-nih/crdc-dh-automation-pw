import { BasePage } from '../base.page';
import { logger } from '../../utils/logger';

/**
 * Page object for the STS (https://sts.cancer.gov) homepage.
 * No assertions here; tests assert.
 */
export class StsHomePage extends BasePage {
  /** Main content area  */
  private readonly mainContent = this.page.locator('xpath=//*[@id="aboutTabContent"]');

  /** Primary heading */
  private readonly mainHeading = this.page.getByText('Simple Terminology Service (STS)');

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
