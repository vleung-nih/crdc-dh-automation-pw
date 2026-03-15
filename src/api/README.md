# API Clients

Typed API client wrappers for setup, teardown, and API-layer test assertions.

## When to use

- **Test setup/teardown**: Create test data or clean up state via API instead of UI.
- **API tests**: Validate status codes, response schemas, and business logic.
- **Hybrid tests**: Use API calls to set preconditions, then verify via UI.

## Structure

```
api/
├── clients/          # One client per service/resource (e.g. UserApiClient)
├── models/           # Request/response types
└── README.md
```

## Example

```typescript
import { APIRequestContext } from '@playwright/test';

export class UserApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async createUser(payload: CreateUserRequest): Promise<UserResponse> {
    const response = await this.request.post('/api/users', { data: payload });
    return response.json();
  }
}
```
