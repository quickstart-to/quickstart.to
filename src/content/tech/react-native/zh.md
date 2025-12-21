---
title: "React Native"
description: "5 分钟快速入门 React Native"
tags: ["mobile", "react", "cross-platform"]
---

## TL;DR

**是什么**：使用 React 和 JavaScript 构建原生移动应用。

**为什么用**：与 React web 共享代码、热重载、原生性能、大型生态系统。

## Quick Start

**创建新项目**：
```bash
npx create-expo-app@latest my-app
cd my-app
npx expo start
```

**或使用 React Native CLI**：
```bash
npx @react-native-community/cli init MyApp
cd MyApp
npx react-native run-ios    # 或 run-android
```

## Cheatsheet

| 概念 | React Native |
|---------|--------------|
| 容器 | `<View>` |
| 文本 | `<Text>` |
| 图片 | `<Image>` |
| 按钮 | `<TouchableOpacity>`, `<Pressable>` |
| 列表 | `<FlatList>`, `<ScrollView>` |
| 输入 | `<TextInput>` |

## Gotchas

### 基础组件

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

### 样式

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

// 内联样式
<View style={{ marginTop: 10, padding: 5 }} />

// 多个样式
<View style={[styles.container, styles.row]} />
```

### 列表

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

### 导航

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

// 导航
navigation.navigate('Details', { itemId: 42 });

// 获取参数
const { itemId } = route.params;
```

### 状态管理

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

- [React Native 文档](https://reactnative.dev/docs/getting-started) - 官方文档
- [Expo 文档](https://docs.expo.dev/) - Expo 平台
- [React Navigation](https://reactnavigation.org/) - 导航库
- [React Native Directory](https://reactnative.directory/) - 组件库
