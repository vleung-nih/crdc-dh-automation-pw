/**
 * Environment configuration loader.
 * Use TEST_ENV (local | dev | staging | production) to select profile.
 * Never branch on env inside tests — inject config via fixture or baseURL.
 */
export type { EnvConfig } from './types';

import type { EnvConfig } from './types';

const envMap: Record<string, () => Promise<{ default: EnvConfig }>> = {
  local: () => import('./local'),
  dev: () => import('./dev'),
  staging: () => import('./staging'),
};

const DEFAULT_ENV = 'local';

export function getEnvName(): string {
  return process.env.TEST_ENV ?? DEFAULT_ENV;
}

export async function loadConfig(): Promise<EnvConfig> {
  const envName = getEnvName();
  const loader = envMap[envName] ?? envMap.local;
  const mod = await loader();
  return mod.default;
}
