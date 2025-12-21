---
title: "Flutter"
description: "5 分钟快速入门 Flutter 移动开发"
tags: ["mobile", "dart", "cross-platform"]
---

## TL;DR

**是什么**：Google 的 UI 工具包，用于构建原生编译应用。

**为什么用**：iOS/Android/Web/桌面单一代码库、热重载、美观的 UI、优秀的性能。

## Quick Start

**安装**：按照 [flutter.dev/docs/get-started/install](https://flutter.dev/docs/get-started/install) 操作

**验证**：
```bash
flutter doctor
```

**创建新应用**：
```bash
flutter create my_app
cd my_app
flutter run
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `flutter create name` | 创建新项目 |
| `flutter run` | 在设备/模拟器上运行 |
| `flutter build apk` | 构建 Android APK |
| `flutter build ios` | 构建 iOS 应用 |
| `flutter pub get` | 获取依赖 |
| `flutter pub add pkg` | 添加包 |
| `flutter test` | 运行测试 |

## Gotchas

### 基础 Widget

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

### 有状态 Widget

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

### 常用 Widget

```dart
// 布局
Column(children: [...])
Row(children: [...])
Container(padding: ..., child: ...)
ListView.builder(itemBuilder: ...)

// 输入
TextField(controller: ..., onChanged: ...)
ElevatedButton(onPressed: ..., child: ...)

// 展示
Text('Hello')
Image.network('url')
Icon(Icons.star)
```

### 导航

```dart
// 推入
Navigator.push(context, MaterialPageRoute(builder: (context) => NextPage()));

// 弹出
Navigator.pop(context);

// 命名路由
Navigator.pushNamed(context, '/details');
```

## Next Steps

- [Flutter 文档](https://flutter.dev/docs) - 官方文档
- [Flutter Cookbook](https://flutter.dev/docs/cookbook) - 食谱
- [pub.dev](https://pub.dev/) - 包仓库
- [Flutter 示例](https://flutter.github.io/samples/) - 示例
