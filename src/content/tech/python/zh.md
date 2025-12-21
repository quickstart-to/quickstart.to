---
title: "Python"
description: "5 分钟快速入门 Python 编程"
tags: ["programming", "scripting", "data-science"]
---

## TL;DR

**是什么**：一种多用途、对初学者友好的编程语言，语法简洁。

**为什么**：适用于脚本编写、Web 开发、数据科学、AI 和自动化。

## Quick Start

**安装**：

macOS/Linux：
```bash
# 检查是否已安装
python3 --version

# macOS 使用 Homebrew
brew install python

# Ubuntu/Debian
sudo apt install python3 python3-pip
```

Windows：从 [python.org](https://www.python.org/downloads/) 下载（勾选"Add to PATH"）

**验证安装**：
```bash
python3 --version  # Python 3.14.2
pip3 --version
```

**第一个程序**：

```python
# hello.py
print("Hello, Python!")
```

```bash
python3 hello.py
```

**交互模式**：
```bash
python3
>>> 2 + 2
4
>>> exit()
```

## Cheatsheet

| 命令 | 描述 |
|------|------|
| `python3 file.py` | 运行 Python 脚本 |
| `python3 -c "code"` | 执行内联代码 |
| `python3 -m module` | 以脚本方式运行模块 |
| `pip3 install pkg` | 安装包 |
| `pip3 list` | 列出已安装的包 |
| `pip3 freeze > requirements.txt` | 导出依赖 |
| `pip3 install -r requirements.txt` | 从文件安装 |
| `python3 -m venv venv` | 创建虚拟环境 |

## Gotchas

### python 与 python3

```bash
# 在很多系统上，'python' 可能不存在或指向 Python 2
# 始终明确使用 python3
python3 --version
```

### 虚拟环境

```bash
# 项目中始终使用 venv 以避免依赖冲突
python3 -m venv venv
source venv/bin/activate  # Linux/macOS
# venv\Scripts\activate    # Windows
pip install package
deactivate
```

### 缩进很重要

```python
# Python 使用缩进代替大括号
if True:
    print("使用 4 个空格缩进")  # 正确
```

### pip 权限错误

```bash
# 使用 --user 标志或虚拟环境
pip3 install --user package
# 或者更好的方式：使用 venv（见上文）
```

## Next Steps

- [Python 官方教程](https://docs.python.org/zh-cn/3/tutorial/)
- [Real Python 教程](https://realpython.com/)
- [Python 包索引 (PyPI)](https://pypi.org/)
- [Python 编程快速上手](https://automatetheboringstuff.com/)
