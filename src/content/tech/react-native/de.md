---
title: "React Native"
description: "Native Mobile-Apps mit React - Code-Sharing mit Web, Hot Reload, native Performance"
template: "tool"
tags: ["mobile", "react", "cross-platform"]
---

## TL;DR

**Was**: Native mobile Apps mit React und JavaScript erstellen.

**Warum**: Code-Sharing mit React Web, Hot Reloading, native Performance, großes Ökosystem.

## Quick Start

**Neues Projekt erstellen**:
```bash
npx create-expo-app@latest my-app
cd my-app
npx expo start
```

**Oder mit React Native CLI**:
```bash
npx @react-native-community/cli init MyApp
cd MyApp
npx react-native run-ios    # or run-android
```

## Cheatsheet

| Konzept | React Native |
|---------|--------------|
| Container | `<View>` |
| Text | `<Text>` |
| Bild | `<Image>` |
| Button | `<TouchableOpacity>`, `<Pressable>` |
| Liste | `<FlatList>`, `<ScrollView>` |
| Eingabe | `<TextInput>` |

## Gotchas

### Basis-Komponente

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

### Styling

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

### Listen

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

### Navigation

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

### State-Verwaltung

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

- [React Native Documentation](https://reactnative.dev/docs/getting-started) - Offizielle Dokumentation
- [Expo Documentation](https://docs.expo.dev/) - Expo-Plattform
- [React Navigation](https://reactnavigation.org/) - Navigations-Bibliothek
- [React Native Directory](https://reactnative.directory/) - Komponentenbibliothek
