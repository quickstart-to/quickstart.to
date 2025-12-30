---
title: "Swift"
description: "Comienza con el lenguaje de programación Swift en 5 minutos"
template: "language"
tags: ["programming", "apple", "ios", "macos"]
---

## TL;DR

**En resumen**: Swift es el lenguaje moderno de Apple - seguro, rápido y la única opción para iOS/macOS.

**Fortalezas principales**:
- Seguridad de memoria sin garbage collection
- Sintaxis moderna con inferencia de tipos
- Rápido - a menudo más rápido que C++
- Lenguaje oficial para plataformas Apple

## Philosophy

Swift fue construido para reemplazar Objective-C:

- **Seguridad primero** - Los opcionales te obligan a manejar nil. No más crashes por punteros nulos.
- **Rápido por defecto** - Tipos valor, copy-on-write, optimizado para rendimiento
- **Sintaxis moderna** - Limpia, expresiva, se siente como un lenguaje de scripting
- **Orientado a protocolos** - Composición sobre herencia

Swift 6 trae verificación estricta de concurrencia por defecto, haciendo el código async más seguro.

## Quick Start

### Install

```bash
# macOS (with Xcode)
xcode-select --install

# Linux
curl -sL https://swift.org/install.sh | bash

# Or download from swift.org
```

### Verify (latest: 6.2)

```bash
swift --version  # Swift version 6.2
```

### First Program

Crea `hello.swift`:
```swift
print("Hello, World!")
```

```bash
swift hello.swift
```

### Swift REPL

```bash
swift
> print("Hello")
Hello
```

## Language Essentials

### Variables & Types

```swift
// Constants (preferred)
let name = "Alice"    // Type inferred
let age: Int = 25     // Explicit type

// Variables
var count = 0
count += 1

// Collections
let array = [1, 2, 3]
let dict = ["a": 1, "b": 2]
let set: Set = [1, 2, 3]
```

### Optionals

```swift
// Optionals represent "might be nil"
var name: String? = "Alice"
var empty: String? = nil

// Unwrapping
if let name = name {
    print(name)  // Safe
}

// Nil coalescing
let displayName = name ?? "Guest"

// Guard for early exit
guard let name = name else { return }
print(name)  // name is unwrapped here
```

### Control Flow

```swift
// if-else
if age >= 18 {
    print("Adult")
} else {
    print("Minor")
}

// switch (exhaustive)
switch value {
case 1:
    print("one")
case 2, 3:
    print("two or three")
case 4...10:
    print("four to ten")
default:
    print("other")
}

// for-in
for i in 1...5 {
    print(i)
}

for item in array {
    print(item)
}
```

### Functions

```swift
// Basic function
func greet(name: String) -> String {
    return "Hello, \(name)!"
}

// External/internal parameter names
func greet(person name: String) -> String {
    return "Hello, \(name)!"
}
greet(person: "Alice")

// Default parameters
func greet(_ name: String, with greeting: String = "Hello") -> String {
    "\(greeting), \(name)!"
}

// Closures
let add = { (a: Int, b: Int) -> Int in
    a + b
}
```

### Structs & Classes

```swift
// Struct (value type, preferred)
struct User {
    let name: String
    var age: Int

    func greet() -> String {
        "Hi, I'm \(name)"
    }
}

var user = User(name: "Alice", age: 25)
var copy = user  // Independent copy
copy.age = 26    // user.age is still 25

// Class (reference type)
class Account {
    var balance: Double

    init(balance: Double) {
        self.balance = balance
    }
}
```

### Async/Await

```swift
// Async function
func fetchData() async throws -> Data {
    let url = URL(string: "https://api.example.com")!
    let (data, _) = try await URLSession.shared.data(from: url)
    return data
}

// Calling async code
Task {
    do {
        let data = try await fetchData()
        print(data)
    } catch {
        print(error)
    }
}
```

## Gotchas

### Structs vs Classes

```swift
// Structs are copied (value semantics)
var a = Point(x: 0, y: 0)
var b = a
b.x = 10  // a.x is still 0

// Classes are shared (reference semantics)
var account1 = Account(balance: 100)
var account2 = account1
account2.balance = 50  // account1.balance is also 50!
```

### Force unwrap crashes

```swift
var name: String? = nil
// name!  // CRASH! Fatal error

// Always prefer safe unwrapping
if let name = name {
    print(name)
}
```

### Mutating struct methods

```swift
struct Counter {
    var count = 0

    mutating func increment() {  // Must mark as mutating
        count += 1
    }
}
```

## When to Choose

**Ideal para**:
- Apps iOS/macOS/watchOS/tvOS
- Aplicaciones de alto rendimiento
- Swift del lado del servidor (Vapor)
- Herramientas CLI en macOS

**No ideal para**:
- Desarrollo Android (usa Kotlin)
- Frontend web (usa JavaScript)
- Mobile cross-platform (usa Flutter)

**Comparación**:
| Aspecto | Swift | Kotlin | Rust |
|--------|-------|--------|------|
| Plataforma | Apple | JVM/Android | Cross-platform |
| Memoria | ARC | GC | Manual |
| Aprendizaje | Medio | Fácil | Difícil |
| Velocidad | Rápido | Rápido | El más rápido |

## Next Steps

- [Swift.org](https://swift.org/documentation/)
- [The Swift Book](https://docs.swift.org/swift-book/)
- [SwiftUI Tutorials](https://developer.apple.com/tutorials/swiftui)
- [Swift Playgrounds](https://developer.apple.com/swift-playgrounds/)

## Ecosystem

### Package Management

```bash
# Swift Package Manager
swift package init              # Create package
swift build                     # Build
swift run                       # Run
swift test                      # Test
swift package add <url>         # Add dependency
```

### Popular Frameworks

- **UI**: SwiftUI, UIKit
- **Servidor**: Vapor, Hummingbird
- **Networking**: Alamofire, URLSession
- **Testing**: XCTest, Quick/Nimble
