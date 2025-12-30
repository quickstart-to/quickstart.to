---
title: "Vitest"
description: "Tests unitaires ultra-rapides avec Vite - ESM natif, support TypeScript, API compatible Jest"
template: "tool"
tags: ["testing", "vite", "javascript"]
---

## TL;DR

**Quoi** : Framework de tests unitaires ultra-rapide propulsé par Vite.

**Pourquoi** : ESM natif, support TypeScript, API compatible Jest, HMR rapide, tests in-source.

## Quick Start

**Installer** :
```bash
npm install -D vitest
```

**Créer un test** (`sum.test.ts`) :
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

**Exécuter les tests** :
```bash
npx vitest          # Watch mode
npx vitest run      # Single run
npx vitest --ui     # UI mode
```

## Cheatsheet

| Commande | Description |
|---------|-------------|
| `vitest` | Exécuter en mode watch |
| `vitest run` | Exécution unique |
| `vitest --ui` | Ouvrir l'UI |
| `vitest --coverage` | Avec couverture |
| `vitest bench` | Exécuter les benchmarks |
| `vitest typecheck` | Vérification des types |

## Gotchas

### Assertions

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

### Mocking

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

### Setup and teardown

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

### Configuration

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

### In-source testing

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

- [Vitest Documentation](https://vitest.dev/) - Documentation officielle
- [Vitest UI](https://vitest.dev/guide/ui.html) - Tests visuels
- [Coverage](https://vitest.dev/guide/coverage.html) - Couverture de code
- [Vitest Examples](https://github.com/vitest-dev/vitest/tree/main/examples) - Exemples
