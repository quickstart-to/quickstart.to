---
title: "Python"
description: "Readable syntax, vast ecosystem - from scripting to AI, web apps to data science"
template: "language"
tags: ["programming", "scripting", "data-science"]
---

## TL;DR

**One-liner**: Python is a readable, versatile language that lets you write less code to do more.

**Core Strengths**:
- Readable syntax that reads like English
- Huge ecosystem for data science, web, automation, AI
- Batteries included - rich standard library
- Cross-platform and beginner-friendly

## Philosophy

Python follows "The Zen of Python" - run `import this` to see it. Key principles:

- **Readability counts** - Code is read more than written
- **Explicit is better than implicit** - No hidden magic
- **Simple is better than complex** - Solve problems the straightforward way
- **There should be one obvious way to do it** - Unlike Perl's TIMTOWTDI

Python is dynamically typed (no need to declare variable types) and uses indentation instead of braces. This forces clean, readable code.

## Quick Start

### Install

```bash
# macOS
brew install python

# Ubuntu/Debian
sudo apt install python3 python3-pip

# Windows: Download from python.org, check "Add to PATH"
```

### Verify (latest stable: 3.13.1)

```bash
python3 --version  # Python 3.13.1
pip3 --version
```

### First Program

```python
# hello.py
print("Hello, Python!")
```

```bash
python3 hello.py
```

### Interactive Mode

```bash
python3
>>> 2 + 2
4
>>> exit()
```

## Language Essentials

### Variables & Types

```python
# No type declarations needed
name = "Alice"          # str
age = 25                # int
height = 1.75           # float
is_student = True       # bool
items = [1, 2, 3]       # list
data = {"key": "value"} # dict

# Check type
type(name)  # <class 'str'>
```

### Control Flow

```python
# if/elif/else
if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teen")
else:
    print("Child")

# for loop
for item in items:
    print(item)

for i in range(5):  # 0, 1, 2, 3, 4
    print(i)

# while loop
while count > 0:
    count -= 1
```

### Functions

```python
def greet(name, greeting="Hello"):
    """Docstring: describes the function"""
    return f"{greeting}, {name}!"

# Call
greet("World")           # "Hello, World!"
greet("World", "Hi")     # "Hi, World!"

# Lambda (anonymous function)
square = lambda x: x ** 2
```

### Error Handling

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")
except Exception as e:
    print(f"Error: {e}")
finally:
    print("Always runs")
```

### List Comprehension

```python
# Powerful one-liner for transforming lists
squares = [x**2 for x in range(10)]
evens = [x for x in range(10) if x % 2 == 0]
```

## Gotchas

### python vs python3

```bash
# On many systems, 'python' may point to Python 2 or not exist
# Always use python3 explicitly
python3 --version
```

### Indentation is syntax

```python
# Python uses indentation (4 spaces) instead of braces
if True:
    print("Correct")  # 4 spaces
   print("Wrong")     # IndentationError!
```

### Mutable default arguments

```python
# WRONG: list is shared across calls
def add_item(item, items=[]):
    items.append(item)
    return items

# RIGHT: use None
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
```

### Virtual environments

```bash
# Always use venv for projects to avoid dependency conflicts
python3 -m venv venv
source venv/bin/activate  # Linux/macOS
pip install package
deactivate
```

## When to Choose

**Best for**:
- Data science & machine learning (pandas, scikit-learn, PyTorch)
- Quick scripts and automation
- Web backends (Django, FastAPI, Flask)
- Beginners learning programming

**Not ideal for**:
- Mobile apps (use Swift, Kotlin)
- High-performance computing (use C++, Rust)
- Frontend web (use JavaScript)

**Comparison**:
| Aspect | Python | JavaScript | Go |
|--------|--------|------------|-----|
| Typing | Dynamic | Dynamic | Static |
| Speed | Slower | Medium | Fast |
| Use case | Data/AI/Scripts | Web/Full-stack | Backend/CLI |
| Learning curve | Easy | Easy | Medium |

## Next Steps

- [Official Tutorial](https://docs.python.org/3/tutorial/) - Start here
- [Real Python](https://realpython.com/) - Practical tutorials
- [PyPI](https://pypi.org/) - Package repository
- [Automate the Boring Stuff](https://automatetheboringstuff.com/) - Free book

## Ecosystem

### Package Manager

```bash
pip install package        # Install
pip freeze > requirements.txt  # Export deps
pip install -r requirements.txt  # Install from file
```

### Popular Frameworks

- **Web**: Django, FastAPI, Flask
- **Data**: pandas, NumPy, matplotlib
- **ML/AI**: PyTorch, TensorFlow, scikit-learn
- **Automation**: requests, BeautifulSoup, Selenium
