---
title: "Expo"
description: "Démarrez avec Expo en 5 minutes"
template: "tool"
tags: ["mobile", "react-native", "cross-platform"]
---

## TL;DR

**Quoi** : Plateforme pour créer des applications React Native avec un outillage simplifié.

**Pourquoi** : Pas de configuration de code natif, mises à jour OTA, déploiement facile, SDK riche.

## Quick Start

**Créer un nouveau projet** :
```bash
npx create-expo-app@latest my-app
cd my-app
npx expo start
```

**Exécuter sur appareil** :
1. Installer l'app Expo Go sur votre téléphone
2. Scanner le QR code depuis le terminal
3. L'app s'exécute sur votre appareil

## Cheatsheet

| Commande | Description |
|---------|-------------|
| `npx expo start` | Démarrer le serveur de dev |
| `npx expo start --ios` | Ouvrir dans le simulateur iOS |
| `npx expo start --android` | Ouvrir dans l'émulateur Android |
| `npx expo install pkg` | Installer un package compatible |
| `npx expo build` | Build pour production |
| `eas build` | Build cloud |

## Gotchas

### Project structure

```
my-app/
  app/              # Routage basé sur fichiers (Expo Router)
    _layout.tsx
    index.tsx
  assets/           # Images, polices
  components/       # Composants réutilisables
  app.json          # Configuration Expo
  package.json
```

### Expo Router (file-based routing)

```jsx
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Accueil' }} />
      <Stack.Screen name="details" options={{ title: 'Détails' }} />
    </Stack>
  );
}

// app/index.tsx
import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function Home() {
  return (
    <View>
      <Text>Écran d'accueil</Text>
      <Link href="/details">Aller aux détails</Link>
    </View>
  );
}

// app/details.tsx
export default function Details() {
  return <Text>Écran des détails</Text>;
}
```

### Using SDK modules

```jsx
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';

// Sélecteur d'images
async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
  });

  if (!result.canceled) {
    console.log(result.assets[0].uri);
  }
}

// Localisation
async function getLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status === 'granted') {
    const location = await Location.getCurrentPositionAsync({});
    console.log(location.coords);
  }
}
```

### Configuration (app.json)

```json
{
  "expo": {
    "name": "Mon App",
    "slug": "my-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "bundleIdentifier": "com.example.myapp"
    },
    "android": {
      "package": "com.example.myapp"
    }
  }
}
```

### EAS Build

```bash
# Installer EAS CLI
npm install -g eas-cli

# Se connecter
eas login

# Configurer
eas build:configure

# Build pour iOS
eas build --platform ios

# Build pour Android
eas build --platform android

# Soumettre aux stores
eas submit
```

## Next Steps

- [Documentation Expo](https://docs.expo.dev/) - Docs officielles
- [Expo Router](https://docs.expo.dev/router/introduction/) - Routage basé sur fichiers
- [Expo SDK](https://docs.expo.dev/versions/latest/) - Modules disponibles
- [EAS Build](https://docs.expo.dev/build/introduction/) - Builds cloud
