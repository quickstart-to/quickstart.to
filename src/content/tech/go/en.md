---
title: "Go"
description: "Get started with Go programming language in 5 minutes"
tags: ["programming", "backend", "systems"]
---

## TL;DR

**What**: A statically typed, compiled language designed for simplicity and efficiency.

**Why**: Fast compilation, built-in concurrency, simple syntax, great for cloud and backend services.

## Quick Start

**Install**:

macOS:
```bash
brew install go
```

Linux:
```bash
wget https://go.dev/dl/go1.23.4.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.23.4.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin
```

Windows: Download from [go.dev/dl](https://go.dev/dl/)

**Verify installation**:
```bash
go version
```

**Hello World**:
```bash
mkdir hello && cd hello
go mod init hello
```

Create `main.go`:
```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

Run it:
```bash
go run main.go
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `go run file.go` | Run a Go file |
| `go build` | Compile package |
| `go mod init name` | Initialize module |
| `go mod tidy` | Clean up dependencies |
| `go get pkg` | Add dependency |
| `go test` | Run tests |
| `go fmt` | Format code |
| `go vet` | Report likely mistakes |

## Gotchas

### GOPATH vs Go Modules

```bash
# Use Go Modules (modern way)
go mod init myproject
# GOPATH is legacy, modules are the default since Go 1.16
```

### Unused variables cause compile errors

```go
// This won't compile
x := 5  // unused variable

// Use blank identifier if needed
_ = someFunction()
```

### Exported names start with uppercase

```go
// Public (exported)
func PublicFunc() {}

// Private (unexported)
func privateFunc() {}
```

## Next Steps

- [Go Tour](https://go.dev/tour/) - Interactive tutorial
- [Effective Go](https://go.dev/doc/effective_go) - Best practices
- [Go by Example](https://gobyexample.com/) - Code examples
- [Go Documentation](https://go.dev/doc/)
