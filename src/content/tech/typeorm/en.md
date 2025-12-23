---
title: "TypeORM"
description: "Get started with TypeORM in 5 minutes"
template: "tool"
tags: ["orm", "database", "typescript"]
---

## TL;DR

**What**: ORM for TypeScript and JavaScript (ES7, ES6, ES5).

**Why**: Decorator-based entities, migrations, multiple databases, Active Record & Data Mapper.

## Quick Start

**Install**:
```bash
npm install typeorm reflect-metadata
npm install pg  # or mysql, sqlite3, etc.
```

**Configure** (`data-source.ts`):
```typescript
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'mydb',
  entities: ['src/entity/**/*.ts'],
  synchronize: true, // Disable in production
});

await AppDataSource.initialize();
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `npx typeorm migration:create` | Create migration |
| `npx typeorm migration:run` | Run migrations |
| `npx typeorm migration:revert` | Revert migration |
| `npx typeorm schema:sync` | Sync schema |

## Gotchas

### Entity definition

```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  age: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Post, post => post.author)
  posts: Post[];
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, user => user.posts)
  author: User;
}
```

### CRUD operations

```typescript
import { AppDataSource } from './data-source';
import { User } from './entity/User';

const userRepository = AppDataSource.getRepository(User);

// Create
const user = userRepository.create({
  name: 'John',
  email: 'john@example.com'
});
await userRepository.save(user);

// Read
const users = await userRepository.find();
const user = await userRepository.findOneBy({ id: 1 });

// Update
await userRepository.update(1, { name: 'Johnny' });

// Delete
await userRepository.delete(1);
```

### Query builder

```typescript
const users = await userRepository
  .createQueryBuilder('user')
  .where('user.age > :age', { age: 18 })
  .andWhere('user.isActive = :active', { active: true })
  .orderBy('user.name', 'ASC')
  .getMany();

// With relations
const usersWithPosts = await userRepository
  .createQueryBuilder('user')
  .leftJoinAndSelect('user.posts', 'post')
  .getMany();

// Select specific fields
const names = await userRepository
  .createQueryBuilder('user')
  .select(['user.id', 'user.name'])
  .getMany();
```

### Relations

```typescript
// Find with relations
const user = await userRepository.findOne({
  where: { id: 1 },
  relations: ['posts'],
});

// Nested relations
const user = await userRepository.findOne({
  where: { id: 1 },
  relations: ['posts', 'posts.comments'],
});
```

### Migrations

```bash
# Generate migration from entities
npx typeorm migration:generate -n CreateUsers

# Create empty migration
npx typeorm migration:create -n AddUserAge

# Run migrations
npx typeorm migration:run

# Revert last migration
npx typeorm migration:revert
```

```typescript
// Migration file
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1234567890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR NOT NULL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
```

## Next Steps

- [TypeORM Documentation](https://typeorm.io/) - Official docs
- [Entity Reference](https://typeorm.io/entities) - Entity decorators
- [Relations](https://typeorm.io/relations) - Relationship types
- [Migrations](https://typeorm.io/migrations) - Migration guide
