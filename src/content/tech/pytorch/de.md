---
title: "PyTorch"
description: "Deep Learning Framework - dynamische Graphen, GPU-Beschleunigung, torchvision, produktionsreif"
template: "tool"
tags: ["ai", "machine-learning", "python"]
---

## TL;DR

**Was**: Ein Open-Source Machine-Learning-Framework basierend auf Python.

**Warum**: Dynamische Berechnungsgraphen, Pythonische API, starke Research-Community, produktionsreif.

## Quick Start

**Installieren**:
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
| Tensor erstellen | `torch.tensor([1, 2, 3])` |
| Nullen/Einsen | `torch.zeros(3, 3)` |
| Zufällig | `torch.rand(3, 3)` |
| Form | `x.shape` |
| Umformen | `x.view(2, 3)` |
| Zur GPU | `x.to('cuda')` |
| Gradient | `x.requires_grad_(True)` |

## Gotchas

### Neuronales Netzwerk

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

### Trainingsschleife

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

### GPU-Nutzung

```python
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = model.to(device)
inputs = inputs.to(device)
```

### Speichern und Laden

```python
# Save
torch.save(model.state_dict(), 'model.pth')

# Load
model.load_state_dict(torch.load('model.pth'))
model.eval()
```

## Next Steps

- [PyTorch Documentation](https://pytorch.org/docs/) - Offizielle Dokumentation
- [PyTorch Tutorials](https://pytorch.org/tutorials/) - Schritt für Schritt
- [PyTorch Examples](https://github.com/pytorch/examples) - Code-Beispiele
- [Hugging Face](https://huggingface.co/) - Vortrainierte Modelle
