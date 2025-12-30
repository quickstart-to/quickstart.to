---
title: "Flutter"
description: "Démarrez avec le développement mobile Flutter en 5 minutes"
template: "tool"
tags: ["mobile", "dart", "cross-platform"]
---

## TL;DR

**Quoi** : Toolkit UI de Google pour créer des applications compilées nativement.

**Pourquoi** : Une seule base de code pour iOS/Android/Web/Desktop, hot reload, belles UIs, excellentes performances.

## Quick Start

**Installation** : Suivez [flutter.dev/docs/get-started/install](https://flutter.dev/docs/get-started/install)

**Vérifier** :
```bash
flutter doctor
```

**Créer une nouvelle app** :
```bash
flutter create my_app
cd my_app
flutter run
```

## Cheatsheet

| Commande | Description |
|---------|-------------|
| `flutter create name` | Créer un nouveau projet |
| `flutter run` | Exécuter sur appareil/émulateur |
| `flutter build apk` | Construire APK Android |
| `flutter build ios` | Construire app iOS |
| `flutter pub get` | Obtenir les dépendances |
| `flutter pub add pkg` | Ajouter un package |
| `flutter test` | Exécuter les tests |

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
        appBar: AppBar(title: const Text('Mon App')),
        body: const Center(child: Text('Bonjour, Flutter!')),
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
        Text('Compteur: $_count'),
        ElevatedButton(
          onPressed: () => setState(() => _count++),
          child: const Text('Incrémenter'),
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

// Entrée
TextField(controller: ..., onChanged: ...)
ElevatedButton(onPressed: ..., child: ...)

// Affichage
Text('Bonjour')
Image.network('url')
Icon(Icons.star)
```

### Navigation

```dart
// Push
Navigator.push(context, MaterialPageRoute(builder: (context) => NextPage()));

// Pop
Navigator.pop(context);

// Routes nommées
Navigator.pushNamed(context, '/details');
```

## Next Steps

- [Documentation Flutter](https://flutter.dev/docs) - Docs officielles
- [Flutter Cookbook](https://flutter.dev/docs/cookbook) - Recettes
- [pub.dev](https://pub.dev/) - Dépôt de packages
- [Flutter Samples](https://flutter.github.io/samples/) - Exemples
