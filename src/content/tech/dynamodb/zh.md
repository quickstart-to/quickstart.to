---
title: "DynamoDB"
description: "AWS 托管 NoSQL 键值数据库 - 无服务器、毫秒延迟、自动扩展"
template: "tool"
tags: ["database", "nosql", "aws", "serverless"]
---

## TL;DR

**是什么**：AWS 的完全托管 NoSQL 键值数据库。

**为什么用**：无服务器、毫秒级延迟、自动扩展、按用量付费。

## Quick Start

**本地开发（Docker）**：
```bash
docker run -p 8000:8000 amazon/dynamodb-local
```

**安装 AWS CLI**：
```bash
pip install awscli
aws configure  # 本地使用虚拟值即可
```

**创建表**：
```bash
aws dynamodb create-table \
  --table-name Users \
  --attribute-definitions AttributeName=userId,AttributeType=S \
  --key-schema AttributeName=userId,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --endpoint-url http://localhost:8000
```

**或使用 AWS SDK**：
```javascript
import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";
const client = new DynamoDBClient({ region: "us-east-1" });
```

## Cheatsheet

| 操作 | AWS CLI |
|-----------|---------|
| 列出表 | `aws dynamodb list-tables` |
| 描述表 | `aws dynamodb describe-table --table-name Name` |
| 放入项目 | `aws dynamodb put-item --table-name Name --item '{}'` |
| 获取项目 | `aws dynamodb get-item --table-name Name --key '{}'` |
| 查询 | `aws dynamodb query --table-name Name ...` |
| 扫描 | `aws dynamodb scan --table-name Name` |
| 删除项目 | `aws dynamodb delete-item --table-name Name --key '{}'` |

## Gotchas

### SDK CRUD（JavaScript）

```javascript
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// 放入项目
await docClient.send(new PutCommand({
  TableName: "Users",
  Item: { userId: "123", name: "John", email: "john@example.com" }
}));

// 获取项目
const { Item } = await docClient.send(new GetCommand({
  TableName: "Users",
  Key: { userId: "123" }
}));

// 查询（需要分区键）
const { Items } = await docClient.send(new QueryCommand({
  TableName: "Orders",
  KeyConditionExpression: "userId = :uid",
  ExpressionAttributeValues: { ":uid": "123" }
}));

// 删除
await docClient.send(new DeleteCommand({
  TableName: "Users",
  Key: { userId: "123" }
}));
```

### 键设计

```javascript
// 简单主键（仅分区键）
{ userId: "HASH" }

// 复合主键
{ userId: "HASH", orderId: "RANGE" }

// 全局二级索引（GSI）
// 允许按不同属性查询
```

### 条件写入

```javascript
await docClient.send(new PutCommand({
  TableName: "Users",
  Item: { userId: "123", name: "John" },
  ConditionExpression: "attribute_not_exists(userId)"
}));
```

## Next Steps

- [DynamoDB 文档](https://docs.aws.amazon.com/dynamodb/) - 官方文档
- [DynamoDB Guide](https://www.dynamodbguide.com/) - 社区指南
- [NoSQL Workbench](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.html) - GUI 工具
- [单表设计](https://www.alexdebrie.com/posts/dynamodb-single-table/) - 最佳实践
