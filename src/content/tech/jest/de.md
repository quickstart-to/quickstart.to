---
title: "Jest"
description: "JavaScript-Testframework - Zero-Config, Snapshots, Mocking und Code-Coverage sofort einsatzbereit"
template: "tool"
tags: ["testing", "javascript", "frontend"]
---

## TL;DR

**Was**: Ein erfreuliches JavaScript-Testing-Framework mit Null-Konfiguration.

**Warum**: Schnell, Snapshot-Testing, großartiges Mocking, eingebaute Coverage, weit verbreitet.

## Quick Start

**Installation**:
```bash
npm install --save-dev jest
```

**Zu package.json hinzufügen**:
```json
{
  "scripts": {
    "test": "jest"
  }
}
```

**Testdatei erstellen** (`sum.test.js`):
```javascript
const sum = (a, b) => a + b;

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

**Tests ausführen**:
```bash
npm test
```

## Cheatsheet

| Matcher | Beschreibung |
|---------|-------------|
| `toBe(value)` | Exakte Gleichheit |
| `toEqual(obj)` | Tiefe Gleichheit |
| `toBeTruthy()` | Truthy-Wert |
| `toBeNull()` | Null-Prüfung |
| `toContain(item)` | Array enthält |
| `toThrow()` | Wirft Fehler |
| `toHaveBeenCalled()` | Mock wurde aufgerufen |

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
// Mock-Funktion
const mockFn = jest.fn();
mockFn.mockReturnValue(42);
mockFn.mockResolvedValue('async result');

// Modul mocken
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
beforeAll(() => { /* Einmal vor allen Tests ausführen */ });
afterAll(() => { /* Einmal nach allen Tests ausführen */ });
beforeEach(() => { /* Vor jedem Test ausführen */ });
afterEach(() => { /* Nach jedem Test ausführen */ });
```

## Next Steps

- [Jest Dokumentation](https://jestjs.io/docs/getting-started) - Offizielle Docs
- [React testen](https://jestjs.io/docs/tutorial-react) - React-Testing
- [Mock-Funktionen](https://jestjs.io/docs/mock-functions) - Mocking-Anleitung
- [Jest Cheat Sheet](https://github.com/sapegin/jest-cheat-sheet) - Kurzreferenz
