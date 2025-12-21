---
title: "Drizzle ORM"
description: "5 分钟快速入门 Drizzle ORM"
tags: ["orm", "database", "typescript"]
---

## TL;DR

**是什么**：具有类 SQL 语法和零依赖的 TypeScript ORM。

**为什么用**：类型安全、轻量、类 SQL API、优秀 DX、serverless 就绪。

## Quick Start

**安装**：
```bash
npm install drizzle-orm
npm install -D drizzle-kit
npm install pg  # 或 better-sqlite3, mysql2
```

**定义 schema**（`src/db/schema.ts`）：
```typescript
import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
});
```

**连接和查询**：
```typescript
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { users } from './schema';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const allUsers = await db.select().from(users);
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `npx drizzle-kit generate` | 生成迁移 |
| `npx drizzle-kit migrate` | 运行迁移 |
| `npx drizzle-kit push` | 推送 schema（无迁移）|
| `npx drizzle-kit studio` | 打开 Drizzle Studio |

## Gotchas

### Schema 定义

```typescript
import { pgTable, serial, text, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  age: integer('age'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content'),
  authorId: integer('author_id').references(() => users.id),
});
```

### CRUD 操作

```typescript
import { eq, and, or, like } from 'drizzle-orm';

// 创建
await db.insert(users).values({
  name: 'John',
  email: 'john@example.com'
});

// 读取
const allUsers = await db.select().from(users);
const user = await db.select().from(users).where(eq(users.id, 1));

// 更新
await db.update(users)
  .set({ name: 'Johnny' })
  .where(eq(users.id, 1));

// 删除
await db.delete(users).where(eq(users.id, 1));
```

### 过滤和连接

```typescript
import { eq, and, or, like, gt } from 'drizzle-orm';

// 复杂 where
const results = await db.select()
  .from(users)
  .where(
    and(
      gt(users.age, 18),
      like(users.email, '%@example.com')
    )
  );

// Join
const postsWithAuthors = await db.select()
  .from(posts)
  .leftJoin(users, eq(posts.authorId, users.id));

// 选择特定字段
const userNames = await db.select({
  id: users.id,
  name: users.name,
}).from(users);
```

### 关系

```typescript
import { relations } from 'drizzle-orm';

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));

// 带关系查询
const usersWithPosts = await db.query.users.findMany({
  with: {
    posts: true,
  },
});
```

### 配置（drizzle.config.ts）

```typescript
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

## Next Steps

- [Drizzle 文档](https://orm.drizzle.team/) - 官方文档
- [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview) - CLI 工具
- [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview) - 数据库浏览器
- [Drizzle 示例](https://github.com/drizzle-team/drizzle-orm/tree/main/examples) - 代码示例
