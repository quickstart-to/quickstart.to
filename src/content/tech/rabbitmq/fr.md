---
title: "RabbitMQ"
description: "Démarrez avec la messagerie RabbitMQ en 5 minutes"
template: "tool"
tags: ["messaging", "queue", "amqp"]
---

## TL;DR

**Quoi** : Courtier de messages open-source implémentant le protocole AMQP.

**Pourquoi** : Livraison fiable, routage flexible, protocoles multiples, UI de gestion, clustering.

## Quick Start

**Installer avec Docker** :
```bash
docker run -d --name rabbitmq \
  -p 5672:5672 \
  -p 15672:15672 \
  rabbitmq:3-management

# Management UI: http://localhost:15672
# Username/Password: guest/guest
```

**Installer localement** :
```bash
# macOS
brew install rabbitmq
brew services start rabbitmq

# Ubuntu
sudo apt install rabbitmq-server
sudo systemctl start rabbitmq-server
```

## Cheatsheet

| Commande | Description |
|---------|-------------|
| `rabbitmqctl status` | Vérifier le statut du serveur |
| `rabbitmqctl list_queues` | Lister les queues |
| `rabbitmqctl list_exchanges` | Lister les exchanges |
| `rabbitmqctl list_bindings` | Lister les bindings |
| `rabbitmqctl add_user` | Ajouter un utilisateur |
| `rabbitmq-plugins enable` | Activer un plugin |

## Gotchas

### Producteur Node.js

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

### Consommateur Node.js

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

### Producteur/Consommateur Python

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

### Patterns d'exchange

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

- [RabbitMQ Documentation](https://www.rabbitmq.com/documentation.html) - Documentation officielle
- [RabbitMQ Tutorials](https://www.rabbitmq.com/getstarted.html) - Étape par étape
- [amqplib](https://www.npmjs.com/package/amqplib) - Client Node.js
- [Management Plugin](https://www.rabbitmq.com/management.html) - Interface Web
