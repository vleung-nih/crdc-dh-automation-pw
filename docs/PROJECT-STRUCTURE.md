# Project structure

Directory layout and responsibility of each folder.

## Tree

```
playwright-framework-vl/
├── .cursor/
│   └── rules/
│       └── sdet-framework-standards.md   # SDET/cursor rules (always reference)
├── config/
│   ├── env/                             # Environment-specific config (TEST_ENV)
│   │   ├── index.ts                     # Loader by TEST_ENV
│   │   ├── prod.ts                      # CRDC hub production (default)
│   │   ├── qa.ts                        # CRDC hub QA
│   │   ├── stage.ts                     # CRDC hub stage
│   │   └── qa2.ts                       # CRDC hub QA2
│   └── constants.ts                     # Timeouts, no magic numbers
├── src/
│   ├── pages/                           # Page Object Model classes
│   │   └── base.page.ts                 # Base class for all pages
│   ├── components/                      # Reusable UI components (modals, nav)
│   ├── api/                             # API client wrappers (optional)
│   ├── data/                            # Test data factories, builders
│   ├── utils/                           # Helpers: logger, waits, file I/O
│   ├── fixtures/
│   │   ├── test.fixture.ts              # Custom Playwright fixtures
│   │   └── static/                      # JSON/CSV test data (no secrets)
│   └── hooks/                           # Global setup/teardown
├── tests/
│   ├── ui/                              # UI tests by feature
│   ├── smoke/                           # Critical path smoke tests
│   └── integration/                     # Cross-layer / E2E
├── reports/                             # Generated reports (gitignored)
├── scripts/                             # CI helper scripts
├── docs/                                # This documentation
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── .env.example
└── README.md
```

## Responsibilities

| Folder / file | Purpose |
|---------------|---------|
| **config/** | All environment-specific values and timeouts. No env branching inside tests; use config injection. |
| **config/constants.ts** | `ELEMENT_TIMEOUT`, `PAGE_LOAD_TIMEOUT`, etc. Single source for timeouts. |
| **config/env/** | Per-environment baseURL and flags. Loaded by `TEST_ENV`. |
| **src/pages/** | One class per page; locators and interactions only; no assertions. |
| **src/components/** | Reusable UI fragments (header, modals) used by pages. |
| **src/api/** | Typed API clients for setup or assertions (optional). |
| **src/data/** | Test data builders and constants. |
| **src/utils/** | Logger, retries, file I/O. |
| **src/fixtures/** | Playwright fixtures (e.g. authenticated context) and static data files. |
| **src/hooks/** | Global before/after, custom reporters. |
| **tests/ui/** | UI test specs organized by feature. |
| **tests/smoke/** | Fast critical-path suite; run on every commit. |
| **tests/integration/** | Cross-layer or E2E flows. |
| **scripts/** | `run-smoke.sh`, `run-regression.sh` for CI. |
