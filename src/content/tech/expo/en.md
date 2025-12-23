---
title: "Expo"
description: "Get started with Expo in 5 minutes"
template: "tool"
tags: ["mobile", "react-native", "cross-platform"]
---

## TL;DR

**What**: Platform for building React Native apps with simplified tooling.

**Why**: No native code setup, OTA updates, easy deployment, rich SDK.

## Quick Start

**Create new project**:
```bash
npx create-expo-app@latest my-app
cd my-app
npx expo start
```

**Run on device**:
1. Install Expo Go app on your phone
2. Scan QR code from terminal
3. App runs on your device

## Cheatsheet

| Command | Description |
|---------|-------------|
| `npx expo start` | Start dev server |
| `npx expo start --ios` | Open in iOS simulator |
| `npx expo start --android` | Open in Android emulator |
| `npx expo install pkg` | Install compatible package |
| `npx expo build` | Build for production |
| `eas build` | Cloud build |

## Gotchas

### Project structure

```
my-app/
  app/              # File-based routing (Expo Router)
    _layout.tsx
    index.tsx
  assets/           # Images, fonts
  components/       # Reusable components
  app.json          # Expo config
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
      <Link href="/details">Go to Details</Link>
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

// Image picker
async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
  });

  if (!result.canceled) {
    console.log(result.assets[0].uri);
  }
}

// Location
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
    "name": "My App",
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
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Submit to stores
eas submit
```

## Next Steps

- [Expo Documentation](https://docs.expo.dev/) - Official docs
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing
- [Expo SDK](https://docs.expo.dev/versions/latest/) - Available modules
- [EAS Build](https://docs.expo.dev/build/introduction/) - Cloud builds
