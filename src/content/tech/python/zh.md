---
title: "Python"
description: "语法优雅、生态丰富 - 从脚本到 AI，从 Web 到数据科学"
template: "language"
tags: ["programming", "scripting", "data-science"]
---

## TL;DR

**一句话**：Python 是一门可读性强、用途广泛的语言，让你用更少的代码做更多的事。

**核心优势**：
- 语法像英语一样易读
- 数据科学、Web、自动化、AI 的庞大生态
- 内置电池 - 丰富的标准库
- 跨平台，对初学者友好

## Philosophy

Python 遵循"Python 之禅"——运行 `import this` 可以看到。核心原则：

- **可读性很重要** - 代码被阅读的次数远多于编写
- **显式优于隐式** - 没有隐藏的魔法
- **简单优于复杂** - 用最直接的方式解决问题
- **应该有一种显而易见的方式** - 不像 Perl 的 TIMTOWTDI

Python 是动态类型的（不需要声明变量类型），使用缩进代替大括号。这强制产生干净、可读的代码。

## Quick Start

### 安装

```bash
# macOS
brew install python

# Ubuntu/Debian
sudo apt install python3 python3-pip

# Windows：从 python.org 下载，勾选"Add to PATH"
```

### 验证（最新稳定版：3.13.1）

```bash
python3 --version  # Python 3.13.1
pip3 --version
```

### 第一个程序

```python
# hello.py
print("Hello, Python!")
```

```bash
python3 hello.py
```

### 交互模式

```bash
python3
>>> 2 + 2
4
>>> exit()
```

## Language Essentials

### 变量与类型

```python
# 不需要类型声明
name = "Alice"          # str
age = 25                # int
height = 1.75           # float
is_student = True       # bool
items = [1, 2, 3]       # list
data = {"key": "value"} # dict

# 检查类型
type(name)  # <class 'str'>
```

### 控制流

```python
# if/elif/else
if age >= 18:
    print("成年人")
elif age >= 13:
    print("青少年")
else:
    print("儿童")

# for 循环
for item in items:
    print(item)

for i in range(5):  # 0, 1, 2, 3, 4
    print(i)

# while 循环
while count > 0:
    count -= 1
```

### 函数

```python
def greet(name, greeting="你好"):
    """文档字符串：描述函数功能"""
    return f"{greeting}, {name}!"

# 调用
greet("世界")              # "你好, 世界!"
greet("世界", "嗨")        # "嗨, 世界!"

# Lambda（匿名函数）
square = lambda x: x ** 2
```

### 错误处理

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("不能除以零")
except Exception as e:
    print(f"错误: {e}")
finally:
    print("总是会执行")
```

### 列表推导式

```python
# 强大的单行代码，用于转换列表
squares = [x**2 for x in range(10)]
evens = [x for x in range(10) if x % 2 == 0]
```

## Gotchas

### python 与 python3

```bash
# 在很多系统上，'python' 可能指向 Python 2 或不存在
# 始终明确使用 python3
python3 --version
```

### 缩进就是语法

```python
# Python 使用缩进（4 个空格）代替大括号
if True:
    print("正确")   # 4 个空格
   print("错误")    # IndentationError!
```

### 可变默认参数

```python
# 错误：列表在调用之间共享
def add_item(item, items=[]):
    items.append(item)
    return items

# 正确：使用 None
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
```

### 虚拟环境

```bash
# 项目中始终使用 venv 避免依赖冲突
python3 -m venv venv
source venv/bin/activate  # Linux/macOS
pip install package
deactivate
```

## When to Choose

**适合**：
- 数据科学和机器学习（pandas、scikit-learn、PyTorch）
- 快速脚本和自动化
- Web 后端（Django、FastAPI、Flask）
- 编程初学者

**不适合**：
- 移动应用（用 Swift、Kotlin）
- 高性能计算（用 C++、Rust）
- 前端 Web（用 JavaScript）

**对比**：
| 方面 | Python | JavaScript | Go |
|------|--------|------------|-----|
| 类型 | 动态 | 动态 | 静态 |
| 速度 | 较慢 | 中等 | 快 |
| 用途 | 数据/AI/脚本 | Web/全栈 | 后端/CLI |
| 学习曲线 | 简单 | 简单 | 中等 |

## Next Steps

- [官方教程](https://docs.python.org/zh-cn/3/tutorial/) - 从这里开始
- [Real Python](https://realpython.com/) - 实用教程
- [PyPI](https://pypi.org/) - 包仓库
- [Python 编程快速上手](https://automatetheboringstuff.com/) - 免费书籍

## Ecosystem

### 包管理器

```bash
pip install package        # 安装
pip freeze > requirements.txt  # 导出依赖
pip install -r requirements.txt  # 从文件安装
```

### 主流框架

- **Web**：Django、FastAPI、Flask
- **数据**：pandas、NumPy、matplotlib
- **ML/AI**：PyTorch、TensorFlow、scikit-learn
- **自动化**：requests、BeautifulSoup、Selenium
