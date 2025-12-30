---
title: "gRPC"
description: "Starten Sie mit gRPC in 5 Minuten"
template: "tool"
tags: ["api", "rpc", "protobuf"]
---

## TL;DR

**Was**: Hochleistungs-RPC-Framework mit Protocol Buffers.

**Warum**: Schnelle binäre Serialisierung, HTTP/2, Streaming, stark typisiert, polyglott.

## Quick Start

**Installation (Node.js)**:
```bash
npm install @grpc/grpc-js @grpc/proto-loader
```

**Service definieren** (`hello.proto`):
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

**Server**:
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

| Konzept | Beschreibung |
|---------|-------------|
| Unary | Einzelne Anfrage/Antwort |
| Server streaming | Mehrere Antworten |
| Client streaming | Mehrere Anfragen |
| Bidirectional | Beide streamen |
| Proto file | Service-Definition |
| Stub | Client-Schnittstelle |

## Gotchas

### Client

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

### Streaming service

```protobuf
service ChatService {
  // Server streaming
  rpc Subscribe (SubscribeRequest) returns (stream Message);

  // Client streaming
  rpc SendMessages (stream Message) returns (Summary);

  // Bidirectional streaming
  rpc Chat (stream Message) returns (stream Message);
}
```

### Server streaming

```javascript
// Server
server.addService(proto.chat.ChatService.service, {
  subscribe: (call) => {
    const messages = ['Hello', 'How are you?', 'Goodbye']
    messages.forEach(msg => {
      call.write({ text: msg })
    })
    call.end()
  }
})

// Client
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
# Server
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

# Client
channel = grpc.insecure_channel('localhost:50051')
stub = hello_pb2_grpc.GreeterStub(channel)
response = stub.SayHello(hello_pb2.HelloRequest(name='World'))
print(response.message)
```

## Next Steps

- [gRPC Dokumentation](https://grpc.io/docs/) - Offizielle Docs
- [Protocol Buffers](https://protobuf.dev/) - Serialisierung
- [gRPC-Web](https://github.com/grpc/grpc-web) - Browser-Unterstützung
- [BloomRPC](https://github.com/bloomrpc/bloomrpc) - GUI-Client
