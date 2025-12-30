---
title: "Electron"
description: "用 Web 技术构建跨平台桌面应用 - 一套代码覆盖 Windows、macOS 和 Linux"
template: "framework"
tags: ["desktop", "javascript", "cross-platform"]
---

## TL;DR

**一句话**：Electron 让你用 JavaScript、HTML 和 CSS 构建跨平台桌面应用——一套代码，三个平台。

**核心优势**：
- Web 技术 - 用你现有的 JS/HTML/CSS 技能
- 跨平台 - 单一代码库，三个平台
- 原生 API - 访问文件系统、系统托盘、通知
- 丰富生态 - VS Code、Slack、Discord 都用 Electron

## Core Concepts

### 概念 1：主进程 vs 渲染进程

两种进程有不同的 API：

```javascript
// 主进程 (main.js) - 可访问 Node.js，创建窗口
const { app, BrowserWindow } = require('electron');

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600 });
  win.loadFile('index.html');
});

// 渲染进程（在浏览器窗口中）- 可访问 DOM 和 Web API
document.querySelector('#btn').addEventListener('click', () => {
  console.log('Clicked!');
});
```

### 概念 2：IPC（进程间通信）

主进程和渲染进程间安全通信：

```javascript
// main.js
const { ipcMain } = require('electron');

ipcMain.handle('read-file', async (event, path) => {
  const fs = require('fs').promises;
  return await fs.readFile(path, 'utf-8');
});

// preload.js（主进程和渲染进程的桥梁）
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  readFile: (path) => ipcRenderer.invoke('read-file', path)
});

// renderer.js（在 HTML 中）
const content = await window.api.readFile('/path/to/file');
```

### 概念 3：上下文隔离

安全最佳实践——把渲染进程和 Node.js 隔离：

```javascript
const win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,      // 不向渲染进程暴露 Node
    contextIsolation: true,      // 隔离 preload 和渲染进程
    preload: path.join(__dirname, 'preload.js')
  }
});
```

## Quick Start

### 创建项目

```bash
mkdir my-app && cd my-app
npm init -y
npm install electron --save-dev
```

### 创建 main.js

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

### 创建 index.html

```html
<!DOCTYPE html>
<html>
<head><title>My Electron App</title></head>
<body><h1>Hello Electron!</h1></body>
</html>
```

### 运行

```bash
npx electron .
```

## Gotchas

### 应用菜单

```javascript
const { Menu } = require('electron');

const template = [
  {
    label: '文件',
    submenu: [
      { label: '打开', accelerator: 'CmdOrCtrl+O', click: () => { /* ... */ } },
      { type: 'separator' },
      { role: 'quit' }
    ]
  },
  {
    label: '编辑',
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

### 原生对话框

```javascript
const { dialog } = require('electron');

// 打开文件
const { filePaths } = await dialog.showOpenDialog({
  properties: ['openFile'],
  filters: [{ name: 'Text', extensions: ['txt'] }]
});

// 保存文件
const { filePath } = await dialog.showSaveDialog({
  defaultPath: 'untitled.txt'
});

// 消息框
await dialog.showMessageBox({
  type: 'info',
  message: '完成！'
});
```

### 打包分发

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

**适合**：
- 需要 Web 技术栈的桌面应用
- 跨平台应用
- 需要原生文件/系统访问的应用
- 内部工具和实用程序

**不适合**：
- 对性能要求高的应用（用原生或 Tauri）
- 小工具（包体积大）
- 移动应用

**对比**：
| 特性 | Electron | Tauri | NW.js |
|------|----------|-------|-------|
| 大小 | ~150MB | ~10MB | ~100MB |
| 性能 | 好 | 更好 | 好 |
| 语言 | JS | Rust + JS | JS |
| 成熟度 | 高 | 中 | 高 |

## Next Steps

- [Electron 文档](https://www.electronjs.org/docs)
- [Electron Fiddle](https://www.electronjs.org/fiddle)
- [Electron Forge](https://www.electronforge.io/)
- [Electron Builder](https://www.electron.build/)

## Cheatsheet

| 模式 | 代码 |
|------|------|
| 创建窗口 | `new BrowserWindow({ width, height })` |
| 加载文件 | `win.loadFile('index.html')` |
| 加载 URL | `win.loadURL('https://...')` |
| IPC 处理 | `ipcMain.handle('channel', handler)` |
| IPC 调用 | `ipcRenderer.invoke('channel', data)` |
| 上下文桥 | `contextBridge.exposeInMainWorld()` |
| 退出应用 | `app.quit()` |
| 打开 DevTools | `win.webContents.openDevTools()` |
