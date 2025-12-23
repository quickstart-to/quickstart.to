---
title: "Flutter"
description: "Get started with Flutter mobile development in 5 minutes"
template: "tool"
tags: ["mobile", "dart", "cross-platform"]
---

## TL;DR

**What**: Google's UI toolkit for building natively compiled applications.

**Why**: Single codebase for iOS/Android/Web/Desktop, hot reload, beautiful UIs, great performance.

## Quick Start

**Install**: Follow [flutter.dev/docs/get-started/install](https://flutter.dev/docs/get-started/install)

**Verify**:
```bash
flutter doctor
```

**Create new app**:
```bash
flutter create my_app
cd my_app
flutter run
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `flutter create name` | Create new project |
| `flutter run` | Run on device/emulator |
| `flutter build apk` | Build Android APK |
| `flutter build ios` | Build iOS app |
| `flutter pub get` | Get dependencies |
| `flutter pub add pkg` | Add package |
| `flutter test` | Run tests |

## Gotchas

### Basic widget

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('My App')),
        body: const Center(child: Text('Hello, Flutter!')),
      ),
    );
  }
}
```

### Stateful widget

```dart
class Counter extends StatefulWidget {
  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _count = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: $_count'),
        ElevatedButton(
          onPressed: () => setState(() => _count++),
          child: const Text('Increment'),
        ),
      ],
    );
  }
}
```

### Common widgets

```dart
// Layout
Column(children: [...])
Row(children: [...])
Container(padding: ..., child: ...)
ListView.builder(itemBuilder: ...)

// Input
TextField(controller: ..., onChanged: ...)
ElevatedButton(onPressed: ..., child: ...)

// Display
Text('Hello')
Image.network('url')
Icon(Icons.star)
```

### Navigation

```dart
// Push
Navigator.push(context, MaterialPageRoute(builder: (context) => NextPage()));

// Pop
Navigator.pop(context);

// Named routes
Navigator.pushNamed(context, '/details');
```

## Next Steps

- [Flutter Documentation](https://flutter.dev/docs) - Official docs
- [Flutter Cookbook](https://flutter.dev/docs/cookbook) - Recipes
- [pub.dev](https://pub.dev/) - Package repository
- [Flutter Samples](https://flutter.github.io/samples/) - Examples
