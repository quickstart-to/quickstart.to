---
title: "Python"
description: "Lesbare Syntax, riesiges Ökosystem - von Scripting bis KI, von Web-Apps bis Data Science"
template: "language"
tags: ["programming", "scripting", "data-science"]
---

## TL;DR

**Eine Zeile**: Python ist eine lesbare, vielseitige Sprache, mit der Sie weniger Code schreiben und mehr erreichen können.

**Kernstärken**:
- Lesbare Syntax, die sich wie Englisch liest
- Riesiges Ökosystem für Data Science, Web, Automatisierung, KI
- Batterien inklusive - reichhaltige Standardbibliothek
- Plattformübergreifend und anfängerfreundlich

## Philosophy

Python folgt "The Zen of Python" - führen Sie `import this` aus, um es zu sehen. Schlüsselprinzipien:

- **Lesbarkeit zählt** - Code wird mehr gelesen als geschrieben
- **Explizit ist besser als implizit** - Keine versteckte Magie
- **Einfach ist besser als komplex** - Probleme auf einfache Weise lösen
- **Es sollte einen offensichtlichen Weg geben** - Anders als Perls TIMTOWTDI

Python ist dynamisch typisiert (keine Variablentypen deklarieren) und verwendet Einrückung statt Klammern. Dies erzwingt sauberen, lesbaren Code.

## Quick Start

### Install

```bash
# macOS
brew install python

# Ubuntu/Debian
sudo apt install python3 python3-pip

# Windows: Von python.org herunterladen, "Add to PATH" aktivieren
```

### Verify (latest stable: 3.13.1)

```bash
python3 --version  # Python 3.13.1
pip3 --version
```

### First Program

```python
# hello.py
print("Hallo, Python!")
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
# Keine Typdeklarationen nötig
name = "Alice"          # str
age = 25                # int
height = 1.75           # float
is_student = True       # bool
items = [1, 2, 3]       # list
data = {"key": "value"} # dict

# Typ prüfen
type(name)  # <class 'str'>
```

### Control Flow

```python
# if/elif/else
if age >= 18:
    print("Erwachsen")
elif age >= 13:
    print("Teenager")
else:
    print("Kind")

# for-Schleife
for item in items:
    print(item)

for i in range(5):  # 0, 1, 2, 3, 4
    print(i)

# while-Schleife
while count > 0:
    count -= 1
```

### Functions

```python
def greet(name, greeting="Hallo"):
    """Docstring: beschreibt die Funktion"""
    return f"{greeting}, {name}!"

# Aufruf
greet("Welt")           # "Hallo, Welt!"
greet("Welt", "Hi")     # "Hi, Welt!"

# Lambda (anonyme Funktion)
square = lambda x: x ** 2
```

### Error Handling

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Kann nicht durch Null teilen")
except Exception as e:
    print(f"Fehler: {e}")
finally:
    print("Läuft immer")
```

### List Comprehension

```python
# Mächtige Einzeiler zum Transformieren von Listen
squares = [x**2 for x in range(10)]
evens = [x for x in range(10) if x % 2 == 0]
```

## Gotchas

### python vs python3

```bash
# Auf vielen Systemen zeigt 'python' auf Python 2 oder existiert nicht
# Immer explizit python3 verwenden
python3 --version
```

### Indentation is syntax

```python
# Python verwendet Einrückung (4 Leerzeichen) statt Klammern
if True:
    print("Richtig")  # 4 Leerzeichen
   print("Falsch")     # IndentationError!
```

### Mutable default arguments

```python
# FALSCH: Liste wird über Aufrufe geteilt
def add_item(item, items=[]):
    items.append(item)
    return items

# RICHTIG: None verwenden
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
```

### Virtual environments

```bash
# Immer venv für Projekte verwenden, um Dependency-Konflikte zu vermeiden
python3 -m venv venv
source venv/bin/activate  # Linux/macOS
pip install package
deactivate
```

## When to Choose

**Am besten für**:
- Data Science & Machine Learning (pandas, scikit-learn, PyTorch)
- Schnelle Skripte und Automatisierung
- Web-Backends (Django, FastAPI, Flask)
- Anfänger, die Programmieren lernen

**Nicht ideal für**:
- Mobile Apps (Swift, Kotlin verwenden)
- Hochleistungsrechnen (C++, Rust verwenden)
- Frontend-Web (JavaScript verwenden)

**Vergleich**:
| Aspekt | Python | JavaScript | Go |
|--------|--------|------------|-----|
| Typisierung | Dynamisch | Dynamisch | Statisch |
| Geschwindigkeit | Langsamer | Mittel | Schnell |
| Anwendungsfall | Daten/KI/Skripte | Web/Full-Stack | Backend/CLI |
| Lernkurve | Einfach | Einfach | Mittel |

## Next Steps

- [Offizielles Tutorial](https://docs.python.org/3/tutorial/) - Hier starten
- [Real Python](https://realpython.com/) - Praktische Tutorials
- [PyPI](https://pypi.org/) - Paket-Repository
- [Automate the Boring Stuff](https://automatetheboringstuff.com/) - Kostenloses Buch

## Ecosystem

### Package Manager

```bash
pip install package        # Installieren
pip freeze > requirements.txt  # Deps exportieren
pip install -r requirements.txt  # Aus Datei installieren
```

### Popular Frameworks

- **Web**: Django, FastAPI, Flask
- **Daten**: pandas, NumPy, matplotlib
- **ML/KI**: PyTorch, TensorFlow, scikit-learn
- **Automatisierung**: requests, BeautifulSoup, Selenium
