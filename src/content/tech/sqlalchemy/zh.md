---
title: "SQLAlchemy"
description: "5 分钟快速入门 SQLAlchemy"
tags: ["python", "orm", "database"]
---

## TL;DR

**是什么**：Python SQL 工具包和对象关系映射器。

**为什么用**：灵活、强大、支持原生 SQL 和 ORM、数据库无关。

## Quick Start

**安装**：
```bash
pip install sqlalchemy
```

**连接和查询**：
```python
from sqlalchemy import create_engine, text

engine = create_engine('sqlite:///example.db')

with engine.connect() as conn:
    result = conn.execute(text("SELECT 'Hello, SQLAlchemy!'"))
    print(result.all())
```

## Cheatsheet

| 概念 | 描述 |
|---------|-------------|
| `Engine` | 数据库连接 |
| `Session` | 工作单元 |
| `Model` | 表映射 |
| `Column` | 字段定义 |
| `relationship` | 模型关系 |
| `Query` | 数据检索 |

## Gotchas

### 模型定义（ORM）

```python
from sqlalchemy import Column, Integer, String, ForeignKey, create_engine
from sqlalchemy.orm import declarative_base, relationship, sessionmaker

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    email = Column(String(100), unique=True)

    posts = relationship('Post', back_populates='author')

class Post(Base):
    __tablename__ = 'posts'

    id = Column(Integer, primary_key=True)
    title = Column(String(100), nullable=False)
    author_id = Column(Integer, ForeignKey('users.id'))

    author = relationship('User', back_populates='posts')

# 创建表
engine = create_engine('sqlite:///example.db')
Base.metadata.create_all(engine)
```

### CRUD 操作

```python
from sqlalchemy.orm import sessionmaker

Session = sessionmaker(bind=engine)
session = Session()

# 创建
user = User(name='John', email='john@example.com')
session.add(user)
session.commit()

# 读取
users = session.query(User).all()
user = session.query(User).filter_by(id=1).first()
user = session.query(User).filter(User.name == 'John').first()

# 更新
user.name = 'Johnny'
session.commit()

# 删除
session.delete(user)
session.commit()
```

### 查询过滤

```python
from sqlalchemy import and_, or_

# 基本过滤
users = session.query(User).filter(User.name == 'John').all()
users = session.query(User).filter(User.name.like('%John%')).all()
users = session.query(User).filter(User.id.in_([1, 2, 3])).all()

# 多条件
users = session.query(User).filter(
    and_(
        User.name == 'John',
        User.email.like('%@example.com')
    )
).all()

# 排序和限制
users = session.query(User).order_by(User.name).limit(10).all()

# 计数
count = session.query(User).count()
```

### 关系

```python
# 带关系查询
user = session.query(User).filter_by(id=1).first()
print(user.posts)  # 延迟加载 posts

# 预加载
from sqlalchemy.orm import joinedload

users = session.query(User).options(joinedload(User.posts)).all()

# 带关系创建
post = Post(title='Hello', author=user)
session.add(post)
session.commit()
```

### SQLAlchemy 2.0 风格

```python
from sqlalchemy import select
from sqlalchemy.orm import Session

with Session(engine) as session:
    # 选择
    stmt = select(User).where(User.name == 'John')
    users = session.scalars(stmt).all()

    # 插入
    user = User(name='Jane', email='jane@example.com')
    session.add(user)
    session.commit()
```

### 异步支持

```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

engine = create_async_engine('postgresql+asyncpg://user:pass@localhost/db')
async_session = sessionmaker(engine, class_=AsyncSession)

async with async_session() as session:
    result = await session.execute(select(User))
    users = result.scalars().all()
```

## Next Steps

- [SQLAlchemy 文档](https://docs.sqlalchemy.org/) - 官方文档
- [ORM 教程](https://docs.sqlalchemy.org/en/20/tutorial/) - 入门
- [ORM 快速开始](https://docs.sqlalchemy.org/en/20/orm/quickstart.html) - 快速入门
- [Alembic](https://alembic.sqlalchemy.org/) - 迁移
