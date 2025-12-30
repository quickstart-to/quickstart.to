---
title: "Apache Kafka"
description: "Plataforma de streaming de eventos distribuida - pub/sub alto rendimiento, logs durables, pipelines en tiempo real"
template: "tool"
tags: ["messaging", "streaming", "distributed"]
---

## TL;DR

**Qué**: Plataforma distribuida de streaming de eventos para pipelines de datos de alto rendimiento.

**Por qué**: Escalabilidad extrema, durabilidad, procesamiento en tiempo real, semántica exactly-once.

## Quick Start

**Instalación con Docker**:
```bash
# Iniciar Kafka con KRaft (sin Zookeeper)
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

**Instalar herramientas CLI**:
```bash
# macOS
brew install kafka

# O descargar desde https://kafka.apache.org/downloads
```

**Crear topic y probar**:
```bash
# Crear topic
kafka-topics.sh --create --topic test --bootstrap-server localhost:9092

# Producir mensajes
kafka-console-producer.sh --topic test --bootstrap-server localhost:9092

# Consumir mensajes (nueva terminal)
kafka-console-consumer.sh --topic test --from-beginning --bootstrap-server localhost:9092
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `kafka-topics.sh --list` | Listar topics |
| `kafka-topics.sh --create` | Crear topic |
| `kafka-topics.sh --describe` | Describir topic |
| `kafka-console-producer.sh` | Producir mensajes |
| `kafka-console-consumer.sh` | Consumir mensajes |
| `kafka-consumer-groups.sh` | Gestionar grupos de consumidores |

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
# Crear con particiones y replicación
kafka-topics.sh --create \
  --topic my-topic \
  --partitions 3 \
  --replication-factor 1 \
  --bootstrap-server localhost:9092

# Describir topic
kafka-topics.sh --describe \
  --topic my-topic \
  --bootstrap-server localhost:9092

# Eliminar topic
kafka-topics.sh --delete \
  --topic my-topic \
  --bootstrap-server localhost:9092
```

## Next Steps

- [Documentación de Kafka](https://kafka.apache.org/documentation/) - Docs oficiales
- [Kafka Quickstart](https://kafka.apache.org/quickstart) - Inicio rápido
- [KafkaJS](https://kafka.js.org/) - Cliente Node.js
- [Confluent Platform](https://www.confluent.io/) - Kafka Enterprise
