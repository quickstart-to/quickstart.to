---
title: "Jest"
description: "Comienza con el framework de testing Jest en 5 minutos"
template: "tool"
tags: ["testing", "javascript", "frontend"]
---

## TL;DR

**Qué**: Un framework de testing JavaScript encantador con cero configuración.

**Por qué**: Rápido, testing con snapshots, excelente mocking, cobertura integrada, ampliamente adoptado.

## Quick Start

**Instalación**:
```bash
npm install --save-dev jest
```

**Añadir a package.json**:
```json
{
  "scripts": {
    "test": "jest"
  }
}
```

**Crear archivo de test** (`sum.test.js`):
```javascript
const sum = (a, b) => a + b;

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

**Ejecutar tests**:
```bash
npm test
```

## Cheatsheet

| Matcher | Descripción |
|---------|-------------|
| `toBe(value)` | Igualdad exacta |
| `toEqual(obj)` | Igualdad profunda |
| `toBeTruthy()` | Valor truthy |
| `toBeNull()` | Comprobación null |
| `toContain(item)` | Array contiene |
| `toThrow()` | Lanza error |
| `toHaveBeenCalled()` | Mock fue llamado |

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
// Función mock
const mockFn = jest.fn();
mockFn.mockReturnValue(42);
mockFn.mockResolvedValue('async result');

// Mock de módulo
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
beforeAll(() => { /* Ejecutar una vez antes de todos los tests */ });
afterAll(() => { /* Ejecutar una vez después de todos los tests */ });
beforeEach(() => { /* Ejecutar antes de cada test */ });
afterEach(() => { /* Ejecutar después de cada test */ });
```

## Next Steps

- [Documentación de Jest](https://jestjs.io/docs/getting-started) - Docs oficiales
- [Testing React](https://jestjs.io/docs/tutorial-react) - Tests de React
- [Funciones Mock](https://jestjs.io/docs/mock-functions) - Guía de mocking
- [Jest Cheat Sheet](https://github.com/sapegin/jest-cheat-sheet) - Referencia rápida
