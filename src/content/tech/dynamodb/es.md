---
title: "DynamoDB"
description: "Comienza con Amazon DynamoDB en 5 minutos"
template: "tool"
tags: ["database", "nosql", "aws", "serverless"]
---

## TL;DR

**Qué**: Una base de datos NoSQL clave-valor totalmente administrada por AWS.

**Por qué**: Serverless, latencia de milisegundos de un dígito, auto-scaling, pago por uso.

## Quick Start

**Desarrollo local con Docker**:
```bash
docker run -p 8000:8000 amazon/dynamodb-local
```

**Instalar AWS CLI**:
```bash
pip install awscli
aws configure  # Usar valores ficticios para local
```

**Crear tabla**:
```bash
aws dynamodb create-table \
  --table-name Users \
  --attribute-definitions AttributeName=userId,AttributeType=S \
  --key-schema AttributeName=userId,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --endpoint-url http://localhost:8000
```

**O usar AWS SDK**:
```javascript
import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";
const client = new DynamoDBClient({ region: "us-east-1" });
```

## Cheatsheet

| Operación | AWS CLI |
|-----------|---------|
| Listar tablas | `aws dynamodb list-tables` |
| Describir tabla | `aws dynamodb describe-table --table-name Name` |
| Insertar item | `aws dynamodb put-item --table-name Name --item '{}'` |
| Obtener item | `aws dynamodb get-item --table-name Name --key '{}'` |
| Query | `aws dynamodb query --table-name Name ...` |
| Scan | `aws dynamodb scan --table-name Name` |
| Eliminar item | `aws dynamodb delete-item --table-name Name --key '{}'` |

## Gotchas

### CRUD with SDK (JavaScript)

```javascript
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// Insertar item
await docClient.send(new PutCommand({
  TableName: "Users",
  Item: { userId: "123", name: "John", email: "john@example.com" }
}));

// Obtener item
const { Item } = await docClient.send(new GetCommand({
  TableName: "Users",
  Key: { userId: "123" }
}));

// Query (requiere partition key)
const { Items } = await docClient.send(new QueryCommand({
  TableName: "Orders",
  KeyConditionExpression: "userId = :uid",
  ExpressionAttributeValues: { ":uid": "123" }
}));

// Eliminar
await docClient.send(new DeleteCommand({
  TableName: "Users",
  Key: { userId: "123" }
}));
```

### Key design

```javascript
// Clave primaria simple (solo partition key)
{ userId: "HASH" }

// Clave primaria compuesta
{ userId: "HASH", orderId: "RANGE" }

// Global Secondary Index (GSI)
// Permite consultar por diferentes atributos
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

- [Documentación de DynamoDB](https://docs.aws.amazon.com/dynamodb/) - Docs oficiales
- [DynamoDB Guide](https://www.dynamodbguide.com/) - Guía de la comunidad
- [NoSQL Workbench](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.html) - Herramienta GUI
- [Single-Table Design](https://www.alexdebrie.com/posts/dynamodb-single-table/) - Mejores prácticas
