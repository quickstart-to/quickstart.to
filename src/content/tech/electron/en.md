---
title: "Electron"
description: "Get started with Electron in 5 minutes"
template: "framework"
tags: ["desktop", "javascript", "cross-platform"]
---

## TL;DR

**One-liner**: Electron lets you build cross-platform desktop apps with JavaScript, HTML, and CSS - one codebase for Windows, macOS, and Linux.

**Core Strengths**:
- Web technologies - use your existing JS/HTML/CSS skills
- Cross-platform - single codebase, three platforms
- Native APIs - access filesystem, system tray, notifications
- Rich ecosystem - VS Code, Slack, Discord built with Electron

## Core Concepts

### Concept 1: Main vs Renderer Process

Two types of processes with different APIs:

```javascript
// Main process (main.js) - Node.js access, creates windows
const { app, BrowserWindow } = require('electron');

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600 });
  win.loadFile('index.html');
});

// Renderer process (in browser window) - DOM access, web APIs
document.querySelector('#btn').addEventListener('click', () => {
  console.log('Clicked!');
});
```

### Concept 2: IPC (Inter-Process Communication)

Securely communicate between main and renderer:

```javascript
// main.js
const { ipcMain } = require('electron');

ipcMain.handle('read-file', async (event, path) => {
  const fs = require('fs').promises;
  return await fs.readFile(path, 'utf-8');
});

// preload.js (bridge between main and renderer)
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  readFile: (path) => ipcRenderer.invoke('read-file', path)
});

// renderer.js (in HTML)
const content = await window.api.readFile('/path/to/file');
```

### Concept 3: Context Isolation

Security best practice - isolate renderer from Node.js:

```javascript
const win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,      // Don't expose Node to renderer
    contextIsolation: true,      // Isolate preload from renderer
    preload: path.join(__dirname, 'preload.js')
  }
});
```

## Quick Start

### Create Project

```bash
mkdir my-app && cd my-app
npm init -y
npm install electron --save-dev
```

### Create main.js

```javascript
const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  });
  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
```

### Create index.html

```html
<!DOCTYPE html>
<html>
<head><title>My Electron App</title></head>
<body><h1>Hello Electron!</h1></body>
</html>
```

### Run

```bash
npx electron .
```

## Gotchas

### Application menus

```javascript
const { Menu } = require('electron');

const template = [
  {
    label: 'File',
    submenu: [
      { label: 'Open', accelerator: 'CmdOrCtrl+O', click: () => { /* ... */ } },
      { type: 'separator' },
      { role: 'quit' }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' }
    ]
  }
];

Menu.setApplicationMenu(Menu.buildFromTemplate(template));
```

### Native dialogs

```javascript
const { dialog } = require('electron');

// Open file
const { filePaths } = await dialog.showOpenDialog({
  properties: ['openFile'],
  filters: [{ name: 'Text', extensions: ['txt'] }]
});

// Save file
const { filePath } = await dialog.showSaveDialog({
  defaultPath: 'untitled.txt'
});

// Message box
await dialog.showMessageBox({
  type: 'info',
  message: 'Done!'
});
```

### Building for distribution

```bash
npm install electron-builder --save-dev
```

```json
{
  "build": {
    "appId": "com.example.myapp",
    "mac": { "target": "dmg" },
    "win": { "target": "nsis" },
    "linux": { "target": "AppImage" }
  },
  "scripts": {
    "build": "electron-builder"
  }
}
```

## When to Use

**Best for**:
- Desktop apps needing web tech stack
- Cross-platform applications
- Apps needing native file/system access
- Internal tools and utilities

**Not ideal for**:
- Performance-critical apps (use native or Tauri)
- Small utilities (large bundle size)
- Mobile apps

**Comparison**:
| Feature | Electron | Tauri | NW.js |
|---------|----------|-------|-------|
| Size | ~150MB | ~10MB | ~100MB |
| Performance | Good | Better | Good |
| Language | JS | Rust + JS | JS |
| Maturity | High | Medium | High |

## Next Steps

- [Electron Documentation](https://www.electronjs.org/docs)
- [Electron Fiddle](https://www.electronjs.org/fiddle)
- [Electron Forge](https://www.electronforge.io/)
- [Electron Builder](https://www.electron.build/)

## Cheatsheet

| Pattern | Code |
|---------|------|
| Create window | `new BrowserWindow({ width, height })` |
| Load file | `win.loadFile('index.html')` |
| Load URL | `win.loadURL('https://...')` |
| IPC handle | `ipcMain.handle('channel', handler)` |
| IPC invoke | `ipcRenderer.invoke('channel', data)` |
| Context bridge | `contextBridge.exposeInMainWorld()` |
| Quit app | `app.quit()` |
| Open DevTools | `win.webContents.openDevTools()` |
