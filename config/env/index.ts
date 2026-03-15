/**
 * Environment configuration.
 *
 * Re-exports the EnvConfig type and the sync URL resolvers used by
 * playwright.config.ts. getBaseURL(project) in config/apps.ts is the canonical
 * source; getCrdcBaseURL() is a convenience for CRDC.
 *
 * Use PROJECT (crdc, sts, ...) and TEST_ENV (prod, qa, stage, ...) to select app and env.
 * Never branch on env inside tests — inject config via fixture or baseURL.
 */
import { DEFAULT_ENV } from '../constants';

export type { EnvConfig } from './types';
export { getBaseURL, getCrdcBaseURL } from './urls';

/** Returns the current environment name from TEST_ENV or the default. */
export function getEnvName(): string {
  return process.env.TEST_ENV ?? DEFAULT_ENV;
}
