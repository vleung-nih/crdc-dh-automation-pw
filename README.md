# Playwright Framework VL

State-of-the-art UI test automation framework using **Playwright** and **TypeScript**, following industry best practices and SDET framework standards.

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

# Run with UI mode
npm run test:ui

# Open last report
npm run report
```

## Project structure

See [docs/PROJECT-STRUCTURE.md](docs/PROJECT-STRUCTURE.md) for the directory layout and responsibilities.

## Conventions

See [docs/CONVENTIONS.md](docs/CONVENTIONS.md) for naming, POM rules, locator strategy, and test data.

## Running tests

See [docs/RUNNING-TESTS.md](docs/RUNNING-TESTS.md) for CLI commands, environment variables, and viewing reports/traces.

## Configuration

- Copy `.env.example` to `.env` and set `TEST_ENV` and `BASE_URL` as needed.
- Timeouts and constants live in `config/constants.ts`; environment-specific config in `config/env/`.

## License

Private. All rights reserved.
