---
title: "Expo"
description: "React Native 应用平台 - 无需原生配置、OTA 更新、丰富 SDK、轻松部署"
template: "tool"
tags: ["mobile", "react-native", "cross-platform"]
---

## TL;DR

**是什么**：简化工具链的 React Native 应用构建平台。

**为什么用**：无需原生代码设置、OTA 更新、简单部署、丰富 SDK。

## Quick Start

**创建新项目**：
```bash
npx create-expo-app@latest my-app
cd my-app
npx expo start
```

**在设备上运行**：
1. 在手机上安装 Expo Go 应用
2. 扫描终端中的二维码
3. 应用在你的设备上运行

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `npx expo start` | 启动开发服务器 |
| `npx expo start --ios` | 在 iOS 模拟器中打开 |
| `npx expo start --android` | 在 Android 模拟器中打开 |
| `npx expo install pkg` | 安装兼容包 |
| `npx expo build` | 构建生产版本 |
| `eas build` | 云构建 |

## Gotchas

### 项目结构

```
my-app/
  app/              # 基于文件的路由（Expo Router）
    _layout.tsx
    index.tsx
  assets/           # 图片、字体
  components/       # 可复用组件
  app.json          # Expo 配置
  package.json
```

### Expo Router（基于文件的路由）

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

### 使用 SDK 模块

```jsx
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';

// 图片选择器
async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
  });

  if (!result.canceled) {
    console.log(result.assets[0].uri);
  }
}

// 位置
async function getLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status === 'granted') {
    const location = await Location.getCurrentPositionAsync({});
    console.log(location.coords);
  }
}
```

### 配置（app.json）

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
# 安装 EAS CLI
npm install -g eas-cli

# 登录
eas login

# 配置
eas build:configure

# 构建 iOS
eas build --platform ios

# 构建 Android
eas build --platform android

# 提交到商店
eas submit
```

## Next Steps

- [Expo 文档](https://docs.expo.dev/) - 官方文档
- [Expo Router](https://docs.expo.dev/router/introduction/) - 基于文件的路由
- [Expo SDK](https://docs.expo.dev/versions/latest/) - 可用模块
- [EAS Build](https://docs.expo.dev/build/introduction/) - 云构建
