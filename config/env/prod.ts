import type { EnvConfig } from './types';

/** CRDC Submission Portal production (hub.datacommons.cancer.gov). */
const prod: EnvConfig = {
  baseURL: process.env.BASE_URL ?? 'https://hub.datacommons.cancer.gov',
  envName: 'prod',
};

export default prod;
