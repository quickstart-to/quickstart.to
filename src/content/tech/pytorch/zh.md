---
title: "PyTorch"
description: "5 分钟快速入门 PyTorch 深度学习"
template: "tool"
tags: ["ai", "machine-learning", "python"]
---

## TL;DR

**是什么**：基于 Python 的开源机器学习框架。

**为什么用**：动态计算图、Pythonic API、强大的研究社区、生产就绪。

## Quick Start

**安装**：
```bash
pip install torch torchvision
```

**Hello PyTorch**：
```python
import torch

# 创建张量
x = torch.tensor([1, 2, 3])
y = torch.tensor([4, 5, 6])
z = x + y
print(z)  # tensor([5, 7, 9])

# 检查 GPU
print(torch.cuda.is_available())
```

## Cheatsheet

| 操作 | 代码 |
|-----------|------|
| 创建张量 | `torch.tensor([1, 2, 3])` |
| 零/一 | `torch.zeros(3, 3)` |
| 随机 | `torch.rand(3, 3)` |
| 形状 | `x.shape` |
| 重塑 | `x.view(2, 3)` |
| 移到 GPU | `x.to('cuda')` |
| 梯度 | `x.requires_grad_(True)` |

## Gotchas

### 神经网络

```python
import torch.nn as nn

class SimpleNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 128)
        self.fc2 = nn.Linear(128, 10)
        self.relu = nn.ReLU()

    def forward(self, x):
        x = self.relu(self.fc1(x))
        return self.fc2(x)

model = SimpleNN()
```

### 训练循环

```python
import torch.optim as optim

criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

for epoch in range(epochs):
    for inputs, labels in dataloader:
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
```

### GPU 使用

```python
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = model.to(device)
inputs = inputs.to(device)
```

### 保存和加载

```python
# 保存
torch.save(model.state_dict(), 'model.pth')

# 加载
model.load_state_dict(torch.load('model.pth'))
model.eval()
```

## Next Steps

- [PyTorch 文档](https://pytorch.org/docs/) - 官方文档
- [PyTorch 教程](https://pytorch.org/tutorials/) - 分步教程
- [PyTorch 示例](https://github.com/pytorch/examples) - 代码示例
- [Hugging Face](https://huggingface.co/) - 预训练模型
