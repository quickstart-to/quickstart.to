---
title: "ClickHouse"
description: "Column-oriented OLAP database - blazing fast analytics on billions of rows, real-time aggregations"
template: "tool"
tags: ["database", "analytics", "olap"]
---

## TL;DR

**What**: A column-oriented database for online analytical processing (OLAP).

**Why**: Blazing fast queries on billions of rows, real-time analytics, data compression.

## Quick Start

**Install with Docker**:
```bash
docker run -d --name clickhouse \
  -p 8123:8123 -p 9000:9000 \
  clickhouse/clickhouse-server
```

**Connect**:
```bash
docker exec -it clickhouse clickhouse-client
```

**Create table and insert data**:
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

| Command | Description |
|---------|-------------|
| `SHOW DATABASES` | List databases |
| `SHOW TABLES` | List tables |
| `DESCRIBE table` | Show table structure |
| `SELECT * FROM table` | Query data |
| `INSERT INTO table VALUES (...)` | Insert data |
| `DROP TABLE table` | Delete table |

## Gotchas

### Table engines

```sql
-- MergeTree (most common)
CREATE TABLE logs (
  timestamp DateTime,
  level String,
  message String
) ENGINE = MergeTree()
ORDER BY timestamp;

-- ReplacingMergeTree (deduplication)
CREATE TABLE users (
  id UInt32,
  name String,
  updated_at DateTime
) ENGINE = ReplacingMergeTree(updated_at)
ORDER BY id;

-- SummingMergeTree (aggregation)
CREATE TABLE metrics (
  date Date,
  name String,
  value Int64
) ENGINE = SummingMergeTree()
ORDER BY (date, name);
```

### Analytics queries

```sql
-- Aggregations
SELECT
  toDate(event_time) as date,
  count() as events,
  uniq(user_id) as unique_users
FROM events
GROUP BY date
ORDER BY date;

-- Time series
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

### Data types

```sql
-- Numeric
UInt8, UInt16, UInt32, UInt64
Int8, Int16, Int32, Int64
Float32, Float64

-- String
String, FixedString(N)

-- Date/Time
Date, DateTime, DateTime64

-- Arrays
Array(T)

-- Nullable
Nullable(T)
```

### Materialized views

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

- [ClickHouse Documentation](https://clickhouse.com/docs/) - Official docs
- [ClickHouse Playground](https://play.clickhouse.com/) - Online playground
- [ClickHouse Tutorials](https://clickhouse.com/docs/en/getting-started/tutorial) - Tutorials
- [ClickHouse Cloud](https://clickhouse.cloud/) - Managed service
