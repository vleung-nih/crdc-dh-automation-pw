# Components

Reusable UI component page objects (modals, headers, navbars, tables, etc.).

Each component is a class that receives a `Page` or `Locator` and encapsulates
the locator/interaction logic for a reusable UI fragment. Pages compose components;
tests assert on the results.

## When to create a component

- When the same UI element appears on multiple pages (e.g. site header, footer, data table).
- When a modal/dialog has enough complexity to warrant its own class.

## Example

```typescript
import type { Page } from '@playwright/test';

export class SiteHeader {
  private readonly logo = this.page.getByRole('link', { name: 'Home' });
  private readonly userMenu = this.page.getByTestId('user-menu');

  constructor(private readonly page: Page) {}

  async clickLogo(): Promise<void> {
    await this.logo.click();
  }

  getUserMenu() {
    return this.userMenu;
  }
}
```
