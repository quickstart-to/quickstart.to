---
title: "Apache Kafka"
description: "Verteilte Event-Streaming-Plattform - High-Throughput Pub/Sub, dauerhafte Logs, Echtzeit-Datenpipelines"
template: "tool"
tags: ["messaging", "streaming", "distributed"]
---

## TL;DR

**Was**: Verteilte Event-Streaming-Plattform für Hochdurchsatz-Datenpipelines.

**Warum**: Extreme Skalierbarkeit, Dauerhaftigkeit, Echtzeit-Verarbeitung, Exactly-once-Semantik.

## Quick Start

**Installation mit Docker**:
```bash
# Kafka mit KRaft starten (ohne Zookeeper)
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

**CLI-Tools installieren**:
```bash
# macOS
brew install kafka

# Oder von https://kafka.apache.org/downloads herunterladen
```

**Topic erstellen und testen**:
```bash
# Topic erstellen
kafka-topics.sh --create --topic test --bootstrap-server localhost:9092

# Nachrichten produzieren
kafka-console-producer.sh --topic test --bootstrap-server localhost:9092

# Nachrichten konsumieren (neues Terminal)
kafka-console-consumer.sh --topic test --from-beginning --bootstrap-server localhost:9092
```

## Cheatsheet

| Befehl | Beschreibung |
|---------|-------------|
| `kafka-topics.sh --list` | Topics auflisten |
| `kafka-topics.sh --create` | Topic erstellen |
| `kafka-topics.sh --describe` | Topic beschreiben |
| `kafka-console-producer.sh` | Nachrichten produzieren |
| `kafka-console-consumer.sh` | Nachrichten konsumieren |
| `kafka-consumer-groups.sh` | Consumer-Gruppen verwalten |

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
# Mit Partitionen und Replikation erstellen
kafka-topics.sh --create \
  --topic my-topic \
  --partitions 3 \
  --replication-factor 1 \
  --bootstrap-server localhost:9092

# Topic beschreiben
kafka-topics.sh --describe \
  --topic my-topic \
  --bootstrap-server localhost:9092

# Topic löschen
kafka-topics.sh --delete \
  --topic my-topic \
  --bootstrap-server localhost:9092
```

## Next Steps

- [Kafka Dokumentation](https://kafka.apache.org/documentation/) - Offizielle Docs
- [Kafka Quickstart](https://kafka.apache.org/quickstart) - Erste Schritte
- [KafkaJS](https://kafka.js.org/) - Node.js-Client
- [Confluent Platform](https://www.confluent.io/) - Enterprise Kafka
