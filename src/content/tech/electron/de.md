---
title: "Electron"
description: "Starten Sie mit Electron in 5 Minuten"
template: "framework"
tags: ["desktop", "javascript", "cross-platform"]
---

## TL;DR

**Eine Zeile**: Electron ermöglicht die Entwicklung plattformübergreifender Desktop-Apps mit JavaScript, HTML und CSS - eine Codebasis für Windows, macOS und Linux.

**Kernstärken**:
- Web-Technologien - nutzen Sie Ihre vorhandenen JS/HTML/CSS-Kenntnisse
- Plattformübergreifend - eine Codebasis, drei Plattformen
- Native APIs - Zugriff auf Dateisystem, System-Tray, Benachrichtigungen
- Reiches Ökosystem - VS Code, Slack, Discord mit Electron gebaut

## Core Concepts

### Concept 1: Main vs Renderer Process

Zwei Prozessarten mit verschiedenen APIs:

```javascript
// Main-Prozess (main.js) - Node.js-Zugriff, erstellt Fenster
const { app, BrowserWindow } = require('electron');

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600 });
  win.loadFile('index.html');
});

// Renderer-Prozess (im Browser-Fenster) - DOM-Zugriff, Web-APIs
document.querySelector('#btn').addEventListener('click', () => {
  console.log('Clicked!');
});
```

### Concept 2: IPC (Inter-Process Communication)

Sichere Kommunikation zwischen Main und Renderer:

```javascript
// main.js
const { ipcMain } = require('electron');

ipcMain.handle('read-file', async (event, path) => {
  const fs = require('fs').promises;
  return await fs.readFile(path, 'utf-8');
});

// preload.js (Brücke zwischen Main und Renderer)
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  readFile: (path) => ipcRenderer.invoke('read-file', path)
});

// renderer.js (im HTML)
const content = await window.api.readFile('/path/to/file');
```

### Concept 3: Context Isolation

Sicherheits-Best-Practice - Renderer von Node.js isolieren:

```javascript
const win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,      // Node nicht an Renderer exponieren
    contextIsolation: true,      // Preload von Renderer isolieren
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
<head><title>Meine Electron App</title></head>
<body><h1>Hallo Electron!</h1></body>
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
    label: 'Datei',
    submenu: [
      { label: 'Öffnen', accelerator: 'CmdOrCtrl+O', click: () => { /* ... */ } },
      { type: 'separator' },
      { role: 'quit' }
    ]
  },
  {
    label: 'Bearbeiten',
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

// Datei öffnen
const { filePaths } = await dialog.showOpenDialog({
  properties: ['openFile'],
  filters: [{ name: 'Text', extensions: ['txt'] }]
});

// Datei speichern
const { filePath } = await dialog.showSaveDialog({
  defaultPath: 'untitled.txt'
});

// Nachrichtenbox
await dialog.showMessageBox({
  type: 'info',
  message: 'Fertig!'
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

**Am besten für**:
- Desktop-Apps mit Web-Tech-Stack
- Plattformübergreifende Anwendungen
- Apps mit nativem Datei-/Systemzugriff
- Interne Tools und Utilities

**Nicht ideal für**:
- Performance-kritische Apps (native oder Tauri verwenden)
- Kleine Utilities (große Bundle-Größe)
- Mobile Apps

**Vergleich**:
| Feature | Electron | Tauri | NW.js |
|---------|----------|-------|-------|
| Größe | ~150MB | ~10MB | ~100MB |
| Performance | Gut | Besser | Gut |
| Sprache | JS | Rust + JS | JS |
| Reife | Hoch | Mittel | Hoch |

## Next Steps

- [Electron Dokumentation](https://www.electronjs.org/docs)
- [Electron Fiddle](https://www.electronjs.org/fiddle)
- [Electron Forge](https://www.electronforge.io/)
- [Electron Builder](https://www.electron.build/)

## Cheatsheet

| Pattern | Code |
|---------|------|
| Fenster erstellen | `new BrowserWindow({ width, height })` |
| Datei laden | `win.loadFile('index.html')` |
| URL laden | `win.loadURL('https://...')` |
| IPC Handle | `ipcMain.handle('channel', handler)` |
| IPC Invoke | `ipcRenderer.invoke('channel', data)` |
| Context Bridge | `contextBridge.exposeInMainWorld()` |
| App beenden | `app.quit()` |
| DevTools öffnen | `win.webContents.openDevTools()` |
