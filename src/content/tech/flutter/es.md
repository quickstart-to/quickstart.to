---
title: "Flutter"
description: "Toolkit UI de Google para apps multiplataforma - un codigo base, hot reload, rendimiento nativo"
template: "tool"
tags: ["mobile", "dart", "cross-platform"]
---

## TL;DR

**Qué**: Kit de herramientas UI de Google para crear aplicaciones compiladas nativamente.

**Por qué**: Un código base para iOS/Android/Web/Desktop, hot reload, UIs hermosas, gran rendimiento.

## Quick Start

**Instalación**: Sigue [flutter.dev/docs/get-started/install](https://flutter.dev/docs/get-started/install)

**Verificar**:
```bash
flutter doctor
```

**Crear nueva app**:
```bash
flutter create my_app
cd my_app
flutter run
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `flutter create name` | Crear nuevo proyecto |
| `flutter run` | Ejecutar en dispositivo/emulador |
| `flutter build apk` | Compilar APK Android |
| `flutter build ios` | Compilar app iOS |
| `flutter pub get` | Obtener dependencias |
| `flutter pub add pkg` | Añadir paquete |
| `flutter test` | Ejecutar tests |

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
        appBar: AppBar(title: const Text('Mi App')),
        body: const Center(child: Text('¡Hola, Flutter!')),
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
        Text('Contador: $_count'),
        ElevatedButton(
          onPressed: () => setState(() => _count++),
          child: const Text('Incrementar'),
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

// Entrada
TextField(controller: ..., onChanged: ...)
ElevatedButton(onPressed: ..., child: ...)

// Visualización
Text('Hola')
Image.network('url')
Icon(Icons.star)
```

### Navigation

```dart
// Push
Navigator.push(context, MaterialPageRoute(builder: (context) => NextPage()));

// Pop
Navigator.pop(context);

// Rutas nombradas
Navigator.pushNamed(context, '/details');
```

## Next Steps

- [Documentación de Flutter](https://flutter.dev/docs) - Docs oficiales
- [Flutter Cookbook](https://flutter.dev/docs/cookbook) - Recetas
- [pub.dev](https://pub.dev/) - Repositorio de paquetes
- [Flutter Samples](https://flutter.github.io/samples/) - Ejemplos
