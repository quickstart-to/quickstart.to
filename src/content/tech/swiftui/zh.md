---
title: "SwiftUI"
description: "Apple 声明式 UI 框架 - 跨平台（iOS/macOS/watchOS/tvOS）、实时预览"
template: "tool"
tags: ["ios", "macos", "apple"]
---

## TL;DR

**是什么**：Apple 的声明式 UI 框架，适用于所有 Apple 平台。

**为什么用**：声明式语法、实时预览、跨平台（iOS、macOS、watchOS、tvOS）。

## Quick Start

**创建项目**：
1. 打开 Xcode → File → New → Project
2. 选择 "App" 模板
3. 选择 SwiftUI 作为 Interface

**Hello SwiftUI**：
```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Hello, SwiftUI!")
            .font(.title)
            .foregroundColor(.blue)
    }
}
```

## Cheatsheet

| 视图 | 描述 |
|------|-------------|
| `Text` | 显示文本 |
| `Image` | 显示图片 |
| `Button` | 可点击按钮 |
| `TextField` | 文本输入 |
| `VStack` | 垂直布局 |
| `HStack` | 水平布局 |
| `ZStack` | 叠加布局 |
| `List` | 可滚动列表 |

## Gotchas

### 基础视图

```swift
struct ContentView: View {
    var body: some View {
        VStack(spacing: 20) {
            Text("Hello")
                .font(.largeTitle)
                .fontWeight(.bold)

            Image(systemName: "star.fill")
                .foregroundColor(.yellow)
                .font(.system(size: 50))

            Button("Tap me") {
                print("Button tapped")
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }
}
```

### 状态管理

```swift
struct CounterView: View {
    @State private var count = 0

    var body: some View {
        VStack {
            Text("Count: \(count)")
            Button("Increment") {
                count += 1
            }
        }
    }
}

// 子视图绑定
struct ChildView: View {
    @Binding var value: String

    var body: some View {
        TextField("Enter text", text: $value)
    }
}
```

### 列表

```swift
struct Item: Identifiable {
    let id = UUID()
    let name: String
}

struct ListView: View {
    let items = [
        Item(name: "Apple"),
        Item(name: "Banana"),
        Item(name: "Cherry")
    ]

    var body: some View {
        List(items) { item in
            Text(item.name)
        }
    }
}

// 带导航
NavigationStack {
    List(items) { item in
        NavigationLink(item.name) {
            DetailView(item: item)
        }
    }
    .navigationTitle("Fruits")
}
```

### 修饰符

```swift
Text("Styled Text")
    .font(.title)
    .foregroundColor(.blue)
    .padding()
    .background(Color.gray.opacity(0.2))
    .cornerRadius(10)
    .shadow(radius: 5)

// 自定义修饰符
struct CardModifier: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding()
            .background(Color.white)
            .cornerRadius(10)
            .shadow(radius: 5)
    }
}

extension View {
    func cardStyle() -> some View {
        modifier(CardModifier())
    }
}

// 使用
Text("Card").cardStyle()
```

### ObservableObject

```swift
class UserViewModel: ObservableObject {
    @Published var name = ""
    @Published var isLoggedIn = false

    func login() {
        isLoggedIn = true
    }
}

struct ProfileView: View {
    @StateObject private var viewModel = UserViewModel()

    var body: some View {
        VStack {
            TextField("Name", text: $viewModel.name)
            Button("Login") {
                viewModel.login()
            }
            if viewModel.isLoggedIn {
                Text("Welcome, \(viewModel.name)!")
            }
        }
    }
}
```

## Next Steps

- [SwiftUI 文档](https://developer.apple.com/documentation/swiftui) - 官方文档
- [SwiftUI 教程](https://developer.apple.com/tutorials/swiftui) - Apple 教程
- [Hacking with Swift](https://www.hackingwithswift.com/quick-start/swiftui) - 教程
- [SwiftUI by Example](https://www.hackingwithswift.com/quick-start/swiftui) - 示例
