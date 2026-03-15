/**
 * Environment configuration loader.
 * Use TEST_ENV (prod | qa | stage | qa2) to select CRDC hub profile.
 * Never branch on env inside tests — inject config via fixture or baseURL.
 */
export type { EnvConfig } from './types';

import type { EnvConfig } from './types';

const envMap: Record<string, () => Promise<{ default: EnvConfig }>> = {
  prod: () => import('./prod'),
  qa: () => import('./qa'),
  stage: () => import('./stage'),
  qa2: () => import('./qa2'),
};

const DEFAULT_ENV = 'prod';

export function getEnvName(): string {
  return process.env.TEST_ENV ?? DEFAULT_ENV;
}

export async function loadConfig(): Promise<EnvConfig> {
  const envName = getEnvName();
  const loader = envMap[envName] ?? envMap.prod;
  const mod = await loader();
  return mod.default;
}
