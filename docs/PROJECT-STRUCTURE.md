# Project structure

Directory layout and responsibility of each folder.

## Tree

```
crdc-dh-automation-pw/
├── .github/
│   └── workflows/
│       └── ci.yml                          # GitHub Actions CI/CD pipeline
├── config/
│   ├── apps.ts                             # App/env → URL map; getBaseURL(project)
│   ├── constants.ts                        # Timeouts, DEFAULT_PROJECT, DEFAULT_ENV
│   └── env/                                # Env types, getBaseURL(project)
│       ├── index.ts                        # Env name resolver and re-exports
│       ├── types.ts                        # EnvConfig type definition
│       └── urls.ts                         # getBaseURL re-export from apps
├── src/
│   ├── pages/                              # Page Object Model classes
│   │   ├── base.page.ts                    # Base class for all pages
│   │   ├── home.page.ts                    # CRDC Hub homepage
│   │   └── sts-home.page.ts                # STS homepage (stub)
│   ├── components/                         # Reusable UI components (modals, nav)
│   ├── api/                                # API client wrappers (optional)
│   ├── data/                               # Test data factories, builders
│   ├── utils/                              # Helpers: logger, waits, file I/O
│   │   └── logger.ts                       # Structured logger
│   ├── fixtures/
│   │   ├── test.fixture.ts                 # Custom Playwright fixtures (homePage, etc.)
│   │   └── static/                         # JSON/CSV test data (no secrets)
│   └── hooks/                              # Global setup/teardown
├── tests/
│   ├── crdc/                               # CRDC Submission Portal specs (Option B: per-app)
│   │   └── crdc-homepage.spec.ts          # Homepage tests
│   ├── sts/                                # STS specs (Option B: per-app)
│   │   └── sts-homepage.spec.ts           # Homepage stub tests
│   ├── smoke/                              # Critical path smoke (default baseURL)
│   │   └── smoke.spec.ts                   # Health check suite
│   ├── integration/                        # Cross-layer / E2E
│   └── ui/                                 # Legacy; see README — app specs in crdc/, sts/
├── reports/                                # Generated reports (gitignored)
├── scripts/                                # CI helper scripts
│   ├── run-smoke.sh                        # Smoke suite runner
│   └── run-regression.sh                   # Full regression runner
├── docs/                                   # This documentation
│   ├── CONVENTIONS.md                      # Naming, POM rules, fixtures, locators
│   ├── FRAMEWORK-ONBOARDING.md             # End-to-end guide for new QA engineers
│   ├── PROJECT-STRUCTURE.md                # This file
│   └── RUNNING-TESTS.md                    # CLI commands, env vars, reports
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── .editorconfig
├── .env.example
└── README.md
```

## Responsibilities

| Folder / file | Purpose |
|---------------|---------|
| **.github/workflows/** | CI/CD pipeline: lint, typecheck, smoke tests on PR; regression on main. |
| **config/** | All environment-specific values and timeouts. No env branching inside tests; use config injection. |
| **config/constants.ts** | `ELEMENT_TIMEOUT`, `NAVIGATION_TIMEOUT`, etc. Single source for timeouts. |
| **config/env/** | Base URL resolver and env config type. Loaded by `TEST_ENV`. |
| **src/pages/** | One class per page; locators and interactions only; no assertions. |
| **src/components/** | Reusable UI fragments (header, modals) composed by pages. |
| **src/api/** | Typed API clients for setup, teardown, or API-layer assertions. |
| **src/data/** | Test data builders, factories, and constants. |
| **src/utils/** | Logger, retries, file I/O. |
| **src/fixtures/** | Playwright fixtures (e.g. `homePage`) and static data files. All tests import `test` from here. |
| **src/hooks/** | Global before/after, custom reporters. |
| **tests/crdc/** | CRDC Submission Portal UI specs (Option B: per-app). |
| **tests/sts/** | STS UI specs (Option B: per-app). |
| **tests/smoke/** | Fast critical-path suite; run on every commit; uses default baseURL. |
| **tests/integration/** | Cross-layer or E2E flows. |
| **scripts/** | `run-smoke.sh`, `run-regression.sh` for CI. |
