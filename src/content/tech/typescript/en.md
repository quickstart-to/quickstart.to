---
title: "TypeScript"
description: "Get started with TypeScript in 5 minutes"
tags: ["javascript", "types", "programming"]
---

## TL;DR

**What**: JavaScript with static type checking - catches errors before runtime.

**Why**: Better tooling, fewer bugs, improved code maintainability.

## Quick Start

**Install**:

```bash
npm install -g typescript

# Verify
tsc --version
```

**First TypeScript file**:

```typescript
// hello.ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("World"));
```

**Compile and run**:

```bash
tsc hello.ts        # Compiles to hello.js
node hello.js       # Run the output
```

**Initialize a project**:

```bash
tsc --init          # Creates tsconfig.json
```

**Run directly (without compiling)**:

```bash
npx ts-node hello.ts
# Or with tsx (faster)
npx tsx hello.ts
```

## Cheatsheet

| Type | Example |
|------|---------|
| Primitives | `string`, `number`, `boolean` |
| Array | `number[]` or `Array<number>` |
| Object | `{ name: string; age: number }` |
| Function | `(x: number) => string` |
| Union | `string \| number` |
| Optional | `name?: string` |
| Any | `any` (avoid if possible) |
| Unknown | `unknown` (safer than any) |

```typescript
// Interface
interface User {
  name: string;
  age: number;
  email?: string;  // Optional
}

// Type alias
type ID = string | number;

// Generics
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
```

## Gotchas

### Type 'X' is not assignable to type 'Y'

```typescript
// Most common error - type mismatch
let num: number = "5";  // Error!

// Fix: use correct type or convert
let num: number = Number("5");
```

### Object is possibly 'undefined'

```typescript
// Enable strict null checks catches this
const user = users.find(u => u.id === 1);
console.log(user.name);  // Error!

// Fix: check for undefined
if (user) {
  console.log(user.name);
}
// Or use optional chaining
console.log(user?.name);
```

### Property does not exist on type

```typescript
// TypeScript doesn't know the shape
const data: any = fetchData();
console.log(data.name);  // Works but unsafe

// Better: define the type
interface Data { name: string }
const data: Data = fetchData();
```

### Migrating from JavaScript

```javascript
// Start with allowJs and checkJs in tsconfig.json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "strict": false  // Enable gradually
  }
}
```

## Next Steps

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Type Challenges](https://github.com/type-challenges/type-challenges)
- [Total TypeScript](https://www.totaltypescript.com/)
