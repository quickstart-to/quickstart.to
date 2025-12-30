---
title: "Cypress"
description: "Comienza con pruebas E2E de Cypress en 5 minutos"
template: "tool"
tags: ["testing", "e2e", "javascript"]
---

## TL;DR

**Qué**: Framework de pruebas end-to-end en JavaScript para aplicaciones web.

**Por qué**: Rápido, confiable, pruebas en navegador real, depuración time-travel, espera automática.

## Quick Start

**Instalación**:
```bash
npm install cypress --save-dev
npx cypress open
```

**Crear test** (`cypress/e2e/spec.cy.js`):
```javascript
describe('My First Test', () => {
  it('visits the app', () => {
    cy.visit('https://example.com')
    cy.contains('Example Domain')
  })
})
```

**Ejecutar tests**:
```bash
npx cypress run          # Headless
npx cypress open         # Interactivo
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `cy.visit(url)` | Navegar a URL |
| `cy.get(selector)` | Seleccionar elemento |
| `cy.contains(text)` | Encontrar por texto |
| `cy.click()` | Hacer clic en elemento |
| `cy.type(text)` | Escribir en input |
| `cy.should(assertion)` | Assertion |
| `cy.intercept()` | Mockear red |

## Gotchas

### Common interactions

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

### Assertions

```javascript
// Visibilidad
cy.get('.element').should('be.visible')
cy.get('.element').should('not.exist')

// Contenido
cy.get('.title').should('have.text', 'Hello')
cy.get('.title').should('contain', 'Hello')

// Atributos
cy.get('input').should('have.value', 'text')
cy.get('a').should('have.attr', 'href', '/page')
cy.get('.active').should('have.class', 'selected')

// Estado
cy.get('input').should('be.disabled')
cy.get('checkbox').should('be.checked')

// Longitud
cy.get('li').should('have.length', 5)
cy.get('li').should('have.length.gt', 3)
```

### Network mocking

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

### Custom commands

```javascript
// cypress/support/commands.js
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('[data-cy=email]').type(email)
  cy.get('[data-cy=password]').type(password)
  cy.get('[data-cy=submit]').click()
})

// En el test
cy.login('user@example.com', 'password123')
```

### Configuration

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

- [Documentación de Cypress](https://docs.cypress.io/) - Docs oficiales
- [Mejores prácticas](https://docs.cypress.io/guides/references/best-practices) - Guías
- [Ejemplos de Cypress](https://github.com/cypress-io/cypress-example-recipes) - Recetas
- [Cypress Dashboard](https://www.cypress.io/dashboard) - Integración CI
