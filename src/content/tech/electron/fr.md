---
title: "Electron"
description: "Démarrez avec Electron en 5 minutes"
template: "framework"
tags: ["desktop", "javascript", "cross-platform"]
---

## TL;DR

**En une ligne** : Electron vous permet de créer des applications desktop multiplateformes avec JavaScript, HTML et CSS - une seule base de code pour Windows, macOS et Linux.

**Forces principales** :
- Technologies web - utilisez vos compétences JS/HTML/CSS existantes
- Multiplateforme - une base de code, trois plateformes
- APIs natives - accès au système de fichiers, barre système, notifications
- Écosystème riche - VS Code, Slack, Discord construits avec Electron

## Core Concepts

### Concept 1: Main vs Renderer Process

Deux types de processus avec différentes APIs :

```javascript
// Processus principal (main.js) - accès Node.js, crée les fenêtres
const { app, BrowserWindow } = require('electron');

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600 });
  win.loadFile('index.html');
});

// Processus renderer (dans la fenêtre du navigateur) - accès DOM, APIs web
document.querySelector('#btn').addEventListener('click', () => {
  console.log('Clicked!');
});
```

### Concept 2: IPC (Inter-Process Communication)

Communication sécurisée entre main et renderer :

```javascript
// main.js
const { ipcMain } = require('electron');

ipcMain.handle('read-file', async (event, path) => {
  const fs = require('fs').promises;
  return await fs.readFile(path, 'utf-8');
});

// preload.js (pont entre main et renderer)
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  readFile: (path) => ipcRenderer.invoke('read-file', path)
});

// renderer.js (dans le HTML)
const content = await window.api.readFile('/path/to/file');
```

### Concept 3: Context Isolation

Bonne pratique de sécurité - isoler le renderer de Node.js :

```javascript
const win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,      // Ne pas exposer Node au renderer
    contextIsolation: true,      // Isoler le preload du renderer
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
<head><title>Mon App Electron</title></head>
<body><h1>Bonjour Electron!</h1></body>
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
    label: 'Fichier',
    submenu: [
      { label: 'Ouvrir', accelerator: 'CmdOrCtrl+O', click: () => { /* ... */ } },
      { type: 'separator' },
      { role: 'quit' }
    ]
  },
  {
    label: 'Édition',
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

// Ouvrir un fichier
const { filePaths } = await dialog.showOpenDialog({
  properties: ['openFile'],
  filters: [{ name: 'Text', extensions: ['txt'] }]
});

// Sauvegarder un fichier
const { filePath } = await dialog.showSaveDialog({
  defaultPath: 'untitled.txt'
});

// Boîte de message
await dialog.showMessageBox({
  type: 'info',
  message: 'Terminé!'
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

**Idéal pour** :
- Applications desktop avec stack web
- Applications multiplateformes
- Apps nécessitant un accès fichiers/système natif
- Outils internes et utilitaires

**Pas idéal pour** :
- Apps critiques en performance (utilisez natif ou Tauri)
- Petits utilitaires (grande taille de bundle)
- Applications mobiles

**Comparaison** :
| Fonctionnalité | Electron | Tauri | NW.js |
|---------|----------|-------|-------|
| Taille | ~150MB | ~10MB | ~100MB |
| Performance | Bonne | Meilleure | Bonne |
| Langage | JS | Rust + JS | JS |
| Maturité | Haute | Moyenne | Haute |

## Next Steps

- [Documentation Electron](https://www.electronjs.org/docs)
- [Electron Fiddle](https://www.electronjs.org/fiddle)
- [Electron Forge](https://www.electronforge.io/)
- [Electron Builder](https://www.electron.build/)

## Cheatsheet

| Pattern | Code |
|---------|------|
| Créer une fenêtre | `new BrowserWindow({ width, height })` |
| Charger un fichier | `win.loadFile('index.html')` |
| Charger une URL | `win.loadURL('https://...')` |
| IPC handle | `ipcMain.handle('channel', handler)` |
| IPC invoke | `ipcRenderer.invoke('channel', data)` |
| Context bridge | `contextBridge.exposeInMainWorld()` |
| Quitter l'app | `app.quit()` |
| Ouvrir DevTools | `win.webContents.openDevTools()` |
