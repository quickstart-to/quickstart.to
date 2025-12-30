---
title: "Elasticsearch"
description: "Distributed search and analytics engine - full-text search, log analysis, real-time data exploration"
template: "tool"
tags: ["database", "search", "analytics"]
---

## TL;DR

**What**: A distributed search and analytics engine.

**Why**: Full-text search, real-time analytics, log analysis, scalable.

## Quick Start

**Install with Docker**:
```bash
docker run -d --name elasticsearch \
  -p 9200:9200 -p 9300:9300 \
  -e "discovery.type=single-node" \
  -e "xpack.security.enabled=false" \
  docker.elastic.co/elasticsearch/elasticsearch:8.11.0
```

**Verify**:
```bash
curl http://localhost:9200
```

**Index a document**:
```bash
curl -X POST "localhost:9200/users/_doc" \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com"}'
```

**Search**:
```bash
curl "localhost:9200/users/_search?q=name:john"
```

## Cheatsheet

| Operation | Endpoint |
|-----------|----------|
| Create index | `PUT /index` |
| Index document | `POST /index/_doc` |
| Get document | `GET /index/_doc/id` |
| Search | `GET /index/_search` |
| Update | `POST /index/_update/id` |
| Delete | `DELETE /index/_doc/id` |
| Delete index | `DELETE /index` |

## Gotchas

### Index and document operations

```bash
# Create index with mapping
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

# Index with specific ID
curl -X PUT "localhost:9200/products/_doc/1" -H "Content-Type: application/json" -d '
{
  "name": "Laptop",
  "price": 999.99,
  "tags": ["electronics", "computer"]
}'
```

### Search queries

```bash
# Match query (full-text)
curl -X GET "localhost:9200/products/_search" -H "Content-Type: application/json" -d '
{
  "query": {
    "match": { "name": "laptop" }
  }
}'

# Bool query (complex)
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

- [Elasticsearch Guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html) - Official docs
- [Elasticsearch Tutorial](https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html) - Getting started
- [Kibana](https://www.elastic.co/kibana) - Visualization tool
- [Elasticsearch Clients](https://www.elastic.co/guide/en/elasticsearch/client/index.html) - Language clients
