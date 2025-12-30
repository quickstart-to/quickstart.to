---
title: "Neo4j"
description: "Native Graphdatenbank - Cypher-Abfragesprache, Beziehungsmodellierung, schnelle Traversierung"
template: "tool"
tags: ["database", "graph", "nosql"]
---

## TL;DR

**Was**: Eine native Graphdatenbank für verbundene Daten.

**Warum**: Beziehungsorientiert, intuitive Datenmodellierung, leistungsstarke Traversierungen, Cypher-Abfragesprache.

## Quick Start

**Mit Docker installieren**:
```bash
docker run --name neo4j -p 7474:7474 -p 7687:7687 \
  -e NEO4J_AUTH=neo4j/password \
  -d neo4j:latest
```

**Zugriff**: Öffnen Sie http://localhost:7474 (Browser-UI)

**Verbinden**: Verwenden Sie `neo4j` / `password`

**Knoten und Beziehungen erstellen**:
```cypher
CREATE (john:Person {name: 'John', age: 30})
CREATE (jane:Person {name: 'Jane', age: 28})
CREATE (john)-[:KNOWS]->(jane)
RETURN john, jane
```

## Cheatsheet

| Operation | Cypher |
|-----------|--------|
| Knoten erstellen | `CREATE (n:Label {props})` |
| Beziehung erstellen | `CREATE (a)-[:TYPE]->(b)` |
| Knoten finden | `MATCH (n:Label) RETURN n` |
| Nach Eigenschaft finden | `MATCH (n {name: 'John'}) RETURN n` |
| Beziehungen finden | `MATCH (a)-[r:TYPE]->(b) RETURN r` |
| Aktualisieren | `SET n.prop = value` |
| Löschen | `DELETE n` oder `DETACH DELETE n` |

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

- [Neo4j Documentation](https://neo4j.com/docs/) - Offizielle Dokumentation
- [Cypher Manual](https://neo4j.com/docs/cypher-manual/) - Abfragesprache
- [Neo4j Sandbox](https://neo4j.com/sandbox/) - Kostenlose Cloud-Instanz
- [GraphAcademy](https://graphacademy.neo4j.com/) - Kostenlose Kurse
