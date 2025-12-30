---
title: "PyTorch"
description: "Comienza con deep learning en PyTorch en 5 minutos"
template: "tool"
tags: ["ai", "machine-learning", "python"]
---

## TL;DR

**Qué**: Un framework de machine learning open-source basado en Python.

**Por qué**: Grafos computacionales dinámicos, API Pythónica, fuerte comunidad de investigación, listo para producción.

## Quick Start

**Instalar**:
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

| Operación | Código |
|-----------|------|
| Crear tensor | `torch.tensor([1, 2, 3])` |
| Ceros/unos | `torch.zeros(3, 3)` |
| Aleatorio | `torch.rand(3, 3)` |
| Forma | `x.shape` |
| Remodelar | `x.view(2, 3)` |
| A GPU | `x.to('cuda')` |
| Gradiente | `x.requires_grad_(True)` |

## Gotchas

### Red neuronal

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

### Bucle de entrenamiento

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

### Uso de GPU

```python
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = model.to(device)
inputs = inputs.to(device)
```

### Guardar y cargar

```python
# Save
torch.save(model.state_dict(), 'model.pth')

# Load
model.load_state_dict(torch.load('model.pth'))
model.eval()
```

## Next Steps

- [PyTorch Documentation](https://pytorch.org/docs/) - Documentación oficial
- [PyTorch Tutorials](https://pytorch.org/tutorials/) - Paso a paso
- [PyTorch Examples](https://github.com/pytorch/examples) - Ejemplos de código
- [Hugging Face](https://huggingface.co/) - Modelos pre-entrenados
