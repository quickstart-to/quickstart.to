---
title: "NATS"
description: "Comienza con mensajería NATS en 5 minutos"
template: "tool"
tags: ["messaging", "cloud-native", "microservices"]
---

## TL;DR

**Qué**: Sistema de mensajería cloud-native de alto rendimiento.

**Por qué**: Simple, rápido, ligero, soporta pub/sub, request/reply y streaming.

## Quick Start

**Instalar servidor**:
```bash
# macOS
brew install nats-server

# Docker
docker run -d --name nats -p 4222:4222 nats:latest

# Start server
nats-server
```

**Instalar CLI**:
```bash
# macOS
brew install nats-io/nats-tools/nats

# Or download from https://github.com/nats-io/natscli/releases
```

**Probar pub/sub**:
```bash
# Subscribe (terminal 1)
nats sub "hello"

# Publish (terminal 2)
nats pub "hello" "world"
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `nats pub subject msg` | Publicar mensaje |
| `nats sub subject` | Suscribirse a subject |
| `nats req subject msg` | Request/reply |
| `nats server info` | Info del servidor |
| `nats stream ls` | Listar streams de JetStream |
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

- [NATS Documentation](https://docs.nats.io/) - Documentación oficial
- [NATS by Example](https://natsbyexample.com/) - Ejemplos de código
- [JetStream](https://docs.nats.io/nats-concepts/jetstream) - Persistencia
- [nats.js](https://github.com/nats-io/nats.js) - Cliente Node.js
