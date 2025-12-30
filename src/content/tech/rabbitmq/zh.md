---
title: "RabbitMQ"
description: "灵活路由的消息代理 - 队列、交换机、AMQP 协议实现可靠异步消息"
template: "tool"
tags: ["messaging", "queue", "amqp"]
---

## TL;DR

**是什么**：实现 AMQP 协议的开源消息代理。

**为什么用**：可靠投递、灵活路由、多协议支持、管理 UI、集群支持。

## Quick Start

**使用 Docker 安装**：
```bash
docker run -d --name rabbitmq \
  -p 5672:5672 \
  -p 15672:15672 \
  rabbitmq:3-management

# 管理界面：http://localhost:15672
# 用户名/密码：guest/guest
```

**本地安装**：
```bash
# macOS
brew install rabbitmq
brew services start rabbitmq

# Ubuntu
sudo apt install rabbitmq-server
sudo systemctl start rabbitmq-server
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `rabbitmqctl status` | 检查服务器状态 |
| `rabbitmqctl list_queues` | 列出队列 |
| `rabbitmqctl list_exchanges` | 列出交换机 |
| `rabbitmqctl list_bindings` | 列出绑定 |
| `rabbitmqctl add_user` | 添加用户 |
| `rabbitmq-plugins enable` | 启用插件 |

## Gotchas

### Node.js 生产者

```javascript
const amqp = require('amqplib')

async function produce() {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()

  const queue = 'hello'
  await channel.assertQueue(queue, { durable: true })

  channel.sendToQueue(queue, Buffer.from('Hello RabbitMQ!'), {
    persistent: true
  })

  console.log('Message sent')

  setTimeout(() => {
    connection.close()
    process.exit(0)
  }, 500)
}

produce()
```

### Node.js 消费者

```javascript
const amqp = require('amqplib')

async function consume() {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()

  const queue = 'hello'
  await channel.assertQueue(queue, { durable: true })
  await channel.prefetch(1)

  console.log('Waiting for messages...')

  channel.consume(queue, (msg) => {
    console.log('Received:', msg.content.toString())
    channel.ack(msg)
  })
}

consume()
```

### Python 生产者/消费者

```python
import pika

# 生产者
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.queue_declare(queue='hello', durable=True)
channel.basic_publish(
    exchange='',
    routing_key='hello',
    body='Hello RabbitMQ!',
    properties=pika.BasicProperties(delivery_mode=2)
)
connection.close()

# 消费者
def callback(ch, method, properties, body):
    print(f"Received: {body}")
    ch.basic_ack(delivery_tag=method.delivery_tag)

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.queue_declare(queue='hello', durable=True)
channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='hello', on_message_callback=callback)
channel.start_consuming()
```

### 交换机模式

```javascript
// 直连交换机
await channel.assertExchange('direct_logs', 'direct', { durable: true })
channel.publish('direct_logs', 'error', Buffer.from(message))

// 扇出交换机（广播）
await channel.assertExchange('logs', 'fanout', { durable: true })
channel.publish('logs', '', Buffer.from(message))

// 主题交换机（模式匹配）
await channel.assertExchange('topic_logs', 'topic', { durable: true })
channel.publish('topic_logs', 'user.signup.success', Buffer.from(message))
```

## Next Steps

- [RabbitMQ 文档](https://www.rabbitmq.com/documentation.html) - 官方文档
- [RabbitMQ 教程](https://www.rabbitmq.com/getstarted.html) - 分步教程
- [amqplib](https://www.npmjs.com/package/amqplib) - Node.js 客户端
- [管理插件](https://www.rabbitmq.com/management.html) - Web UI
