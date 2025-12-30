---
title: "Expo"
description: "React Native App Plattform - kein Native-Setup, OTA-Updates, reichhaltiges SDK, einfaches Deployment"
template: "tool"
tags: ["mobile", "react-native", "cross-platform"]
---

## TL;DR

**Was**: Plattform zum Erstellen von React Native Apps mit vereinfachtem Tooling.

**Warum**: Kein Native-Code-Setup, OTA-Updates, einfaches Deployment, reichhaltiges SDK.

## Quick Start

**Neues Projekt erstellen**:
```bash
npx create-expo-app@latest my-app
cd my-app
npx expo start
```

**Auf Gerät ausführen**:
1. Expo Go App auf dem Handy installieren
2. QR-Code vom Terminal scannen
3. App läuft auf Ihrem Gerät

## Cheatsheet

| Befehl | Beschreibung |
|---------|-------------|
| `npx expo start` | Dev-Server starten |
| `npx expo start --ios` | In iOS Simulator öffnen |
| `npx expo start --android` | In Android Emulator öffnen |
| `npx expo install pkg` | Kompatibles Paket installieren |
| `npx expo build` | Für Produktion bauen |
| `eas build` | Cloud Build |

## Gotchas

### Project structure

```
my-app/
  app/              # Dateibasiertes Routing (Expo Router)
    _layout.tsx
    index.tsx
  assets/           # Bilder, Schriften
  components/       # Wiederverwendbare Komponenten
  app.json          # Expo Konfiguration
  package.json
```

### Expo Router (file-based routing)

```jsx
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="details" options={{ title: 'Details' }} />
    </Stack>
  );
}

// app/index.tsx
import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function Home() {
  return (
    <View>
      <Text>Home Screen</Text>
      <Link href="/details">Zu Details</Link>
    </View>
  );
}

// app/details.tsx
export default function Details() {
  return <Text>Details Screen</Text>;
}
```

### Using SDK modules

```jsx
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';

// Bildauswahl
async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
  });

  if (!result.canceled) {
    console.log(result.assets[0].uri);
  }
}

// Standort
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
    "name": "Meine App",
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
# EAS CLI installieren
npm install -g eas-cli

# Anmelden
eas login

# Konfigurieren
eas build:configure

# Für iOS bauen
eas build --platform ios

# Für Android bauen
eas build --platform android

# In Stores einreichen
eas submit
```

## Next Steps

- [Expo Dokumentation](https://docs.expo.dev/) - Offizielle Docs
- [Expo Router](https://docs.expo.dev/router/introduction/) - Dateibasiertes Routing
- [Expo SDK](https://docs.expo.dev/versions/latest/) - Verfügbare Module
- [EAS Build](https://docs.expo.dev/build/introduction/) - Cloud Builds
