---
title: "RabbitMQ"
description: "Message broker con enrutamiento flexible - colas, exchanges, protocolo AMQP para mensajeria async confiable"
template: "tool"
tags: ["messaging", "queue", "amqp"]
---

## TL;DR

**Qué**: Broker de mensajes open-source que implementa el protocolo AMQP.

**Por qué**: Entrega confiable, enrutamiento flexible, múltiples protocolos, UI de gestión, clustering.

## Quick Start

**Instalar con Docker**:
```bash
docker run -d --name rabbitmq \
  -p 5672:5672 \
  -p 15672:15672 \
  rabbitmq:3-management

# Management UI: http://localhost:15672
# Username/Password: guest/guest
```

**Instalar localmente**:
```bash
# macOS
brew install rabbitmq
brew services start rabbitmq

# Ubuntu
sudo apt install rabbitmq-server
sudo systemctl start rabbitmq-server
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `rabbitmqctl status` | Verificar estado del servidor |
| `rabbitmqctl list_queues` | Listar colas |
| `rabbitmqctl list_exchanges` | Listar exchanges |
| `rabbitmqctl list_bindings` | Listar bindings |
| `rabbitmqctl add_user` | Añadir usuario |
| `rabbitmq-plugins enable` | Habilitar plugin |

## Gotchas

### Productor Node.js

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

### Consumidor Node.js

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

### Productor/Consumidor Python

```python
import pika

# Producer
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

# Consumer
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

### Patrones de exchange

```javascript
// Direct exchange
await channel.assertExchange('direct_logs', 'direct', { durable: true })
channel.publish('direct_logs', 'error', Buffer.from(message))

// Fanout exchange (broadcast)
await channel.assertExchange('logs', 'fanout', { durable: true })
channel.publish('logs', '', Buffer.from(message))

// Topic exchange (pattern matching)
await channel.assertExchange('topic_logs', 'topic', { durable: true })
channel.publish('topic_logs', 'user.signup.success', Buffer.from(message))
```

## Next Steps

- [RabbitMQ Documentation](https://www.rabbitmq.com/documentation.html) - Documentación oficial
- [RabbitMQ Tutorials](https://www.rabbitmq.com/getstarted.html) - Paso a paso
- [amqplib](https://www.npmjs.com/package/amqplib) - Cliente Node.js
- [Management Plugin](https://www.rabbitmq.com/management.html) - Interfaz Web
