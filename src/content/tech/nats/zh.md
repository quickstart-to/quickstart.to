---
title: "NATS"
description: "5 分钟快速入门 NATS 消息系统"
tags: ["messaging", "cloud-native", "microservices"]
---

## TL;DR

**是什么**：云原生、高性能消息系统。

**为什么用**：简单、快速、轻量，支持发布/订阅、请求/响应和流处理。

## Quick Start

**安装服务器**：
```bash
# macOS
brew install nats-server

# Docker
docker run -d --name nats -p 4222:4222 nats:latest

# 启动服务器
nats-server
```

**安装 CLI**：
```bash
# macOS
brew install nats-io/nats-tools/nats

# 或从 https://github.com/nats-io/natscli/releases 下载
```

**测试发布/订阅**：
```bash
# 订阅（终端 1）
nats sub "hello"

# 发布（终端 2）
nats pub "hello" "world"
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `nats pub subject msg` | 发布消息 |
| `nats sub subject` | 订阅主题 |
| `nats req subject msg` | 请求/响应 |
| `nats server info` | 服务器信息 |
| `nats stream ls` | 列出 JetStream 流 |
| `nats bench subject` | 基准测试 |

## Gotchas

### Node.js 客户端

```javascript
const { connect, StringCodec } = require('nats')

const sc = StringCodec()

async function main() {
  const nc = await connect({ servers: 'localhost:4222' })

  // 订阅
  const sub = nc.subscribe('hello')
  ;(async () => {
    for await (const msg of sub) {
      console.log(`Received: ${sc.decode(msg.data)}`)
    }
  })()

  // 发布
  nc.publish('hello', sc.encode('world'))

  // 请求/响应
  const reply = await nc.request('service', sc.encode('request'), { timeout: 1000 })
  console.log(`Reply: ${sc.decode(reply.data)}`)

  await nc.drain()
}

main()
```

### Python 客户端

```python
import asyncio
from nats.aio.client import Client as NATS

async def main():
    nc = NATS()
    await nc.connect("nats://localhost:4222")

    # 订阅
    async def message_handler(msg):
        print(f"Received: {msg.data.decode()}")

    await nc.subscribe("hello", cb=message_handler)

    # 发布
    await nc.publish("hello", b"world")

    # 请求/响应
    response = await nc.request("service", b"request", timeout=1)
    print(f"Reply: {response.data.decode()}")

    await asyncio.sleep(1)
    await nc.drain()

asyncio.run(main())
```

### JetStream（持久化）

```javascript
const { connect } = require('nats')

async function jetstream() {
  const nc = await connect({ servers: 'localhost:4222' })
  const js = nc.jetstream()
  const jsm = await nc.jetstreamManager()

  // 创建流
  await jsm.streams.add({
    name: 'ORDERS',
    subjects: ['orders.*']
  })

  // 发布
  await js.publish('orders.new', sc.encode('order-1'))

  // 创建消费者
  const consumer = await js.consumers.get('ORDERS', 'my-consumer')
  const messages = await consumer.consume()

  for await (const msg of messages) {
    console.log(sc.decode(msg.data))
    msg.ack()
  }
}
```

### 请求/响应服务

```javascript
// 服务端
const sub = nc.subscribe('math.add')
;(async () => {
  for await (const msg of sub) {
    const data = JSON.parse(sc.decode(msg.data))
    const result = data.a + data.b
    msg.respond(sc.encode(JSON.stringify({ result })))
  }
})()

// 客户端
const response = await nc.request(
  'math.add',
  sc.encode(JSON.stringify({ a: 1, b: 2 })),
  { timeout: 1000 }
)
console.log(JSON.parse(sc.decode(response.data)))  // { result: 3 }
```

## Next Steps

- [NATS 文档](https://docs.nats.io/) - 官方文档
- [NATS 示例](https://natsbyexample.com/) - 代码示例
- [JetStream](https://docs.nats.io/nats-concepts/jetstream) - 持久化
- [nats.js](https://github.com/nats-io/nats.js) - Node.js 客户端
