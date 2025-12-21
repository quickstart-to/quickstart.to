---
title: "Playwright"
description: "5 分钟快速入门 Playwright 测试"
tags: ["testing", "e2e", "automation"]
---

## TL;DR

**是什么**：微软开发的跨浏览器 Web 自动化测试库。

**为什么用**：多浏览器、快速、可靠、自动等待、强大调试、代码生成。

## Quick Start

**安装**：
```bash
npm init playwright@latest
```

**创建测试**（`tests/example.spec.ts`）：
```typescript
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

**运行测试**：
```bash
npx playwright test              # 运行所有测试
npx playwright test --ui         # 交互式 UI
npx playwright test --headed     # 显示浏览器
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `page.goto(url)` | 导航到 URL |
| `page.locator(selector)` | 查找元素 |
| `page.click(selector)` | 点击元素 |
| `page.fill(selector, text)` | 输入文本 |
| `expect(locator).toBeVisible()` | 断言可见 |
| `page.screenshot()` | 截图 |

## Gotchas

### 定位器和交互

```typescript
import { test, expect } from '@playwright/test';

test('user login', async ({ page }) => {
  await page.goto('/login');

  // 各种定位策略
  await page.locator('[data-testid="email"]').fill('user@example.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Login' }).click();

  // 等待导航
  await page.waitForURL('/dashboard');

  // 断言内容
  await expect(page.getByText('Welcome')).toBeVisible();
});
```

### 断言

```typescript
// 元素断言
await expect(page.locator('.title')).toBeVisible();
await expect(page.locator('.item')).toHaveCount(5);
await expect(page.locator('input')).toHaveValue('text');
await expect(page.locator('button')).toBeEnabled();

// 页面断言
await expect(page).toHaveTitle('My App');
await expect(page).toHaveURL(/dashboard/);

// 文本断言
await expect(page.locator('.message')).toHaveText('Hello');
await expect(page.locator('.message')).toContainText('Hello');
```

### API Mock

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

### 多浏览器

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

### 页面对象模型

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

### 代码生成

```bash
npx playwright codegen https://example.com
```

## Next Steps

- [Playwright 文档](https://playwright.dev/docs/intro) - 官方文档
- [Playwright 代码生成](https://playwright.dev/docs/codegen) - Codegen
- [Trace Viewer](https://playwright.dev/docs/trace-viewer) - 调试
- [最佳实践](https://playwright.dev/docs/best-practices) - 指南
