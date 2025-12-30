---
title: "Swift"
description: "Apple 快速安全的语言 - 构建 iOS、macOS 和服务端应用，现代语法，内存安全"
template: "language"
tags: ["programming", "apple", "ios", "macos"]
---

## TL;DR

**一句话**：Swift 是 Apple 的现代语言——安全、快速，iOS/macOS 开发的唯一选择。

**核心优势**：
- 没有垃圾回收也能内存安全
- 现代语法，类型推断
- 快——经常比 C++ 还快
- Apple 平台的官方语言

## Philosophy

Swift 是为取代 Objective-C 而生的：

- **安全第一** - 可选值强制你处理 nil。不再有空指针崩溃。
- **默认高效** - 值类型、写时复制、性能优化
- **现代语法** - 简洁、表达力强，感觉像脚本语言
- **面向协议** - 组合优于继承

Swift 6 默认启用严格并发检查，让异步代码更安全。

## Quick Start

### 安装

```bash
# macOS（配合 Xcode）
xcode-select --install

# Linux
curl -sL https://swift.org/install.sh | bash

# 或从 swift.org 下载
```

### 验证（最新版：6.2）

```bash
swift --version  # Swift version 6.2
```

### 第一个程序

创建 `hello.swift`：
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

### 变量与类型

```swift
// 常量（推荐）
let name = "Alice"    // 类型推断
let age: Int = 25     // 显式类型

// 变量
var count = 0
count += 1

// 集合
let array = [1, 2, 3]
let dict = ["a": 1, "b": 2]
let set: Set = [1, 2, 3]
```

### 可选值

```swift
// 可选值表示"可能是 nil"
var name: String? = "Alice"
var empty: String? = nil

// 解包
if let name = name {
    print(name)  // 安全
}

// 空合并
let displayName = name ?? "访客"

// guard 提前退出
guard let name = name else { return }
print(name)  // 这里 name 已解包
```

### 控制流

```swift
// if-else
if age >= 18 {
    print("成年人")
} else {
    print("未成年")
}

// switch（穷尽的）
switch value {
case 1:
    print("一")
case 2, 3:
    print("二或三")
case 4...10:
    print("四到十")
default:
    print("其他")
}

// for-in
for i in 1...5 {
    print(i)
}

for item in array {
    print(item)
}
```

### 函数

```swift
// 基本函数
func greet(name: String) -> String {
    return "Hello, \(name)!"
}

// 外部/内部参数名
func greet(person name: String) -> String {
    return "Hello, \(name)!"
}
greet(person: "Alice")

// 默认参数
func greet(_ name: String, with greeting: String = "Hello") -> String {
    "\(greeting), \(name)!"
}

// 闭包
let add = { (a: Int, b: Int) -> Int in
    a + b
}
```

### 结构体与类

```swift
// 结构体（值类型，推荐）
struct User {
    let name: String
    var age: Int

    func greet() -> String {
        "Hi, I'm \(name)"
    }
}

var user = User(name: "Alice", age: 25)
var copy = user  // 独立副本
copy.age = 26    // user.age 仍然是 25

// 类（引用类型）
class Account {
    var balance: Double

    init(balance: Double) {
        self.balance = balance
    }
}
```

### Async/Await

```swift
// 异步函数
func fetchData() async throws -> Data {
    let url = URL(string: "https://api.example.com")!
    let (data, _) = try await URLSession.shared.data(from: url)
    return data
}

// 调用异步代码
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

### 结构体 vs 类

```swift
// 结构体是复制的（值语义）
var a = Point(x: 0, y: 0)
var b = a
b.x = 10  // a.x 仍然是 0

// 类是共享的（引用语义）
var account1 = Account(balance: 100)
var account2 = account1
account2.balance = 50  // account1.balance 也变成 50！
```

### 强制解包会崩溃

```swift
var name: String? = nil
// name!  // 崩溃！Fatal error

// 始终使用安全解包
if let name = name {
    print(name)
}
```

### 结构体可变方法

```swift
struct Counter {
    var count = 0

    mutating func increment() {  // 必须标记 mutating
        count += 1
    }
}
```

## When to Choose

**适合**：
- iOS/macOS/watchOS/tvOS 应用
- 高性能应用
- 服务端 Swift（Vapor）
- macOS 上的 CLI 工具

**不适合**：
- Android 开发（用 Kotlin）
- Web 前端（用 JavaScript）
- 跨平台移动（用 Flutter）

**对比**：
| 方面 | Swift | Kotlin | Rust |
|------|-------|--------|------|
| 平台 | Apple | JVM/Android | 跨平台 |
| 内存 | ARC | GC | 手动 |
| 学习难度 | 中等 | 简单 | 困难 |
| 速度 | 快 | 快 | 最快 |

## Next Steps

- [Swift.org](https://swift.org/documentation/)
- [Swift 编程语言](https://docs.swift.org/swift-book/)
- [SwiftUI 教程](https://developer.apple.com/tutorials/swiftui)
- [Swift Playgrounds](https://developer.apple.com/swift-playgrounds/)

## Ecosystem

### 包管理

```bash
# Swift Package Manager
swift package init              # 创建包
swift build                     # 构建
swift run                       # 运行
swift test                      # 测试
swift package add <url>         # 添加依赖
```

### 主流框架

- **UI**：SwiftUI、UIKit
- **服务端**：Vapor、Hummingbird
- **网络**：Alamofire、URLSession
- **测试**：XCTest、Quick/Nimble
