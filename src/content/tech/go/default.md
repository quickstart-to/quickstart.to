---
title: "Go"
description: "Simple, fast, concurrent - build reliable cloud services and CLI tools with Go"
template: "language"
tags: ["programming", "backend", "systems"]
---

## TL;DR

**One-liner**: Go is a simple, fast language that makes building reliable software easy.

**Core Strengths**:
- Compiles to a single binary - deploy anywhere
- Built-in concurrency with goroutines
- Fast compilation - feels like a scripting language
- Simple syntax - one way to do things

## Philosophy

Go was created at Google to solve real problems:

- **Simplicity over cleverness** - Less is more. No generics abuse, no magic.
- **Composition over inheritance** - Interfaces and embedding instead of class hierarchies
- **Explicit is better** - Error handling is verbose but visible
- **Fast builds, fast execution** - Developer experience matters

The language deliberately leaves out features (exceptions, generics until 1.18, ternary operators) to keep it simple and readable.

## Quick Start

### Install

```bash
# macOS
brew install go

# Linux
wget https://go.dev/dl/go1.24.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.24.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin
```

### Verify (latest stable: 1.24)

```bash
go version  # go version go1.24 linux/amd64
```

### First Program

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

```bash
go run main.go
```

## Language Essentials

### Variables & Types

```go
// Type inference
name := "Alice"      // string
age := 25            // int
height := 1.75       // float64
active := true       // bool

// Explicit types
var count int = 10
var items []string   // slice (dynamic array)
var data map[string]int  // map
```

### Control Flow

```go
// if-else (no parentheses needed)
if age >= 18 {
    fmt.Println("Adult")
} else if age >= 13 {
    fmt.Println("Teen")
} else {
    fmt.Println("Child")
}

// for loop (the only loop)
for i := 0; i < 5; i++ {
    fmt.Println(i)
}

// range over slice
for index, value := range items {
    fmt.Println(index, value)
}

// while-style
for count > 0 {
    count--
}
```

### Functions

```go
// Basic function
func greet(name string) string {
    return "Hello, " + name
}

// Multiple return values
func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

// Usage
result, err := divide(10, 2)
if err != nil {
    log.Fatal(err)
}
```

### Error Handling

```go
// Errors are values, check them explicitly
file, err := os.Open("file.txt")
if err != nil {
    log.Fatal(err)
}
defer file.Close()  // runs when function exits

// No try-catch, no exceptions
```

### Goroutines & Channels

```go
// Start a goroutine
go doSomething()

// Channels for communication
ch := make(chan int)
go func() { ch <- 42 }()
value := <-ch  // receive
```

## Gotchas

### Unused variables cause compile errors

```go
x := 5  // error: x declared but not used

// Use blank identifier to ignore
_ = someFunction()
```

### Exported names start with uppercase

```go
// Public (visible outside package)
func PublicFunc() {}
type PublicStruct struct {}

// Private (package-only)
func privateFunc() {}
```

### Nil slices vs empty slices

```go
var s1 []int         // nil slice, len=0, cap=0
s2 := []int{}        // empty slice, len=0, cap=0
s3 := make([]int, 0) // empty slice, len=0, cap=0
// s1 == nil is true, s2 == nil is false
```

### Pointers exist but no pointer arithmetic

```go
x := 10
p := &x      // get pointer
*p = 20      // dereference
fmt.Println(x)  // 20
```

## When to Choose

**Best for**:
- Cloud services and APIs (Kubernetes, Docker are written in Go)
- CLI tools (fast startup, single binary)
- Microservices (great concurrency model)
- DevOps tooling

**Not ideal for**:
- GUI applications (limited ecosystem)
- Data science (use Python)
- Frontend (use JavaScript/TypeScript)

**Comparison**:
| Aspect | Go | Rust | Python |
|--------|-----|------|--------|
| Speed | Fast | Fastest | Slow |
| Memory | GC | Manual (safe) | GC |
| Learning | Easy | Hard | Easiest |
| Use case | Cloud/CLI | Systems | Scripts/AI |

## Next Steps

- [Go Tour](https://go.dev/tour/) - Interactive tutorial
- [Effective Go](https://go.dev/doc/effective_go) - Best practices
- [Go by Example](https://gobyexample.com/) - Code examples
- [Go Wiki](https://go.dev/wiki/)

## Ecosystem

### Package Manager

```bash
go mod init myproject  # Initialize module
go get pkg             # Add dependency
go mod tidy            # Clean up deps
```

### Popular Packages

- **Web**: Gin, Echo, Fiber, Chi
- **Database**: GORM, sqlx
- **Testing**: testify, gomock
- **CLI**: Cobra, urfave/cli
