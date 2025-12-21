---
title: "TypeScript"
description: "5 分钟快速入门 TypeScript"
tags: ["javascript", "types", "programming"]
---

## TL;DR

**是什么**：带静态类型检查的 JavaScript，在运行前捕获错误。

**为什么**：更好的工具支持、更少的 bug、更易维护的代码。

## Quick Start

**安装**：

```bash
npm install -g typescript

# 验证
tsc --version
```

**第一个 TypeScript 文件**：

```typescript
// hello.ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("World"));
```

**编译并运行**：

```bash
tsc hello.ts        # 编译为 hello.js
node hello.js       # 运行输出
```

**初始化项目**：

```bash
tsc --init          # 创建 tsconfig.json
```

**直接运行（无需编译）**：

```bash
npx ts-node hello.ts
# 或使用 tsx（更快）
npx tsx hello.ts
```

## Cheatsheet

| 类型 | 示例 |
|------|------|
| 原始类型 | `string`, `number`, `boolean` |
| 数组 | `number[]` 或 `Array<number>` |
| 对象 | `{ name: string; age: number }` |
| 函数 | `(x: number) => string` |
| 联合类型 | `string \| number` |
| 可选 | `name?: string` |
| Any | `any`（尽量避免） |
| Unknown | `unknown`（比 any 更安全） |

```typescript
// 接口
interface User {
  name: string;
  age: number;
  email?: string;  // 可选
}

// 类型别名
type ID = string | number;

// 泛型
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
```

## Gotchas

### 类型 'X' 不能赋值给类型 'Y'

```typescript
// 最常见的错误 - 类型不匹配
let num: number = "5";  // 错误！

// 修复：使用正确的类型或转换
let num: number = Number("5");
```

### 对象可能为 'undefined'

```typescript
// 启用严格空检查会捕获这个问题
const user = users.find(u => u.id === 1);
console.log(user.name);  // 错误！

// 修复：检查 undefined
if (user) {
  console.log(user.name);
}
// 或使用可选链
console.log(user?.name);
```

### 类型上不存在属性

```typescript
// TypeScript 不知道对象结构
const data: any = fetchData();
console.log(data.name);  // 可行但不安全

// 更好的方式：定义类型
interface Data { name: string }
const data: Data = fetchData();
```

### 从 JavaScript 迁移

```javascript
// 在 tsconfig.json 中启用 allowJs 和 checkJs
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "strict": false  // 逐步启用
  }
}
```

## Next Steps

- [TypeScript 手册](https://www.typescriptlang.org/docs/handbook/)
- [TypeScript 演练场](https://www.typescriptlang.org/play)
- [类型挑战](https://github.com/type-challenges/type-challenges)
- [Total TypeScript](https://www.totaltypescript.com/)
