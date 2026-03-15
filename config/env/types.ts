/**
 * Environment configuration shape.
 * Extend this type as the framework grows (e.g. apiBaseURL, auth settings).
 */
export type EnvConfig = {
  /** Base URL for the application under test. */
  baseURL: string;
  /** Environment name (prod, qa, stage, qa2). */
  envName: string;
  /** Optional API base URL for API-layer tests. */
  apiBaseURL?: string;
  /** Optional timeout overrides per environment. */
  timeoutOverrides?: {
    elementTimeout?: number;
    navigationTimeout?: number;
  };
};
