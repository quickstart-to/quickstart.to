---
title: "TypeScript"
description: "JavaScript avec des types - détectez les erreurs à la compilation, meilleurs outils et support IDE"
template: "language"
tags: ["javascript", "types", "programming"]
---

## TL;DR

**En bref** : TypeScript c'est JavaScript avec des types - attrapez les bugs avant que votre code ne s'exécute.

**Points forts** :
- Détecter les erreurs à la compilation, pas à l'exécution
- Meilleur support IDE (autocomplétion, refactoring)
- Code auto-documenté grâce aux types
- Adoptable progressivement - du JS valide est du TS valide

## Philosophy

Les objectifs de conception de TypeScript :

- **Superset de JavaScript** - Tout code JS est du TS valide. Migrez progressivement.
- **Typage structurel** - Les types sont comparés par forme, pas par nom
- **Inférence de type** - Le compilateur déduit les types quand possible
- **La rigueur est optionnelle** - Commencez souple, resserrez au fil du temps

TypeScript ne change pas le comportement à l'exécution. Il ajoute seulement des vérifications à la compilation.

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

**Idéal pour** :
- Tout projet JavaScript (navigateurs, Node.js)
- Grandes bases de code avec plusieurs développeurs
- Projets à long terme nécessitant de la maintenabilité
- Full-stack avec types partagés (frontend/backend)

**Moins adapté pour** :
- Scripts rapides (utilisez du JS pur)
- Petits projets où l'overhead n'en vaut pas la peine

**Comparaison** :
| Aspect | TypeScript | JavaScript | Flow |
|--------|------------|------------|------|
| Système de types | Structurel | Aucun | Structurel |
| Adoption | Énorme | Universelle | En déclin |
| Outillage | Excellent | Bon | Limité |
| Runtime | Compile en JS | Natif | Retiré |

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

- **Runtime** : tsx, ts-node, Deno, Bun
- **Build** : tsc, esbuild, swc
- **Types de framework** : packages @types/*
- **Validation** : Zod, io-ts, Yup
