---
title: "Electron"
description: "Get started with Electron in 5 minutes"
tags: ["desktop", "javascript", "cross-platform"]
---

## TL;DR

**What**: Framework for building cross-platform desktop apps with web technologies.

**Why**: Use JavaScript/HTML/CSS, single codebase for Windows/macOS/Linux, rich ecosystem.

## Quick Start

**Install**:
```bash
mkdir my-electron-app && cd my-electron-app
npm init -y
npm install electron --save-dev
```

**Create main.js**:
```javascript
const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);
```

**Create index.html**:
```html
<!DOCTYPE html>
<html>
<head><title>Hello Electron</title></head>
<body><h1>Hello, Electron!</h1></body>
</html>
```

**Run**:
```bash
npx electron .
```

## Cheatsheet

| Concept | Description |
|---------|-------------|
| `BrowserWindow` | Create app windows |
| `ipcMain` | Main process IPC |
| `ipcRenderer` | Renderer process IPC |
| `Menu` | Application menus |
| `Tray` | System tray icon |
| `dialog` | Native dialogs |

## Gotchas

### IPC communication

```javascript
// main.js
const { ipcMain } = require('electron');

ipcMain.handle('read-file', async (event, path) => {
  const fs = require('fs').promises;
  return await fs.readFile(path, 'utf-8');
});

// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  readFile: (path) => ipcRenderer.invoke('read-file', path)
});

// renderer.js
const content = await window.api.readFile('/path/to/file');
```

### Context isolation (secure approach)

```javascript
// main.js
const win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,
    contextIsolation: true,
    preload: path.join(__dirname, 'preload.js')
  }
});
```

### Application menu

```javascript
const { Menu } = require('electron');

const template = [
  {
    label: 'File',
    submenu: [
      { label: 'Open', accelerator: 'CmdOrCtrl+O', click: () => {} },
      { type: 'separator' },
      { role: 'quit' }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
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

// Open file dialog
const result = await dialog.showOpenDialog({
  properties: ['openFile', 'multiSelections'],
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'All Files', extensions: ['*'] }
  ]
});

// Save dialog
const savePath = await dialog.showSaveDialog({
  defaultPath: 'untitled.txt'
});

// Message box
await dialog.showMessageBox({
  type: 'info',
  title: 'Info',
  message: 'Operation completed!'
});
```

### Building for distribution

```bash
npm install electron-builder --save-dev
```

```json
// package.json
{
  "build": {
    "appId": "com.example.myapp",
    "mac": {
      "target": "dmg"
    },
    "win": {
      "target": "nsis"
    },
    "linux": {
      "target": "AppImage"
    }
  },
  "scripts": {
    "build": "electron-builder"
  }
}
```

### Auto-updater

```javascript
const { autoUpdater } = require('electron-updater');

autoUpdater.checkForUpdatesAndNotify();

autoUpdater.on('update-available', () => {
  console.log('Update available');
});

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall();
});
```

## Next Steps

- [Electron Documentation](https://www.electronjs.org/docs) - Official docs
- [Electron Fiddle](https://www.electronjs.org/fiddle) - Experiment quickly
- [Electron Forge](https://www.electronforge.io/) - Complete toolchain
- [Electron Builder](https://www.electron.build/) - Packaging & distribution
