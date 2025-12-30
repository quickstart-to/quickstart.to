---
title: "TypeORM"
description: "TypeScript/JavaScript ORM - 装饰器实体、迁移、Active Record 和 Data Mapper"
template: "tool"
tags: ["orm", "database", "typescript"]
---

## TL;DR

**是什么**：TypeScript 和 JavaScript（ES7、ES6、ES5）的 ORM。

**为什么用**：基于装饰器的实体、迁移、多数据库、Active Record 和 Data Mapper。

## Quick Start

**安装**：
```bash
npm install typeorm reflect-metadata
npm install pg  # 或 mysql, sqlite3 等
```

**配置**（`data-source.ts`）：
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
  synchronize: true, // 生产环境禁用
});

await AppDataSource.initialize();
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `npx typeorm migration:create` | 创建迁移 |
| `npx typeorm migration:run` | 运行迁移 |
| `npx typeorm migration:revert` | 回滚迁移 |
| `npx typeorm schema:sync` | 同步 schema |

## Gotchas

### 实体定义

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

### CRUD 操作

```typescript
import { AppDataSource } from './data-source';
import { User } from './entity/User';

const userRepository = AppDataSource.getRepository(User);

// 创建
const user = userRepository.create({
  name: 'John',
  email: 'john@example.com'
});
await userRepository.save(user);

// 读取
const users = await userRepository.find();
const user = await userRepository.findOneBy({ id: 1 });

// 更新
await userRepository.update(1, { name: 'Johnny' });

// 删除
await userRepository.delete(1);
```

### 查询构建器

```typescript
const users = await userRepository
  .createQueryBuilder('user')
  .where('user.age > :age', { age: 18 })
  .andWhere('user.isActive = :active', { active: true })
  .orderBy('user.name', 'ASC')
  .getMany();

// 带关系
const usersWithPosts = await userRepository
  .createQueryBuilder('user')
  .leftJoinAndSelect('user.posts', 'post')
  .getMany();

// 选择特定字段
const names = await userRepository
  .createQueryBuilder('user')
  .select(['user.id', 'user.name'])
  .getMany();
```

### 关系

```typescript
// 带关系查询
const user = await userRepository.findOne({
  where: { id: 1 },
  relations: ['posts'],
});

// 嵌套关系
const user = await userRepository.findOne({
  where: { id: 1 },
  relations: ['posts', 'posts.comments'],
});
```

### 迁移

```bash
# 从实体生成迁移
npx typeorm migration:generate -n CreateUsers

# 创建空迁移
npx typeorm migration:create -n AddUserAge

# 运行迁移
npx typeorm migration:run

# 回滚上次迁移
npx typeorm migration:revert
```

```typescript
// 迁移文件
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

- [TypeORM 文档](https://typeorm.io/) - 官方文档
- [实体参考](https://typeorm.io/entities) - 实体装饰器
- [关系](https://typeorm.io/relations) - 关系类型
- [迁移](https://typeorm.io/migrations) - 迁移指南
