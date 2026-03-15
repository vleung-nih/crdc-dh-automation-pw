import type { EnvConfig } from './types';

/** CRDC Submission Portal QA2 (hub-qa2.datacommons.cancer.gov). */
const qa2: EnvConfig = {
  baseURL: process.env.BASE_URL ?? 'https://hub-qa2.datacommons.cancer.gov',
  envName: 'qa2',
};

export default qa2;
