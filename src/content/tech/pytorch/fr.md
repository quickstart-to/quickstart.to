---
title: "PyTorch"
description: "Framework de deep learning - graphes dynamiques, acceleration GPU, torchvision, pret pour production"
template: "tool"
tags: ["ai", "machine-learning", "python"]
---

## TL;DR

**Quoi** : Un framework open-source de machine learning basé sur Python.

**Pourquoi** : Graphes de calcul dynamiques, API Pythonique, forte communauté de recherche, prêt pour la production.

## Quick Start

**Installer** :
```bash
pip install torch torchvision
```

**Hello PyTorch** :
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

| Opération | Code |
|-----------|------|
| Créer un tensor | `torch.tensor([1, 2, 3])` |
| Zéros/uns | `torch.zeros(3, 3)` |
| Aléatoire | `torch.rand(3, 3)` |
| Forme | `x.shape` |
| Remodeler | `x.view(2, 3)` |
| Vers GPU | `x.to('cuda')` |
| Gradient | `x.requires_grad_(True)` |

## Gotchas

### Réseau de neurones

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

### Boucle d'entraînement

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

### Utilisation du GPU

```python
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = model.to(device)
inputs = inputs.to(device)
```

### Sauvegarder et charger

```python
# Save
torch.save(model.state_dict(), 'model.pth')

# Load
model.load_state_dict(torch.load('model.pth'))
model.eval()
```

## Next Steps

- [PyTorch Documentation](https://pytorch.org/docs/) - Documentation officielle
- [PyTorch Tutorials](https://pytorch.org/tutorials/) - Étape par étape
- [PyTorch Examples](https://github.com/pytorch/examples) - Exemples de code
- [Hugging Face](https://huggingface.co/) - Modèles pré-entraînés
