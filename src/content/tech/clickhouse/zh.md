---
title: "ClickHouse"
description: "5 分钟快速入门 ClickHouse"
template: "tool"
tags: ["database", "analytics", "olap"]
---

## TL;DR

**是什么**：面向在线分析处理（OLAP）的列式数据库。

**为什么用**：数十亿行数据的极速查询、实时分析、数据压缩。

## Quick Start

**使用 Docker 安装**：
```bash
docker run -d --name clickhouse \
  -p 8123:8123 -p 9000:9000 \
  clickhouse/clickhouse-server
```

**连接**：
```bash
docker exec -it clickhouse clickhouse-client
```

**创建表并插入数据**：
```sql
CREATE TABLE events (
  event_date Date,
  event_time DateTime,
  user_id UInt32,
  event_type String,
  value Float64
) ENGINE = MergeTree()
ORDER BY (event_date, user_id);

INSERT INTO events VALUES
  ('2024-01-01', '2024-01-01 10:00:00', 1, 'click', 1.5),
  ('2024-01-01', '2024-01-01 10:05:00', 2, 'view', 0.5);
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `SHOW DATABASES` | 列出数据库 |
| `SHOW TABLES` | 列出表 |
| `DESCRIBE table` | 显示表结构 |
| `SELECT * FROM table` | 查询数据 |
| `INSERT INTO table VALUES (...)` | 插入数据 |
| `DROP TABLE table` | 删除表 |

## Gotchas

### 表引擎

```sql
-- MergeTree（最常用）
CREATE TABLE logs (
  timestamp DateTime,
  level String,
  message String
) ENGINE = MergeTree()
ORDER BY timestamp;

-- ReplacingMergeTree（去重）
CREATE TABLE users (
  id UInt32,
  name String,
  updated_at DateTime
) ENGINE = ReplacingMergeTree(updated_at)
ORDER BY id;

-- SummingMergeTree（聚合）
CREATE TABLE metrics (
  date Date,
  name String,
  value Int64
) ENGINE = SummingMergeTree()
ORDER BY (date, name);
```

### 分析查询

```sql
-- 聚合
SELECT
  toDate(event_time) as date,
  count() as events,
  uniq(user_id) as unique_users
FROM events
GROUP BY date
ORDER BY date;

-- 时间序列
SELECT
  toStartOfHour(event_time) as hour,
  count() as count
FROM events
WHERE event_date = today()
GROUP BY hour;

-- Top N
SELECT user_id, count() as cnt
FROM events
GROUP BY user_id
ORDER BY cnt DESC
LIMIT 10;
```

### 数据类型

```sql
-- 数值
UInt8, UInt16, UInt32, UInt64
Int8, Int16, Int32, Int64
Float32, Float64

-- 字符串
String, FixedString(N)

-- 日期/时间
Date, DateTime, DateTime64

-- 数组
Array(T)

-- 可空
Nullable(T)
```

### 物化视图

```sql
CREATE MATERIALIZED VIEW daily_stats
ENGINE = SummingMergeTree()
ORDER BY date
AS SELECT
  toDate(event_time) as date,
  count() as events
FROM events
GROUP BY date;
```

## Next Steps

- [ClickHouse 文档](https://clickhouse.com/docs/) - 官方文档
- [ClickHouse Playground](https://play.clickhouse.com/) - 在线练习
- [ClickHouse 教程](https://clickhouse.com/docs/en/getting-started/tutorial) - 教程
- [ClickHouse Cloud](https://clickhouse.cloud/) - 托管服务
