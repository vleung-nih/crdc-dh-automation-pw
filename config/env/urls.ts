/**
 * Sync access to CRDC hub base URL for the current TEST_ENV.
 * Use when async loadConfig() is not possible (e.g. playwright.config.ts).
 * Respects BASE_URL override; otherwise returns the default for the selected env.
 */
import { DEFAULT_ENV } from '../constants';

const CRDC_BASE_URLS: Record<string, string> = {
  prod: 'https://hub.datacommons.cancer.gov',
  qa: 'https://hub-qa.datacommons.cancer.gov',
  stage: 'https://hub-stage.datacommons.cancer.gov',
  qa2: 'https://hub-qa2.datacommons.cancer.gov',
};

export function getCrdcBaseURL(): string {
  const env = process.env.TEST_ENV ?? DEFAULT_ENV;
  return process.env.BASE_URL ?? CRDC_BASE_URLS[env] ?? CRDC_BASE_URLS.prod;
}
