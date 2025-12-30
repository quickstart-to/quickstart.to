---
title: "Drizzle ORM"
description: "ORM TypeScript con sintaxis SQL-like - type-safe, cero dependencias, listo para serverless"
template: "tool"
tags: ["orm", "database", "typescript"]
---

## TL;DR

**Qué**: ORM TypeScript con sintaxis similar a SQL y cero dependencias.

**Por qué**: Type-safe, ligero, API similar a SQL, excelente DX, listo para serverless.

## Quick Start

**Instalación**:
```bash
npm install drizzle-orm
npm install -D drizzle-kit
npm install pg  # o better-sqlite3, mysql2
```

**Definir esquema** (`src/db/schema.ts`):
```typescript
import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
});
```

**Conectar y consultar**:
```typescript
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { users } from './schema';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const allUsers = await db.select().from(users);
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `npx drizzle-kit generate` | Generar migraciones |
| `npx drizzle-kit migrate` | Ejecutar migraciones |
| `npx drizzle-kit push` | Empujar esquema (sin migración) |
| `npx drizzle-kit studio` | Abrir Drizzle Studio |

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

// Crear
await db.insert(users).values({
  name: 'John',
  email: 'john@example.com'
});

// Leer
const allUsers = await db.select().from(users);
const user = await db.select().from(users).where(eq(users.id, 1));

// Actualizar
await db.update(users)
  .set({ name: 'Johnny' })
  .where(eq(users.id, 1));

// Eliminar
await db.delete(users).where(eq(users.id, 1));
```

### Filtering and joins

```typescript
import { eq, and, or, like, gt } from 'drizzle-orm';

// Where complejo
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

// Seleccionar campos específicos
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

// Consultar con relaciones
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

- [Documentación de Drizzle](https://orm.drizzle.team/) - Docs oficiales
- [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview) - Herramienta CLI
- [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview) - Navegador de base de datos
- [Ejemplos de Drizzle](https://github.com/drizzle-team/drizzle-orm/tree/main/examples) - Ejemplos de código
