import type { EnvConfig } from './types';

const dev: EnvConfig = {
  baseURL: process.env.BASE_URL ?? 'https://playwright.dev',
  envName: 'dev',
};

export default dev;
