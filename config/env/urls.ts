/**
 * Sync base URL resolution. Delegates to config/apps.getBaseURL for multi-project support.
 * getCrdcBaseURL() remains for backward compatibility and CRDC-specific usage.
 */
import { getBaseURL } from '../apps';

/** Returns base URL for the CRDC hub (convenience wrapper for getBaseURL('crdc')). */
export function getCrdcBaseURL(): string {
  return getBaseURL('crdc');
}

export { getBaseURL } from '../apps';
