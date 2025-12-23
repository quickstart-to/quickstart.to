---
title: "VS Code"
description: "5 分钟快速入门 Visual Studio Code 编辑器"
template: "tool"
tags: ["editor", "ide", "development"]
---

## TL;DR

**一句话**：VS Code 是微软出品的免费、快速、可扩展的代码编辑器——Web 开发最流行的编辑器。

**核心价值**：
- 速度 - 秒开，能处理大型项目
- 扩展 - 40,000+ 扩展，支持任何语言
- IntelliSense - 智能代码补全
- 内置 Git - 不用离开编辑器就能版本控制

## Quick Start

### 安装

macOS:
```bash
brew install --cask visual-studio-code
```

Windows:
```bash
winget install Microsoft.VisualStudioCode
```

Linux: 从 [code.visualstudio.com](https://code.visualstudio.com/) 下载

### 打开文件夹

```bash
code .           # 打开当前目录
code myproject   # 打开指定文件夹
```

### 必备扩展

在扩展面板搜索（Cmd/Ctrl+Shift+X）：
- Prettier - 代码格式化
- ESLint - JavaScript 代码检查
- GitLens - Git 增强
- Auto Rename Tag - HTML/JSX 标签重命名

## Cheatsheet

| 快捷键 (Mac / Win) | 功能 |
|-------------------|------|
| `Cmd+P` / `Ctrl+P` | 快速打开文件 |
| `Cmd+Shift+P` / `Ctrl+Shift+P` | 命令面板 |
| `Cmd+Shift+F` / `Ctrl+Shift+F` | 全局搜索 |
| `Cmd+D` / `Ctrl+D` | 选中下一个相同内容 |
| `Cmd+/` / `Ctrl+/` | 切换注释 |
| `Alt+Up/Down` | 上下移动行 |
| `Cmd+Shift+K` / `Ctrl+Shift+K` | 删除行 |
| `Cmd+B` / `Ctrl+B` | 切换侧边栏 |
| `` Ctrl+` `` | 切换终端 |
| `Cmd+,` / `Ctrl+,` | 打开设置 |
| `F12` | 跳转到定义 |
| `Shift+F12` | 查找所有引用 |
| `Cmd+Shift+L` / `Ctrl+Shift+L` | 选中所有相同内容 |

## Gotchas

### 找不到 'code' 命令

```bash
# 打开 VS Code，然后：
# Cmd+Shift+P → "Shell Command: Install 'code' command in PATH"
```

### 跨设备同步设置

```
1. 使用 GitHub/Microsoft 账号登录
2. 设置 → 开启 Settings Sync
```

### 更改默认终端

```json
// settings.json（Cmd+, → 点右上角图标）
{
  "terminal.integrated.defaultProfile.osx": "zsh",
  "terminal.integrated.defaultProfile.windows": "PowerShell"
}
```

### 保存时自动格式化

```json
// settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

### 关闭遥测

```json
// settings.json
{
  "telemetry.telemetryLevel": "off"
}
```

## Next Steps

- [VS Code 技巧和窍门](https://code.visualstudio.com/docs/getstarted/tips-and-tricks)
- [快捷键参考](https://code.visualstudio.com/docs/getstarted/keybindings)
- [扩展市场](https://marketplace.visualstudio.com/vscode)
- [VS Code Can Do That](https://vscodecandothat.com/)
