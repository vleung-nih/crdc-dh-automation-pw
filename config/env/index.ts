/**
 * Environment configuration.
 *
 * Re-exports the EnvConfig type and getBaseURL from config/apps.ts.
 * Use getBaseURL(project) for any app: getBaseURL('crdc'), getBaseURL('sts'), etc.
 *
 * PROJECT (crdc, sts, ...) and TEST_ENV (prod, qa, stage, ...) select app and env.
 * Never branch on env inside tests — inject config via fixture or baseURL.
 */
import { DEFAULT_ENV } from '../constants';

export type { EnvConfig } from './types';
export { getBaseURL } from './urls';

/** Returns the current environment name from TEST_ENV or the default. */
export function getEnvName(): string {
  return process.env.TEST_ENV ?? DEFAULT_ENV;
}
