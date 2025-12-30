---
title: "Playwright"
description: "Comienza con pruebas de Playwright en 5 minutos"
template: "tool"
tags: ["testing", "e2e", "automation"]
---

## TL;DR

**Qué**: Biblioteca de automatización cross-browser de Microsoft para pruebas web.

**Por qué**: Multi-navegador, rápido, confiable, auto-waiting, depuración potente, codegen.

## Quick Start

**Instalar**:
```bash
npm init playwright@latest
```

**Crear test** (`tests/example.spec.ts`):
```typescript
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

**Ejecutar tests**:
```bash
npx playwright test              # Run all tests
npx playwright test --ui         # Interactive UI
npx playwright test --headed     # With browser
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `page.goto(url)` | Navegar a URL |
| `page.locator(selector)` | Encontrar elemento |
| `page.click(selector)` | Hacer clic en elemento |
| `page.fill(selector, text)` | Escribir texto |
| `expect(locator).toBeVisible()` | Verificar visibilidad |
| `page.screenshot()` | Tomar captura de pantalla |

## Gotchas

### Locators e interacciones

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

### Mocking de API

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

### Múltiples navegadores

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

### Generación de código

```bash
npx playwright codegen https://example.com
```

## Next Steps

- [Playwright Documentation](https://playwright.dev/docs/intro) - Documentación oficial
- [Playwright Test Generator](https://playwright.dev/docs/codegen) - Codegen
- [Trace Viewer](https://playwright.dev/docs/trace-viewer) - Depuración
- [Best Practices](https://playwright.dev/docs/best-practices) - Buenas prácticas
