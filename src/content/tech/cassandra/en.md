---
title: "Apache Cassandra"
description: "Distributed NoSQL database - linear scalability, no single point of failure, handles massive data volumes"
template: "tool"
tags: ["database", "nosql", "distributed"]
---

## TL;DR

**What**: A distributed NoSQL database designed for high availability and scalability.

**Why**: No single point of failure, linear scalability, handles massive data volumes.

## Quick Start

**Install with Docker**:
```bash
docker run --name cassandra -p 9042:9042 -d cassandra:latest
```

**Connect**:
```bash
docker exec -it cassandra cqlsh
```

**Create keyspace and table**:
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

| Command | Description |
|---------|-------------|
| `DESCRIBE KEYSPACES;` | List keyspaces |
| `USE keyspace;` | Select keyspace |
| `DESCRIBE TABLES;` | List tables |
| `DESCRIBE TABLE name;` | Show table schema |
| `SELECT * FROM table;` | Query data |
| `INSERT INTO table (...) VALUES (...);` | Insert data |
| `EXIT;` | Exit cqlsh |

## Gotchas

### Data modeling (query-first)

```sql
-- Design tables based on queries, not relationships
-- Query: Get all posts by user, sorted by time
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
-- Insert
INSERT INTO users (user_id, name, email, created_at)
VALUES (uuid(), 'John', 'john@example.com', toTimestamp(now()));

-- Select
SELECT * FROM users WHERE user_id = some-uuid;

-- Update
UPDATE users SET name = 'Johnny'
WHERE user_id = some-uuid;

-- Delete
DELETE FROM users WHERE user_id = some-uuid;
```

### Primary key structure

```sql
-- Partition key only
PRIMARY KEY (user_id)

-- Partition key + clustering column
PRIMARY KEY (user_id, created_at)

-- Composite partition key
PRIMARY KEY ((country, city), user_id)
```

### Collections

```sql
-- List
emails LIST<TEXT>

-- Set
tags SET<TEXT>

-- Map
properties MAP<TEXT, TEXT>
```

## Next Steps

- [Cassandra Documentation](https://cassandra.apache.org/doc/latest/) - Official docs
- [DataStax Academy](https://academy.datastax.com/) - Free courses
- [CQL Reference](https://cassandra.apache.org/doc/latest/cassandra/cql/) - Query language
- [DataStax Astra](https://astra.datastax.com/) - Cloud Cassandra
