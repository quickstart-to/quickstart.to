---
title: "TypeScript"
description: "5 分钟快速入门 TypeScript"
template: "language"
tags: ["javascript", "types", "programming"]
---

## TL;DR

**一句话**：TypeScript 是带类型的 JavaScript——在代码运行前就能发现 bug。

**核心优势**：
- 编译时发现错误，而不是运行时
- 更好的 IDE 支持（自动完成、重构）
- 类型即文档，代码自解释
- 渐进式采用——合法的 JS 就是合法的 TS

## Philosophy

TypeScript 的设计目标：

- **JavaScript 的超集** - 任何 JS 代码都是合法的 TS。可以渐进式迁移。
- **结构类型** - 类型按形状比较，而不是按名称
- **类型推断** - 编译器尽可能自动推断类型
- **严格性可选** - 可以从宽松开始，逐步收紧

TypeScript 不改变运行时行为，只添加编译时检查。

## Quick Start

### 安装

```bash
npm install -g typescript
tsc --version  # Version 5.9.x
```

### 第一个程序

```typescript
// hello.ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("World"));
```

```bash
tsc hello.ts     # 编译为 hello.js
node hello.js    # 运行
```

### 直接运行（无需编译）

```bash
npx tsx hello.ts    # 快速，推荐
# 或
npx ts-node hello.ts
```

### 初始化项目

```bash
tsc --init  # 创建 tsconfig.json
```

## Language Essentials

### 基本类型

```typescript
// 原始类型
const name: string = "Alice";
const age: number = 25;
const active: boolean = true;

// 数组
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["a", "b"];

// 对象
const user: { name: string; age: number } = {
  name: "Alice",
  age: 25
};

// Any 和 Unknown
let data: any = "anything";     // 避免使用
let safe: unknown = getData();  // 更安全，需要类型检查
```

### 接口与类型

```typescript
// 接口（用于对象）
interface User {
  name: string;
  age: number;
  email?: string;  // 可选
}

// 类型别名
type ID = string | number;

// 联合类型
type Status = "pending" | "active" | "done";

// 交叉类型
type Admin = User & { role: "admin" };
```

### 函数

```typescript
// 带类型的函数
function add(a: number, b: number): number {
  return a + b;
}

// 箭头函数
const multiply = (a: number, b: number): number => a * b;

// 可选和默认参数
function greet(name: string, greeting: string = "你好"): string {
  return `${greeting}, ${name}!`;
}

// 函数类型
type MathFn = (a: number, b: number) => number;
```

### 泛型

```typescript
// 泛型函数
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

first<number>([1, 2, 3]);  // 1
first(["a", "b"]);         // "a"（自动推断）

// 泛型接口
interface Response<T> {
  data: T;
  status: number;
}
```

### 控制流

```typescript
// 类型收窄
function process(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());  // string 方法可用
  } else {
    console.log(value.toFixed(2));     // number 方法可用
  }
}

// 类型守卫
function isUser(obj: unknown): obj is User {
  return typeof obj === "object" && obj !== null && "name" in obj;
}
```

## Gotchas

### 类型 'X' 不能赋值给类型 'Y'

```typescript
let num: number = "5";  // 错误！

// 解决：使用正确的类型
let num: number = Number("5");
```

### 对象可能为 'undefined'

```typescript
const user = users.find(u => u.id === 1);
console.log(user.name);  // 错误！user 可能是 undefined

// 解决：先检查
if (user) {
  console.log(user.name);
}
// 或用可选链
console.log(user?.name);
```

### 类型断言（谨慎使用）

```typescript
// 当你比编译器更了解类型时
const input = document.getElementById("input") as HTMLInputElement;
input.value = "hello";

// 非空断言（危险）
const element = document.getElementById("app")!;
```

### 从 JavaScript 迁移

```json
// tsconfig.json - 从宽松开始
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "strict": false
  }
}
```

## When to Choose

**适合**：
- 任何 JavaScript 项目（浏览器、Node.js）
- 多人协作的大型代码库
- 需要长期维护的项目
- 全栈共享类型（前后端）

**不适合**：
- 快速脚本（用纯 JS）
- 开销不值得的小项目

**对比**：
| 方面 | TypeScript | JavaScript | Flow |
|------|------------|------------|------|
| 类型系统 | 结构化 | 无 | 结构化 |
| 采用度 | 极高 | 通用 | 下降 |
| 工具支持 | 优秀 | 良好 | 有限 |
| 运行时 | 编译为 JS | 原生 | 剥离 |

## Next Steps

- [TypeScript 手册](https://www.typescriptlang.org/docs/handbook/)
- [TypeScript 演练场](https://www.typescriptlang.org/play)
- [类型挑战](https://github.com/type-challenges/type-challenges)
- [Total TypeScript](https://www.totaltypescript.com/)

## Ecosystem

### 运行 TypeScript

```bash
npx tsx file.ts       # 快速，现代
npx ts-node file.ts   # 经典
tsc && node dist/     # 先编译
```

### 主流工具

- **运行时**：tsx、ts-node、Deno、Bun
- **构建**：tsc、esbuild、swc
- **框架类型**：@types/* 包
- **验证**：Zod、io-ts、Yup
