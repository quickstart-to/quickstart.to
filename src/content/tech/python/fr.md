---
title: "Python"
description: "Syntaxe lisible, vaste écosystème - du scripting à l'IA, des apps web à la science des données"
template: "language"
tags: ["programming", "scripting", "data-science"]
---

## TL;DR

**En une ligne**: Python est un langage lisible et polyvalent qui vous permet d'écrire moins de code pour faire plus.

**Forces principales**:
- Syntaxe lisible qui se lit comme de l'anglais
- Énorme écosystème pour la data science, le web, l'automatisation, l'IA
- Batteries incluses - bibliothèque standard riche
- Multiplateforme et adapté aux débutants

## Philosophy

Python suit "The Zen of Python" - exécutez `import this` pour le voir. Principes clés:

- **La lisibilité compte** - Le code est plus lu qu'écrit
- **Explicite est mieux qu'implicite** - Pas de magie cachée
- **Simple est mieux que complexe** - Résoudre les problèmes de manière directe
- **Il devrait y avoir une façon évidente de le faire** - Contrairement au TIMTOWTDI de Perl

Python est typé dynamiquement (pas besoin de déclarer les types) et utilise l'indentation au lieu des accolades. Cela force un code propre et lisible.

## Quick Start

### Install

```bash
# macOS
brew install python

# Ubuntu/Debian
sudo apt install python3 python3-pip

# Windows: Télécharger depuis python.org, cocher "Add to PATH"
```

### Verify (latest stable: 3.13.1)

```bash
python3 --version  # Python 3.13.1
pip3 --version
```

### First Program

```python
# hello.py
print("Bonjour, Python!")
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
# Pas de déclarations de types nécessaires
name = "Alice"          # str
age = 25                # int
height = 1.75           # float
is_student = True       # bool
items = [1, 2, 3]       # list
data = {"key": "value"} # dict

# Vérifier le type
type(name)  # <class 'str'>
```

### Control Flow

```python
# if/elif/else
if age >= 18:
    print("Adulte")
elif age >= 13:
    print("Adolescent")
else:
    print("Enfant")

# boucle for
for item in items:
    print(item)

for i in range(5):  # 0, 1, 2, 3, 4
    print(i)

# boucle while
while count > 0:
    count -= 1
```

### Functions

```python
def greet(name, greeting="Bonjour"):
    """Docstring: décrit la fonction"""
    return f"{greeting}, {name}!"

# Appel
greet("le monde")           # "Bonjour, le monde!"
greet("le monde", "Salut")  # "Salut, le monde!"

# Lambda (fonction anonyme)
square = lambda x: x ** 2
```

### Error Handling

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Impossible de diviser par zéro")
except Exception as e:
    print(f"Erreur: {e}")
finally:
    print("S'exécute toujours")
```

### List Comprehension

```python
# One-liner puissant pour transformer les listes
squares = [x**2 for x in range(10)]
evens = [x for x in range(10) if x % 2 == 0]
```

## Gotchas

### python vs python3

```bash
# Sur de nombreux systèmes, 'python' peut pointer vers Python 2 ou ne pas exister
# Toujours utiliser python3 explicitement
python3 --version
```

### Indentation is syntax

```python
# Python utilise l'indentation (4 espaces) au lieu des accolades
if True:
    print("Correct")  # 4 espaces
   print("Faux")      # IndentationError!
```

### Mutable default arguments

```python
# FAUX: la liste est partagée entre les appels
def add_item(item, items=[]):
    items.append(item)
    return items

# CORRECT: utiliser None
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
```

### Virtual environments

```bash
# Toujours utiliser venv pour les projets pour éviter les conflits de dépendances
python3 -m venv venv
source venv/bin/activate  # Linux/macOS
pip install package
deactivate
```

## When to Choose

**Idéal pour**:
- Data science & machine learning (pandas, scikit-learn, PyTorch)
- Scripts rapides et automatisation
- Backends web (Django, FastAPI, Flask)
- Débutants apprenant la programmation

**Pas idéal pour**:
- Applications mobiles (utilisez Swift, Kotlin)
- Calcul haute performance (utilisez C++, Rust)
- Frontend web (utilisez JavaScript)

**Comparaison**:
| Aspect | Python | JavaScript | Go |
|--------|--------|------------|-----|
| Typage | Dynamique | Dynamique | Statique |
| Vitesse | Plus lent | Moyen | Rapide |
| Cas d'usage | Données/IA/Scripts | Web/Full-stack | Backend/CLI |
| Courbe d'apprentissage | Facile | Facile | Moyen |

## Next Steps

- [Tutoriel officiel](https://docs.python.org/3/tutorial/) - Commencez ici
- [Real Python](https://realpython.com/) - Tutoriels pratiques
- [PyPI](https://pypi.org/) - Dépôt de packages
- [Automate the Boring Stuff](https://automatetheboringstuff.com/) - Livre gratuit

## Ecosystem

### Package Manager

```bash
pip install package        # Installer
pip freeze > requirements.txt  # Exporter les deps
pip install -r requirements.txt  # Installer depuis un fichier
```

### Popular Frameworks

- **Web**: Django, FastAPI, Flask
- **Données**: pandas, NumPy, matplotlib
- **ML/IA**: PyTorch, TensorFlow, scikit-learn
- **Automatisation**: requests, BeautifulSoup, Selenium
