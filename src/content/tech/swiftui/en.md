---
title: "SwiftUI"
description: "Get started with SwiftUI in 5 minutes"
template: "tool"
tags: ["ios", "macos", "apple"]
---

## TL;DR

**What**: Apple's declarative UI framework for all Apple platforms.

**Why**: Declarative syntax, live previews, cross-platform (iOS, macOS, watchOS, tvOS).

## Quick Start

**Create project**:
1. Open Xcode → File → New → Project
2. Select "App" template
3. Choose SwiftUI as Interface

**Hello SwiftUI**:
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

| View | Description |
|------|-------------|
| `Text` | Display text |
| `Image` | Display image |
| `Button` | Tappable button |
| `TextField` | Text input |
| `VStack` | Vertical layout |
| `HStack` | Horizontal layout |
| `ZStack` | Overlay layout |
| `List` | Scrollable list |

## Gotchas

### Basic views

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

### State management

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

// Binding for child views
struct ChildView: View {
    @Binding var value: String

    var body: some View {
        TextField("Enter text", text: $value)
    }
}
```

### Lists

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

// With navigation
NavigationStack {
    List(items) { item in
        NavigationLink(item.name) {
            DetailView(item: item)
        }
    }
    .navigationTitle("Fruits")
}
```

### Modifiers

```swift
Text("Styled Text")
    .font(.title)
    .foregroundColor(.blue)
    .padding()
    .background(Color.gray.opacity(0.2))
    .cornerRadius(10)
    .shadow(radius: 5)

// Custom modifier
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

// Usage
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

- [SwiftUI Documentation](https://developer.apple.com/documentation/swiftui) - Official docs
- [SwiftUI Tutorials](https://developer.apple.com/tutorials/swiftui) - Apple tutorials
- [Hacking with Swift](https://www.hackingwithswift.com/quick-start/swiftui) - Tutorials
- [SwiftUI by Example](https://www.hackingwithswift.com/quick-start/swiftui) - Examples
