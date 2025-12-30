---
title: "ClickHouse"
description: "Spaltenorientierte OLAP-Datenbank - blitzschnelle Analysen auf Milliarden Zeilen, Echtzeit-Aggregationen"
template: "tool"
tags: ["database", "analytics", "olap"]
---

## TL;DR

**Was**: Eine spaltenorientierte Datenbank für Online Analytical Processing (OLAP).

**Warum**: Blitzschnelle Abfragen auf Milliarden von Zeilen, Echtzeit-Analysen, Datenkompression.

## Quick Start

**Mit Docker installieren**:
```bash
docker run -d --name clickhouse \
  -p 8123:8123 -p 9000:9000 \
  clickhouse/clickhouse-server
```

**Verbinden**:
```bash
docker exec -it clickhouse clickhouse-client
```

**Tabelle erstellen und Daten einfügen**:
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

| Befehl | Beschreibung |
|--------|--------------|
| `SHOW DATABASES` | Datenbanken auflisten |
| `SHOW TABLES` | Tabellen auflisten |
| `DESCRIBE table` | Tabellenstruktur anzeigen |
| `SELECT * FROM table` | Daten abfragen |
| `INSERT INTO table VALUES (...)` | Daten einfügen |
| `DROP TABLE table` | Tabelle löschen |

## Gotchas

### Table engines

```sql
-- MergeTree (am häufigsten)
CREATE TABLE logs (
  timestamp DateTime,
  level String,
  message String
) ENGINE = MergeTree()
ORDER BY timestamp;

-- ReplacingMergeTree (Deduplizierung)
CREATE TABLE users (
  id UInt32,
  name String,
  updated_at DateTime
) ENGINE = ReplacingMergeTree(updated_at)
ORDER BY id;

-- SummingMergeTree (Aggregation)
CREATE TABLE metrics (
  date Date,
  name String,
  value Int64
) ENGINE = SummingMergeTree()
ORDER BY (date, name);
```

### Analytics queries

```sql
-- Aggregationen
SELECT
  toDate(event_time) as date,
  count() as events,
  uniq(user_id) as unique_users
FROM events
GROUP BY date
ORDER BY date;

-- Zeitreihen
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
-- Numerisch
UInt8, UInt16, UInt32, UInt64
Int8, Int16, Int32, Int64
Float32, Float64

-- String
String, FixedString(N)

-- Datum/Zeit
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

- [ClickHouse-Dokumentation](https://clickhouse.com/docs/) - Offizielle Dokumentation
- [ClickHouse Playground](https://play.clickhouse.com/) - Online-Spielwiese
- [ClickHouse-Tutorials](https://clickhouse.com/docs/en/getting-started/tutorial) - Tutorials
- [ClickHouse Cloud](https://clickhouse.cloud/) - Managed Service
