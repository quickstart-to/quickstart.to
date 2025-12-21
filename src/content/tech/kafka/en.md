---
title: "Apache Kafka"
description: "Get started with Apache Kafka messaging in 5 minutes"
tags: ["messaging", "streaming", "distributed"]
---

## TL;DR

**What**: Distributed event streaming platform for high-throughput data pipelines.

**Why**: Extreme scalability, durability, real-time processing, exactly-once semantics.

## Quick Start

**Install with Docker**:
```bash
# Start Kafka with KRaft (no Zookeeper)
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

**Install CLI tools**:
```bash
# macOS
brew install kafka

# Or download from https://kafka.apache.org/downloads
```

**Create topic and test**:
```bash
# Create topic
kafka-topics.sh --create --topic test --bootstrap-server localhost:9092

# Produce messages
kafka-console-producer.sh --topic test --bootstrap-server localhost:9092

# Consume messages (new terminal)
kafka-console-consumer.sh --topic test --from-beginning --bootstrap-server localhost:9092
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `kafka-topics.sh --list` | List topics |
| `kafka-topics.sh --create` | Create topic |
| `kafka-topics.sh --describe` | Describe topic |
| `kafka-console-producer.sh` | Produce messages |
| `kafka-console-consumer.sh` | Consume messages |
| `kafka-consumer-groups.sh` | Manage consumer groups |

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
# Create with partitions and replication
kafka-topics.sh --create \
  --topic my-topic \
  --partitions 3 \
  --replication-factor 1 \
  --bootstrap-server localhost:9092

# Describe topic
kafka-topics.sh --describe \
  --topic my-topic \
  --bootstrap-server localhost:9092

# Delete topic
kafka-topics.sh --delete \
  --topic my-topic \
  --bootstrap-server localhost:9092
```

## Next Steps

- [Kafka Documentation](https://kafka.apache.org/documentation/) - Official docs
- [Kafka Quickstart](https://kafka.apache.org/quickstart) - Getting started
- [KafkaJS](https://kafka.js.org/) - Node.js client
- [Confluent Platform](https://www.confluent.io/) - Enterprise Kafka
