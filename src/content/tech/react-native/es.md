---
title: "React Native"
description: "Comienza con React Native en 5 minutos"
template: "tool"
tags: ["mobile", "react", "cross-platform"]
---

## TL;DR

**Qué**: Crear apps móviles nativas usando React y JavaScript.

**Por qué**: Compartir código con React web, hot reloading, rendimiento nativo, gran ecosistema.

## Quick Start

**Crear nuevo proyecto**:
```bash
npx create-expo-app@latest my-app
cd my-app
npx expo start
```

**O con React Native CLI**:
```bash
npx @react-native-community/cli init MyApp
cd MyApp
npx react-native run-ios    # or run-android
```

## Cheatsheet

| Concepto | React Native |
|---------|--------------|
| Contenedor | `<View>` |
| Texto | `<Text>` |
| Imagen | `<Image>` |
| Botón | `<TouchableOpacity>`, `<Pressable>` |
| Lista | `<FlatList>`, `<ScrollView>` |
| Entrada | `<TextInput>` |

## Gotchas

### Componente básico

```jsx
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, React Native!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
```

### Estilos

```jsx
import { StyleSheet, View } from 'react-native';

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

// Inline styles
<View style={{ marginTop: 10, padding: 5 }} />

// Multiple styles
<View style={[styles.container, styles.row]} />
```

### Listas

```jsx
import { FlatList, Text, View } from 'react-native';

const data = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
];

function MyList() {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View>
          <Text>{item.title}</Text>
        </View>
      )}
    />
  );
}
```

### Navegación

```bash
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
```

```jsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Navigate
navigation.navigate('Details', { itemId: 42 });

// Get params
const { itemId } = route.params;
```

### Gestión de estado

```jsx
import { useState } from 'react';
import { View, Text, Button } from 'react-native';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
    </View>
  );
}
```

## Next Steps

- [React Native Documentation](https://reactnative.dev/docs/getting-started) - Documentación oficial
- [Expo Documentation](https://docs.expo.dev/) - Plataforma Expo
- [React Navigation](https://reactnavigation.org/) - Biblioteca de navegación
- [React Native Directory](https://reactnative.directory/) - Biblioteca de componentes
