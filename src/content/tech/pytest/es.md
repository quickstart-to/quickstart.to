---
title: "Pytest"
description: "Comienza con Pytest en 5 minutos"
template: "tool"
tags: ["python", "testing", "automation"]
---

## TL;DR

**Qué**: El framework de pruebas más popular de Python.

**Por qué**: Sintaxis simple, fixtures potentes, plugins, parametrización, reportes detallados.

## Quick Start

**Instalar**:
```bash
pip install pytest
```

**Crear test** (`test_example.py`):
```python
def test_addition():
    assert 1 + 1 == 2

def test_string():
    assert "hello".upper() == "HELLO"
```

**Ejecutar tests**:
```bash
pytest                    # Run all tests
pytest test_example.py    # Run specific file
pytest -v                 # Verbose output
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `pytest` | Ejecutar todos los tests |
| `pytest -v` | Modo verboso |
| `pytest -x` | Parar en primer fallo |
| `pytest -k "name"` | Ejecutar tests que coincidan |
| `pytest --cov` | Reporte de cobertura |
| `pytest -n auto` | Ejecución paralela |

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

### Parametrización

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

### Marcadores

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

- [Pytest Documentation](https://docs.pytest.org/) - Documentación oficial
- [Pytest Plugins](https://docs.pytest.org/en/latest/reference/plugin_list.html) - Lista de plugins
- [pytest-cov](https://pytest-cov.readthedocs.io/) - Cobertura
- [pytest-xdist](https://pytest-xdist.readthedocs.io/) - Tests paralelos
