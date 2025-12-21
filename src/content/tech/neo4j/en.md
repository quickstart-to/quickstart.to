---
title: "Neo4j"
description: "Get started with Neo4j graph database in 5 minutes"
tags: ["database", "graph", "nosql"]
---

## TL;DR

**What**: A native graph database for connected data.

**Why**: Relationship-first, intuitive data modeling, powerful traversals, Cypher query language.

## Quick Start

**Install with Docker**:
```bash
docker run --name neo4j -p 7474:7474 -p 7687:7687 \
  -e NEO4J_AUTH=neo4j/password \
  -d neo4j:latest
```

**Access**: Open http://localhost:7474 (Browser UI)

**Connect**: Use `neo4j` / `password`

**Create nodes and relationships**:
```cypher
CREATE (john:Person {name: 'John', age: 30})
CREATE (jane:Person {name: 'Jane', age: 28})
CREATE (john)-[:KNOWS]->(jane)
RETURN john, jane
```

## Cheatsheet

| Operation | Cypher |
|-----------|--------|
| Create node | `CREATE (n:Label {props})` |
| Create relationship | `CREATE (a)-[:TYPE]->(b)` |
| Find nodes | `MATCH (n:Label) RETURN n` |
| Find by property | `MATCH (n {name: 'John'}) RETURN n` |
| Find relationships | `MATCH (a)-[r:TYPE]->(b) RETURN r` |
| Update | `SET n.prop = value` |
| Delete | `DELETE n` or `DETACH DELETE n` |

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

- [Neo4j Documentation](https://neo4j.com/docs/) - Official docs
- [Cypher Manual](https://neo4j.com/docs/cypher-manual/) - Query language
- [Neo4j Sandbox](https://neo4j.com/sandbox/) - Free cloud instance
- [GraphAcademy](https://graphacademy.neo4j.com/) - Free courses
