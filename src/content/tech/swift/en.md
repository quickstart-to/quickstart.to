---
title: "Swift"
description: "Get started with Swift programming language in 5 minutes"
template: "language"
tags: ["programming", "apple", "ios", "macos"]
---

## TL;DR

**One-liner**: Swift is Apple's modern language - safe, fast, and the only choice for iOS/macOS.

**Core Strengths**:
- Memory safety without garbage collection
- Modern syntax with type inference
- Fast - often faster than C++
- Official language for Apple platforms

## Philosophy

Swift was built to replace Objective-C:

- **Safety first** - Optionals force you to handle nil. No more crashes from null pointers.
- **Fast by default** - Value types, copy-on-write, optimized for performance
- **Modern syntax** - Clean, expressive, feels like a scripting language
- **Protocol-oriented** - Composition over inheritance

Swift 6 brings strict concurrency checking by default, making async code safer.

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

Create `hello.swift`:
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

**Best for**:
- iOS/macOS/watchOS/tvOS apps
- High-performance applications
- Server-side Swift (Vapor)
- CLI tools on macOS

**Not ideal for**:
- Android development (use Kotlin)
- Web frontend (use JavaScript)
- Cross-platform mobile (use Flutter)

**Comparison**:
| Aspect | Swift | Kotlin | Rust |
|--------|-------|--------|------|
| Platform | Apple | JVM/Android | Cross-platform |
| Memory | ARC | GC | Manual |
| Learning | Medium | Easy | Hard |
| Speed | Fast | Fast | Fastest |

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
- **Server**: Vapor, Hummingbird
- **Networking**: Alamofire, URLSession
- **Testing**: XCTest, Quick/Nimble
