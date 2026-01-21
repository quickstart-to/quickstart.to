---
title: "Pytest"
description: "Python testing made simple - fixtures, parametrize, plugins, and detailed assertion introspection"
template: "tool"
tags: ["python", "testing", "automation"]
---

## TL;DR

**What**: Python's most popular testing framework.

**Why**: Simple syntax, powerful fixtures, plugins, parametrization, detailed reports.

## Quick Start

**Install**:
```bash
pip install pytest
```

**Create test** (`test_example.py`):
```python
def test_addition():
    assert 1 + 1 == 2

def test_string():
    assert "hello".upper() == "HELLO"
```

**Run tests**:
```bash
pytest                    # Run all tests
pytest test_example.py    # Run specific file
pytest -v                 # Verbose output
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `pytest` | Run all tests |
| `pytest -v` | Verbose mode |
| `pytest -x` | Stop on first failure |
| `pytest -k "name"` | Run tests matching name |
| `pytest --cov` | Coverage report |
| `pytest -n auto` | Parallel execution |

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

### Parametrization

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

### Markers

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

- [Pytest Documentation](https://docs.pytest.org/) - Official docs
- [Pytest Plugins](https://docs.pytest.org/en/latest/reference/plugin_list.html) - Plugin list
- [pytest-cov](https://pytest-cov.readthedocs.io/) - Coverage
- [pytest-xdist](https://pytest-xdist.readthedocs.io/) - Parallel testing
