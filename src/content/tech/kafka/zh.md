---
title: "Apache Kafka"
description: "5 分钟快速入门 Apache Kafka 消息系统"
template: "tool"
tags: ["messaging", "streaming", "distributed"]
---

## TL;DR

**是什么**：分布式事件流平台，用于高吞吐量数据管道。

**为什么用**：极致可扩展性、持久性、实时处理、精确一次语义。

## Quick Start

**使用 Docker 安装**：
```bash
# 使用 KRaft 启动 Kafka（无需 Zookeeper）
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

**安装 CLI 工具**：
```bash
# macOS
brew install kafka

# 或从 https://kafka.apache.org/downloads 下载
```

**创建主题并测试**：
```bash
# 创建主题
kafka-topics.sh --create --topic test --bootstrap-server localhost:9092

# 生产消息
kafka-console-producer.sh --topic test --bootstrap-server localhost:9092

# 消费消息（新终端）
kafka-console-consumer.sh --topic test --from-beginning --bootstrap-server localhost:9092
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `kafka-topics.sh --list` | 列出主题 |
| `kafka-topics.sh --create` | 创建主题 |
| `kafka-topics.sh --describe` | 描述主题 |
| `kafka-console-producer.sh` | 生产消息 |
| `kafka-console-consumer.sh` | 消费消息 |
| `kafka-consumer-groups.sh` | 管理消费者组 |

## Gotchas

### Node.js 生产者

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

### Node.js 消费者

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

### Python 生产者/消费者

```python
from kafka import KafkaProducer, KafkaConsumer

# 生产者
producer = KafkaProducer(bootstrap_servers='localhost:9092')
producer.send('test', b'Hello Kafka!')
producer.flush()

# 消费者
consumer = KafkaConsumer(
    'test',
    bootstrap_servers='localhost:9092',
    auto_offset_reset='earliest',
    group_id='my-group'
)

for message in consumer:
    print(f"{message.key}: {message.value}")
```

### 主题管理

```bash
# 创建带分区和副本的主题
kafka-topics.sh --create \
  --topic my-topic \
  --partitions 3 \
  --replication-factor 1 \
  --bootstrap-server localhost:9092

# 描述主题
kafka-topics.sh --describe \
  --topic my-topic \
  --bootstrap-server localhost:9092

# 删除主题
kafka-topics.sh --delete \
  --topic my-topic \
  --bootstrap-server localhost:9092
```

## Next Steps

- [Kafka 文档](https://kafka.apache.org/documentation/) - 官方文档
- [Kafka 快速开始](https://kafka.apache.org/quickstart) - 入门指南
- [KafkaJS](https://kafka.js.org/) - Node.js 客户端
- [Confluent Platform](https://www.confluent.io/) - 企业版 Kafka
