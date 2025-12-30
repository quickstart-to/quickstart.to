---
title: "Drizzle ORM"
description: "Starten Sie mit Drizzle ORM in 5 Minuten"
template: "tool"
tags: ["orm", "database", "typescript"]
---

## TL;DR

**Was**: TypeScript ORM mit SQL-ähnlicher Syntax und ohne Abhängigkeiten.

**Warum**: Typsicher, leichtgewichtig, SQL-ähnliche API, großartige DX, serverless-ready.

## Quick Start

**Installation**:
```bash
npm install drizzle-orm
npm install -D drizzle-kit
npm install pg  # oder better-sqlite3, mysql2
```

**Schema definieren** (`src/db/schema.ts`):
```typescript
import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
});
```

**Verbinden und abfragen**:
```typescript
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { users } from './schema';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const allUsers = await db.select().from(users);
```

## Cheatsheet

| Befehl | Beschreibung |
|---------|-------------|
| `npx drizzle-kit generate` | Migrationen generieren |
| `npx drizzle-kit migrate` | Migrationen ausführen |
| `npx drizzle-kit push` | Schema pushen (ohne Migration) |
| `npx drizzle-kit studio` | Drizzle Studio öffnen |

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

// Erstellen
await db.insert(users).values({
  name: 'John',
  email: 'john@example.com'
});

// Lesen
const allUsers = await db.select().from(users);
const user = await db.select().from(users).where(eq(users.id, 1));

// Aktualisieren
await db.update(users)
  .set({ name: 'Johnny' })
  .where(eq(users.id, 1));

// Löschen
await db.delete(users).where(eq(users.id, 1));
```

### Filtering and joins

```typescript
import { eq, and, or, like, gt } from 'drizzle-orm';

// Komplexe Where-Bedingung
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

// Bestimmte Felder auswählen
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

// Mit Relationen abfragen
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

- [Drizzle Dokumentation](https://orm.drizzle.team/) - Offizielle Docs
- [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview) - CLI-Tool
- [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview) - Datenbank-Browser
- [Drizzle Beispiele](https://github.com/drizzle-team/drizzle-orm/tree/main/examples) - Code-Beispiele
