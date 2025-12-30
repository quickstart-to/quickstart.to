---
title: "ClickHouse"
description: "Comienza con ClickHouse en 5 minutos"
template: "tool"
tags: ["database", "analytics", "olap"]
---

## TL;DR

**Qué**: Una base de datos orientada a columnas para procesamiento analítico en línea (OLAP).

**Por qué**: Consultas ultrarrápidas en miles de millones de filas, análisis en tiempo real, compresión de datos.

## Quick Start

**Instalar con Docker**:
```bash
docker run -d --name clickhouse \
  -p 8123:8123 -p 9000:9000 \
  clickhouse/clickhouse-server
```

**Conectar**:
```bash
docker exec -it clickhouse clickhouse-client
```

**Crear tabla e insertar datos**:
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

| Comando | Descripción |
|---------|-------------|
| `SHOW DATABASES` | Listar bases de datos |
| `SHOW TABLES` | Listar tablas |
| `DESCRIBE table` | Mostrar estructura de tabla |
| `SELECT * FROM table` | Consultar datos |
| `INSERT INTO table VALUES (...)` | Insertar datos |
| `DROP TABLE table` | Eliminar tabla |

## Gotchas

### Table engines

```sql
-- MergeTree (más común)
CREATE TABLE logs (
  timestamp DateTime,
  level String,
  message String
) ENGINE = MergeTree()
ORDER BY timestamp;

-- ReplacingMergeTree (deduplicación)
CREATE TABLE users (
  id UInt32,
  name String,
  updated_at DateTime
) ENGINE = ReplacingMergeTree(updated_at)
ORDER BY id;

-- SummingMergeTree (agregación)
CREATE TABLE metrics (
  date Date,
  name String,
  value Int64
) ENGINE = SummingMergeTree()
ORDER BY (date, name);
```

### Analytics queries

```sql
-- Agregaciones
SELECT
  toDate(event_time) as date,
  count() as events,
  uniq(user_id) as unique_users
FROM events
GROUP BY date
ORDER BY date;

-- Series temporales
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
-- Numérico
UInt8, UInt16, UInt32, UInt64
Int8, Int16, Int32, Int64
Float32, Float64

-- Cadena
String, FixedString(N)

-- Fecha/Hora
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

- [Documentación de ClickHouse](https://clickhouse.com/docs/) - Documentación oficial
- [ClickHouse Playground](https://play.clickhouse.com/) - Playground en línea
- [Tutoriales de ClickHouse](https://clickhouse.com/docs/en/getting-started/tutorial) - Tutoriales
- [ClickHouse Cloud](https://clickhouse.cloud/) - Servicio gestionado
