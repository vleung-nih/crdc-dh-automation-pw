import type { EnvConfig } from './types';

/** CRDC Submission Portal stage (hub-stage.datacommons.cancer.gov). */
const stage: EnvConfig = {
  baseURL: process.env.BASE_URL ?? 'https://hub-stage.datacommons.cancer.gov',
  envName: 'stage',
};

export default stage;
