import type { EnvConfig } from './types';

const staging: EnvConfig = {
  baseURL: process.env.BASE_URL ?? 'https://playwright.dev',
  envName: 'staging',
};

export default staging;
