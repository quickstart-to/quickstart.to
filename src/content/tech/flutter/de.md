---
title: "Flutter"
description: "Google UI-Toolkit fuer Cross-Platform Apps - eine Codebasis, Hot Reload, native Performance"
template: "tool"
tags: ["mobile", "dart", "cross-platform"]
---

## TL;DR

**Was**: Googles UI-Toolkit zum Erstellen nativ kompilierter Anwendungen.

**Warum**: Eine Codebasis für iOS/Android/Web/Desktop, Hot Reload, schöne UIs, tolle Performance.

## Quick Start

**Installation**: Folgen Sie [flutter.dev/docs/get-started/install](https://flutter.dev/docs/get-started/install)

**Verifizieren**:
```bash
flutter doctor
```

**Neue App erstellen**:
```bash
flutter create my_app
cd my_app
flutter run
```

## Cheatsheet

| Befehl | Beschreibung |
|---------|-------------|
| `flutter create name` | Neues Projekt erstellen |
| `flutter run` | Auf Gerät/Emulator ausführen |
| `flutter build apk` | Android APK bauen |
| `flutter build ios` | iOS App bauen |
| `flutter pub get` | Dependencies holen |
| `flutter pub add pkg` | Paket hinzufügen |
| `flutter test` | Tests ausführen |

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
        appBar: AppBar(title: const Text('Meine App')),
        body: const Center(child: Text('Hallo, Flutter!')),
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
        Text('Zähler: $_count'),
        ElevatedButton(
          onPressed: () => setState(() => _count++),
          child: const Text('Erhöhen'),
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

// Eingabe
TextField(controller: ..., onChanged: ...)
ElevatedButton(onPressed: ..., child: ...)

// Anzeige
Text('Hallo')
Image.network('url')
Icon(Icons.star)
```

### Navigation

```dart
// Push
Navigator.push(context, MaterialPageRoute(builder: (context) => NextPage()));

// Pop
Navigator.pop(context);

// Benannte Routen
Navigator.pushNamed(context, '/details');
```

## Next Steps

- [Flutter Dokumentation](https://flutter.dev/docs) - Offizielle Docs
- [Flutter Cookbook](https://flutter.dev/docs/cookbook) - Rezepte
- [pub.dev](https://pub.dev/) - Paket-Repository
- [Flutter Samples](https://flutter.github.io/samples/) - Beispiele
