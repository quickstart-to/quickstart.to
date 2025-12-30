---
title: "NumPy"
description: "Starten Sie mit NumPy in 5 Minuten"
template: "tool"
tags: ["python", "scientific-computing", "arrays"]
---

## TL;DR

**Was**: Fundamentales Paket für wissenschaftliches Rechnen mit Python.

**Warum**: Schnelle Array-Operationen, Broadcasting, lineare Algebra, Grundlage für Data Science.

## Quick Start

**Installation**:
```bash
pip install numpy
```

**Hello NumPy**:
```python
import numpy as np

# Create array
arr = np.array([1, 2, 3, 4, 5])
print(arr)
print(arr.shape)  # (5,)
print(arr.dtype)  # int64

# Basic operations
print(arr * 2)     # [2, 4, 6, 8, 10]
print(arr.mean())  # 3.0
```

## Cheatsheet

| Operation | Code |
|-----------|------|
| Array erstellen | `np.array([1, 2, 3])` |
| Nullen/Einsen | `np.zeros((3, 3))`, `np.ones((2, 2))` |
| Range | `np.arange(0, 10, 2)` |
| Linspace | `np.linspace(0, 1, 5)` |
| Zufällig | `np.random.rand(3, 3)` |
| Form | `arr.shape`, `arr.reshape(2, 3)` |

## Gotchas

### Array creation

```python
import numpy as np

# From list
arr = np.array([[1, 2, 3], [4, 5, 6]])

# Special arrays
zeros = np.zeros((3, 4))
ones = np.ones((2, 3))
empty = np.empty((2, 2))
eye = np.eye(3)  # Identity matrix

# Sequences
range_arr = np.arange(0, 10, 2)     # [0, 2, 4, 6, 8]
linspace = np.linspace(0, 1, 5)     # [0, 0.25, 0.5, 0.75, 1]

# Random
random = np.random.rand(3, 3)       # Uniform [0, 1)
normal = np.random.randn(3, 3)      # Standard normal
integers = np.random.randint(0, 10, (3, 3))  # Random integers
```

### Indexing and slicing

```python
arr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

# Basic indexing
arr[0, 0]        # 1
arr[0]           # [1, 2, 3]
arr[:, 0]        # [1, 4, 7] (first column)

# Slicing
arr[0:2, 1:3]    # [[2, 3], [5, 6]]
arr[::2]         # Every other row

# Boolean indexing
arr[arr > 5]     # [6, 7, 8, 9]

# Fancy indexing
arr[[0, 2], [0, 2]]  # [1, 9]
```

### Array operations

```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

# Arithmetic (element-wise)
a + b      # [5, 7, 9]
a * b      # [4, 10, 18]
a ** 2     # [1, 4, 9]

# Aggregations
a.sum()    # 6
a.mean()   # 2.0
a.std()    # 0.816...
a.min()    # 1
a.max()    # 3
a.argmax() # 2 (index of max)

# Along axis
arr = np.array([[1, 2], [3, 4]])
arr.sum(axis=0)  # [4, 6] (column sum)
arr.sum(axis=1)  # [3, 7] (row sum)
```

### Reshaping

```python
arr = np.arange(12)

# Reshape
arr.reshape(3, 4)
arr.reshape(3, -1)  # Infer last dimension

# Transpose
arr.T

# Flatten
arr.flatten()
arr.ravel()

# Stack
np.vstack([a, b])   # Vertical stack
np.hstack([a, b])   # Horizontal stack
np.concatenate([a, b], axis=0)
```

### Linear algebra

```python
a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])

# Matrix multiplication
np.dot(a, b)
a @ b  # Python 3.5+

# Transpose
a.T

# Inverse
np.linalg.inv(a)

# Determinant
np.linalg.det(a)

# Eigenvalues
eigenvalues, eigenvectors = np.linalg.eig(a)
```

## Next Steps

- [NumPy Documentation](https://numpy.org/doc/) - Offizielle Dokumentation
- [NumPy Quickstart](https://numpy.org/doc/stable/user/quickstart.html) - Tutorial
- [NumPy Cheat Sheet](https://numpy.org/doc/stable/user/cheatsheet.html) - Referenz
- [100 NumPy Exercises](https://github.com/rougier/numpy-100) - Übungen
