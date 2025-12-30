---
title: "Drizzle ORM"
description: "Démarrez avec Drizzle ORM en 5 minutes"
template: "tool"
tags: ["orm", "database", "typescript"]
---

## TL;DR

**Quoi** : ORM TypeScript avec syntaxe SQL-like et zéro dépendance.

**Pourquoi** : Type-safe, léger, API similaire à SQL, excellente DX, prêt pour serverless.

## Quick Start

**Installation** :
```bash
npm install drizzle-orm
npm install -D drizzle-kit
npm install pg  # ou better-sqlite3, mysql2
```

**Définir le schéma** (`src/db/schema.ts`) :
```typescript
import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
});
```

**Connecter et requêter** :
```typescript
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { users } from './schema';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const allUsers = await db.select().from(users);
```

## Cheatsheet

| Commande | Description |
|---------|-------------|
| `npx drizzle-kit generate` | Générer les migrations |
| `npx drizzle-kit migrate` | Exécuter les migrations |
| `npx drizzle-kit push` | Pousser le schéma (sans migration) |
| `npx drizzle-kit studio` | Ouvrir Drizzle Studio |

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

// Créer
await db.insert(users).values({
  name: 'John',
  email: 'john@example.com'
});

// Lire
const allUsers = await db.select().from(users);
const user = await db.select().from(users).where(eq(users.id, 1));

// Mettre à jour
await db.update(users)
  .set({ name: 'Johnny' })
  .where(eq(users.id, 1));

// Supprimer
await db.delete(users).where(eq(users.id, 1));
```

### Filtering and joins

```typescript
import { eq, and, or, like, gt } from 'drizzle-orm';

// Where complexe
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

// Sélectionner des champs spécifiques
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

// Requêter avec les relations
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

- [Documentation Drizzle](https://orm.drizzle.team/) - Docs officielles
- [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview) - Outil CLI
- [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview) - Navigateur de base de données
- [Exemples Drizzle](https://github.com/drizzle-team/drizzle-orm/tree/main/examples) - Exemples de code
