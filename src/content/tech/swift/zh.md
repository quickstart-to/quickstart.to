---
title: "Swift"
description: "5 分钟快速入门 Swift 编程语言"
tags: ["programming", "apple", "ios", "macos"]
---

## TL;DR

**是什么**：Apple 平台的强大、直观的编程语言。

**为什么用**：现代语法、内存安全、高性能，iOS/macOS 开发必需。

## Quick Start

**安装**：

macOS（需要 Xcode）:
```bash
xcode-select --install
```

Linux:
```bash
# 从 swift.org 下载
wget https://download.swift.org/swift-5.9-release/ubuntu2204/swift-5.9-RELEASE/swift-5.9-RELEASE-ubuntu22.04.tar.gz
tar xzf swift-5.9-RELEASE-ubuntu22.04.tar.gz
export PATH=$PATH:/path/to/swift/usr/bin
```

**验证安装**：
```bash
swift --version
```

**Hello World**：

创建 `hello.swift`：
```swift
print("Hello, World!")
```

运行：
```bash
swift hello.swift
```

**Swift REPL**：
```bash
swift
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `swift file.swift` | 运行 Swift 文件 |
| `swift` | 交互式 REPL |
| `swiftc file.swift` | 编译为二进制 |
| `swift build` | 构建包 |
| `swift run` | 构建并运行 |
| `swift test` | 运行测试 |
| `swift package init` | 创建包 |

## Gotchas

### 可选值必须解包

```swift
var name: String? = "John"

// 强制解包（如果是 nil 会崩溃）
print(name!)

// 安全解包
if let unwrapped = name {
    print(unwrapped)
}

// 空合并运算符
print(name ?? "Unknown")
```

### let vs var

```swift
let constant = 10   // 不可变
var variable = 10   // 可变

// constant = 20    // 错误！
variable = 20       // OK
```

### 结构体是值类型

```swift
struct Point {
    var x: Int
    var y: Int
}

var p1 = Point(x: 0, y: 0)
var p2 = p1      // p2 是副本
p2.x = 10        // p1.x 仍然是 0
```

### guard 用于提前退出

```swift
func process(_ value: Int?) {
    guard let value = value else {
        print("No value")
        return
    }
    // value 现在已解包
    print(value)
}
```

## Next Steps

- [Swift.org](https://swift.org/documentation/) - 官方文档
- [Swift Playgrounds](https://developer.apple.com/swift-playgrounds/) - 交互式学习
- [Swift 编程语言](https://docs.swift.org/swift-book/) - 语言指南
- [SwiftUI 教程](https://developer.apple.com/tutorials/swiftui) - UI 框架
