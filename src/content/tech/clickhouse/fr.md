---
title: "ClickHouse"
description: "Base de donnees OLAP orientee colonnes - analyses ultra-rapides sur milliards de lignes, agregations temps reel"
template: "tool"
tags: ["database", "analytics", "olap"]
---

## TL;DR

**Quoi**: Une base de données orientée colonnes pour le traitement analytique en ligne (OLAP).

**Pourquoi**: Requêtes ultra-rapides sur des milliards de lignes, analyses en temps réel, compression des données.

## Quick Start

**Installer avec Docker**:
```bash
docker run -d --name clickhouse \
  -p 8123:8123 -p 9000:9000 \
  clickhouse/clickhouse-server
```

**Se connecter**:
```bash
docker exec -it clickhouse clickhouse-client
```

**Créer une table et insérer des données**:
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

| Commande | Description |
|----------|-------------|
| `SHOW DATABASES` | Lister les bases de données |
| `SHOW TABLES` | Lister les tables |
| `DESCRIBE table` | Afficher la structure de la table |
| `SELECT * FROM table` | Interroger les données |
| `INSERT INTO table VALUES (...)` | Insérer des données |
| `DROP TABLE table` | Supprimer une table |

## Gotchas

### Table engines

```sql
-- MergeTree (le plus courant)
CREATE TABLE logs (
  timestamp DateTime,
  level String,
  message String
) ENGINE = MergeTree()
ORDER BY timestamp;

-- ReplacingMergeTree (déduplication)
CREATE TABLE users (
  id UInt32,
  name String,
  updated_at DateTime
) ENGINE = ReplacingMergeTree(updated_at)
ORDER BY id;

-- SummingMergeTree (agrégation)
CREATE TABLE metrics (
  date Date,
  name String,
  value Int64
) ENGINE = SummingMergeTree()
ORDER BY (date, name);
```

### Analytics queries

```sql
-- Agrégations
SELECT
  toDate(event_time) as date,
  count() as events,
  uniq(user_id) as unique_users
FROM events
GROUP BY date
ORDER BY date;

-- Séries temporelles
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
-- Numérique
UInt8, UInt16, UInt32, UInt64
Int8, Int16, Int32, Int64
Float32, Float64

-- Chaîne
String, FixedString(N)

-- Date/Heure
Date, DateTime, DateTime64

-- Tableaux
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

- [Documentation ClickHouse](https://clickhouse.com/docs/) - Documentation officielle
- [ClickHouse Playground](https://play.clickhouse.com/) - Playground en ligne
- [Tutoriels ClickHouse](https://clickhouse.com/docs/en/getting-started/tutorial) - Tutoriels
- [ClickHouse Cloud](https://clickhouse.cloud/) - Service managé
