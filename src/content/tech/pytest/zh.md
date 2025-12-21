---
title: "Pytest"
description: "5 分钟快速入门 Pytest"
tags: ["python", "testing", "automation"]
---

## TL;DR

**是什么**：Python 最流行的测试框架。

**为什么用**：简单语法、强大的 fixtures、插件、参数化、详细报告。

## Quick Start

**安装**：
```bash
pip install pytest
```

**创建测试**（`test_example.py`）：
```python
def test_addition():
    assert 1 + 1 == 2

def test_string():
    assert "hello".upper() == "HELLO"
```

**运行测试**：
```bash
pytest                    # 运行所有测试
pytest test_example.py    # 运行特定文件
pytest -v                 # 详细输出
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `pytest` | 运行所有测试 |
| `pytest -v` | 详细模式 |
| `pytest -x` | 首次失败即停止 |
| `pytest -k "name"` | 运行匹配名称的测试 |
| `pytest --cov` | 覆盖率报告 |
| `pytest -n auto` | 并行执行 |

## Gotchas

### Fixtures

```python
import pytest

@pytest.fixture
def sample_data():
    return {"name": "John", "age": 30}

def test_with_fixture(sample_data):
    assert sample_data["name"] == "John"

# 带 setup 和 teardown 的 fixture
@pytest.fixture
def database():
    db = connect_db()
    yield db
    db.close()

# 作用域 fixtures
@pytest.fixture(scope="module")
def expensive_resource():
    return setup_resource()
```

### 参数化

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

### 断言

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

### 标记

```python
import pytest

@pytest.mark.slow
def test_slow_operation():
    # 仅通过 pytest -m slow 运行
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

### Mock

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

- [Pytest 文档](https://docs.pytest.org/) - 官方文档
- [Pytest 插件](https://docs.pytest.org/en/latest/reference/plugin_list.html) - 插件列表
- [pytest-cov](https://pytest-cov.readthedocs.io/) - 覆盖率
- [pytest-xdist](https://pytest-xdist.readthedocs.io/) - 并行测试
