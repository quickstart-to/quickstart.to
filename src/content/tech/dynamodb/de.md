---
title: "DynamoDB"
description: "AWS verwaltete NoSQL Key-Value-Datenbank - serverless, Millisekunden-Latenz, Auto-Scaling"
template: "tool"
tags: ["database", "nosql", "aws", "serverless"]
---

## TL;DR

**Was**: Eine vollständig verwaltete NoSQL Key-Value-Datenbank von AWS.

**Warum**: Serverless, einstellige Millisekunden-Latenz, Auto-Scaling, Pay-per-Use.

## Quick Start

**Lokale Entwicklung mit Docker**:
```bash
docker run -p 8000:8000 amazon/dynamodb-local
```

**AWS CLI installieren**:
```bash
pip install awscli
aws configure  # Dummy-Werte für lokal verwenden
```

**Tabelle erstellen**:
```bash
aws dynamodb create-table \
  --table-name Users \
  --attribute-definitions AttributeName=userId,AttributeType=S \
  --key-schema AttributeName=userId,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --endpoint-url http://localhost:8000
```

**Oder AWS SDK verwenden**:
```javascript
import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";
const client = new DynamoDBClient({ region: "us-east-1" });
```

## Cheatsheet

| Operation | AWS CLI |
|-----------|---------|
| Tabellen auflisten | `aws dynamodb list-tables` |
| Tabelle beschreiben | `aws dynamodb describe-table --table-name Name` |
| Item einfügen | `aws dynamodb put-item --table-name Name --item '{}'` |
| Item abrufen | `aws dynamodb get-item --table-name Name --key '{}'` |
| Abfrage | `aws dynamodb query --table-name Name ...` |
| Scan | `aws dynamodb scan --table-name Name` |
| Item löschen | `aws dynamodb delete-item --table-name Name --key '{}'` |

## Gotchas

### CRUD with SDK (JavaScript)

```javascript
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// Item einfügen
await docClient.send(new PutCommand({
  TableName: "Users",
  Item: { userId: "123", name: "John", email: "john@example.com" }
}));

// Item abrufen
const { Item } = await docClient.send(new GetCommand({
  TableName: "Users",
  Key: { userId: "123" }
}));

// Abfrage (erfordert Partition Key)
const { Items } = await docClient.send(new QueryCommand({
  TableName: "Orders",
  KeyConditionExpression: "userId = :uid",
  ExpressionAttributeValues: { ":uid": "123" }
}));

// Löschen
await docClient.send(new DeleteCommand({
  TableName: "Users",
  Key: { userId: "123" }
}));
```

### Key design

```javascript
// Einfacher Primärschlüssel (nur Partition Key)
{ userId: "HASH" }

// Zusammengesetzter Primärschlüssel
{ userId: "HASH", orderId: "RANGE" }

// Global Secondary Index (GSI)
// Ermöglicht Abfragen nach anderen Attributen
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

- [DynamoDB Dokumentation](https://docs.aws.amazon.com/dynamodb/) - Offizielle Docs
- [DynamoDB Guide](https://www.dynamodbguide.com/) - Community-Guide
- [NoSQL Workbench](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.html) - GUI-Tool
- [Single-Table Design](https://www.alexdebrie.com/posts/dynamodb-single-table/) - Best Practices
