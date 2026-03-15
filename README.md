# Playwright Framework for CRDCDH

UI test automation framework using **Playwright** and **TypeScript**, following industry best practices and framework standards.

## Prerequisites

- **Node.js** 18 or higher
- **npm** (or pnpm/yarn)

## Quick start

```bash
# Install dependencies
npm ci

# Install Playwright browsers (one-time)
npx playwright install

# Run all tests
npm test

# Run smoke suite only
npm run test:smoke

# Run CRDC Submission Portal homepage POC (hub.datacommons.cancer.gov)
npm run test:crdc

# Run with UI mode
npm run test:ui

# Open last report
npm run report
```

## Documentation

- **[Framework onboarding](docs/FRAMEWORK-ONBOARDING.md)** — End-to-end guide to how the framework works and why it’s structured this way (for QA engineers joining the project).

## Project structure

See [docs/PROJECT-STRUCTURE.md](docs/PROJECT-STRUCTURE.md) for the directory layout and responsibilities.

## Conventions

See [docs/CONVENTIONS.md](docs/CONVENTIONS.md) for naming, POM rules, locator strategy, and test data.

## Running tests

See [docs/RUNNING-TESTS.md](docs/RUNNING-TESTS.md) for CLI commands, environment variables, and viewing reports/traces.

## CRDC Hub Homepage POC

The framework includes a proof-of-concept suite for the [CRDC Submission Portal](https://hub.datacommons.cancer.gov/) homepage:

- **Page object:** `src/pages/home.page.ts` — header, main content, footer, system use warning dialog
- **Tests:** `tests/ui/crdc-home.spec.ts` — title, heading, nav links, footer, warning dialog, login navigation

Run with: `npm run test:crdc` (uses project `crdc-home` with baseURL `https://hub.datacommons.cancer.gov`). Ensure Playwright browsers are installed: `npx playwright install`.

## Configuration

- Copy `.env.example` to `.env` and set `TEST_ENV` and `BASE_URL` as needed.
- Timeouts and constants live in `config/constants.ts`; environment-specific config in `config/env/`.

## License

Private. All rights reserved.
