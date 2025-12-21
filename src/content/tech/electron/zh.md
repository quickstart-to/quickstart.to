---
title: "Electron"
description: "5 分钟快速入门 Electron"
tags: ["desktop", "javascript", "cross-platform"]
---

## TL;DR

**是什么**：使用 Web 技术构建跨平台桌面应用的框架。

**为什么用**：使用 JavaScript/HTML/CSS、单一代码库支持 Windows/macOS/Linux、丰富生态。

## Quick Start

**安装**：
```bash
mkdir my-electron-app && cd my-electron-app
npm init -y
npm install electron --save-dev
```

**创建 main.js**：
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

**创建 index.html**：
```html
<!DOCTYPE html>
<html>
<head><title>Hello Electron</title></head>
<body><h1>Hello, Electron!</h1></body>
</html>
```

**运行**：
```bash
npx electron .
```

## Cheatsheet

| 概念 | 描述 |
|---------|-------------|
| `BrowserWindow` | 创建应用窗口 |
| `ipcMain` | 主进程 IPC |
| `ipcRenderer` | 渲染进程 IPC |
| `Menu` | 应用菜单 |
| `Tray` | 系统托盘图标 |
| `dialog` | 原生对话框 |

## Gotchas

### IPC 通信

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

### 上下文隔离（安全方式）

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

### 应用菜单

```javascript
const { Menu } = require('electron');

const template = [
  {
    label: '文件',
    submenu: [
      { label: '打开', accelerator: 'CmdOrCtrl+O', click: () => {} },
      { type: 'separator' },
      { role: 'quit' }
    ]
  },
  {
    label: '编辑',
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

### 原生对话框

```javascript
const { dialog } = require('electron');

// 打开文件对话框
const result = await dialog.showOpenDialog({
  properties: ['openFile', 'multiSelections'],
  filters: [
    { name: '图片', extensions: ['jpg', 'png', 'gif'] },
    { name: '所有文件', extensions: ['*'] }
  ]
});

// 保存对话框
const savePath = await dialog.showSaveDialog({
  defaultPath: 'untitled.txt'
});

// 消息框
await dialog.showMessageBox({
  type: 'info',
  title: '信息',
  message: '操作完成！'
});
```

### 打包分发

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

### 自动更新

```javascript
const { autoUpdater } = require('electron-updater');

autoUpdater.checkForUpdatesAndNotify();

autoUpdater.on('update-available', () => {
  console.log('有可用更新');
});

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall();
});
```

## Next Steps

- [Electron 文档](https://www.electronjs.org/docs) - 官方文档
- [Electron Fiddle](https://www.electronjs.org/fiddle) - 快速实验
- [Electron Forge](https://www.electronforge.io/) - 完整工具链
- [Electron Builder](https://www.electron.build/) - 打包与分发
