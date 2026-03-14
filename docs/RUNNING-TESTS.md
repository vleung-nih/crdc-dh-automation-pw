# Running tests

CLI commands, environment variables, and how to view reports and traces.

## Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests (default: list reporter + HTML report). |
| `npm run test:smoke` | Run only `tests/smoke/`. |
| `npm run test:ui` | Open Playwright UI mode (explore, run, debug). |
| `npm run test:headed` | Run tests with browser visible. |
| `npm run test:debug` | Run with Playwright inspector (step-through). |
| `npm run report` | Open the last HTML report. |

## Scripts (CI)

- `./scripts/run-smoke.sh` — smoke suite only. Use on every commit.
- `./scripts/run-regression.sh` — full suite. Use on schedule or pre-release.

Both respect `TEST_ENV` and forward extra args to `playwright test`.

## Environment variables

| Variable | Purpose |
|----------|---------|
| `TEST_ENV` | Config profile: `local`, `dev`, `staging`. Default: `local`. |
| `BASE_URL` | Application under test. Overrides env file default; used by `playwright.config.ts`. |
| `LOG_LEVEL` | Optional: `debug`, `info`, `warn`, `error`. Default: `info`. |
| `CI` | Set by most CI systems; enables retries and reduces workers. |

Copy `.env.example` to `.env` and set values as needed. Do not commit `.env`.

## Run by project (browser)

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Run by file or test name

```bash
npx playwright test tests/smoke/smoke.spec.ts
npx playwright test -g "should load application"
```

## Viewing results

- **HTML report**: After a run, `npm run report` opens the last report (or `npx playwright show-report`). Use it to inspect failures, traces, and screenshots.
- **Trace on failure**: Traces are recorded on first retry (see `playwright.config.ts`). In the HTML report, open a failed test and use “Trace” to step through the run.
- **Local debug**: Use `npm run test:debug` or run from VS Code with the Playwright extension; set breakpoints and use the inspector.

## Type check and lint

- `npm run typecheck` — `tsc --noEmit` (run in CI).
- `npm run lint` — ESLint for `.ts` files.
