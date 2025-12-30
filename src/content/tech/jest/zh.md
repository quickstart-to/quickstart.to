---
title: "Jest"
description: "JavaScript 测试框架 - 零配置、快照、Mock、开箱即用的代码覆盖率"
template: "tool"
tags: ["testing", "javascript", "frontend"]
---

## TL;DR

**是什么**：零配置的 JavaScript 测试框架。

**为什么用**：快速、快照测试、优秀的 mock 功能、内置覆盖率、广泛采用。

## Quick Start

**安装**：
```bash
npm install --save-dev jest
```

**添加到 package.json**：
```json
{
  "scripts": {
    "test": "jest"
  }
}
```

**创建测试文件**（`sum.test.js`）：
```javascript
const sum = (a, b) => a + b;

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

**运行测试**：
```bash
npm test
```

## Cheatsheet

| 匹配器 | 描述 |
|---------|-------------|
| `toBe(value)` | 精确相等 |
| `toEqual(obj)` | 深度相等 |
| `toBeTruthy()` | 真值 |
| `toBeNull()` | 空值检查 |
| `toContain(item)` | 数组包含 |
| `toThrow()` | 抛出错误 |
| `toHaveBeenCalled()` | Mock 被调用 |

## Gotchas

### 异步测试

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
// Mock 函数
const mockFn = jest.fn();
mockFn.mockReturnValue(42);
mockFn.mockResolvedValue('async result');

// Mock 模块
jest.mock('./api', () => ({
  fetchUser: jest.fn().mockResolvedValue({ name: 'John' })
}));
```

### 快照测试

```javascript
test('renders correctly', () => {
  const tree = renderer.create(<Button>Click</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});
```

### 设置和清理

```javascript
beforeAll(() => { /* 所有测试前运行一次 */ });
afterAll(() => { /* 所有测试后运行一次 */ });
beforeEach(() => { /* 每个测试前运行 */ });
afterEach(() => { /* 每个测试后运行 */ });
```

## Next Steps

- [Jest 文档](https://jestjs.io/docs/getting-started) - 官方文档
- [React 测试](https://jestjs.io/docs/tutorial-react) - React 测试
- [Mock 函数](https://jestjs.io/docs/mock-functions) - Mocking 指南
- [Jest 速查表](https://github.com/sapegin/jest-cheat-sheet) - 快速参考
