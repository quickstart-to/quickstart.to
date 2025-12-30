---
title: "Pytest"
description: "Démarrez avec Pytest en 5 minutes"
template: "tool"
tags: ["python", "testing", "automation"]
---

## TL;DR

**Quoi** : Le framework de test le plus populaire de Python.

**Pourquoi** : Syntaxe simple, fixtures puissantes, plugins, paramétrage, rapports détaillés.

## Quick Start

**Installer** :
```bash
pip install pytest
```

**Créer un test** (`test_example.py`) :
```python
def test_addition():
    assert 1 + 1 == 2

def test_string():
    assert "hello".upper() == "HELLO"
```

**Exécuter les tests** :
```bash
pytest                    # Run all tests
pytest test_example.py    # Run specific file
pytest -v                 # Verbose output
```

## Cheatsheet

| Commande | Description |
|---------|-------------|
| `pytest` | Exécuter tous les tests |
| `pytest -v` | Mode verbeux |
| `pytest -x` | Arrêter au premier échec |
| `pytest -k "name"` | Exécuter les tests correspondants |
| `pytest --cov` | Rapport de couverture |
| `pytest -n auto` | Exécution parallèle |

## Gotchas

### Fixtures

```python
import pytest

@pytest.fixture
def sample_data():
    return {"name": "John", "age": 30}

def test_with_fixture(sample_data):
    assert sample_data["name"] == "John"

# Fixture with setup and teardown
@pytest.fixture
def database():
    db = connect_db()
    yield db
    db.close()

# Scoped fixtures
@pytest.fixture(scope="module")
def expensive_resource():
    return setup_resource()
```

### Paramétrage

```python
import pytest

@pytest.mark.parametrize("input,expected", [
    (1, 2),
    (2, 4),
    (3, 6),
])
def test_double(input, expected):
    assert input * 2 == expected

@pytest.mark.parametrize("x,y,result", [
    (1, 1, 2),
    (2, 3, 5),
    (10, -5, 5),
])
def test_addition(x, y, result):
    assert x + y == result
```

### Assertions

```python
import pytest

def test_exceptions():
    with pytest.raises(ValueError):
        int("not a number")

    with pytest.raises(ZeroDivisionError):
        1 / 0

def test_approximate():
    assert 0.1 + 0.2 == pytest.approx(0.3)

def test_contains():
    assert "world" in "hello world"
    assert 5 in [1, 2, 3, 4, 5]
```

### Marqueurs

```python
import pytest

@pytest.mark.slow
def test_slow_operation():
    # Runs only with: pytest -m slow
    pass

@pytest.mark.skip(reason="Not implemented yet")
def test_future_feature():
    pass

@pytest.mark.skipif(sys.version_info < (3, 10), reason="Requires Python 3.10+")
def test_new_feature():
    pass

@pytest.mark.xfail(reason="Known bug")
def test_known_issue():
    assert False
```

### Mocking

```python
from unittest.mock import Mock, patch

def test_mock():
    mock = Mock(return_value=42)
    assert mock() == 42

def test_patch():
    with patch('module.function') as mock_func:
        mock_func.return_value = "mocked"
        result = module.function()
        assert result == "mocked"

@patch('requests.get')
def test_api(mock_get):
    mock_get.return_value.json.return_value = {"id": 1}
    response = fetch_user(1)
    assert response["id"] == 1
```

## Next Steps

- [Pytest Documentation](https://docs.pytest.org/) - Documentation officielle
- [Pytest Plugins](https://docs.pytest.org/en/latest/reference/plugin_list.html) - Liste des plugins
- [pytest-cov](https://pytest-cov.readthedocs.io/) - Couverture
- [pytest-xdist](https://pytest-xdist.readthedocs.io/) - Tests parallèles
