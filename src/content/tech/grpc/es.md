---
title: "gRPC"
description: "Framework RPC de alto rendimiento - Protocol Buffers, HTTP/2, streaming, poliglota"
template: "tool"
tags: ["api", "rpc", "protobuf"]
---

## TL;DR

**Qué**: Framework RPC de alto rendimiento usando Protocol Buffers.

**Por qué**: Serialización binaria rápida, HTTP/2, streaming, fuertemente tipado, políglota.

## Quick Start

**Instalación (Node.js)**:
```bash
npm install @grpc/grpc-js @grpc/proto-loader
```

**Definir servicio** (`hello.proto`):
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

**Servidor**:
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

| Concepto | Descripción |
|---------|-------------|
| Unary | Petición/respuesta única |
| Server streaming | Múltiples respuestas |
| Client streaming | Múltiples peticiones |
| Bidirectional | Ambos transmiten |
| Proto file | Definición del servicio |
| Stub | Interfaz del cliente |

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
// Servidor
server.addService(proto.chat.ChatService.service, {
  subscribe: (call) => {
    const messages = ['Hello', 'How are you?', 'Goodbye']
    messages.forEach(msg => {
      call.write({ text: msg })
    })
    call.end()
  }
})

// Cliente
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
# Servidor
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

# Cliente
channel = grpc.insecure_channel('localhost:50051')
stub = hello_pb2_grpc.GreeterStub(channel)
response = stub.SayHello(hello_pb2.HelloRequest(name='World'))
print(response.message)
```

## Next Steps

- [Documentación de gRPC](https://grpc.io/docs/) - Docs oficiales
- [Protocol Buffers](https://protobuf.dev/) - Serialización
- [gRPC-Web](https://github.com/grpc/grpc-web) - Soporte de navegador
- [BloomRPC](https://github.com/bloomrpc/bloomrpc) - Cliente GUI
