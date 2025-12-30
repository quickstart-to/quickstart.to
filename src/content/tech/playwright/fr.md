---
title: "Playwright"
description: "Démarrez avec les tests Playwright en 5 minutes"
template: "tool"
tags: ["testing", "e2e", "automation"]
---

## TL;DR

**Quoi** : Bibliothèque d'automatisation cross-browser par Microsoft pour les tests web.

**Pourquoi** : Multi-navigateur, rapide, fiable, auto-waiting, débogage puissant, codegen.

## Quick Start

**Installer** :
```bash
npm init playwright@latest
```

**Créer un test** (`tests/example.spec.ts`) :
```typescript
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

**Exécuter les tests** :
```bash
npx playwright test              # Run all tests
npx playwright test --ui         # Interactive UI
npx playwright test --headed     # With browser
```

## Cheatsheet

| Commande | Description |
|---------|-------------|
| `page.goto(url)` | Naviguer vers l'URL |
| `page.locator(selector)` | Trouver un élément |
| `page.click(selector)` | Cliquer sur un élément |
| `page.fill(selector, text)` | Saisir du texte |
| `expect(locator).toBeVisible()` | Vérifier la visibilité |
| `page.screenshot()` | Prendre une capture d'écran |

## Gotchas

### Locators et interactions

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

### Mocking d'API

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

### Navigateurs multiples

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

### Génération de code

```bash
npx playwright codegen https://example.com
```

## Next Steps

- [Playwright Documentation](https://playwright.dev/docs/intro) - Documentation officielle
- [Playwright Test Generator](https://playwright.dev/docs/codegen) - Codegen
- [Trace Viewer](https://playwright.dev/docs/trace-viewer) - Débogage
- [Best Practices](https://playwright.dev/docs/best-practices) - Bonnes pratiques
