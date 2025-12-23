---
title: "Tauri"
description: "Get started with Tauri in 5 minutes"
template: "tool"
tags: ["desktop", "rust", "cross-platform"]
---

## TL;DR

**What**: Framework for building lightweight, secure desktop apps with web frontend and Rust backend.

**Why**: Smaller bundle size than Electron, better security, native performance, uses system webview.

## Quick Start

**Prerequisites**:
```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

**Create project**:
```bash
npm create tauri-app@latest my-app
cd my-app
npm install
npm run tauri dev
```

**Project structure**:
```
my-app/
├── src/           # Frontend (HTML/JS/React/Vue)
├── src-tauri/     # Rust backend
│   ├── src/
│   │   └── main.rs
│   ├── Cargo.toml
│   └── tauri.conf.json
└── package.json
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `npm run tauri dev` | Development mode |
| `npm run tauri build` | Build for production |
| `npm run tauri icon` | Generate app icons |
| `cargo tauri info` | System info |

## Gotchas

### Invoke Rust from JavaScript

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
// Frontend
import { invoke } from '@tauri-apps/api/tauri';

const greeting = await invoke('greet', { name: 'World' });
console.log(greeting); // "Hello, World!"
```

### File system access

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
// Frontend
const content = await invoke('read_file', { path: '/path/to/file.txt' });
await invoke('write_file', { path: '/path/to/file.txt', contents: 'Hello' });
```

### Window management

```javascript
import { appWindow } from '@tauri-apps/api/window';

// Minimize, maximize, close
await appWindow.minimize();
await appWindow.maximize();
await appWindow.close();

// Set title
await appWindow.setTitle('New Title');

// Create new window
import { WebviewWindow } from '@tauri-apps/api/window';

const webview = new WebviewWindow('new-window', {
  url: 'settings.html',
  width: 400,
  height: 300
});
```

### Dialog API

```javascript
import { open, save, message } from '@tauri-apps/api/dialog';

// Open file dialog
const selected = await open({
  multiple: false,
  filters: [{ name: 'Text', extensions: ['txt', 'md'] }]
});

// Save dialog
const filePath = await save({
  defaultPath: 'document.txt'
});

// Message dialog
await message('Operation completed!', { title: 'Success', type: 'info' });
```

### Configuration (tauri.conf.json)

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

### Events between frontend and backend

```rust
// Backend: emit event
use tauri::Manager;

#[tauri::command]
fn trigger_event(app: tauri::AppHandle) {
    app.emit_all("backend-event", "payload data").unwrap();
}
```

```javascript
// Frontend: listen to event
import { listen } from '@tauri-apps/api/event';

const unlisten = await listen('backend-event', (event) => {
  console.log('Received:', event.payload);
});

// Cleanup
unlisten();
```

## Next Steps

- [Tauri Documentation](https://tauri.app/v1/guides/) - Official guides
- [Tauri API](https://tauri.app/v1/api/js/) - JavaScript API reference
- [Tauri Examples](https://github.com/tauri-apps/tauri/tree/dev/examples) - Code examples
- [Awesome Tauri](https://github.com/tauri-apps/awesome-tauri) - Community resources
