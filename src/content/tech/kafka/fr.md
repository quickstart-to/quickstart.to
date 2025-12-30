---
title: "Apache Kafka"
description: "Plateforme de streaming d'evenements distribuee - pub/sub haut debit, logs durables, pipelines temps reel"
template: "tool"
tags: ["messaging", "streaming", "distributed"]
---

## TL;DR

**Quoi** : Plateforme de streaming d'événements distribuée pour les pipelines de données à haut débit.

**Pourquoi** : Scalabilité extrême, durabilité, traitement temps réel, sémantique exactly-once.

## Quick Start

**Installation avec Docker** :
```bash
# Démarrer Kafka avec KRaft (sans Zookeeper)
docker run -d --name kafka \
  -p 9092:9092 \
  -e KAFKA_CFG_NODE_ID=1 \
  -e KAFKA_CFG_PROCESS_ROLES=controller,broker \
  -e KAFKA_CFG_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093 \
  -e KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
  -e KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=1@localhost:9093 \
  -e KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER \
  bitnami/kafka:latest
```

**Installer les outils CLI** :
```bash
# macOS
brew install kafka

# Ou télécharger depuis https://kafka.apache.org/downloads
```

**Créer un topic et tester** :
```bash
# Créer un topic
kafka-topics.sh --create --topic test --bootstrap-server localhost:9092

# Produire des messages
kafka-console-producer.sh --topic test --bootstrap-server localhost:9092

# Consommer des messages (nouveau terminal)
kafka-console-consumer.sh --topic test --from-beginning --bootstrap-server localhost:9092
```

## Cheatsheet

| Commande | Description |
|---------|-------------|
| `kafka-topics.sh --list` | Lister les topics |
| `kafka-topics.sh --create` | Créer un topic |
| `kafka-topics.sh --describe` | Décrire un topic |
| `kafka-console-producer.sh` | Produire des messages |
| `kafka-console-consumer.sh` | Consommer des messages |
| `kafka-consumer-groups.sh` | Gérer les groupes de consommateurs |

## Gotchas

### Node.js producer

```javascript
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})

const producer = kafka.producer()

async function produce() {
  await producer.connect()
  await producer.send({
    topic: 'test',
    messages: [
      { key: 'key1', value: 'Hello Kafka!' }
    ]
  })
  await producer.disconnect()
}

produce()
```

### Node.js consumer

```javascript
const consumer = kafka.consumer({ groupId: 'my-group' })

async function consume() {
  await consumer.connect()
  await consumer.subscribe({ topic: 'test', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        key: message.key?.toString(),
        value: message.value.toString()
      })
    }
  })
}

consume()
```

### Python producer/consumer

```python
from kafka import KafkaProducer, KafkaConsumer

# Producer
producer = KafkaProducer(bootstrap_servers='localhost:9092')
producer.send('test', b'Hello Kafka!')
producer.flush()

# Consumer
consumer = KafkaConsumer(
    'test',
    bootstrap_servers='localhost:9092',
    auto_offset_reset='earliest',
    group_id='my-group'
)

for message in consumer:
    print(f"{message.key}: {message.value}")
```

### Topic management

```bash
# Créer avec partitions et réplication
kafka-topics.sh --create \
  --topic my-topic \
  --partitions 3 \
  --replication-factor 1 \
  --bootstrap-server localhost:9092

# Décrire un topic
kafka-topics.sh --describe \
  --topic my-topic \
  --bootstrap-server localhost:9092

# Supprimer un topic
kafka-topics.sh --delete \
  --topic my-topic \
  --bootstrap-server localhost:9092
```

## Next Steps

- [Documentation Kafka](https://kafka.apache.org/documentation/) - Docs officielles
- [Kafka Quickstart](https://kafka.apache.org/quickstart) - Démarrage rapide
- [KafkaJS](https://kafka.js.org/) - Client Node.js
- [Confluent Platform](https://www.confluent.io/) - Kafka Enterprise
