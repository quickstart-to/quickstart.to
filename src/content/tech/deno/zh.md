---
title: "Deno"
description: "5 分钟快速入门 Deno"
tags: ["javascript", "typescript", "runtime"]
---

## TL;DR

**是什么**：Node.js 创始人开发的安全 JavaScript 和 TypeScript 运行时。

**为什么用**：默认安全、原生 TypeScript、现代 API、单文件可执行、Web 标准 API。

## Quick Start

**安装**：
```bash
# macOS/Linux
curl -fsSL https://deno.land/install.sh | sh

# Windows
irm https://deno.land/install.ps1 | iex

# Homebrew
brew install deno
```

**运行脚本**：
```bash
deno run hello.ts
deno run --allow-net server.ts
deno run https://deno.land/std/examples/welcome.ts
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `deno run file` | 运行文件 |
| `deno run --allow-net` | 允许网络 |
| `deno run --allow-read` | 允许读文件 |
| `deno test` | 运行测试 |
| `deno fmt` | 格式化代码 |
| `deno lint` | 代码检查 |
| `deno compile` | 创建可执行文件 |
| `deno task name` | 运行任务 |

## Gotchas

### 权限标志

```bash
# 网络访问
deno run --allow-net server.ts
deno run --allow-net=api.example.com server.ts

# 文件访问
deno run --allow-read file.ts
deno run --allow-write file.ts
deno run --allow-read=/tmp file.ts

# 环境变量
deno run --allow-env app.ts

# 所有权限（不推荐）
deno run --allow-all app.ts

# 简写
deno run -A app.ts
```

### HTTP 服务器

```typescript
// server.ts
Deno.serve({ port: 8000 }, (request: Request) => {
  const url = new URL(request.url);

  if (url.pathname === "/") {
    return new Response("Hello Deno!");
  }

  if (url.pathname === "/json") {
    return Response.json({ message: "Hello" });
  }

  return new Response("Not Found", { status: 404 });
});
```

```bash
deno run --allow-net server.ts
```

### 导入模块

```typescript
// 从 URL
import { serve } from "https://deno.land/std/http/server.ts";

// 从 npm
import express from "npm:express@4";

// 使用 import map（deno.json）
import { z } from "zod";
```

```json
// deno.json
{
  "imports": {
    "zod": "npm:zod@3"
  }
}
```

### 测试

```typescript
// math_test.ts
import { assertEquals } from "https://deno.land/std/assert/mod.ts";

Deno.test("addition", () => {
  assertEquals(2 + 2, 4);
});

Deno.test("async test", async () => {
  const result = await Promise.resolve(42);
  assertEquals(result, 42);
});
```

```bash
deno test
deno test --watch
```

### 配置（deno.json）

```json
{
  "tasks": {
    "dev": "deno run --allow-net --watch server.ts",
    "start": "deno run --allow-net server.ts",
    "test": "deno test --allow-read"
  },
  "imports": {
    "std/": "https://deno.land/std@0.208.0/",
    "oak": "https://deno.land/x/oak@v12.6.1/mod.ts"
  },
  "compilerOptions": {
    "strict": true
  }
}
```

```bash
deno task dev
deno task test
```

### 文件 I/O

```typescript
// 读取文件
const text = await Deno.readTextFile("./data.txt");
const data = JSON.parse(await Deno.readTextFile("./data.json"));

// 写入文件
await Deno.writeTextFile("./output.txt", "Hello World");
await Deno.writeTextFile("./data.json", JSON.stringify({ key: "value" }));

// 检查是否存在
try {
  await Deno.stat("./file.txt");
  console.log("File exists");
} catch {
  console.log("File not found");
}
```

## Next Steps

- [Deno 文档](https://deno.land/manual) - 官方文档
- [Deno 标准库](https://deno.land/std) - 标准模块
- [Deno Deploy](https://deno.com/deploy) - 边缘托管
- [Fresh](https://fresh.deno.dev/) - Web 框架
