/**
 * Central app/env → base URL map for multi-project support.
 * Add new apps here; each app defines its own set of environments and URLs.
 * Base URL is resolved by getBaseURL(project) using PROJECT + TEST_ENV (or BASE_URL override).
 */
import { DEFAULT_ENV, DEFAULT_PROJECT } from './constants';

/** Per-app environment names and their base URLs. */
export const APP_URLS: Record<string, Record<string, string>> = {
  crdc: {
    prod: 'https://hub.datacommons.cancer.gov',
    qa: 'https://hub-qa.datacommons.cancer.gov',
    stage: 'https://hub-stage.datacommons.cancer.gov',
    qa2: 'https://hub-qa2.datacommons.cancer.gov',
  },
  sts: {
    prod: 'https://sts.cancer.gov',
    qa: 'https://sts-qa.cancer.gov',
    stage: 'https://sts-stage.cancer.gov',
  },
};

/**
 * Resolve base URL for the given app and current TEST_ENV.
 * If BASE_URL is set, it overrides. Otherwise uses APP_URLS[project][TEST_ENV];
 * falls back to first env (e.g. prod) for that app if TEST_ENV is missing.
 */
export function getBaseURL(project?: string): string {
  const override = process.env.BASE_URL;
  if (override) return override;

  const app = project ?? process.env.PROJECT ?? DEFAULT_PROJECT;
  const env = process.env.TEST_ENV ?? DEFAULT_ENV;
  const urls = APP_URLS[app];
  if (!urls) return APP_URLS[DEFAULT_PROJECT]?.[DEFAULT_ENV] ?? '';

  return urls[env] ?? urls.prod ?? Object.values(urls)[0] ?? '';
}
