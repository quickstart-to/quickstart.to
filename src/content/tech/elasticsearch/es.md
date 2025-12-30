---
title: "Elasticsearch"
description: "Motor de busqueda y analisis distribuido - busqueda full-text, analisis de logs, exploracion de datos en tiempo real"
template: "tool"
tags: ["database", "search", "analytics"]
---

## TL;DR

**Qué**: Un motor de búsqueda y análisis distribuido.

**Por qué**: Búsqueda full-text, análisis en tiempo real, análisis de logs, escalable.

## Quick Start

**Instalación con Docker**:
```bash
docker run -d --name elasticsearch \
  -p 9200:9200 -p 9300:9300 \
  -e "discovery.type=single-node" \
  -e "xpack.security.enabled=false" \
  docker.elastic.co/elasticsearch/elasticsearch:8.11.0
```

**Verificar**:
```bash
curl http://localhost:9200
```

**Indexar un documento**:
```bash
curl -X POST "localhost:9200/users/_doc" \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com"}'
```

**Buscar**:
```bash
curl "localhost:9200/users/_search?q=name:john"
```

## Cheatsheet

| Operación | Endpoint |
|-----------|----------|
| Crear índice | `PUT /index` |
| Indexar documento | `POST /index/_doc` |
| Obtener documento | `GET /index/_doc/id` |
| Buscar | `GET /index/_search` |
| Actualizar | `POST /index/_update/id` |
| Eliminar | `DELETE /index/_doc/id` |
| Eliminar índice | `DELETE /index` |

## Gotchas

### Index and document operations

```bash
# Crear índice con mapping
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

# Indexar con ID específico
curl -X PUT "localhost:9200/products/_doc/1" -H "Content-Type: application/json" -d '
{
  "name": "Laptop",
  "price": 999.99,
  "tags": ["electronics", "computer"]
}'
```

### Search queries

```bash
# Consulta match (full-text)
curl -X GET "localhost:9200/products/_search" -H "Content-Type: application/json" -d '
{
  "query": {
    "match": { "name": "laptop" }
  }
}'

# Consulta bool (compleja)
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

- [Guía de Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html) - Docs oficiales
- [Tutorial de Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html) - Primeros pasos
- [Kibana](https://www.elastic.co/kibana) - Herramienta de visualización
- [Clientes de Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/client/index.html) - Clientes por lenguaje
