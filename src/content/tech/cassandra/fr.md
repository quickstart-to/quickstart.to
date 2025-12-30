---
title: "Apache Cassandra"
description: "Démarrez avec Apache Cassandra en 5 minutes"
template: "tool"
tags: ["database", "nosql", "distributed"]
---

## TL;DR

**Quoi**: Une base de données NoSQL distribuée conçue pour la haute disponibilité et la scalabilité.

**Pourquoi**: Pas de point unique de défaillance, scalabilité linéaire, gère d'énormes volumes de données.

## Quick Start

**Installer avec Docker**:
```bash
docker run --name cassandra -p 9042:9042 -d cassandra:latest
```

**Se connecter**:
```bash
docker exec -it cassandra cqlsh
```

**Créer keyspace et table**:
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

| Commande | Description |
|----------|-------------|
| `DESCRIBE KEYSPACES;` | Lister les keyspaces |
| `USE keyspace;` | Sélectionner un keyspace |
| `DESCRIBE TABLES;` | Lister les tables |
| `DESCRIBE TABLE name;` | Afficher le schéma de table |
| `SELECT * FROM table;` | Interroger les données |
| `INSERT INTO table (...) VALUES (...);` | Insérer des données |
| `EXIT;` | Quitter cqlsh |

## Gotchas

### Data modeling (query-first)

```sql
-- Concevoir les tables en fonction des requêtes, pas des relations
-- Requête: Obtenir tous les posts par utilisateur, triés par date
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
-- Insertion
INSERT INTO users (user_id, name, email, created_at)
VALUES (uuid(), 'John', 'john@example.com', toTimestamp(now()));

-- Sélection
SELECT * FROM users WHERE user_id = some-uuid;

-- Mise à jour
UPDATE users SET name = 'Johnny'
WHERE user_id = some-uuid;

-- Suppression
DELETE FROM users WHERE user_id = some-uuid;
```

### Primary key structure

```sql
-- Clé de partition uniquement
PRIMARY KEY (user_id)

-- Clé de partition + colonne de clustering
PRIMARY KEY (user_id, created_at)

-- Clé de partition composite
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

- [Documentation Cassandra](https://cassandra.apache.org/doc/latest/) - Documentation officielle
- [DataStax Academy](https://academy.datastax.com/) - Cours gratuits
- [Référence CQL](https://cassandra.apache.org/doc/latest/cassandra/cql/) - Langage de requête
- [DataStax Astra](https://astra.datastax.com/) - Cloud Cassandra
