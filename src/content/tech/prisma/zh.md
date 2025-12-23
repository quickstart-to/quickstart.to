---
title: "Prisma"
description: "5 分钟快速入门 Prisma ORM"
template: "tool"
tags: ["orm", "database", "typescript"]
---

## TL;DR

**是什么**：下一代 Node.js 和 TypeScript ORM。

**为什么用**：类型安全查询、自动生成客户端、可视化数据库浏览器、迁移。

## Quick Start

**安装**：
```bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
```

**定义 schema**（`prisma/schema.prisma`）：
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id       Int    @id @default(autoincrement())
  title    String
  author   User   @relation(fields: [authorId], references: [id])
  authorId Int
}
```

**运行迁移**：
```bash
npx prisma migrate dev --name init
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `npx prisma init` | 初始化 Prisma |
| `npx prisma migrate dev` | 创建迁移 |
| `npx prisma generate` | 生成客户端 |
| `npx prisma studio` | 打开数据库浏览器 |
| `npx prisma db push` | 推送 schema（无迁移）|
| `npx prisma db pull` | 从 DB 拉取 schema |

## Gotchas

### CRUD 操作

```typescript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// 创建
const user = await prisma.user.create({
  data: { email: 'john@example.com', name: 'John' }
})

// 读取
const users = await prisma.user.findMany()
const user = await prisma.user.findUnique({ where: { id: 1 } })

// 更新
await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Johnny' }
})

// 删除
await prisma.user.delete({ where: { id: 1 } })
```

### 关系

```typescript
// 创建带关系
await prisma.post.create({
  data: {
    title: 'Hello',
    author: { connect: { id: 1 } }
  }
})

// 查询带关系
const userWithPosts = await prisma.user.findUnique({
  where: { id: 1 },
  include: { posts: true }
})
```

### 过滤

```typescript
const users = await prisma.user.findMany({
  where: {
    email: { contains: '@example.com' },
    name: { not: null },
    posts: { some: { title: { startsWith: 'Hello' } } }
  },
  orderBy: { name: 'asc' },
  take: 10,
  skip: 0
})
```

## Next Steps

- [Prisma 文档](https://www.prisma.io/docs) - 官方文档
- [Prisma 示例](https://github.com/prisma/prisma-examples) - 代码示例
- [Prisma Schema 参考](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference) - Schema 语法
- [Prisma Studio](https://www.prisma.io/studio) - 可视化编辑器
