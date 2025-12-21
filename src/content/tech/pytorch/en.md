---
title: "PyTorch"
description: "Get started with PyTorch deep learning in 5 minutes"
tags: ["ai", "machine-learning", "python"]
---

## TL;DR

**What**: An open-source machine learning framework based on Python.

**Why**: Dynamic computation graphs, Pythonic API, strong research community, production ready.

## Quick Start

**Install**:
```bash
pip install torch torchvision
```

**Hello PyTorch**:
```python
import torch

# Create tensors
x = torch.tensor([1, 2, 3])
y = torch.tensor([4, 5, 6])
z = x + y
print(z)  # tensor([5, 7, 9])

# Check GPU
print(torch.cuda.is_available())
```

## Cheatsheet

| Operation | Code |
|-----------|------|
| Create tensor | `torch.tensor([1, 2, 3])` |
| Zeros/ones | `torch.zeros(3, 3)` |
| Random | `torch.rand(3, 3)` |
| Shape | `x.shape` |
| Reshape | `x.view(2, 3)` |
| To GPU | `x.to('cuda')` |
| Gradient | `x.requires_grad_(True)` |

## Gotchas

### Neural network

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

### Training loop

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

### GPU usage

```python
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = model.to(device)
inputs = inputs.to(device)
```

### Save and load

```python
# Save
torch.save(model.state_dict(), 'model.pth')

# Load
model.load_state_dict(torch.load('model.pth'))
model.eval()
```

## Next Steps

- [PyTorch Documentation](https://pytorch.org/docs/) - Official docs
- [PyTorch Tutorials](https://pytorch.org/tutorials/) - Step-by-step
- [PyTorch Examples](https://github.com/pytorch/examples) - Code examples
- [Hugging Face](https://huggingface.co/) - Pre-trained models
