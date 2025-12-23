---
title: "PlanetScale"
description: "5 分钟快速入门 PlanetScale"
template: "tool"
tags: ["database", "mysql", "serverless"]
---

## TL;DR

**是什么**：支持分支和无阻塞架构更改的无服务器 MySQL 平台。

**为什么用**：类 Git 的数据库分支、零停机迁移、无限扩展。

## Quick Start

**注册**：访问 [planetscale.com](https://planetscale.com) 并创建账户。

**安装 CLI**：
```bash
brew install planetscale/tap/pscale  # macOS
# 或
scoop install pscale  # Windows
```

**创建数据库**：
```bash
pscale auth login
pscale database create myapp --region us-east
```

**连接**：
```bash
pscale shell myapp main
```

**创建表**：
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE
);
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `pscale database create name` | 创建数据库 |
| `pscale shell db branch` | 连接到分支 |
| `pscale branch create db name` | 创建分支 |
| `pscale deploy-request create db branch` | 创建部署请求 |
| `pscale connect db branch` | 本地连接代理 |
| `pscale password create db branch name` | 创建连接密码 |

## Gotchas

### 分支工作流

```bash
# 创建开发分支
pscale branch create myapp add-orders

# 连接到分支
pscale shell myapp add-orders

# 进行架构更改
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  total DECIMAL(10,2)
);

# 创建部署请求
pscale deploy-request create myapp add-orders

# 部署到生产（通过 UI 或 CLI）
pscale deploy-request deploy myapp 1
```

### 连接字符串

```bash
# 生成连接字符串
pscale password create myapp main production-password

# 在应用中使用
DATABASE_URL="mysql://user:password@host/database?ssl=true"
```

### 与框架一起使用

```javascript
// Prisma
// schema.prisma
datasource db {
  provider     = "mysql"
  url          = env("DATABASE_URL")
  relationMode = "prisma"  // PlanetScale 必需
}

// Drizzle
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';

const connection = connect({
  url: process.env.DATABASE_URL
});
const db = drizzle(connection);
```

### 不支持外键（使用应用层）

```javascript
// PlanetScale 不支持外键以实现在线迁移
// 在应用代码中处理关系

// 使用 Prisma relationMode: "prisma"
model User {
  id     Int     @id @default(autoincrement())
  orders Order[]
}

model Order {
  id     Int  @id @default(autoincrement())
  userId Int
  user   User @relation(fields: [userId], references: [id])
}
```

## Next Steps

- [PlanetScale 文档](https://planetscale.com/docs) - 官方文档
- [PlanetScale 教程](https://planetscale.com/learn) - 学习资源
- [分支指南](https://planetscale.com/docs/concepts/branching) - 工作流
- [Prisma + PlanetScale](https://www.prisma.io/docs/guides/database/planetscale) - 集成
