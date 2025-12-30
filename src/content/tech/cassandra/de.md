---
title: "Apache Cassandra"
description: "Starten Sie mit Apache Cassandra in 5 Minuten"
template: "tool"
tags: ["database", "nosql", "distributed"]
---

## TL;DR

**Was**: Eine verteilte NoSQL-Datenbank für hohe Verfügbarkeit und Skalierbarkeit.

**Warum**: Kein Single Point of Failure, lineare Skalierbarkeit, verarbeitet massive Datenmengen.

## Quick Start

**Mit Docker installieren**:
```bash
docker run --name cassandra -p 9042:9042 -d cassandra:latest
```

**Verbinden**:
```bash
docker exec -it cassandra cqlsh
```

**Keyspace und Tabelle erstellen**:
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

| Befehl | Beschreibung |
|--------|--------------|
| `DESCRIBE KEYSPACES;` | Keyspaces auflisten |
| `USE keyspace;` | Keyspace auswählen |
| `DESCRIBE TABLES;` | Tabellen auflisten |
| `DESCRIBE TABLE name;` | Tabellenschema anzeigen |
| `SELECT * FROM table;` | Daten abfragen |
| `INSERT INTO table (...) VALUES (...);` | Daten einfügen |
| `EXIT;` | cqlsh beenden |

## Gotchas

### Data modeling (query-first)

```sql
-- Tabellen basierend auf Abfragen entwerfen, nicht Beziehungen
-- Abfrage: Alle Posts eines Benutzers, nach Zeit sortiert
CREATE TABLE posts_by_user (
  user_id UUID,
  post_id TIMEUUID,
  title TEXT,
  content TEXT,
  PRIMARY KEY (user_id, post_id)
) WITH CLUSTERING ORDER BY (post_id DESC);
```

### CRUD operations

```sql
-- Einfügen
INSERT INTO users (user_id, name, email, created_at)
VALUES (uuid(), 'John', 'john@example.com', toTimestamp(now()));

-- Auswählen
SELECT * FROM users WHERE user_id = some-uuid;

-- Aktualisieren
UPDATE users SET name = 'Johnny'
WHERE user_id = some-uuid;

-- Löschen
DELETE FROM users WHERE user_id = some-uuid;
```

### Primary key structure

```sql
-- Nur Partitionsschlüssel
PRIMARY KEY (user_id)

-- Partitionsschlüssel + Clustering-Spalte
PRIMARY KEY (user_id, created_at)

-- Zusammengesetzter Partitionsschlüssel
PRIMARY KEY ((country, city), user_id)
```

### Collections

```sql
-- Liste
emails LIST<TEXT>

-- Set
tags SET<TEXT>

-- Map
properties MAP<TEXT, TEXT>
```

## Next Steps

- [Cassandra-Dokumentation](https://cassandra.apache.org/doc/latest/) - Offizielle Dokumentation
- [DataStax Academy](https://academy.datastax.com/) - Kostenlose Kurse
- [CQL-Referenz](https://cassandra.apache.org/doc/latest/cassandra/cql/) - Abfragesprache
- [DataStax Astra](https://astra.datastax.com/) - Cloud Cassandra
