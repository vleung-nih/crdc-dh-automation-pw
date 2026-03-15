import type { EnvConfig } from './types';

/** CRDC Submission Portal QA (hub-qa.datacommons.cancer.gov). */
const qa: EnvConfig = {
  baseURL: process.env.BASE_URL ?? 'https://hub-qa.datacommons.cancer.gov',
  envName: 'qa',
};

export default qa;
