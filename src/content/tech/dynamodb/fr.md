---
title: "DynamoDB"
description: "Base de donnees NoSQL cle-valeur geree AWS - serverless, latence milliseconde, auto-scaling"
template: "tool"
tags: ["database", "nosql", "aws", "serverless"]
---

## TL;DR

**Quoi** : Une base de données NoSQL clé-valeur entièrement gérée par AWS.

**Pourquoi** : Serverless, latence en millisecondes à un chiffre, auto-scaling, paiement à l'usage.

## Quick Start

**Développement local avec Docker** :
```bash
docker run -p 8000:8000 amazon/dynamodb-local
```

**Installer AWS CLI** :
```bash
pip install awscli
aws configure  # Utiliser des valeurs fictives pour le local
```

**Créer une table** :
```bash
aws dynamodb create-table \
  --table-name Users \
  --attribute-definitions AttributeName=userId,AttributeType=S \
  --key-schema AttributeName=userId,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --endpoint-url http://localhost:8000
```

**Ou utiliser le SDK AWS** :
```javascript
import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";
const client = new DynamoDBClient({ region: "us-east-1" });
```

## Cheatsheet

| Opération | AWS CLI |
|-----------|---------|
| Lister les tables | `aws dynamodb list-tables` |
| Décrire une table | `aws dynamodb describe-table --table-name Name` |
| Insérer un item | `aws dynamodb put-item --table-name Name --item '{}'` |
| Récupérer un item | `aws dynamodb get-item --table-name Name --key '{}'` |
| Requête | `aws dynamodb query --table-name Name ...` |
| Scan | `aws dynamodb scan --table-name Name` |
| Supprimer un item | `aws dynamodb delete-item --table-name Name --key '{}'` |

## Gotchas

### CRUD with SDK (JavaScript)

```javascript
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// Insérer un item
await docClient.send(new PutCommand({
  TableName: "Users",
  Item: { userId: "123", name: "John", email: "john@example.com" }
}));

// Récupérer un item
const { Item } = await docClient.send(new GetCommand({
  TableName: "Users",
  Key: { userId: "123" }
}));

// Requête (nécessite la clé de partition)
const { Items } = await docClient.send(new QueryCommand({
  TableName: "Orders",
  KeyConditionExpression: "userId = :uid",
  ExpressionAttributeValues: { ":uid": "123" }
}));

// Supprimer
await docClient.send(new DeleteCommand({
  TableName: "Users",
  Key: { userId: "123" }
}));
```

### Key design

```javascript
// Clé primaire simple (partition key uniquement)
{ userId: "HASH" }

// Clé primaire composite
{ userId: "HASH", orderId: "RANGE" }

// Global Secondary Index (GSI)
// Permet de requêter par différents attributs
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

- [Documentation DynamoDB](https://docs.aws.amazon.com/dynamodb/) - Docs officielles
- [DynamoDB Guide](https://www.dynamodbguide.com/) - Guide communautaire
- [NoSQL Workbench](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.html) - Outil GUI
- [Single-Table Design](https://www.alexdebrie.com/posts/dynamodb-single-table/) - Bonnes pratiques
