---
title: "Elasticsearch"
description: "Verteilte Such- und Analyse-Engine - Volltextsuche, Log-Analyse, Echtzeit-Datenexploration"
template: "tool"
tags: ["database", "search", "analytics"]
---

## TL;DR

**Was**: Eine verteilte Such- und Analyse-Engine.

**Warum**: Volltextsuche, Echtzeit-Analysen, Log-Analyse, skalierbar.

## Quick Start

**Installation mit Docker**:
```bash
docker run -d --name elasticsearch \
  -p 9200:9200 -p 9300:9300 \
  -e "discovery.type=single-node" \
  -e "xpack.security.enabled=false" \
  docker.elastic.co/elasticsearch/elasticsearch:8.11.0
```

**Verifizieren**:
```bash
curl http://localhost:9200
```

**Dokument indexieren**:
```bash
curl -X POST "localhost:9200/users/_doc" \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com"}'
```

**Suchen**:
```bash
curl "localhost:9200/users/_search?q=name:john"
```

## Cheatsheet

| Operation | Endpoint |
|-----------|----------|
| Index erstellen | `PUT /index` |
| Dokument indexieren | `POST /index/_doc` |
| Dokument abrufen | `GET /index/_doc/id` |
| Suchen | `GET /index/_search` |
| Aktualisieren | `POST /index/_update/id` |
| Löschen | `DELETE /index/_doc/id` |
| Index löschen | `DELETE /index` |

## Gotchas

### Index and document operations

```bash
# Index mit Mapping erstellen
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

# Mit spezifischer ID indexieren
curl -X PUT "localhost:9200/products/_doc/1" -H "Content-Type: application/json" -d '
{
  "name": "Laptop",
  "price": 999.99,
  "tags": ["electronics", "computer"]
}'
```

### Search queries

```bash
# Match-Abfrage (Volltext)
curl -X GET "localhost:9200/products/_search" -H "Content-Type: application/json" -d '
{
  "query": {
    "match": { "name": "laptop" }
  }
}'

# Bool-Abfrage (komplex)
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

- [Elasticsearch Guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html) - Offizielle Docs
- [Elasticsearch Tutorial](https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html) - Erste Schritte
- [Kibana](https://www.elastic.co/kibana) - Visualisierungstool
- [Elasticsearch Clients](https://www.elastic.co/guide/en/elasticsearch/client/index.html) - Sprach-Clients
