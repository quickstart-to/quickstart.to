---
title: "NumPy"
description: "5 分钟快速入门 NumPy"
template: "tool"
tags: ["python", "scientific-computing", "arrays"]
---

## TL;DR

**是什么**：Python 科学计算的基础包。

**为什么用**：快速数组操作、广播、线性代数、数据科学基础。

## Quick Start

**安装**：
```bash
pip install numpy
```

**Hello NumPy**：
```python
import numpy as np

# 创建数组
arr = np.array([1, 2, 3, 4, 5])
print(arr)
print(arr.shape)  # (5,)
print(arr.dtype)  # int64

# 基本操作
print(arr * 2)     # [2, 4, 6, 8, 10]
print(arr.mean())  # 3.0
```

## Cheatsheet

| 操作 | 代码 |
|-----------|------|
| 创建数组 | `np.array([1, 2, 3])` |
| 零/一 | `np.zeros((3, 3))`, `np.ones((2, 2))` |
| 范围 | `np.arange(0, 10, 2)` |
| 线性空间 | `np.linspace(0, 1, 5)` |
| 随机 | `np.random.rand(3, 3)` |
| 形状 | `arr.shape`, `arr.reshape(2, 3)` |

## Gotchas

### 创建数组

```python
import numpy as np

# 从列表
arr = np.array([[1, 2, 3], [4, 5, 6]])

# 特殊数组
zeros = np.zeros((3, 4))
ones = np.ones((2, 3))
empty = np.empty((2, 2))
eye = np.eye(3)  # 单位矩阵

# 序列
range_arr = np.arange(0, 10, 2)     # [0, 2, 4, 6, 8]
linspace = np.linspace(0, 1, 5)     # [0, 0.25, 0.5, 0.75, 1]

# 随机
random = np.random.rand(3, 3)       # 均匀分布 [0, 1)
normal = np.random.randn(3, 3)      # 标准正态分布
integers = np.random.randint(0, 10, (3, 3))  # 随机整数
```

### 索引和切片

```python
arr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

# 基本索引
arr[0, 0]        # 1
arr[0]           # [1, 2, 3]
arr[:, 0]        # [1, 4, 7]（第一列）

# 切片
arr[0:2, 1:3]    # [[2, 3], [5, 6]]
arr[::2]         # 每隔一行

# 布尔索引
arr[arr > 5]     # [6, 7, 8, 9]

# 花式索引
arr[[0, 2], [0, 2]]  # [1, 9]
```

### 数组操作

```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

# 算术（逐元素）
a + b      # [5, 7, 9]
a * b      # [4, 10, 18]
a ** 2     # [1, 4, 9]

# 聚合
a.sum()    # 6
a.mean()   # 2.0
a.std()    # 0.816...
a.min()    # 1
a.max()    # 3
a.argmax() # 2（最大值的索引）

# 沿轴
arr = np.array([[1, 2], [3, 4]])
arr.sum(axis=0)  # [4, 6]（列和）
arr.sum(axis=1)  # [3, 7]（行和）
```

### 重塑

```python
arr = np.arange(12)

# 重塑
arr.reshape(3, 4)
arr.reshape(3, -1)  # 推断最后维度

# 转置
arr.T

# 展平
arr.flatten()
arr.ravel()

# 堆叠
np.vstack([a, b])   # 垂直堆叠
np.hstack([a, b])   # 水平堆叠
np.concatenate([a, b], axis=0)
```

### 线性代数

```python
a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])

# 矩阵乘法
np.dot(a, b)
a @ b  # Python 3.5+

# 转置
a.T

# 逆矩阵
np.linalg.inv(a)

# 行列式
np.linalg.det(a)

# 特征值
eigenvalues, eigenvectors = np.linalg.eig(a)
```

## Next Steps

- [NumPy 文档](https://numpy.org/doc/) - 官方文档
- [NumPy 快速入门](https://numpy.org/doc/stable/user/quickstart.html) - 教程
- [NumPy 速查表](https://numpy.org/doc/stable/user/cheatsheet.html) - 参考
- [100 道 NumPy 练习](https://github.com/rougier/numpy-100) - 练习
