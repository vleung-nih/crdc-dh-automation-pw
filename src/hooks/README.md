# Hooks

Global setup and teardown hooks, and custom reporters.

## Usage

- **Global setup**: One-time actions before all tests run (e.g. seeding test data, authenticating).
- **Global teardown**: Cleanup actions after all tests complete.
- **Custom reporters**: Additional reporting logic beyond Playwright's built-in reporters.

## Example: globalSetup

Create a `global-setup.ts` file here and reference it in `playwright.config.ts`:

```typescript
// src/hooks/global-setup.ts
import { FullConfig } from '@playwright/test';

export default async function globalSetup(config: FullConfig): Promise<void> {
  // Seed test data, authenticate, etc.
}
```

```typescript
// playwright.config.ts
export default defineConfig({
  globalSetup: './src/hooks/global-setup.ts',
  // ...
});
```
