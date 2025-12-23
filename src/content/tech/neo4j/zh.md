---
title: "Neo4j"
description: "5 分钟快速入门 Neo4j 图数据库"
template: "tool"
tags: ["database", "graph", "nosql"]
---

## TL;DR

**是什么**：用于关联数据的原生图数据库。

**为什么用**：关系优先、直观的数据建模、强大的遍历能力、Cypher 查询语言。

## Quick Start

**使用 Docker 安装**：
```bash
docker run --name neo4j -p 7474:7474 -p 7687:7687 \
  -e NEO4J_AUTH=neo4j/password \
  -d neo4j:latest
```

**访问**：打开 http://localhost:7474（浏览器 UI）

**连接**：使用 `neo4j` / `password`

**创建节点和关系**：
```cypher
CREATE (john:Person {name: 'John', age: 30})
CREATE (jane:Person {name: 'Jane', age: 28})
CREATE (john)-[:KNOWS]->(jane)
RETURN john, jane
```

## Cheatsheet

| 操作 | Cypher |
|-----------|--------|
| 创建节点 | `CREATE (n:Label {props})` |
| 创建关系 | `CREATE (a)-[:TYPE]->(b)` |
| 查找节点 | `MATCH (n:Label) RETURN n` |
| 按属性查找 | `MATCH (n {name: 'John'}) RETURN n` |
| 查找关系 | `MATCH (a)-[r:TYPE]->(b) RETURN r` |
| 更新 | `SET n.prop = value` |
| 删除 | `DELETE n` 或 `DETACH DELETE n` |

## Gotchas

### 基础 CRUD

```cypher
// 创建
CREATE (p:Person {name: 'Alice', email: 'alice@example.com'})

// 读取
MATCH (p:Person {name: 'Alice'}) RETURN p

// 更新
MATCH (p:Person {name: 'Alice'})
SET p.age = 25
RETURN p

// 删除（包含关系）
MATCH (p:Person {name: 'Alice'})
DETACH DELETE p
```

### 关系模式

```cypher
// 有向关系
MATCH (a:Person)-[:KNOWS]->(b:Person)
RETURN a, b

// 无向（任意方向）
MATCH (a:Person)-[:KNOWS]-(b:Person)
RETURN a, b

// 多跳
MATCH (a:Person)-[:KNOWS*1..3]->(b:Person)
RETURN a, b

// 可变长度路径
MATCH path = (a:Person)-[:KNOWS*]->(b:Person)
RETURN path
```

### 聚合

```cypher
// 统计好友数
MATCH (p:Person)-[:KNOWS]->(friend)
RETURN p.name, count(friend) as friendCount

// 分组
MATCH (p:Person)
RETURN p.city, count(p) as population
ORDER BY population DESC
```

### 索引

```cypher
// 创建索引
CREATE INDEX FOR (p:Person) ON (p.name)

// 创建约束（唯一）
CREATE CONSTRAINT FOR (p:Person) REQUIRE p.email IS UNIQUE

// 显示索引
SHOW INDEXES
```

## Next Steps

- [Neo4j 文档](https://neo4j.com/docs/) - 官方文档
- [Cypher 手册](https://neo4j.com/docs/cypher-manual/) - 查询语言
- [Neo4j Sandbox](https://neo4j.com/sandbox/) - 免费云实例
- [GraphAcademy](https://graphacademy.neo4j.com/) - 免费课程
