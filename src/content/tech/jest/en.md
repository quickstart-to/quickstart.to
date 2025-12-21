---
title: "Jest"
description: "Get started with Jest testing framework in 5 minutes"
tags: ["testing", "javascript", "frontend"]
---

## TL;DR

**What**: A delightful JavaScript testing framework with zero configuration.

**Why**: Fast, snapshot testing, great mocking, built-in coverage, widely adopted.

## Quick Start

**Install**:
```bash
npm install --save-dev jest
```

**Add to package.json**:
```json
{
  "scripts": {
    "test": "jest"
  }
}
```

**Create test file** (`sum.test.js`):
```javascript
const sum = (a, b) => a + b;

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

**Run tests**:
```bash
npm test
```

## Cheatsheet

| Matcher | Description |
|---------|-------------|
| `toBe(value)` | Exact equality |
| `toEqual(obj)` | Deep equality |
| `toBeTruthy()` | Truthy value |
| `toBeNull()` | Null check |
| `toContain(item)` | Array contains |
| `toThrow()` | Throws error |
| `toHaveBeenCalled()` | Mock was called |

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
// Mock function
const mockFn = jest.fn();
mockFn.mockReturnValue(42);
mockFn.mockResolvedValue('async result');

// Mock module
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
beforeAll(() => { /* Run once before all tests */ });
afterAll(() => { /* Run once after all tests */ });
beforeEach(() => { /* Run before each test */ });
afterEach(() => { /* Run after each test */ });
```

## Next Steps

- [Jest Documentation](https://jestjs.io/docs/getting-started) - Official docs
- [Testing React](https://jestjs.io/docs/tutorial-react) - React testing
- [Mock Functions](https://jestjs.io/docs/mock-functions) - Mocking guide
- [Jest Cheat Sheet](https://github.com/sapegin/jest-cheat-sheet) - Quick reference
