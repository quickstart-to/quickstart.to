---
title: "Cypress"
description: "5 分钟快速入门 Cypress E2E 测试"
template: "tool"
tags: ["testing", "e2e", "javascript"]
---

## TL;DR

**是什么**：用于 Web 应用的 JavaScript 端到端测试框架。

**为什么用**：快速、可靠、真实浏览器测试、时间旅行调试、自动等待。

## Quick Start

**安装**：
```bash
npm install cypress --save-dev
npx cypress open
```

**创建测试**（`cypress/e2e/spec.cy.js`）：
```javascript
describe('My First Test', () => {
  it('visits the app', () => {
    cy.visit('https://example.com')
    cy.contains('Example Domain')
  })
})
```

**运行测试**：
```bash
npx cypress run          # 无头模式
npx cypress open         # 交互模式
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `cy.visit(url)` | 导航到 URL |
| `cy.get(selector)` | 选择元素 |
| `cy.contains(text)` | 按文本查找 |
| `cy.click()` | 点击元素 |
| `cy.type(text)` | 输入文本 |
| `cy.should(assertion)` | 断言 |
| `cy.intercept()` | Mock 网络请求 |

## Gotchas

### 常见交互

```javascript
describe('User interactions', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('logs in successfully', () => {
    cy.get('[data-cy=email]').type('user@example.com')
    cy.get('[data-cy=password]').type('password123')
    cy.get('[data-cy=submit]').click()

    cy.url().should('include', '/dashboard')
    cy.get('.welcome').should('contain', 'Welcome')
  })

  it('shows error for invalid credentials', () => {
    cy.get('[data-cy=email]').type('wrong@example.com')
    cy.get('[data-cy=password]').type('wrongpass')
    cy.get('[data-cy=submit]').click()

    cy.get('.error').should('be.visible')
  })
})
```

### 断言

```javascript
// 可见性
cy.get('.element').should('be.visible')
cy.get('.element').should('not.exist')

// 内容
cy.get('.title').should('have.text', 'Hello')
cy.get('.title').should('contain', 'Hello')

// 属性
cy.get('input').should('have.value', 'text')
cy.get('a').should('have.attr', 'href', '/page')
cy.get('.active').should('have.class', 'selected')

// 状态
cy.get('input').should('be.disabled')
cy.get('checkbox').should('be.checked')

// 长度
cy.get('li').should('have.length', 5)
cy.get('li').should('have.length.gt', 3)
```

### 网络 Mock

```javascript
describe('API mocking', () => {
  it('mocks API response', () => {
    cy.intercept('GET', '/api/users', {
      statusCode: 200,
      body: [{ id: 1, name: 'John' }]
    }).as('getUsers')

    cy.visit('/users')
    cy.wait('@getUsers')

    cy.get('.user').should('have.length', 1)
  })

  it('handles API errors', () => {
    cy.intercept('POST', '/api/submit', {
      statusCode: 500,
      body: { error: 'Server error' }
    })

    cy.get('[data-cy=submit]').click()
    cy.get('.error').should('contain', 'Server error')
  })
})
```

### 自定义命令

```javascript
// cypress/support/commands.js
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('[data-cy=email]').type(email)
  cy.get('[data-cy=password]').type(password)
  cy.get('[data-cy=submit]').click()
})

// 在测试中使用
cy.login('user@example.com', 'password123')
```

### 配置

```javascript
// cypress.config.js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true
  }
})
```

## Next Steps

- [Cypress 文档](https://docs.cypress.io/) - 官方文档
- [最佳实践](https://docs.cypress.io/guides/references/best-practices) - 指南
- [Cypress 示例](https://github.com/cypress-io/cypress-example-recipes) - 食谱
- [Cypress Dashboard](https://www.cypress.io/dashboard) - CI 集成
