---
title: "gRPC"
description: "5 分钟快速入门 gRPC"
tags: ["api", "rpc", "protobuf"]
---

## TL;DR

**是什么**：使用 Protocol Buffers 的高性能 RPC 框架。

**为什么用**：快速二进制序列化、HTTP/2、流式传输、强类型、多语言支持。

## Quick Start

**安装（Node.js）**：
```bash
npm install @grpc/grpc-js @grpc/proto-loader
```

**定义服务**（`hello.proto`）：
```protobuf
syntax = "proto3";

package hello;

service Greeter {
  rpc SayHello (HelloRequest) returns (HelloReply);
}

message HelloRequest {
  string name = 1;
}

message HelloReply {
  string message = 1;
}
```

**服务端**：
```javascript
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const packageDef = protoLoader.loadSync('hello.proto')
const proto = grpc.loadPackageDefinition(packageDef)

const server = new grpc.Server()

server.addService(proto.hello.Greeter.service, {
  sayHello: (call, callback) => {
    callback(null, { message: `Hello, ${call.request.name}!` })
  }
})

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Server running on port 50051')
})
```

## Cheatsheet

| 概念 | 描述 |
|---------|-------------|
| Unary | 单一请求/响应 |
| Server streaming | 多个响应 |
| Client streaming | 多个请求 |
| Bidirectional | 双向流 |
| Proto file | 服务定义 |
| Stub | 客户端接口 |

## Gotchas

### 客户端

```javascript
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const packageDef = protoLoader.loadSync('hello.proto')
const proto = grpc.loadPackageDefinition(packageDef)

const client = new proto.hello.Greeter(
  'localhost:50051',
  grpc.credentials.createInsecure()
)

client.sayHello({ name: 'World' }, (err, response) => {
  console.log(response.message)  // Hello, World!
})
```

### 流式服务

```protobuf
service ChatService {
  // 服务端流
  rpc Subscribe (SubscribeRequest) returns (stream Message);

  // 客户端流
  rpc SendMessages (stream Message) returns (Summary);

  // 双向流
  rpc Chat (stream Message) returns (stream Message);
}
```

### 服务端流

```javascript
// 服务端
server.addService(proto.chat.ChatService.service, {
  subscribe: (call) => {
    const messages = ['Hello', 'How are you?', 'Goodbye']
    messages.forEach(msg => {
      call.write({ text: msg })
    })
    call.end()
  }
})

// 客户端
const call = client.subscribe({ userId: '123' })
call.on('data', (message) => console.log(message.text))
call.on('end', () => console.log('Stream ended'))
```

### Python gRPC

```bash
pip install grpcio grpcio-tools
python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. hello.proto
```

```python
# 服务端
import grpc
from concurrent import futures
import hello_pb2, hello_pb2_grpc

class Greeter(hello_pb2_grpc.GreeterServicer):
    def SayHello(self, request, context):
        return hello_pb2.HelloReply(message=f'Hello, {request.name}!')

server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
hello_pb2_grpc.add_GreeterServicer_to_server(Greeter(), server)
server.add_insecure_port('[::]:50051')
server.start()
server.wait_for_termination()

# 客户端
channel = grpc.insecure_channel('localhost:50051')
stub = hello_pb2_grpc.GreeterStub(channel)
response = stub.SayHello(hello_pb2.HelloRequest(name='World'))
print(response.message)
```

## Next Steps

- [gRPC 文档](https://grpc.io/docs/) - 官方文档
- [Protocol Buffers](https://protobuf.dev/) - 序列化
- [gRPC-Web](https://github.com/grpc/grpc-web) - 浏览器支持
- [BloomRPC](https://github.com/bloomrpc/bloomrpc) - GUI 客户端
