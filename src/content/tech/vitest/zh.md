---
title: "Vitest"
description: "5 分钟快速入门 Vitest 测试"
tags: ["testing", "vite", "javascript"]
---

## TL;DR

**是什么**：由 Vite 驱动的极速单元测试框架。

**为什么用**：原生 ESM、TypeScript 支持、Jest 兼容 API、快速 HMR、源内测试。

## Quick Start

**安装**：
```bash
npm install -D vitest
```

**创建测试**（`sum.test.ts`）：
```typescript
import { describe, it, expect } from 'vitest'

function sum(a: number, b: number) {
  return a + b
}

describe('sum', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
```

**运行测试**：
```bash
npx vitest          # 监听模式
npx vitest run      # 单次运行
npx vitest --ui     # UI 模式
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `vitest` | 监听模式运行 |
| `vitest run` | 单次运行 |
| `vitest --ui` | 打开 UI |
| `vitest --coverage` | 带覆盖率 |
| `vitest bench` | 运行基准测试 |
| `vitest typecheck` | 类型检查 |

## Gotchas

### 断言

```typescript
import { describe, it, expect } from 'vitest'

describe('assertions', () => {
  it('basic assertions', () => {
    expect(1 + 1).toBe(2)
    expect({ a: 1 }).toEqual({ a: 1 })
    expect([1, 2, 3]).toContain(2)
    expect('hello').toMatch(/ell/)
  })

  it('truthiness', () => {
    expect(true).toBeTruthy()
    expect(false).toBeFalsy()
    expect(null).toBeNull()
    expect(undefined).toBeUndefined()
  })

  it('numbers', () => {
    expect(5).toBeGreaterThan(3)
    expect(5).toBeLessThanOrEqual(5)
    expect(0.1 + 0.2).toBeCloseTo(0.3)
  })

  it('exceptions', () => {
    expect(() => { throw new Error('fail') }).toThrow('fail')
  })
})
```

### Mock

```typescript
import { vi, describe, it, expect } from 'vitest'

describe('mocking', () => {
  it('mocks functions', () => {
    const fn = vi.fn()
    fn('hello')

    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveBeenCalledWith('hello')
  })

  it('mocks return values', () => {
    const fn = vi.fn().mockReturnValue(42)
    expect(fn()).toBe(42)
  })

  it('mocks modules', async () => {
    vi.mock('./api', () => ({
      fetchUser: vi.fn().mockResolvedValue({ id: 1, name: 'John' })
    }))

    const { fetchUser } = await import('./api')
    const user = await fetchUser(1)
    expect(user.name).toBe('John')
  })
})
```

### 生命周期

```typescript
import { describe, it, beforeAll, afterAll, beforeEach, afterEach } from 'vitest'

describe('lifecycle', () => {
  beforeAll(() => {
    console.log('Before all tests')
  })

  afterAll(() => {
    console.log('After all tests')
  })

  beforeEach(() => {
    console.log('Before each test')
  })

  afterEach(() => {
    console.log('After each test')
  })

  it('test 1', () => {})
  it('test 2', () => {})
})
```

### 配置

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html']
    }
  }
})
```

### 源内测试

```typescript
// src/sum.ts
export function sum(a: number, b: number) {
  return a + b
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('sum', () => {
    expect(sum(1, 2)).toBe(3)
  })
}
```

## Next Steps

- [Vitest 文档](https://vitest.dev/) - 官方文档
- [Vitest UI](https://vitest.dev/guide/ui.html) - 可视化测试
- [覆盖率](https://vitest.dev/guide/coverage.html) - 代码覆盖
- [Vitest 示例](https://github.com/vitest-dev/vitest/tree/main/examples) - 示例
