---
title: "Elasticsearch"
description: "Moteur de recherche et d'analyse distribue - recherche full-text, analyse de logs, exploration de donnees en temps reel"
template: "tool"
tags: ["database", "search", "analytics"]
---

## TL;DR

**Quoi** : Un moteur de recherche et d'analyse distribué.

**Pourquoi** : Recherche full-text, analytique en temps réel, analyse de logs, évolutif.

## Quick Start

**Installation avec Docker** :
```bash
docker run -d --name elasticsearch \
  -p 9200:9200 -p 9300:9300 \
  -e "discovery.type=single-node" \
  -e "xpack.security.enabled=false" \
  docker.elastic.co/elasticsearch/elasticsearch:8.11.0
```

**Vérifier** :
```bash
curl http://localhost:9200
```

**Indexer un document** :
```bash
curl -X POST "localhost:9200/users/_doc" \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com"}'
```

**Rechercher** :
```bash
curl "localhost:9200/users/_search?q=name:john"
```

## Cheatsheet

| Opération | Endpoint |
|-----------|----------|
| Créer un index | `PUT /index` |
| Indexer un document | `POST /index/_doc` |
| Récupérer un document | `GET /index/_doc/id` |
| Rechercher | `GET /index/_search` |
| Mettre à jour | `POST /index/_update/id` |
| Supprimer | `DELETE /index/_doc/id` |
| Supprimer l'index | `DELETE /index` |

## Gotchas

### Index and document operations

```bash
# Créer un index avec mapping
curl -X PUT "localhost:9200/products" -H "Content-Type: application/json" -d '
{
  "mappings": {
    "properties": {
      "name": { "type": "text" },
      "price": { "type": "float" },
      "tags": { "type": "keyword" }
    }
  }
}'

# Indexer avec un ID spécifique
curl -X PUT "localhost:9200/products/_doc/1" -H "Content-Type: application/json" -d '
{
  "name": "Laptop",
  "price": 999.99,
  "tags": ["electronics", "computer"]
}'
```

### Search queries

```bash
# Requête match (full-text)
curl -X GET "localhost:9200/products/_search" -H "Content-Type: application/json" -d '
{
  "query": {
    "match": { "name": "laptop" }
  }
}'

# Requête bool (complexe)
curl -X GET "localhost:9200/products/_search" -H "Content-Type: application/json" -d '
{
  "query": {
    "bool": {
      "must": [{ "match": { "name": "laptop" }}],
      "filter": [{ "range": { "price": { "lte": 1000 }}}]
    }
  }
}'
```

### Aggregations

```bash
curl -X GET "localhost:9200/products/_search" -H "Content-Type: application/json" -d '
{
  "size": 0,
  "aggs": {
    "avg_price": { "avg": { "field": "price" }},
    "by_tag": { "terms": { "field": "tags" }}
  }
}'
```

## Next Steps

- [Guide Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html) - Docs officielles
- [Tutoriel Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html) - Premiers pas
- [Kibana](https://www.elastic.co/kibana) - Outil de visualisation
- [Clients Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/client/index.html) - Clients par langage
