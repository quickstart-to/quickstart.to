---
title: "TypeScript"
description: "JavaScript con tipos - detecta errores en tiempo de compilación, mejores herramientas y soporte IDE"
template: "language"
tags: ["javascript", "types", "programming"]
---

## TL;DR

**En resumen**: TypeScript es JavaScript con tipos - detecta errores antes de que tu código se ejecute.

**Fortalezas principales**:
- Detectar errores en tiempo de compilación, no en tiempo de ejecución
- Mejor soporte de IDE (autocompletado, refactoring)
- Código auto-documentado a través de tipos
- Adoptable gradualmente - JS válido es TS válido

## Philosophy

Objetivos de diseño de TypeScript:

- **Superset de JavaScript** - Cualquier código JS es TS válido. Migra incrementalmente.
- **Tipado estructural** - Los tipos se comparan por forma, no por nombre
- **Inferencia de tipos** - El compilador deduce tipos cuando es posible
- **La rigurosidad es opcional** - Empieza relajado, ajusta con el tiempo

TypeScript no cambia el comportamiento en tiempo de ejecución. Solo añade verificaciones en tiempo de compilación.

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

**Ideal para**:
- Cualquier proyecto JavaScript (navegadores, Node.js)
- Grandes bases de código con múltiples desarrolladores
- Proyectos de larga duración que necesitan mantenibilidad
- Full-stack con tipos compartidos (frontend/backend)

**No ideal para**:
- Scripts rápidos (usa JS plano)
- Proyectos diminutos donde el overhead no vale la pena

**Comparación**:
| Aspecto | TypeScript | JavaScript | Flow |
|--------|------------|------------|------|
| Sistema de tipos | Estructural | Ninguno | Estructural |
| Adopción | Enorme | Universal | En declive |
| Herramientas | Excelente | Bueno | Limitado |
| Runtime | Compila a JS | Nativo | Eliminado |

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
- **Tipos de framework**: paquetes @types/*
- **Validación**: Zod, io-ts, Yup
