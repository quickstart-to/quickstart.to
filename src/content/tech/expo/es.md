---
title: "Expo"
description: "Comienza con Expo en 5 minutos"
template: "tool"
tags: ["mobile", "react-native", "cross-platform"]
---

## TL;DR

**Qué**: Plataforma para crear aplicaciones React Native con herramientas simplificadas.

**Por qué**: Sin configuración de código nativo, actualizaciones OTA, despliegue fácil, SDK rico.

## Quick Start

**Crear nuevo proyecto**:
```bash
npx create-expo-app@latest my-app
cd my-app
npx expo start
```

**Ejecutar en dispositivo**:
1. Instalar la app Expo Go en tu teléfono
2. Escanear el código QR del terminal
3. La app se ejecuta en tu dispositivo

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `npx expo start` | Iniciar servidor de dev |
| `npx expo start --ios` | Abrir en simulador iOS |
| `npx expo start --android` | Abrir en emulador Android |
| `npx expo install pkg` | Instalar paquete compatible |
| `npx expo build` | Build para producción |
| `eas build` | Build en la nube |

## Gotchas

### Project structure

```
my-app/
  app/              # Routing basado en archivos (Expo Router)
    _layout.tsx
    index.tsx
  assets/           # Imágenes, fuentes
  components/       # Componentes reutilizables
  app.json          # Configuración de Expo
  package.json
```

### Expo Router (file-based routing)

```jsx
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Inicio' }} />
      <Stack.Screen name="details" options={{ title: 'Detalles' }} />
    </Stack>
  );
}

// app/index.tsx
import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function Home() {
  return (
    <View>
      <Text>Pantalla de inicio</Text>
      <Link href="/details">Ir a detalles</Link>
    </View>
  );
}

// app/details.tsx
export default function Details() {
  return <Text>Pantalla de detalles</Text>;
}
```

### Using SDK modules

```jsx
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';

// Selector de imágenes
async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
  });

  if (!result.canceled) {
    console.log(result.assets[0].uri);
  }
}

// Ubicación
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
    "name": "Mi App",
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
# Instalar EAS CLI
npm install -g eas-cli

# Iniciar sesión
eas login

# Configurar
eas build:configure

# Build para iOS
eas build --platform ios

# Build para Android
eas build --platform android

# Enviar a las tiendas
eas submit
```

## Next Steps

- [Documentación de Expo](https://docs.expo.dev/) - Docs oficiales
- [Expo Router](https://docs.expo.dev/router/introduction/) - Routing basado en archivos
- [Expo SDK](https://docs.expo.dev/versions/latest/) - Módulos disponibles
- [EAS Build](https://docs.expo.dev/build/introduction/) - Builds en la nube
