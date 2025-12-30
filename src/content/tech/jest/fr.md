---
title: "Jest"
description: "Démarrez avec le framework de test Jest en 5 minutes"
template: "tool"
tags: ["testing", "javascript", "frontend"]
---

## TL;DR

**Quoi** : Un framework de test JavaScript agréable avec zéro configuration.

**Pourquoi** : Rapide, tests par snapshot, excellent mocking, couverture intégrée, largement adopté.

## Quick Start

**Installation** :
```bash
npm install --save-dev jest
```

**Ajouter à package.json** :
```json
{
  "scripts": {
    "test": "jest"
  }
}
```

**Créer un fichier de test** (`sum.test.js`) :
```javascript
const sum = (a, b) => a + b;

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

**Exécuter les tests** :
```bash
npm test
```

## Cheatsheet

| Matcher | Description |
|---------|-------------|
| `toBe(value)` | Égalité exacte |
| `toEqual(obj)` | Égalité profonde |
| `toBeTruthy()` | Valeur truthy |
| `toBeNull()` | Vérification null |
| `toContain(item)` | Array contient |
| `toThrow()` | Lance une erreur |
| `toHaveBeenCalled()` | Mock a été appelé |

## Gotchas

### Async testing

```javascript
// Async/await
test('fetches data', async () => {
  const data = await fetchData();
  expect(data).toBe('data');
});

// Promises
test('resolves to data', () => {
  return expect(fetchData()).resolves.toBe('data');
});
```

### Mocking

```javascript
// Fonction mock
const mockFn = jest.fn();
mockFn.mockReturnValue(42);
mockFn.mockResolvedValue('async result');

// Mock de module
jest.mock('./api', () => ({
  fetchUser: jest.fn().mockResolvedValue({ name: 'John' })
}));
```

### Snapshot testing

```javascript
test('renders correctly', () => {
  const tree = renderer.create(<Button>Click</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});
```

### Setup and teardown

```javascript
beforeAll(() => { /* Exécuter une fois avant tous les tests */ });
afterAll(() => { /* Exécuter une fois après tous les tests */ });
beforeEach(() => { /* Exécuter avant chaque test */ });
afterEach(() => { /* Exécuter après chaque test */ });
```

## Next Steps

- [Documentation Jest](https://jestjs.io/docs/getting-started) - Docs officielles
- [Tester React](https://jestjs.io/docs/tutorial-react) - Tests React
- [Fonctions Mock](https://jestjs.io/docs/mock-functions) - Guide de mocking
- [Jest Cheat Sheet](https://github.com/sapegin/jest-cheat-sheet) - Référence rapide
