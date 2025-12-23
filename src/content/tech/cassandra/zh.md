---
title: "Apache Cassandra"
description: "5 分钟快速入门 Apache Cassandra"
template: "tool"
tags: ["database", "nosql", "distributed"]
---

## TL;DR

**是什么**：为高可用性和可扩展性设计的分布式 NoSQL 数据库。

**为什么用**：无单点故障、线性扩展、处理海量数据。

## Quick Start

**使用 Docker 安装**：
```bash
docker run --name cassandra -p 9042:9042 -d cassandra:latest
```

**连接**：
```bash
docker exec -it cassandra cqlsh
```

**创建 keyspace 和表**：
```sql
CREATE KEYSPACE myapp WITH replication = {
  'class': 'SimpleStrategy',
  'replication_factor': 1
};

USE myapp;

CREATE TABLE users (
  user_id UUID PRIMARY KEY,
  name TEXT,
  email TEXT,
  created_at TIMESTAMP
);
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `DESCRIBE KEYSPACES;` | 列出 keyspaces |
| `USE keyspace;` | 选择 keyspace |
| `DESCRIBE TABLES;` | 列出表 |
| `DESCRIBE TABLE name;` | 显示表结构 |
| `SELECT * FROM table;` | 查询数据 |
| `INSERT INTO table (...) VALUES (...);` | 插入数据 |
| `EXIT;` | 退出 cqlsh |

## Gotchas

### 数据建模（查询优先）

```sql
-- 基于查询设计表，而非关系
-- 查询：获取用户的所有帖子，按时间排序
CREATE TABLE posts_by_user (
  user_id UUID,
  post_id TIMEUUID,
  title TEXT,
  content TEXT,
  PRIMARY KEY (user_id, post_id)
) WITH CLUSTERING ORDER BY (post_id DESC);
```

### CRUD 操作

```sql
-- 插入
INSERT INTO users (user_id, name, email, created_at)
VALUES (uuid(), 'John', 'john@example.com', toTimestamp(now()));

-- 查询
SELECT * FROM users WHERE user_id = some-uuid;

-- 更新
UPDATE users SET name = 'Johnny'
WHERE user_id = some-uuid;

-- 删除
DELETE FROM users WHERE user_id = some-uuid;
```

### 主键结构

```sql
-- 仅分区键
PRIMARY KEY (user_id)

-- 分区键 + 聚簇列
PRIMARY KEY (user_id, created_at)

-- 复合分区键
PRIMARY KEY ((country, city), user_id)
```

### 集合类型

```sql
-- 列表
emails LIST<TEXT>

-- 集合
tags SET<TEXT>

-- 映射
properties MAP<TEXT, TEXT>
```

## Next Steps

- [Cassandra 文档](https://cassandra.apache.org/doc/latest/) - 官方文档
- [DataStax Academy](https://academy.datastax.com/) - 免费课程
- [CQL 参考](https://cassandra.apache.org/doc/latest/cassandra/cql/) - 查询语言
- [DataStax Astra](https://astra.datastax.com/) - 云 Cassandra
