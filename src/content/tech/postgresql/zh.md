---
title: "PostgreSQL"
description: "快速入门 PostgreSQL 关系型数据库"
tags: ["database", "sql", "backend"]
---

## TL;DR

**是什么**：功能强大的开源关系型数据库，支持高级特性。

**为什么**：ACID 事务、JSON 支持、可扩展性、优秀的性能。

## Quick Start

**安装**：

```bash
# macOS
brew install postgresql@17
brew services start postgresql@17

# Ubuntu/Debian
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql

# Docker
docker run -d --name postgres -e POSTGRES_PASSWORD=secret -p 5432:5432 postgres:17
```

**连接**：

```bash
# 本地连接
psql -U postgres

# 带密码
psql -h localhost -U postgres -d mydb

# Docker
docker exec -it postgres psql -U postgres
```

**创建数据库和表**：

```sql
-- 创建数据库
CREATE DATABASE myapp;

-- 连接数据库
\c myapp

-- 创建表
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 插入数据
INSERT INTO users (name, email) VALUES ('John', 'john@example.com');

-- 查询
SELECT * FROM users;
```

## Cheatsheet

| 命令 | 描述 |
|------|------|
| `\l` | 列出数据库 |
| `\c dbname` | 连接数据库 |
| `\dt` | 列出表 |
| `\d tablename` | 查看表结构 |
| `\du` | 列出用户/角色 |
| `\q` | 退出 psql |
| `\i file.sql` | 执行 SQL 文件 |
| `\timing` | 切换查询计时 |

**常用 SQL**：

```sql
-- 创建用户
CREATE USER myuser WITH PASSWORD 'secret';
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;

-- 备份
pg_dump mydb > backup.sql

-- 恢复
psql mydb < backup.sql
```

## Gotchas

### FATAL: role "username" does not exist

```bash
# 创建用户
sudo -u postgres createuser --interactive

# 或在 psql 中
CREATE USER myuser WITH PASSWORD 'password';
```

### Connection refused

```bash
# 检查 PostgreSQL 是否运行
sudo systemctl status postgresql

# 检查 pg_hba.conf 认证配置
# 位置：/etc/postgresql/17/main/pg_hba.conf
```

### Permission denied for table

```sql
-- 授予权限
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO myuser;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO myuser;
```

### 数据库编码问题

```sql
-- 创建数据库时指定编码
CREATE DATABASE mydb
    WITH ENCODING 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8';
```

## Next Steps

- [PostgreSQL 官方文档](https://www.postgresql.org/docs/)
- [PostgreSQL 教程](https://www.postgresqltutorial.com/)
- [pgAdmin 图形界面](https://www.pgadmin.org/)
- [Supabase (Postgres 平台)](https://supabase.com/)
