---
title: "Python"
description: "Sintaxis legible, ecosistema extenso - desde scripts hasta IA, apps web y ciencia de datos"
template: "language"
tags: ["programming", "scripting", "data-science"]
---

## TL;DR

**En una línea**: Python es un lenguaje legible y versátil que te permite escribir menos código para hacer más.

**Fortalezas principales**:
- Sintaxis legible que se lee como inglés
- Enorme ecosistema para ciencia de datos, web, automatización, IA
- Baterías incluidas - biblioteca estándar rica
- Multiplataforma y amigable para principiantes

## Philosophy

Python sigue "The Zen of Python" - ejecuta `import this` para verlo. Principios clave:

- **La legibilidad cuenta** - El código se lee más de lo que se escribe
- **Explícito es mejor que implícito** - Sin magia oculta
- **Simple es mejor que complejo** - Resolver problemas de forma directa
- **Debería haber una forma obvia de hacerlo** - A diferencia del TIMTOWTDI de Perl

Python tiene tipado dinámico (no necesitas declarar tipos de variables) y usa indentación en lugar de llaves. Esto fuerza código limpio y legible.

## Quick Start

### Install

```bash
# macOS
brew install python

# Ubuntu/Debian
sudo apt install python3 python3-pip

# Windows: Descargar de python.org, marcar "Add to PATH"
```

### Verify (latest stable: 3.13.1)

```bash
python3 --version  # Python 3.13.1
pip3 --version
```

### First Program

```python
# hello.py
print("¡Hola, Python!")
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
# No se necesitan declaraciones de tipos
name = "Alice"          # str
age = 25                # int
height = 1.75           # float
is_student = True       # bool
items = [1, 2, 3]       # list
data = {"key": "value"} # dict

# Verificar tipo
type(name)  # <class 'str'>
```

### Control Flow

```python
# if/elif/else
if age >= 18:
    print("Adulto")
elif age >= 13:
    print("Adolescente")
else:
    print("Niño")

# bucle for
for item in items:
    print(item)

for i in range(5):  # 0, 1, 2, 3, 4
    print(i)

# bucle while
while count > 0:
    count -= 1
```

### Functions

```python
def greet(name, greeting="Hola"):
    """Docstring: describe la función"""
    return f"{greeting}, {name}!"

# Llamada
greet("Mundo")           # "Hola, Mundo!"
greet("Mundo", "Hey")    # "Hey, Mundo!"

# Lambda (función anónima)
square = lambda x: x ** 2
```

### Error Handling

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("No se puede dividir por cero")
except Exception as e:
    print(f"Error: {e}")
finally:
    print("Siempre se ejecuta")
```

### List Comprehension

```python
# One-liner poderoso para transformar listas
squares = [x**2 for x in range(10)]
evens = [x for x in range(10) if x % 2 == 0]
```

## Gotchas

### python vs python3

```bash
# En muchos sistemas, 'python' puede apuntar a Python 2 o no existir
# Siempre usa python3 explícitamente
python3 --version
```

### Indentation is syntax

```python
# Python usa indentación (4 espacios) en lugar de llaves
if True:
    print("Correcto")  # 4 espacios
   print("Incorrecto")  # IndentationError!
```

### Mutable default arguments

```python
# INCORRECTO: la lista se comparte entre llamadas
def add_item(item, items=[]):
    items.append(item)
    return items

# CORRECTO: usar None
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
```

### Virtual environments

```bash
# Siempre usa venv para proyectos para evitar conflictos de dependencias
python3 -m venv venv
source venv/bin/activate  # Linux/macOS
pip install package
deactivate
```

## When to Choose

**Ideal para**:
- Ciencia de datos y machine learning (pandas, scikit-learn, PyTorch)
- Scripts rápidos y automatización
- Backends web (Django, FastAPI, Flask)
- Principiantes aprendiendo programación

**No ideal para**:
- Apps móviles (usa Swift, Kotlin)
- Computación de alto rendimiento (usa C++, Rust)
- Frontend web (usa JavaScript)

**Comparación**:
| Aspecto | Python | JavaScript | Go |
|---------|--------|------------|-----|
| Tipado | Dinámico | Dinámico | Estático |
| Velocidad | Más lento | Medio | Rápido |
| Caso de uso | Datos/IA/Scripts | Web/Full-stack | Backend/CLI |
| Curva de aprendizaje | Fácil | Fácil | Medio |

## Next Steps

- [Tutorial oficial](https://docs.python.org/3/tutorial/) - Empieza aquí
- [Real Python](https://realpython.com/) - Tutoriales prácticos
- [PyPI](https://pypi.org/) - Repositorio de paquetes
- [Automate the Boring Stuff](https://automatetheboringstuff.com/) - Libro gratuito

## Ecosystem

### Package Manager

```bash
pip install package        # Instalar
pip freeze > requirements.txt  # Exportar dependencias
pip install -r requirements.txt  # Instalar desde archivo
```

### Popular Frameworks

- **Web**: Django, FastAPI, Flask
- **Datos**: pandas, NumPy, matplotlib
- **ML/IA**: PyTorch, TensorFlow, scikit-learn
- **Automatización**: requests, BeautifulSoup, Selenium
