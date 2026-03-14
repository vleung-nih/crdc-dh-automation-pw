import type { EnvConfig } from './types';

const local: EnvConfig = {
  baseURL: process.env.BASE_URL ?? 'https://playwright.dev',
  envName: 'local',
};

export default local;
