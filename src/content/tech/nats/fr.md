---
title: "NATS"
description: "Démarrez avec la messagerie NATS en 5 minutes"
template: "tool"
tags: ["messaging", "cloud-native", "microservices"]
---

## TL;DR

**Quoi** : Système de messagerie cloud-native haute performance.

**Pourquoi** : Simple, rapide, léger, supporte pub/sub, request/reply et streaming.

## Quick Start

**Installer le serveur** :
```bash
# macOS
brew install nats-server

# Docker
docker run -d --name nats -p 4222:4222 nats:latest

# Start server
nats-server
```

**Installer le CLI** :
```bash
# macOS
brew install nats-io/nats-tools/nats

# Or download from https://github.com/nats-io/natscli/releases
```

**Tester pub/sub** :
```bash
# Subscribe (terminal 1)
nats sub "hello"

# Publish (terminal 2)
nats pub "hello" "world"
```

## Cheatsheet

| Commande | Description |
|---------|-------------|
| `nats pub subject msg` | Publier un message |
| `nats sub subject` | S'abonner à un sujet |
| `nats req subject msg` | Request/reply |
| `nats server info` | Info serveur |
| `nats stream ls` | Lister les streams JetStream |
| `nats bench subject` | Benchmark |

## Gotchas

### Node.js client

```javascript
const { connect, StringCodec } = require('nats')

const sc = StringCodec()

async function main() {
  const nc = await connect({ servers: 'localhost:4222' })

  // Subscribe
  const sub = nc.subscribe('hello')
  ;(async () => {
    for await (const msg of sub) {
      console.log(`Received: ${sc.decode(msg.data)}`)
    }
  })()

  // Publish
  nc.publish('hello', sc.encode('world'))

  // Request/Reply
  const reply = await nc.request('service', sc.encode('request'), { timeout: 1000 })
  console.log(`Reply: ${sc.decode(reply.data)}`)

  await nc.drain()
}

main()
```

### Python client

```python
import asyncio
from nats.aio.client import Client as NATS

async def main():
    nc = NATS()
    await nc.connect("nats://localhost:4222")

    # Subscribe
    async def message_handler(msg):
        print(f"Received: {msg.data.decode()}")

    await nc.subscribe("hello", cb=message_handler)

    # Publish
    await nc.publish("hello", b"world")

    # Request/Reply
    response = await nc.request("service", b"request", timeout=1)
    print(f"Reply: {response.data.decode()}")

    await asyncio.sleep(1)
    await nc.drain()

asyncio.run(main())
```

### JetStream (persistence)

```javascript
const { connect } = require('nats')

async function jetstream() {
  const nc = await connect({ servers: 'localhost:4222' })
  const js = nc.jetstream()
  const jsm = await nc.jetstreamManager()

  // Create stream
  await jsm.streams.add({
    name: 'ORDERS',
    subjects: ['orders.*']
  })

  // Publish
  await js.publish('orders.new', sc.encode('order-1'))

  // Create consumer
  const consumer = await js.consumers.get('ORDERS', 'my-consumer')
  const messages = await consumer.consume()

  for await (const msg of messages) {
    console.log(sc.decode(msg.data))
    msg.ack()
  }
}
```

### Request/Reply service

```javascript
// Service
const sub = nc.subscribe('math.add')
;(async () => {
  for await (const msg of sub) {
    const data = JSON.parse(sc.decode(msg.data))
    const result = data.a + data.b
    msg.respond(sc.encode(JSON.stringify({ result })))
  }
})()

// Client
const response = await nc.request(
  'math.add',
  sc.encode(JSON.stringify({ a: 1, b: 2 })),
  { timeout: 1000 }
)
console.log(JSON.parse(sc.decode(response.data)))  // { result: 3 }
```

## Next Steps

- [NATS Documentation](https://docs.nats.io/) - Documentation officielle
- [NATS by Example](https://natsbyexample.com/) - Exemples de code
- [JetStream](https://docs.nats.io/nats-concepts/jetstream) - Persistance
- [nats.js](https://github.com/nats-io/nats.js) - Client Node.js
