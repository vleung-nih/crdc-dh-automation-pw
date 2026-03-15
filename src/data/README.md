# Test Data

Test data factories, builders, and domain constants.

## Guidelines

- **Never hardcode test data inside test methods.** Use factories or data files.
- **Sensitive data** (passwords, tokens) must come from environment variables or a secrets manager.
- **Static data files** (JSON, CSV) go in `src/fixtures/static/`.
- **Dynamic data builders** and factory functions go here.

## Example: Data builder

```typescript
export function buildSubmissionRequest(overrides?: Partial<SubmissionRequest>): SubmissionRequest {
  return {
    title: 'Test Submission',
    dataType: 'Genomic',
    status: 'draft',
    ...overrides,
  };
}
```
