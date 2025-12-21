---
title: "Drizzle ORM"
description: "Get started with Drizzle ORM in 5 minutes"
tags: ["orm", "database", "typescript"]
---

## TL;DR

**What**: TypeScript ORM with SQL-like syntax and zero dependencies.

**Why**: Type-safe, lightweight, SQL-like API, great DX, serverless ready.

## Quick Start

**Install**:
```bash
npm install drizzle-orm
npm install -D drizzle-kit
npm install pg  # or better-sqlite3, mysql2
```

**Define schema** (`src/db/schema.ts`):
```typescript
import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
});
```

**Connect and query**:
```typescript
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { users } from './schema';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const allUsers = await db.select().from(users);
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `npx drizzle-kit generate` | Generate migrations |
| `npx drizzle-kit migrate` | Run migrations |
| `npx drizzle-kit push` | Push schema (no migration) |
| `npx drizzle-kit studio` | Open Drizzle Studio |

## Gotchas

### Schema definition

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

### CRUD operations

```typescript
import { eq, and, or, like } from 'drizzle-orm';

// Create
await db.insert(users).values({
  name: 'John',
  email: 'john@example.com'
});

// Read
const allUsers = await db.select().from(users);
const user = await db.select().from(users).where(eq(users.id, 1));

// Update
await db.update(users)
  .set({ name: 'Johnny' })
  .where(eq(users.id, 1));

// Delete
await db.delete(users).where(eq(users.id, 1));
```

### Filtering and joins

```typescript
import { eq, and, or, like, gt } from 'drizzle-orm';

// Complex where
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

// Select specific fields
const userNames = await db.select({
  id: users.id,
  name: users.name,
}).from(users);
```

### Relations

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

// Query with relations
const usersWithPosts = await db.query.users.findMany({
  with: {
    posts: true,
  },
});
```

### Configuration (drizzle.config.ts)

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

- [Drizzle Documentation](https://orm.drizzle.team/) - Official docs
- [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview) - CLI tool
- [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview) - Database browser
- [Drizzle Examples](https://github.com/drizzle-team/drizzle-orm/tree/main/examples) - Code examples
