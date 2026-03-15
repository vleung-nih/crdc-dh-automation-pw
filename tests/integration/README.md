# Integration Tests

Cross-feature and end-to-end test flows that exercise multiple pages/services together.

## When to write integration tests

- When a user journey spans multiple pages (e.g. login → submit data → view confirmation).
- When you need to verify cross-service behavior (API + UI together).
- When the test validates a complete business workflow, not just a single page.

## Conventions

- Each spec file covers one end-to-end flow or feature area.
- Use `test.describe` to group related steps.
- Use page objects for all UI interactions.
- Use API clients (from `src/api/`) for setup/teardown when possible — avoid UI-based precondition setup.

## Example

```typescript
import { test, expect } from '../../src/fixtures/test.fixture';

test.describe('Data Submission Workflow', () => {
  test('should submit data and see confirmation', async ({ page, homePage }) => {
    // Login
    // Navigate to submission form
    // Fill and submit
    // Verify confirmation page
  });
});
```
