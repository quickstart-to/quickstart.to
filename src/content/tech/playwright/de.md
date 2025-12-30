---
title: "Playwright"
description: "Cross-Browser E2E-Tests - Auto-Wait, Trace-Viewer, Tests auf Chromium, Firefox und WebKit"
template: "tool"
tags: ["testing", "e2e", "automation"]
---

## TL;DR

**Was**: Cross-Browser-Automatisierungsbibliothek von Microsoft für Web-Tests.

**Warum**: Multi-Browser, schnell, zuverlässig, Auto-Waiting, leistungsstarkes Debugging, Codegen.

## Quick Start

**Installieren**:
```bash
npm init playwright@latest
```

**Test erstellen** (`tests/example.spec.ts`):
```typescript
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

**Tests ausführen**:
```bash
npx playwright test              # Run all tests
npx playwright test --ui         # Interactive UI
npx playwright test --headed     # With browser
```

## Cheatsheet

| Befehl | Beschreibung |
|---------|-------------|
| `page.goto(url)` | Zu URL navigieren |
| `page.locator(selector)` | Element finden |
| `page.click(selector)` | Element klicken |
| `page.fill(selector, text)` | Text eingeben |
| `expect(locator).toBeVisible()` | Sichtbarkeit prüfen |
| `page.screenshot()` | Screenshot machen |

## Gotchas

### Locators und Interaktionen

```typescript
import { test, expect } from '@playwright/test';

test('user login', async ({ page }) => {
  await page.goto('/login');

  // Various locator strategies
  await page.locator('[data-testid="email"]').fill('user@example.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for navigation
  await page.waitForURL('/dashboard');

  // Assert content
  await expect(page.getByText('Welcome')).toBeVisible();
});
```

### Assertions

```typescript
// Element assertions
await expect(page.locator('.title')).toBeVisible();
await expect(page.locator('.item')).toHaveCount(5);
await expect(page.locator('input')).toHaveValue('text');
await expect(page.locator('button')).toBeEnabled();

// Page assertions
await expect(page).toHaveTitle('My App');
await expect(page).toHaveURL(/dashboard/);

// Text assertions
await expect(page.locator('.message')).toHaveText('Hello');
await expect(page.locator('.message')).toContainText('Hello');
```

### API-Mocking

```typescript
test('mock API', async ({ page }) => {
  await page.route('**/api/users', async route => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify([{ id: 1, name: 'John' }])
    });
  });

  await page.goto('/users');
  await expect(page.locator('.user')).toHaveCount(1);
});

test('intercept and modify', async ({ page }) => {
  await page.route('**/api/data', async route => {
    const response = await route.fetch();
    const json = await response.json();
    json.modified = true;
    await route.fulfill({ response, json });
  });
});
```

### Mehrere Browser

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
  ],
});
```

### Page Object Model

```typescript
// pages/login.page.ts
export class LoginPage {
  constructor(private page: Page) {}

  async login(email: string, password: string) {
    await this.page.goto('/login');
    await this.page.locator('[data-testid="email"]').fill(email);
    await this.page.locator('[data-testid="password"]').fill(password);
    await this.page.locator('[data-testid="submit"]').click();
  }
}

// tests/login.spec.ts
test('login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('user@example.com', 'password');
  await expect(page).toHaveURL('/dashboard');
});
```

### Code-Generierung

```bash
npx playwright codegen https://example.com
```

## Next Steps

- [Playwright Documentation](https://playwright.dev/docs/intro) - Offizielle Dokumentation
- [Playwright Test Generator](https://playwright.dev/docs/codegen) - Codegen
- [Trace Viewer](https://playwright.dev/docs/trace-viewer) - Debugging
- [Best Practices](https://playwright.dev/docs/best-practices) - Richtlinien
