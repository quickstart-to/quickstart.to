---
title: "Cypress"
description: "Starten Sie mit Cypress E2E-Tests in 5 Minuten"
template: "tool"
tags: ["testing", "e2e", "javascript"]
---

## TL;DR

**Was**: JavaScript End-to-End Test-Framework für Webanwendungen.

**Warum**: Schnell, zuverlässig, echte Browser-Tests, Time-Travel-Debugging, automatisches Warten.

## Quick Start

**Installation**:
```bash
npm install cypress --save-dev
npx cypress open
```

**Test erstellen** (`cypress/e2e/spec.cy.js`):
```javascript
describe('My First Test', () => {
  it('visits the app', () => {
    cy.visit('https://example.com')
    cy.contains('Example Domain')
  })
})
```

**Tests ausführen**:
```bash
npx cypress run          # Headless
npx cypress open         # Interaktiv
```

## Cheatsheet

| Befehl | Beschreibung |
|---------|-------------|
| `cy.visit(url)` | Zu URL navigieren |
| `cy.get(selector)` | Element auswählen |
| `cy.contains(text)` | Nach Text suchen |
| `cy.click()` | Element klicken |
| `cy.type(text)` | In Input eingeben |
| `cy.should(assertion)` | Assertion |
| `cy.intercept()` | Netzwerk mocken |

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
// Sichtbarkeit
cy.get('.element').should('be.visible')
cy.get('.element').should('not.exist')

// Inhalt
cy.get('.title').should('have.text', 'Hello')
cy.get('.title').should('contain', 'Hello')

// Attribute
cy.get('input').should('have.value', 'text')
cy.get('a').should('have.attr', 'href', '/page')
cy.get('.active').should('have.class', 'selected')

// Zustand
cy.get('input').should('be.disabled')
cy.get('checkbox').should('be.checked')

// Länge
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

// Im Test
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

- [Cypress Dokumentation](https://docs.cypress.io/) - Offizielle Docs
- [Best Practices](https://docs.cypress.io/guides/references/best-practices) - Richtlinien
- [Cypress Beispiele](https://github.com/cypress-io/cypress-example-recipes) - Rezepte
- [Cypress Dashboard](https://www.cypress.io/dashboard) - CI-Integration
