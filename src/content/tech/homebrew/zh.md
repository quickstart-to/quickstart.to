---
title: "Homebrew"
description: "快速入门 macOS 包管理器 Homebrew"
tags: ["macos", "package-manager", "tools"]
---

## TL;DR

**是什么**：macOS（和 Linux）的包管理器。

**为什么**：一条命令安装软件，自动管理依赖。

## Quick Start

**安装 Homebrew**：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**添加到 PATH**（Apple Silicon Mac）：

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

**验证安装**：

```bash
brew --version
```

**安装软件包**：

```bash
brew install wget
brew install git
brew install node
```

**安装 GUI 应用（Casks）**：

```bash
brew install --cask visual-studio-code
brew install --cask google-chrome
brew install --cask docker
```

## Cheatsheet

| 命令 | 描述 |
|------|------|
| `brew install pkg` | 安装软件包 |
| `brew uninstall pkg` | 卸载软件包 |
| `brew upgrade` | 升级所有软件包 |
| `brew upgrade pkg` | 升级指定软件包 |
| `brew update` | 更新 Homebrew 本身 |
| `brew list` | 列出已安装的软件包 |
| `brew search text` | 搜索软件包 |
| `brew info pkg` | 软件包信息 |
| `brew doctor` | 诊断问题 |
| `brew cleanup` | 清理旧版本 |
| `brew services list` | 列出后台服务 |
| `brew services start pkg` | 启动服务 |

## Gotchas

### 安装后找不到命令

```bash
# 添加到 PATH（检查你的 shell）
# zsh（macOS 默认）：
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile

# bash：
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.bash_profile

# 然后重新加载：
source ~/.zprofile  # 或 ~/.bash_profile
```

### 权限错误

```bash
# 修复 Homebrew 目录权限
sudo chown -R $(whoami) /opt/homebrew

# Intel Mac：
sudo chown -R $(whoami) /usr/local/Homebrew
```

### 软件包冲突

```bash
# 取消链接冲突的包
brew unlink pkg

# 链接你需要的
brew link pkg

# 如需强制链接
brew link --overwrite pkg
```

### brew doctor 警告

```bash
# 运行诊断
brew doctor

# 关于未链接 kegs 的警告通常可以忽略
# 根据输出建议修复问题
```

## Next Steps

- [Homebrew 文档](https://docs.brew.sh/)
- [Homebrew 软件包](https://formulae.brew.sh/)
- [Homebrew Cask](https://formulae.brew.sh/cask/)
- [Brewfile 配置](https://github.com/Homebrew/homebrew-bundle)
