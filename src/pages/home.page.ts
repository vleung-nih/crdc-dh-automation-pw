import { BasePage } from './base.page';
import { logger } from '../utils/logger';

/**
 * Page object for the CRDC Submission Portal homepage (hub.datacommons.cancer.gov).
 * Covers header, main content, footer, and system use warning dialog.
 * No assertions here; tests assert.
 */
export class HomePage extends BasePage {
  /** Government banner text */
  private readonly govBanner = this.page.getByText(
    'An official website of the United States government',
    { exact: true }
  );

  /** Primary nav: Submission Requests */
  private readonly navSubmissionRequests = this.page.getByRole('link', {
    name: 'Submission Requests',
  });
  /** Primary nav: Data Submissions */
  private readonly navDataSubmissions = this.page.getByRole('link', {
    name: 'Data Submissions',
  });
  /** Primary nav: Data Explorer */
  private readonly navDataExplorer = this.page.getByRole('link', {
    name: 'Data Explorer',
  });
  /** Primary nav: Documentation */
  private readonly navDocumentation = this.page.getByRole('button', {
    name: 'Documentation',
  });
  /** Primary nav: Model Navigator */
  private readonly navModelNavigator = this.page.getByRole('button', {
    name: 'Model Navigator',
  });
  /** Primary nav: Login */
  private readonly navLogin = this.page.getByRole('link', { name: 'Login' });

  /** Main heading (Login to CRDC Submission Portal) */
  private readonly mainHeading = this.page.getByRole('heading', {
    level: 1,
    name: 'Login to CRDC Submission Portal',
  });
  /** Main CTA: Log In link */
  private readonly loginLink = this.page.getByRole('link', { name: 'Log In' });

  /** Footer: More Information section heading */
  private readonly footerMoreInfo = this.page.getByText('More Information', {
    exact: true,
  });
  /** Footer: Policies section heading */
  private readonly footerPolicies = this.page.getByText('Policies', {
    exact: true,
  });
  /** Footer: System Info section (contains Release Notes, version) */
  private readonly footerSystemInfo = this.page.getByText('System Info', {
    exact: true,
  });
  /** Footer: Release Notes link */
  private readonly footerReleaseNotes = this.page.getByRole('link', {
    name: 'Release Notes',
  });

  /**
   * System use warning dialog. Uses data-testid from CRDC UI (OverlayWindow.tsx);
   * dialog opens in useEffect when sessionStorage is empty, so wait for visible before asserting.
   */
  private readonly systemUseDialog = this.page.getByTestId(
    'system-use-warning-dialog'
  );
  /** Continue button inside warning dialog */
  private readonly dialogContinueButton = this.page
    .getByTestId('system-use-warning-dialog')
    .getByRole('button', { name: 'Continue' });

  /**
   * Navigate to the homepage (root path).
   * Uses domcontentloaded to avoid timeout on heavy pages when running headed or in parallel.
   */
  async gotoHome(): Promise<void> {
    logger.info('Navigating to CRDC Hub homepage');
    await this.goto('/', { waitUntil: 'domcontentloaded' });
  }

  /**
   * Dismiss the system use warning dialog if it is visible by clicking Continue.
   * Single check only; use ensureSystemUseWarningDismissed() when the dialog is expected to appear after load.
   */
  async dismissSystemUseWarning(): Promise<void> {
    if (await this.systemUseDialog.isVisible()) {
      logger.info('Dismissing system use warning dialog');
      await this.dialogContinueButton.click();
    }
  }

  /**
   * Wait for the system use warning dialog to appear (up to timeoutMs), then dismiss it.
   * Use in beforeEach after gotoHome() so tests never run with the modal still open.
   * If the dialog does not appear (e.g. already acknowledged in this session), returns without error.
   */
  async ensureSystemUseWarningDismissed(timeoutMs = 15_000): Promise<void> {
    try {
      await this.systemUseDialog.waitFor({ state: 'visible', timeout: timeoutMs });
      logger.info('System use warning dialog appeared; dismissing');
      await this.dialogContinueButton.click();
    } catch {
      logger.debug('System use warning dialog did not appear (sessionStorage may already be set)');
    }
  }

  /** Locators exposed for test assertions (readonly). Prefer getByRole/getByText. */
  getGovBanner() {
    return this.govBanner;
  }
  getNavSubmissionRequests() {
    return this.navSubmissionRequests;
  }
  getNavDataSubmissions() {
    return this.navDataSubmissions;
  }
  getNavDataExplorer() {
    return this.navDataExplorer;
  }
  getNavDocumentation() {
    return this.navDocumentation;
  }
  getNavModelNavigator() {
    return this.navModelNavigator;
  }
  getNavLogin() {
    return this.navLogin;
  }
  getMainHeading() {
    return this.mainHeading;
  }
  getLoginLink() {
    return this.loginLink;
  }
  getFooterMoreInfo() {
    return this.footerMoreInfo;
  }
  getFooterPolicies() {
    return this.footerPolicies;
  }
  getFooterSystemInfo() {
    return this.footerSystemInfo;
  }
  getFooterReleaseNotes() {
    return this.footerReleaseNotes;
  }
  getSystemUseDialog() {
    return this.systemUseDialog;
  }
  getDialogContinueButton() {
    return this.dialogContinueButton;
  }
}
