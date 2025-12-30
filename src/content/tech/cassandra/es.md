---
title: "Apache Cassandra"
description: "Comienza con Apache Cassandra en 5 minutos"
template: "tool"
tags: ["database", "nosql", "distributed"]
---

## TL;DR

**Qué**: Una base de datos NoSQL distribuida diseñada para alta disponibilidad y escalabilidad.

**Por qué**: Sin punto único de fallo, escalabilidad lineal, maneja volúmenes masivos de datos.

## Quick Start

**Instalar con Docker**:
```bash
docker run --name cassandra -p 9042:9042 -d cassandra:latest
```

**Conectar**:
```bash
docker exec -it cassandra cqlsh
```

**Crear keyspace y tabla**:
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

| Comando | Descripción |
|---------|-------------|
| `DESCRIBE KEYSPACES;` | Listar keyspaces |
| `USE keyspace;` | Seleccionar keyspace |
| `DESCRIBE TABLES;` | Listar tablas |
| `DESCRIBE TABLE name;` | Mostrar esquema de tabla |
| `SELECT * FROM table;` | Consultar datos |
| `INSERT INTO table (...) VALUES (...);` | Insertar datos |
| `EXIT;` | Salir de cqlsh |

## Gotchas

### Data modeling (query-first)

```sql
-- Diseñar tablas basándose en consultas, no relaciones
-- Consulta: Obtener todos los posts por usuario, ordenados por tiempo
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
-- Insertar
INSERT INTO users (user_id, name, email, created_at)
VALUES (uuid(), 'John', 'john@example.com', toTimestamp(now()));

-- Seleccionar
SELECT * FROM users WHERE user_id = some-uuid;

-- Actualizar
UPDATE users SET name = 'Johnny'
WHERE user_id = some-uuid;

-- Eliminar
DELETE FROM users WHERE user_id = some-uuid;
```

### Primary key structure

```sql
-- Solo clave de partición
PRIMARY KEY (user_id)

-- Clave de partición + columna de clustering
PRIMARY KEY (user_id, created_at)

-- Clave de partición compuesta
PRIMARY KEY ((country, city), user_id)
```

### Collections

```sql
-- Lista
emails LIST<TEXT>

-- Set
tags SET<TEXT>

-- Map
properties MAP<TEXT, TEXT>
```

## Next Steps

- [Documentación de Cassandra](https://cassandra.apache.org/doc/latest/) - Documentación oficial
- [DataStax Academy](https://academy.datastax.com/) - Cursos gratuitos
- [Referencia CQL](https://cassandra.apache.org/doc/latest/cassandra/cql/) - Lenguaje de consulta
- [DataStax Astra](https://astra.datastax.com/) - Cloud Cassandra
