# Framework Architecture & Code Quality Analysis

**Note:** This doc is a snapshot; several findings have since been addressed (fixture injection, `getBaseURL(project)` only, Option B layout `tests/crdc/` and `tests/sts/`, multi-project support). See **MULTI-PROJECT-EXTENSIBILITY-PLAN.md** and current **PROJECT-STRUCTURE.md** for up-to-date layout and config.

## Overview

This is a **Playwright + TypeScript** UI test automation framework targeting the CRDC Submission Portal and other apps (e.g. STS). The project uses **multi-project, multi-environment** config (`config/apps.ts`, `getBaseURL(project)`), **Option B** per-app test layout (`tests/crdc/`, `tests/sts/`), and a minimal shared fixture with app-specific page objects where needed.

---

## What's Done Well ✅

### Architecture & Structure
- **Clean layer separation**: `config/` → `src/` → `tests/` follows industry-standard patterns. Config, page objects, and test logic are properly decoupled.
- **Page Object Model**: [BasePage](file:///Users/vleung1/Development/crdc-dh-automation-pw/src/pages/base.page.ts#8-24) → [HomePage](file:///Users/vleung1/Development/crdc-dh-automation-pw/src/pages/home.page.ts#9-155) inheritance is correct. Locators are `private readonly`, methods don't assert — this matches best practices from Google, Microsoft, and Playwright's own docs.
- **Environment management**: Multi-environment config ([prod](file:///Users/vleung1/Development/crdc-dh-automation-pw/config/env/index.ts#11-12), [qa](file:///Users/vleung1/Development/crdc-dh-automation-pw/config/env/index.ts#12-13), [stage](file:///Users/vleung1/Development/crdc-dh-automation-pw/config/env/index.ts#13-14), [qa2](file:///Users/vleung1/Development/crdc-dh-automation-pw/config/env/index.ts#14-15)) with dynamic loading via `TEST_ENV` and `BASE_URL` override is well-architected.
- **No magic numbers**: Timeouts centralized in [constants.ts](file:///Users/vleung1/Development/crdc-dh-automation-pw/config/constants.ts) and referenced by config. This is exactly right.

### Code Quality
- **User-facing locators**: `getByRole`, `getByText`, `getByTestId` used throughout — no brittle CSS/XPath selectors.
- **TypeScript strict mode**: `strict: true` in tsconfig, `@typescript-eslint/no-floating-promises: 'error'` in ESLint — prevents a common class of async bugs.
- **Clear JSDoc comments**: Every public method and class has documentation explaining purpose and behavior.
- **Well-structured test file**: `tests/crdc/crdc-homepage.spec.ts` uses `beforeEach` for shared setup, each test is independent, fresh context for dialog test, descriptive names. (Layout: Option B per-app dirs; see MULTI-PROJECT-EXTENSIBILITY-PLAN.md.)

### Documentation
- **Excellent onboarding doc**: [FRAMEWORK-ONBOARDING.md](file:///Users/vleung1/Development/crdc-dh-automation-pw/docs/FRAMEWORK-ONBOARDING.md) explains not just _what_ but _why_ for each design decision. Includes async/await explanation for junior QA engineers. This is unusually thorough for a test framework.
- **Conventions documented**: Naming, POM rules, locator strategy, waits, test data, assertions all codified.
- **README** is concise with quick-start and links to deeper docs.

### Tooling
- **ESLint with TS parser and type-aware rules**: Flat config format (ESLint 9). `no-floating-promises` is critical for Playwright.
- **Path aliases**: `@pages/*`, `@fixtures/*`, etc. in tsconfig for clean imports.
- **.gitignore** is comprehensive (test-results, reports, env files, IDE, OS files).

---

## Issues & Gaps 🔴🟡🟢

### 🔴 Critical Issues (Must Fix)

#### 1. Custom Fixtures Are Not Used
[test.fixture.ts](file:///Users/vleung1/Development/crdc-dh-automation-pw/src/fixtures/test.fixture.ts) defines a custom `test` export, but **no test file imports from it**. Both spec files import `test` and `expect` directly from `@playwright/test`. This defeats the purpose of having fixtures.

**Why it matters**: When you add a `homePage` fixture (which you should), tests that don't import from [test.fixture.ts](file:///Users/vleung1/Development/crdc-dh-automation-pw/src/fixtures/test.fixture.ts) won't receive it. This is the #1 scaling bottleneck.

**Fix**: All test files should `import { test, expect } from '../../src/fixtures/test.fixture';` — and the fixture should inject `homePage` (and future page objects) so tests don't manually construct `new HomePage(page)`.

```typescript
// src/fixtures/test.fixture.ts — recommended
import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home.page';

type Fixtures = {
  homePage: HomePage;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export { expect } from '@playwright/test';
```

#### 2. Conventions Document Contradicts Actual Code
[CONVENTIONS.md](file:///Users/vleung1/Development/crdc-dh-automation-pw/docs/CONVENTIONS.md) says page objects should "**never expose raw Playwright locators/elements**" and methods should "return the next page object or a meaningful value." But [HomePage](file:///Users/vleung1/Development/crdc-dh-automation-pw/src/pages/home.page.ts#9-155) exposes 13 getter methods that return raw `Locator` objects (e.g. [getMainHeading()](file:///Users/vleung1/Development/crdc-dh-automation-pw/src/pages/home.page.ts#130-133), [getNavLogin()](file:///Users/vleung1/Development/crdc-dh-automation-pw/src/pages/home.page.ts#127-130)). This is a fundamental contract violation.

**Options** (pick one and enforce it):
- **Option A**: Update the convention to explicitly allow getter-based locator exposure (this is actually Playwright's idiomatic pattern).
- **Option B**: Change getters to return semantic values (`boolean`, `string`) and move checks into page methods.

> [!IMPORTANT]
> I recommend **Option A** — Playwright's design intentionally allows locators to be asserted with `expect(locator).toBeVisible()`. This differs from Selenium's WebElement pattern. The convention doc should explicitly state Playwright locator getters are acceptable.

#### 3. `tests/integration/` Is Empty — No Integration Test Strategy
The directory exists but has no tests and no `.gitkeep`. The onboarding doc describes it, the project structure references it, but there is zero guidance on what an integration test looks like in this framework vs a UI test.

#### 4. Multiple Empty Source Directories With No Guidance
`src/components/`, `src/api/`, `src/data/`, `src/hooks/` — all empty, no `.gitkeep`, no README stubs. At enterprise standards, either:
- Add `.gitkeep` + stub README explaining when/how to populate, or
- Remove them and add when needed (YAGNI — your own SDET standards say this)

---

### 🟡 Significant Issues (Should Fix)

#### 5. `HomePage` Instantiated Redundantly in Every Test — **Resolved**
*(Originally:* In the CRDC spec, `beforeEach` and each test both created a `HomePage` instance. *)* **Resolved:** The suite at `tests/crdc/crdc-homepage.spec.ts` now uses a fixture-injected `homePage` from `src/fixtures/test.fixture.ts`.

#### 6. No CI Pipeline Configuration
The SDET standards doc describes a full pipeline (`Build → Lint → Unit → API → Smoke → Regression → Report`), and the scripts reference CI, but there is no actual CI config (no `.github/workflows/`, no `Jenkinsfile`, no `azure-pipelines.yml`). For a framework at enterprise standards, CI must be codified, not just documented.

#### 7. Logger Is Never Used
[logger.ts](file:///Users/vleung1/Development/crdc-dh-automation-pw/src/utils/logger.ts) is well-written but **never imported or called** anywhere in the codebase. The SDET standards require structured logging, but no test or page object uses it.

#### 8. Env Config Loader / URL Resolution — **Resolved**
*(Originally:* Async `loadConfig()` unused; config used `getCrdcBaseURL()` from urls.ts. *)* **Resolved:** Config now uses a single resolver: `getBaseURL(project)` in `config/apps.ts` (re-exported from `config/env/urls.ts`). No `getCrdcBaseURL`; all projects use `getBaseURL('crdc')`, `getBaseURL('sts')`, etc. See MULTI-PROJECT-EXTENSIBILITY-PLAN.md.

#### 9. `tsconfig.json` Module Setting Mismatch
`"module": "commonjs"` is set, but the project uses ESM features (top-level `import`, `import.meta.dirname` in eslint config). Playwright handles TS compilation internally, so this hasn't caused errors yet, but it could break if you run `tsc` for type-checking or build other tools. Consider `"module": "ESNext"` or `"module": "Node16"`.

#### 10. `PAGE_LOAD_TIMEOUT` Defined But Never Used
[constants.ts](file:///Users/vleung1/Development/crdc-dh-automation-pw/config/constants.ts) exports `PAGE_LOAD_TIMEOUT` and `API_RESPONSE_TIMEOUT`, but neither is referenced anywhere. Dead code violates YAGNI.

#### 11. Shell Scripts Lack Robustness
- No `#!/usr/bin/env bash` guard for argument validation
- No error messaging on failure
- No color output for CI readability
- Both scripts are nearly identical — could be a single parameterized script

#### 12. Smoke Test Is a Placeholder
[smoke.spec.ts](file:///Users/vleung1/Development/crdc-dh-automation-pw/tests/smoke/smoke.spec.ts) asserts `toHaveTitle(/Playwright/)` which only works against `playwright.dev`, not the actual CRDC app. This is not a real smoke test — it's a leftover scaffolding artifact.

#### 13. Placeholder / Example Specs — **Resolved**
*(Originally:* `tests/ui/example.spec.ts` was a placeholder. *)* **Resolved:** No placeholder example spec. App specs live under `tests/crdc/` and `tests/sts/` (Option B per-app layout); see MULTI-PROJECT-EXTENSIBILITY-PLAN.md.

---

### 🟢 Minor / Nice-to-Have

#### 14. Missing `globalSetup` / `globalTeardown`
Playwright supports `globalSetup` for one-time auth, data seeding, etc. The framework documents `src/hooks/` for this but doesn't implement it. Worth adding a stub with a documented pattern.

#### 15. No Tagging/Annotation Strategy for Traceability
The SDET standards require tests to be traceable to requirements. There are no `@tag` annotations, no test IDs, no Jira/requirement references. Consider using Playwright's `test.describe` tags or annotations.

#### 16. No `.editorconfig` or Prettier
For team consistency across IDEs, an `.editorconfig` and/or Prettier config would be standard.

#### 17. Path Aliases Not Tested at Runtime
`tsconfig.json` defines path aliases (`@pages/*`, `@config/*`, etc.) but **no code uses them** — all imports use relative paths. Either use them consistently or remove them to avoid confusion.

#### 18. `types.ts` in `config/env/` Is Minimal
`EnvConfig` only has `baseURL` and `envName`. At enterprise scale, this should include fields like `apiBaseURL`, `authProvider`, `featureFlags`, `timeoutOverrides`, etc. — or at least document when to extend it.

---

## Scorecard

| Category | Score | Notes |
|----------|-------|-------|
| **Architecture & Structure** | 8/10 | Excellent scaffolding and layering. Loses points for empty dirs and unused systems. |
| **Code Quality** | 7/10 | Clean TypeScript, good locator strategy. Loses points for dead code, redundant instantiation, unused fixtures. |
| **Documentation** | 9/10 | Outstanding — onboarding doc is best-in-class. Minor inconsistency with convention vs. code. |
| **Testability & Coverage** | 5/10 | Only 1 real test suite. Placeholder smoke/example tests. No integration tests. |
| **CI/CD Readiness** | 4/10 | Scripts exist but no pipeline config. No automated linting/typecheck enforcement. |
| **Maintainability** | 7/10 | Good patterns in place, but fixture non-usage and dual config systems will cause friction at scale. |
| **Extensibility** | 7/10 | Clear extension points documented. Missing concrete stubs/examples for components, API, hooks. |
| **Overall** | **6.7/10** | Solid foundation with excellent docs. Needs cleanup of dead code, fixture wiring, and real CI to reach enterprise quality. |

---

## Priority Action Items

1. **Wire up fixtures** — Make `test.fixture.ts` inject `homePage` and update all specs to import from it.
2. **Remove dead code** — Delete `example.spec.ts`, unused constants, and either use or remove the async env loader.
3. **Fix smoke test** — Replace the `playwright.dev` placeholder with a real CRDC smoke health check.
4. **Resolve convention vs. code conflict** — Update CONVENTIONS.md to explicitly allow Playwright locator getters.
5. **Add CI pipeline** — GitHub Actions workflow for lint + typecheck + smoke on PR, regression on merge/schedule.
6. **Clean empty directories** — Either add `.gitkeep` + README stubs, or remove until needed.
7. **Eliminate redundant `HomePage` construction** — Use fixture injection or describe-scoped variable.
8. **Use the logger** — Integrate it into page object methods or test hooks per SDET standards.
