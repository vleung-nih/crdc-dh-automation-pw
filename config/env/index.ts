/**
 * Environment configuration.
 *
 * Re-exports the EnvConfig type and the sync URL resolver used by
 * playwright.config.ts. getCrdcBaseURL() in urls.ts is the canonical
 * source for base URL resolution.
 *
 * Use TEST_ENV (prod | qa | stage | qa2) to select CRDC hub profile.
 * Never branch on env inside tests — inject config via fixture or baseURL.
 */
import { DEFAULT_ENV } from '../constants';

export type { EnvConfig } from './types';
export { getCrdcBaseURL } from './urls';

/** Returns the current environment name from TEST_ENV or the default. */
export function getEnvName(): string {
  return process.env.TEST_ENV ?? DEFAULT_ENV;
}
