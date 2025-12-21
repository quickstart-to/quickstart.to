---
title: "Swift"
description: "Get started with Swift programming language in 5 minutes"
tags: ["programming", "apple", "ios", "macos"]
---

## TL;DR

**What**: A powerful, intuitive programming language for Apple platforms.

**Why**: Modern syntax, memory safety, fast performance, required for iOS/macOS development.

## Quick Start

**Install**:

macOS (Xcode required):
```bash
xcode-select --install
```

Linux:
```bash
# Download from swift.org
wget https://download.swift.org/swift-5.9-release/ubuntu2204/swift-5.9-RELEASE/swift-5.9-RELEASE-ubuntu22.04.tar.gz
tar xzf swift-5.9-RELEASE-ubuntu22.04.tar.gz
export PATH=$PATH:/path/to/swift/usr/bin
```

**Verify installation**:
```bash
swift --version
```

**Hello World**:

Create `hello.swift`:
```swift
print("Hello, World!")
```

Run it:
```bash
swift hello.swift
```

**Swift REPL**:
```bash
swift
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `swift file.swift` | Run Swift file |
| `swift` | Interactive REPL |
| `swiftc file.swift` | Compile to binary |
| `swift build` | Build package |
| `swift run` | Build and run |
| `swift test` | Run tests |
| `swift package init` | Create package |

## Gotchas

### Optionals must be unwrapped

```swift
var name: String? = "John"

// Force unwrap (crashes if nil)
print(name!)

// Safe unwrap
if let unwrapped = name {
    print(unwrapped)
}

// Nil coalescing
print(name ?? "Unknown")
```

### let vs var

```swift
let constant = 10   // Immutable
var variable = 10   // Mutable

// constant = 20    // Error!
variable = 20       // OK
```

### Structs are value types

```swift
struct Point {
    var x: Int
    var y: Int
}

var p1 = Point(x: 0, y: 0)
var p2 = p1      // p2 is a copy
p2.x = 10        // p1.x is still 0
```

### guard for early exit

```swift
func process(_ value: Int?) {
    guard let value = value else {
        print("No value")
        return
    }
    // value is now unwrapped
    print(value)
}
```

## Next Steps

- [Swift.org](https://swift.org/documentation/) - Official documentation
- [Swift Playgrounds](https://developer.apple.com/swift-playgrounds/) - Interactive learning
- [The Swift Book](https://docs.swift.org/swift-book/) - Language guide
- [SwiftUI Tutorials](https://developer.apple.com/tutorials/swiftui) - UI framework
