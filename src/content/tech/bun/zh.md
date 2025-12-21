---
title: "Bun"
description: "5 分钟快速入门 Bun JavaScript 运行时"
tags: ["javascript", "runtime", "typescript"]
---

## TL;DR

**是什么**：一体化 JavaScript 运行时、打包器、测试运行器和包管理器。

**为什么用**：比 Node.js 快 4 倍、原生 TypeScript、内置打包器、可替代 Node。

## Quick Start

**安装**：
```bash
# macOS/Linux
curl -fsSL https://bun.sh/install | bash

# Windows
powershell -c "irm bun.sh/install.ps1 | iex"

# 检查版本
bun --version
```

**运行脚本**：
```bash
bun run index.ts     # 直接运行 TypeScript
bun run index.js     # 运行 JavaScript
bun run dev          # 运行 package.json 脚本
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `bun run file` | 运行文件 |
| `bun install` | 安装依赖 |
| `bun add pkg` | 添加依赖 |
| `bun remove pkg` | 移除包 |
| `bun test` | 运行测试 |
| `bun build` | 生产打包 |
| `bun init` | 创建新项目 |

## Gotchas

### 包管理

```bash
# 初始化项目
bun init

# 安装依赖
bun install

# 添加包
bun add express

# 添加开发依赖
bun add -d typescript

# 移除包
bun remove lodash

# 更新包
bun update
```

### 运行脚本

```bash
# 直接运行 TypeScript
bun run app.ts

# 监听模式运行
bun --watch run app.ts

# 运行 package.json 脚本
bun run dev

# 运行脚本（简写）
bun dev
```

### HTTP 服务器

```typescript
// server.ts
const server = Bun.serve({
  port: 3000,
  fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response("Hello Bun!");
    }

    if (url.pathname === "/json") {
      return Response.json({ message: "Hello" });
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Listening on http://localhost:${server.port}`);
```

### 文件 I/O

```typescript
// 读取文件
const file = Bun.file("./data.json");
const text = await file.text();
const json = await file.json();

// 写入文件
await Bun.write("./output.txt", "Hello World");
await Bun.write("./data.json", JSON.stringify({ key: "value" }));

// 检查是否存在
const exists = await Bun.file("./data.json").exists();
```

### 测试

```typescript
// math.test.ts
import { describe, expect, test } from "bun:test";

describe("math", () => {
  test("2 + 2", () => {
    expect(2 + 2).toBe(4);
  });

  test("async test", async () => {
    const result = await Promise.resolve(42);
    expect(result).toBe(42);
  });
});
```

```bash
bun test
bun test --watch
```

### 打包器

```bash
# 为浏览器打包
bun build ./src/index.ts --outdir ./dist

# 带压缩
bun build ./src/index.ts --outdir ./dist --minify

# 为 Node.js
bun build ./src/index.ts --outdir ./dist --target node
```

```typescript
// 编程式打包
const result = await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  minify: true,
  splitting: true,
});
```

## Next Steps

- [Bun 文档](https://bun.sh/docs) - 官方文档
- [Bun API](https://bun.sh/docs/api/intro) - 内置 API
- [Bun Discord](https://bun.sh/discord) - 社区
- [Bun GitHub](https://github.com/oven-sh/bun) - 源代码
