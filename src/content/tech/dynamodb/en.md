---
title: "DynamoDB"
description: "Get started with Amazon DynamoDB in 5 minutes"
template: "tool"
tags: ["database", "nosql", "aws", "serverless"]
---

## TL;DR

**What**: A fully managed NoSQL key-value database by AWS.

**Why**: Serverless, single-digit millisecond latency, auto-scaling, pay-per-use.

## Quick Start

**Local development with Docker**:
```bash
docker run -p 8000:8000 amazon/dynamodb-local
```

**Install AWS CLI**:
```bash
pip install awscli
aws configure  # Use dummy values for local
```

**Create table**:
```bash
aws dynamodb create-table \
  --table-name Users \
  --attribute-definitions AttributeName=userId,AttributeType=S \
  --key-schema AttributeName=userId,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --endpoint-url http://localhost:8000
```

**Or use AWS SDK**:
```javascript
import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";
const client = new DynamoDBClient({ region: "us-east-1" });
```

## Cheatsheet

| Operation | AWS CLI |
|-----------|---------|
| List tables | `aws dynamodb list-tables` |
| Describe table | `aws dynamodb describe-table --table-name Name` |
| Put item | `aws dynamodb put-item --table-name Name --item '{}'` |
| Get item | `aws dynamodb get-item --table-name Name --key '{}'` |
| Query | `aws dynamodb query --table-name Name ...` |
| Scan | `aws dynamodb scan --table-name Name` |
| Delete item | `aws dynamodb delete-item --table-name Name --key '{}'` |

## Gotchas

### CRUD with SDK (JavaScript)

```javascript
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// Put item
await docClient.send(new PutCommand({
  TableName: "Users",
  Item: { userId: "123", name: "John", email: "john@example.com" }
}));

// Get item
const { Item } = await docClient.send(new GetCommand({
  TableName: "Users",
  Key: { userId: "123" }
}));

// Query (requires partition key)
const { Items } = await docClient.send(new QueryCommand({
  TableName: "Orders",
  KeyConditionExpression: "userId = :uid",
  ExpressionAttributeValues: { ":uid": "123" }
}));

// Delete
await docClient.send(new DeleteCommand({
  TableName: "Users",
  Key: { userId: "123" }
}));
```

### Key design

```javascript
// Simple primary key (partition key only)
{ userId: "HASH" }

// Composite primary key
{ userId: "HASH", orderId: "RANGE" }

// Global Secondary Index (GSI)
// Allows querying by different attributes
```

### Conditional writes

```javascript
await docClient.send(new PutCommand({
  TableName: "Users",
  Item: { userId: "123", name: "John" },
  ConditionExpression: "attribute_not_exists(userId)"
}));
```

## Next Steps

- [DynamoDB Documentation](https://docs.aws.amazon.com/dynamodb/) - Official docs
- [DynamoDB Guide](https://www.dynamodbguide.com/) - Community guide
- [NoSQL Workbench](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.html) - GUI tool
- [Single-Table Design](https://www.alexdebrie.com/posts/dynamodb-single-table/) - Best practices
