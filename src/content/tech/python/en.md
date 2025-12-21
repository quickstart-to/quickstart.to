---
title: "Python"
description: "Get started with Python programming in 5 minutes"
tags: ["programming", "scripting", "data-science"]
---

## TL;DR

**What**: A versatile, beginner-friendly programming language with clean syntax.

**Why**: Excellent for scripting, web development, data science, AI, and automation.

## Quick Start

**Install**:

macOS/Linux:
```bash
# Check if already installed
python3 --version

# macOS with Homebrew
brew install python

# Ubuntu/Debian
sudo apt install python3 python3-pip
```

Windows: Download from [python.org](https://www.python.org/downloads/) (check "Add to PATH")

**Verify installation**:
```bash
python3 --version  # Python 3.14.2
pip3 --version
```

**First program**:

```python
# hello.py
print("Hello, Python!")
```

```bash
python3 hello.py
```

**Interactive mode**:
```bash
python3
>>> 2 + 2
4
>>> exit()
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `python3 file.py` | Run a Python script |
| `python3 -c "code"` | Execute inline code |
| `python3 -m module` | Run a module as script |
| `pip3 install pkg` | Install a package |
| `pip3 list` | List installed packages |
| `pip3 freeze > requirements.txt` | Export dependencies |
| `pip3 install -r requirements.txt` | Install from file |
| `python3 -m venv venv` | Create virtual environment |

## Gotchas

### python vs python3

```bash
# On many systems, 'python' may not exist or point to Python 2
# Always use python3 explicitly
python3 --version
```

### Virtual environments

```bash
# Always use venv for projects to avoid dependency conflicts
python3 -m venv venv
source venv/bin/activate  # Linux/macOS
# venv\Scripts\activate    # Windows
pip install package
deactivate
```

### Indentation matters

```python
# Python uses indentation instead of braces
if True:
    print("Indented with 4 spaces")  # Correct
```

### pip permission errors

```bash
# Use --user flag or virtual environment
pip3 install --user package
# Or better: use venv (see above)
```

## Next Steps

- [Python Official Tutorial](https://docs.python.org/3/tutorial/)
- [Real Python Tutorials](https://realpython.com/)
- [Python Package Index (PyPI)](https://pypi.org/)
- [Automate the Boring Stuff](https://automatetheboringstuff.com/)
