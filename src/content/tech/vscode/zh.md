---
title: "VS Code"
description: "5 分钟快速入门 Visual Studio Code 编辑器"
tags: ["editor", "ide", "development"]
---

## TL;DR

**是什么**：微软出品的免费、强大、可扩展的代码编辑器。

**为什么**：速度快、跨平台、扩展丰富、内置 Git、集成终端。

## Quick Start

**安装**：

macOS: `brew install --cask visual-studio-code`

Windows: `winget install Microsoft.VisualStudioCode`

Linux: 从 [code.visualstudio.com](https://code.visualstudio.com/) 下载

**打开文件夹**：
```bash
code .           # 打开当前目录
code myproject   # 打开指定文件夹
```

**必备扩展**（在扩展面板搜索：Cmd/Ctrl+Shift+X）：
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
// settings.json
{
  "terminal.integrated.defaultProfile.osx": "zsh",
  "terminal.integrated.defaultProfile.windows": "PowerShell"
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
