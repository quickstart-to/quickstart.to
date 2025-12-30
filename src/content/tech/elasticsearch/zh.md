---
title: "Elasticsearch"
description: "分布式搜索与分析引擎 - 全文检索、日志分析、实时数据探索"
template: "tool"
tags: ["database", "search", "analytics"]
---

## TL;DR

**是什么**：分布式搜索和分析引擎。

**为什么用**：全文搜索、实时分析、日志分析、可扩展。

## Quick Start

**使用 Docker 安装**：
```bash
docker run -d --name elasticsearch \
  -p 9200:9200 -p 9300:9300 \
  -e "discovery.type=single-node" \
  -e "xpack.security.enabled=false" \
  docker.elastic.co/elasticsearch/elasticsearch:8.11.0
```

**验证**：
```bash
curl http://localhost:9200
```

**索引文档**：
```bash
curl -X POST "localhost:9200/users/_doc" \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com"}'
```

**搜索**：
```bash
curl "localhost:9200/users/_search?q=name:john"
```

## Cheatsheet

| 操作 | 端点 |
|-----------|----------|
| 创建索引 | `PUT /index` |
| 索引文档 | `POST /index/_doc` |
| 获取文档 | `GET /index/_doc/id` |
| 搜索 | `GET /index/_search` |
| 更新 | `POST /index/_update/id` |
| 删除 | `DELETE /index/_doc/id` |
| 删除索引 | `DELETE /index` |

## Gotchas

### 索引和文档操作

```bash
# 创建带映射的索引
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

# 指定 ID 索引
curl -X PUT "localhost:9200/products/_doc/1" -H "Content-Type: application/json" -d '
{
  "name": "Laptop",
  "price": 999.99,
  "tags": ["electronics", "computer"]
}'
```

### 搜索查询

```bash
# Match 查询（全文）
curl -X GET "localhost:9200/products/_search" -H "Content-Type: application/json" -d '
{
  "query": {
    "match": { "name": "laptop" }
  }
}'

# Bool 查询（复杂）
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

### 聚合

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

- [Elasticsearch 指南](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html) - 官方文档
- [Elasticsearch 教程](https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html) - 入门指南
- [Kibana](https://www.elastic.co/kibana) - 可视化工具
- [Elasticsearch 客户端](https://www.elastic.co/guide/en/elasticsearch/client/index.html) - 语言客户端
