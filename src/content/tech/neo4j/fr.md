---
title: "Neo4j"
description: "Base de donnees graphe native - langage Cypher, modelisation relationnelle, traversees rapides"
template: "tool"
tags: ["database", "graph", "nosql"]
---

## TL;DR

**Quoi** : Une base de données graphe native pour les données connectées.

**Pourquoi** : Orientée relations, modélisation intuitive, traversées puissantes, langage de requête Cypher.

## Quick Start

**Installer avec Docker** :
```bash
docker run --name neo4j -p 7474:7474 -p 7687:7687 \
  -e NEO4J_AUTH=neo4j/password \
  -d neo4j:latest
```

**Accès** : Ouvrez http://localhost:7474 (Interface navigateur)

**Connexion** : Utilisez `neo4j` / `password`

**Créer des nœuds et relations** :
```cypher
CREATE (john:Person {name: 'John', age: 30})
CREATE (jane:Person {name: 'Jane', age: 28})
CREATE (john)-[:KNOWS]->(jane)
RETURN john, jane
```

## Cheatsheet

| Opération | Cypher |
|-----------|--------|
| Créer un nœud | `CREATE (n:Label {props})` |
| Créer une relation | `CREATE (a)-[:TYPE]->(b)` |
| Trouver des nœuds | `MATCH (n:Label) RETURN n` |
| Trouver par propriété | `MATCH (n {name: 'John'}) RETURN n` |
| Trouver des relations | `MATCH (a)-[r:TYPE]->(b) RETURN r` |
| Mettre à jour | `SET n.prop = value` |
| Supprimer | `DELETE n` ou `DETACH DELETE n` |

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

- [Neo4j Documentation](https://neo4j.com/docs/) - Documentation officielle
- [Cypher Manual](https://neo4j.com/docs/cypher-manual/) - Langage de requête
- [Neo4j Sandbox](https://neo4j.com/sandbox/) - Instance cloud gratuite
- [GraphAcademy](https://graphacademy.neo4j.com/) - Cours gratuits
