---
title: "Electron"
description: "Comienza con Electron en 5 minutos"
template: "framework"
tags: ["desktop", "javascript", "cross-platform"]
---

## TL;DR

**En una línea**: Electron te permite crear aplicaciones de escritorio multiplataforma con JavaScript, HTML y CSS - un código base para Windows, macOS y Linux.

**Fortalezas principales**:
- Tecnologías web - usa tus habilidades existentes de JS/HTML/CSS
- Multiplataforma - un código base, tres plataformas
- APIs nativas - acceso al sistema de archivos, bandeja del sistema, notificaciones
- Ecosistema rico - VS Code, Slack, Discord construidos con Electron

## Core Concepts

### Concept 1: Main vs Renderer Process

Dos tipos de procesos con diferentes APIs:

```javascript
// Proceso principal (main.js) - acceso a Node.js, crea ventanas
const { app, BrowserWindow } = require('electron');

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600 });
  win.loadFile('index.html');
});

// Proceso renderer (en la ventana del navegador) - acceso al DOM, APIs web
document.querySelector('#btn').addEventListener('click', () => {
  console.log('Clicked!');
});
```

### Concept 2: IPC (Inter-Process Communication)

Comunicación segura entre main y renderer:

```javascript
// main.js
const { ipcMain } = require('electron');

ipcMain.handle('read-file', async (event, path) => {
  const fs = require('fs').promises;
  return await fs.readFile(path, 'utf-8');
});

// preload.js (puente entre main y renderer)
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  readFile: (path) => ipcRenderer.invoke('read-file', path)
});

// renderer.js (en el HTML)
const content = await window.api.readFile('/path/to/file');
```

### Concept 3: Context Isolation

Mejor práctica de seguridad - aislar renderer de Node.js:

```javascript
const win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,      // No exponer Node al renderer
    contextIsolation: true,      // Aislar preload del renderer
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
<head><title>Mi App Electron</title></head>
<body><h1>¡Hola Electron!</h1></body>
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
    label: 'Archivo',
    submenu: [
      { label: 'Abrir', accelerator: 'CmdOrCtrl+O', click: () => { /* ... */ } },
      { type: 'separator' },
      { role: 'quit' }
    ]
  },
  {
    label: 'Editar',
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

// Abrir archivo
const { filePaths } = await dialog.showOpenDialog({
  properties: ['openFile'],
  filters: [{ name: 'Text', extensions: ['txt'] }]
});

// Guardar archivo
const { filePath } = await dialog.showSaveDialog({
  defaultPath: 'untitled.txt'
});

// Caja de mensaje
await dialog.showMessageBox({
  type: 'info',
  message: '¡Listo!'
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

**Ideal para**:
- Apps de escritorio con stack web
- Aplicaciones multiplataforma
- Apps que necesitan acceso nativo a archivos/sistema
- Herramientas internas y utilidades

**No ideal para**:
- Apps críticas en rendimiento (usa nativo o Tauri)
- Utilidades pequeñas (tamaño de bundle grande)
- Aplicaciones móviles

**Comparación**:
| Característica | Electron | Tauri | NW.js |
|---------|----------|-------|-------|
| Tamaño | ~150MB | ~10MB | ~100MB |
| Rendimiento | Bueno | Mejor | Bueno |
| Lenguaje | JS | Rust + JS | JS |
| Madurez | Alta | Media | Alta |

## Next Steps

- [Documentación de Electron](https://www.electronjs.org/docs)
- [Electron Fiddle](https://www.electronjs.org/fiddle)
- [Electron Forge](https://www.electronforge.io/)
- [Electron Builder](https://www.electron.build/)

## Cheatsheet

| Patrón | Código |
|---------|------|
| Crear ventana | `new BrowserWindow({ width, height })` |
| Cargar archivo | `win.loadFile('index.html')` |
| Cargar URL | `win.loadURL('https://...')` |
| IPC handle | `ipcMain.handle('channel', handler)` |
| IPC invoke | `ipcRenderer.invoke('channel', data)` |
| Context bridge | `contextBridge.exposeInMainWorld()` |
| Salir de app | `app.quit()` |
| Abrir DevTools | `win.webContents.openDevTools()` |
