---
title: "Neo4j"
description: "Comienza con la base de datos de grafos Neo4j en 5 minutos"
template: "tool"
tags: ["database", "graph", "nosql"]
---

## TL;DR

**Qué**: Una base de datos de grafos nativa para datos conectados.

**Por qué**: Orientada a relaciones, modelado intuitivo, recorridos potentes, lenguaje de consulta Cypher.

## Quick Start

**Instalar con Docker**:
```bash
docker run --name neo4j -p 7474:7474 -p 7687:7687 \
  -e NEO4J_AUTH=neo4j/password \
  -d neo4j:latest
```

**Acceso**: Abre http://localhost:7474 (Interfaz del navegador)

**Conectar**: Usa `neo4j` / `password`

**Crear nodos y relaciones**:
```cypher
CREATE (john:Person {name: 'John', age: 30})
CREATE (jane:Person {name: 'Jane', age: 28})
CREATE (john)-[:KNOWS]->(jane)
RETURN john, jane
```

## Cheatsheet

| Operación | Cypher |
|-----------|--------|
| Crear nodo | `CREATE (n:Label {props})` |
| Crear relación | `CREATE (a)-[:TYPE]->(b)` |
| Encontrar nodos | `MATCH (n:Label) RETURN n` |
| Buscar por propiedad | `MATCH (n {name: 'John'}) RETURN n` |
| Encontrar relaciones | `MATCH (a)-[r:TYPE]->(b) RETURN r` |
| Actualizar | `SET n.prop = value` |
| Eliminar | `DELETE n` o `DETACH DELETE n` |

## Gotchas

### Basic CRUD

```cypher
// Create
CREATE (p:Person {name: 'Alice', email: 'alice@example.com'})

// Read
MATCH (p:Person {name: 'Alice'}) RETURN p

// Update
MATCH (p:Person {name: 'Alice'})
SET p.age = 25
RETURN p

// Delete (with relationships)
MATCH (p:Person {name: 'Alice'})
DETACH DELETE p
```

### Relationship patterns

```cypher
// Directed relationship
MATCH (a:Person)-[:KNOWS]->(b:Person)
RETURN a, b

// Undirected (any direction)
MATCH (a:Person)-[:KNOWS]-(b:Person)
RETURN a, b

// Multiple hops
MATCH (a:Person)-[:KNOWS*1..3]->(b:Person)
RETURN a, b

// Variable-length path
MATCH path = (a:Person)-[:KNOWS*]->(b:Person)
RETURN path
```

### Aggregations

```cypher
// Count friends
MATCH (p:Person)-[:KNOWS]->(friend)
RETURN p.name, count(friend) as friendCount

// Group by
MATCH (p:Person)
RETURN p.city, count(p) as population
ORDER BY population DESC
```

### Indexes

```cypher
// Create index
CREATE INDEX FOR (p:Person) ON (p.name)

// Create constraint (unique)
CREATE CONSTRAINT FOR (p:Person) REQUIRE p.email IS UNIQUE

// Show indexes
SHOW INDEXES
```

## Next Steps

- [Neo4j Documentation](https://neo4j.com/docs/) - Documentación oficial
- [Cypher Manual](https://neo4j.com/docs/cypher-manual/) - Lenguaje de consulta
- [Neo4j Sandbox](https://neo4j.com/sandbox/) - Instancia cloud gratuita
- [GraphAcademy](https://graphacademy.neo4j.com/) - Cursos gratuitos
