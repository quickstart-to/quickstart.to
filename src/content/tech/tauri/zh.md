---
title: "Tauri"
description: "用 Web 前端和 Rust 构建轻量桌面应用 - 比 Electron 更小、原生性能"
template: "tool"
tags: ["desktop", "rust", "cross-platform"]
---

## TL;DR

**是什么**：使用 Web 前端和 Rust 后端构建轻量级安全桌面应用的框架。

**为什么用**：比 Electron 更小的包体积、更好的安全性、原生性能、使用系统 webview。

## Quick Start

**前置条件**：
```bash
# 安装 Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

**创建项目**：
```bash
npm create tauri-app@latest my-app
cd my-app
npm install
npm run tauri dev
```

**项目结构**：
```
my-app/
├── src/           # 前端 (HTML/JS/React/Vue)
├── src-tauri/     # Rust 后端
│   ├── src/
│   │   └── main.rs
│   ├── Cargo.toml
│   └── tauri.conf.json
└── package.json
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `npm run tauri dev` | 开发模式 |
| `npm run tauri build` | 生产构建 |
| `npm run tauri icon` | 生成应用图标 |
| `cargo tauri info` | 系统信息 |

## Gotchas

### 从 JavaScript 调用 Rust

```rust
// src-tauri/src/main.rs
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error running app");
}
```

```javascript
// 前端
import { invoke } from '@tauri-apps/api/tauri';

const greeting = await invoke('greet', { name: 'World' });
console.log(greeting); // "Hello, World!"
```

### 文件系统访问

```rust
// src-tauri/src/main.rs
use std::fs;

#[tauri::command]
fn read_file(path: String) -> Result<String, String> {
    fs::read_to_string(&path).map_err(|e| e.to_string())
}

#[tauri::command]
fn write_file(path: String, contents: String) -> Result<(), String> {
    fs::write(&path, contents).map_err(|e| e.to_string())
}
```

```javascript
// 前端
const content = await invoke('read_file', { path: '/path/to/file.txt' });
await invoke('write_file', { path: '/path/to/file.txt', contents: 'Hello' });
```

### 窗口管理

```javascript
import { appWindow } from '@tauri-apps/api/window';

// 最小化、最大化、关闭
await appWindow.minimize();
await appWindow.maximize();
await appWindow.close();

// 设置标题
await appWindow.setTitle('新标题');

// 创建新窗口
import { WebviewWindow } from '@tauri-apps/api/window';

const webview = new WebviewWindow('new-window', {
  url: 'settings.html',
  width: 400,
  height: 300
});
```

### 对话框 API

```javascript
import { open, save, message } from '@tauri-apps/api/dialog';

// 打开文件对话框
const selected = await open({
  multiple: false,
  filters: [{ name: '文本', extensions: ['txt', 'md'] }]
});

// 保存对话框
const filePath = await save({
  defaultPath: 'document.txt'
});

// 消息对话框
await message('操作完成！', { title: '成功', type: 'info' });
```

### 配置 (tauri.conf.json)

```json
{
  "build": {
    "distDir": "../dist",
    "devPath": "http://localhost:3000"
  },
  "package": {
    "productName": "My App",
    "version": "1.0.0"
  },
  "tauri": {
    "bundle": {
      "identifier": "com.example.myapp",
      "icon": ["icons/icon.png"]
    },
    "windows": [{
      "title": "My App",
      "width": 800,
      "height": 600,
      "resizable": true
    }],
    "allowlist": {
      "fs": { "all": true },
      "dialog": { "all": true },
      "shell": { "open": true }
    }
  }
}
```

### 前后端事件通信

```rust
// 后端：发送事件
use tauri::Manager;

#[tauri::command]
fn trigger_event(app: tauri::AppHandle) {
    app.emit_all("backend-event", "payload data").unwrap();
}
```

```javascript
// 前端：监听事件
import { listen } from '@tauri-apps/api/event';

const unlisten = await listen('backend-event', (event) => {
  console.log('收到:', event.payload);
});

// 清理
unlisten();
```

## Next Steps

- [Tauri 文档](https://tauri.app/v1/guides/) - 官方指南
- [Tauri API](https://tauri.app/v1/api/js/) - JavaScript API 参考
- [Tauri 示例](https://github.com/tauri-apps/tauri/tree/dev/examples) - 代码示例
- [Awesome Tauri](https://github.com/tauri-apps/awesome-tauri) - 社区资源
