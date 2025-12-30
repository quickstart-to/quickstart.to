---
title: "TypeScript"
description: "JavaScript with types - catch errors at compile time, better tooling and IDE support"
template: "language"
tags: ["javascript", "types", "programming"]
---

## TL;DR

**One-liner**: TypeScript is JavaScript with types - catch bugs before your code runs.

**Core Strengths**:
- Catch errors at compile time, not runtime
- Better IDE support (autocomplete, refactoring)
- Self-documenting code through types
- Gradually adoptable - valid JS is valid TS

## Philosophy

TypeScript's design goals:

- **Superset of JavaScript** - Any JS code is valid TS. Migrate incrementally.
- **Structural typing** - Types are compared by shape, not by name
- **Type inference** - Compiler figures out types when possible
- **Strictness is optional** - Start loose, tighten over time

TypeScript doesn't change runtime behavior. It only adds compile-time checks.

## Quick Start

### Install

```bash
npm install -g typescript
tsc --version  # Version 5.9.x
```

### First Program

```typescript
// hello.ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("World"));
```

```bash
tsc hello.ts     # Compiles to hello.js
node hello.js    # Run it
```

### Run Directly (without compiling)

```bash
npx tsx hello.ts    # Fast, recommended
# or
npx ts-node hello.ts
```

### Initialize a Project

```bash
tsc --init  # Creates tsconfig.json
```

## Language Essentials

### Basic Types

```typescript
// Primitives
const name: string = "Alice";
const age: number = 25;
const active: boolean = true;

// Arrays
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["a", "b"];

// Object
const user: { name: string; age: number } = {
  name: "Alice",
  age: 25
};

// Any and Unknown
let data: any = "anything";     // avoid
let safe: unknown = getData();  // safer, requires type check
```

### Interfaces & Types

```typescript
// Interface (for objects)
interface User {
  name: string;
  age: number;
  email?: string;  // optional
}

// Type alias
type ID = string | number;

// Union types
type Status = "pending" | "active" | "done";

// Intersection
type Admin = User & { role: "admin" };
```

### Functions

```typescript
// Typed function
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Optional and default parameters
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

// Function type
type MathFn = (a: number, b: number) => number;
```

### Generics

```typescript
// Generic function
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

first<number>([1, 2, 3]);  // 1
first(["a", "b"]);         // "a" (inferred)

// Generic interface
interface Response<T> {
  data: T;
  status: number;
}
```

### Control Flow

```typescript
// Type narrowing
function process(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());  // string methods available
  } else {
    console.log(value.toFixed(2));     // number methods available
  }
}

// Type guards
function isUser(obj: unknown): obj is User {
  return typeof obj === "object" && obj !== null && "name" in obj;
}
```

## Gotchas

### Type 'X' is not assignable to type 'Y'

```typescript
let num: number = "5";  // Error!

// Fix: use correct type
let num: number = Number("5");
```

### Object is possibly 'undefined'

```typescript
const user = users.find(u => u.id === 1);
console.log(user.name);  // Error! user might be undefined

// Fix: check first
if (user) {
  console.log(user.name);
}
// Or optional chaining
console.log(user?.name);
```

### Type assertions (use sparingly)

```typescript
// When you know better than the compiler
const input = document.getElementById("input") as HTMLInputElement;
input.value = "hello";

// Non-null assertion (dangerous)
const element = document.getElementById("app")!;
```

### Migrating from JavaScript

```json
// tsconfig.json - start loose
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "strict": false
  }
}
```

## When to Choose

**Best for**:
- Any JavaScript project (browsers, Node.js)
- Large codebases with multiple developers
- Long-lived projects needing maintainability
- Full-stack with shared types (frontend/backend)

**Not ideal for**:
- Quick scripts (use plain JS)
- Tiny projects where overhead isn't worth it

**Comparison**:
| Aspect | TypeScript | JavaScript | Flow |
|--------|------------|------------|------|
| Type system | Structural | None | Structural |
| Adoption | Huge | Universal | Declining |
| Tooling | Excellent | Good | Limited |
| Runtime | Compiles to JS | Native | Stripped |

## Next Steps

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Type Challenges](https://github.com/type-challenges/type-challenges)
- [Total TypeScript](https://www.totaltypescript.com/)

## Ecosystem

### Running TypeScript

```bash
npx tsx file.ts       # Fast, modern
npx ts-node file.ts   # Classic
tsc && node dist/     # Compile first
```

### Popular Tools

- **Runtime**: tsx, ts-node, Deno, Bun
- **Build**: tsc, esbuild, swc
- **Framework types**: @types/* packages
- **Validation**: Zod, io-ts, Yup
