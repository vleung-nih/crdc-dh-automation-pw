/**
 * Sync base URL resolution. Re-exports getBaseURL from config/apps for all projects.
 * Use getBaseURL('crdc'), getBaseURL('sts'), etc. — one API for every app.
 */
export { getBaseURL } from '../apps';
